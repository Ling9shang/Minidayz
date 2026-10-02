const fs=require('fs'),path=require('path');
const {_electron:electron,chromium}=require('playwright');
async function launch(profile,{disabled=false,dev=false}={}){
 const env={...process.env,MINIDAYZ_TEST_USERDATA:path.resolve('reports',profile)};
 if(disabled)env.MINIDAYZ_KEYBOARD_CONTROLS='false';
 if(!process.env.MINIDAYZ_TEST_PORTABLE&&!process.env.MINIDAYZ_TEST_NPM_DEV)return electron.launch({args:dev?['.','--dev']:['.'],env});
 const port=9235;
 const executable=process.env.MINIDAYZ_TEST_PORTABLE==='1'?'release/MiniDayZ-Cangshu-v2.3.3-x64.exe':process.env.MINIDAYZ_TEST_PORTABLE;
 const child=process.env.MINIDAYZ_TEST_NPM_DEV?require('child_process').spawn(process.execPath,[process.env.npm_execpath||path.join(path.dirname(process.execPath),'node_modules/npm/bin/npm-cli.js'),'run','dev','--',`--remote-debugging-port=${port}`],{env,windowsHide:true}):require('child_process').spawn(path.resolve(executable),[`--remote-debugging-port=${port}`],{env,windowsHide:true});
 child.stdout?.on('data',()=>{});child.stderr?.on('data',()=>{});
 let browser;for(let i=0;i<45;i++){try{browser=await chromium.connectOverCDP(`http://127.0.0.1:${port}`);break;}catch{await new Promise(r=>setTimeout(r,1000));}}
 if(!browser)throw Error('Desktop launch timed out');
 return {firstWindow:async()=>browser.contexts()[0].pages().find(p=>p.url().startsWith('app://'))||browser.contexts()[0].pages()[0],windows:async()=>browser.contexts()[0].pages(),close:async()=>{const session=await browser.newBrowserCDPSession();await Promise.race([session.send('Browser.close').catch(()=>{}),new Promise(r=>setTimeout(r,2000))]);await browser.close();await new Promise(r=>setTimeout(r,1000));}};
}
async function ready(app){await new Promise(r=>setTimeout(r,20000));return (await app.windows()).find(p=>p.url().startsWith('app://'))||await app.firstWindow();}
async function click(page,x,y,wait=500){const rect=await page.locator('#c2canvas').boundingBox();await page.mouse.click(rect.x+x*rect.width/1024,rect.y+y*rect.height/768);await page.waitForTimeout(wait);}
async function newGame(page){await click(page,512,380,2000);await click(page,430,320,2000);await click(page,590,445,14000);}
async function readSave(page){return page.evaluate(async()=>new Promise((resolve,reject)=>{const req=indexedDB.open('_C2SaveStates');req.onerror=()=>reject(req.error);req.onsuccess=()=>{const db=req.result;if(!db.objectStoreNames.contains('saves')){db.close();resolve(null);return;}const get=db.transaction('saves').objectStore('saves').get('mysave');get.onsuccess=()=>{db.close();resolve(get.result?.data||null);};get.onerror=()=>reject(get.error);};}));}
module.exports={launch,ready,click,newGame,readSave};
