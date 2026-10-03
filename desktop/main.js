'use strict';
const {app,BrowserWindow,protocol,session,ipcMain,dialog,shell}=require('electron');
const path=require('path'),fs=require('fs');const {pathToFileURL}=require('url');
const {ConfigStore,defaults}=require('./config-store');const {StorageBridge}=require('./storage-bridge');const {SaveManager}=require('./save-manager');
protocol.registerSchemesAsPrivileged([{scheme:'app',privileges:{standard:true,secure:true,supportFetchAPI:true,corsEnabled:true}}]);
app.setPath('userData',process.env.MINIDAYZ_TEST_USERDATA||path.join(app.getPath('appData'),'MiniDayZ Cangshu PC'));
let game,settings,config,saves,storage,shutting=false,canQuit=false;
const settingsURL=pathToFileURL(path.join(__dirname,'settings/index.html')).href;
const testMode=()=>process.env.MINIDAYZ_TEST_MODE==='1'&&!!process.env.MINIDAYZ_TEST_USERDATA;
async function applyKeyboard(){if(!game||game.isDestroyed())return;const options={...config.effective,dev:process.argv.includes('--dev')};await game.webContents.executeJavaScript(`window.__MINIDAYZ_PC_CONFIG=${JSON.stringify(options)};`);const exists=await game.webContents.executeJavaScript('!!window.__MINIDAYZ_PC_CONTROLS');if(exists)await game.webContents.executeJavaScript(`window.__MINIDAYZ_PC_CONTROLS.updateConfig(${JSON.stringify(options)})`);else if(options.keyboardControls)await game.webContents.executeJavaScript(fs.readFileSync(path.join(__dirname,'injections/keyboard-controls.js'),'utf8'));}
async function createGame(){
 if(game&&!game.isDestroyed())return;
 const win=new BrowserWindow({width:1280,height:960,minWidth:800,minHeight:600,title:'MiniDayZ+ 仓鼠版 v2.3.3',autoHideMenuBar:true,webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});game=win;win.setMenu(null);
 win.on('closed',()=>{if(game===win)game=null;});win.on('close',event=>{if(!canQuit){event.preventDefault();shutdown();}});
 win.on('page-title-updated',event=>event.preventDefault());win.webContents.setWindowOpenHandler(()=>({action:'deny'}));win.webContents.on('will-navigate',(event,url)=>{if(url!=='app://minidayz/mdz-cangshu-v233/index.html')event.preventDefault();});
 win.webContents.on('before-input-event',(event,input)=>{if(input.type!=='keyDown')return;if(input.key==='F2'){event.preventDefault();if(!input.isAutoRepeat)openSettings();}else if(input.key==='F11'||(input.alt&&input.key==='Enter')){event.preventDefault();win.setFullScreen(!win.isFullScreen());}});
 win.webContents.on('did-finish-load',()=>{applyKeyboard().catch(error=>console.error('Keyboard adapter failed:',error));});
 if(config.effective.startFullscreen)win.setFullScreen(true);
 await win.loadURL('app://minidayz/mdz-cangshu-v233/index.html');
 if(process.argv.includes('--dev'))win.webContents.openDevTools({mode:'detach'});
 if(config.effective.autoBackup)setTimeout(()=>{if(!shutting)saves.backup('auto').catch(error=>console.error('Startup backup failed:',error.message));},4000).unref();
}
function openSettings(){if(settings&&!settings.isDestroyed()){settings.show();settings.focus();return;}settings=new BrowserWindow({width:820,height:850,minWidth:680,minHeight:600,title:'MiniDayZ Cangshu PC — 设置',autoHideMenuBar:true,webPreferences:{preload:path.join(__dirname,'settings/preload.js'),partition:'desktop-settings',nodeIntegration:false,contextIsolation:true,sandbox:true}});settings.setMenu(null);settings.on('closed',()=>settings=null);settings.webContents.setWindowOpenHandler(()=>({action:'deny'}));settings.webContents.on('will-navigate',e=>e.preventDefault());settings.loadURL(settingsURL);}
async function chooseExport(){if(testMode()&&process.env.MINIDAYZ_TEST_EXPORT_PATH)return process.env.MINIDAYZ_TEST_EXPORT_PATH;const result=await dialog.showSaveDialog(settings,{title:'导出存档',defaultPath:`MiniDayZ-Cangshu-${new Date().toISOString().replace(/[:.]/g,'-')}.mdczsave`,filters:[{name:'MiniDayZ Cangshu Save',extensions:['mdczsave']}]});return result.canceled?null:result.filePath;}
async function chooseImport(){if(testMode()&&process.env.MINIDAYZ_TEST_IMPORT_PATH)return process.env.MINIDAYZ_TEST_IMPORT_PATH;const result=await dialog.showOpenDialog(settings,{title:'导入存档',properties:['openFile'],filters:[{name:'MiniDayZ Cangshu Save',extensions:['mdczsave']}]});return result.canceled?null:result.filePaths[0];}
function registerIPC(){ipcMain.handle('desktop-settings',async(event,method,payload)=>{
 if(!settings||event.sender!==settings.webContents||event.senderFrame!==settings.webContents.mainFrame||event.senderFrame.url!==settingsURL)throw Error('Unauthorized settings IPC');
 try{let result;switch(method){
 case 'getSettings':result={...config.get(),gameVersion:'2.3.3',desktopVersion:app.getVersion(),offline:true,backupPath:saves.dir};break;
 case 'saveSettings':result=config.save(payload);await applyKeyboard();break;
 case 'resetControls':result=config.save({...config.user,keybindings:defaults.keybindings});await applyKeyboard();break;
 case 'exportSave':{const file=await chooseExport();result=file?await saves.exportTo(file):{canceled:true};break;}
 case 'importSave':{const file=await chooseImport();if(!file){result={canceled:true};break;}const valid=saves.validateFile(file);let allowUnknown=false;if(valid.compatibility==='unknown-game-version'){const confirm=await dialog.showMessageBox(settings,{type:'warning',buttons:['取消','确认导入'],defaultId:0,cancelId:0,message:`此存档来自游戏 ${valid.manifest.gameVersion}。兼容性未知，导入前会备份当前存档。`});if(confirm.response!==1){result={canceled:true};break;}allowUnknown=true;}result=await saves.importFrom(file,{allowUnknown});break;}
 case 'backupNow':result=await saves.backup('manual');break;
 case 'listBackups':result=saves.list();break;
 case 'restoreBackup':if(typeof payload!=='string'||payload.length>180)throw Error('Invalid backup name');result=await saves.restore(payload);break;
 case 'openSaveFolder':case 'openBackupFolder':{const directory=method==='openSaveFolder'?app.getPath('userData'):saves.dir;fs.mkdirSync(directory,{recursive:true});if(testMode()&&process.env.MINIDAYZ_TEST_NO_SHELL==='1'){result={opened:directory};break;}const error=await shell.openPath(directory);if(error)throw Error(error);result={opened:directory};break;}
 default:throw Error('Unknown settings operation');}return {ok:true,result};}catch(error){return {ok:false,error:error.message};}
 });}
