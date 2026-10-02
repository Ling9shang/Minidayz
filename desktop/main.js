const {app,BrowserWindow,protocol,session}=require('electron');
const path=require('path');
const fs=require('fs');
const config={...require('./config.json')};
const externalConfig=path.join(process.env.PORTABLE_EXECUTABLE_DIR||path.dirname(app.getPath('exe')),'desktop-config.json');
if(fs.existsSync(externalConfig)){try{Object.assign(config,JSON.parse(fs.readFileSync(externalConfig,'utf8').replace(/^\uFEFF/,'')));}catch(error){console.warn('Invalid desktop-config.json; using packaged configuration:',error.message);}}
if(process.env.MINIDAYZ_KEYBOARD_CONTROLS==='false')config.keyboardControls=false;
protocol.registerSchemesAsPrivileged([{scheme:'app',privileges:{standard:true,secure:true,supportFetchAPI:true,corsEnabled:true}}]);
app.setPath('userData',process.env.MINIDAYZ_TEST_USERDATA||path.join(app.getPath('appData'),'MiniDayZ Cangshu PC'));
if(!app.requestSingleInstanceLock())app.quit();
else app.whenReady().then(()=>{
 require('./protocol')(protocol);
 session.defaultSession.webRequest.onBeforeRequest((details,callback)=>callback({cancel:/^(https?|wss?):/.test(details.url)}));
 const win=new BrowserWindow({width:1280,height:960,minWidth:800,minHeight:600,title:'MiniDayZ+ 仓鼠版 v2.3.3',autoHideMenuBar:true,webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});
 win.setMenu(null);
 app.on('second-instance',()=>{if(win.isMinimized())win.restore();win.focus();});
 win.on('page-title-updated',event=>event.preventDefault());
 win.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 win.webContents.on('will-navigate',(event,url)=>{if(!url.startsWith('app://minidayz/'))event.preventDefault();});
 win.webContents.on('before-input-event',(event,input)=>{if(input.type==='keyDown'&&(input.key==='F11'||(input.alt&&input.key==='Enter'))){event.preventDefault();win.setFullScreen(!win.isFullScreen());}});
 if(config.keyboardControls)win.webContents.on('did-finish-load',()=>{
  const code=fs.readFileSync(path.join(__dirname,'injections/keyboard-controls.js'),'utf8');
  win.webContents.executeJavaScript('window.__MINIDAYZ_PC_CONFIG='+JSON.stringify({dev:process.argv.includes('--dev')})+';'+code).catch(error=>console.error('Keyboard adapter failed:',error));
 });
 win.loadURL('app://minidayz/mdz-cangshu-v233/index.html');
 if(process.argv.includes('--dev'))win.webContents.openDevTools({mode:'detach'});
});
app.on('window-all-closed',()=>app.quit());
app.on('before-quit',()=>{if(app.isReady())session.defaultSession.flushStorageData();});