async function shutdown(){if(shutting)return;shutting=true;try{await saves?.pending;if(config?.effective.autoBackup)await saves.backup('auto');session.defaultSession.flushStorageData();}catch(error){dialog.showErrorBox('存档备份失败',`未能完成关闭备份：${error.message}`);}finally{canQuit=true;storage?.close();app.quit();}}
if(!app.requestSingleInstanceLock())app.quit();else app.whenReady().then(async()=>{
 require('./protocol')(protocol);session.defaultSession.webRequest.onBeforeRequest((details,callback)=>callback({cancel:/^(https?|wss?):/.test(details.url)}));
 config=new ConfigStore(app.getPath('userData'),path.join(process.env.PORTABLE_EXECUTABLE_DIR||path.dirname(app.getPath('exe')),'desktop-config.json'));
 storage=new StorageBridge();saves=new SaveManager({userData:app.getPath('userData'),desktopVersion:app.getVersion(),storage,config,getGame:()=>game,closeGame:async()=>{if(game&&!game.isDestroyed())game.destroy();},reopenGame:createGame});registerIPC();
 try{await saves.recover();await createGame();}catch(error){dialog.showErrorBox('存档恢复失败',error.message);openSettings();}
 app.on('second-instance',()=>{if(game){if(game.isMinimized())game.restore();game.focus();}else openSettings();});
});
app.on('before-quit',event=>{if(!canQuit&&saves){event.preventDefault();shutdown();}});
app.on('window-all-closed',()=>{if(!shutting)shutdown();});
