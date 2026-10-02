const {_electron:electron}=require('playwright');
const fs=require('fs'),path=require('path');
(async()=>{
 const application=await electron.launch({args:['.'],env:{...process.env,MINIDAYZ_OFFLINE_TEST:'1',MINIDAYZ_TEST_USERDATA:path.resolve('reports/offline-profile')}});
 const page=await application.firstWindow(),errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()+': '+r.failure()?.errorText));page.on('request',r=>requests.push(r.url()));
 await page.waitForTimeout(30000);await page.screenshot({path:'reports/offline-menu.png'});
 const storage=await page.evaluate(()=>({localStorage:Object.keys(localStorage),indexedDB:typeof indexedDB}));
 fs.writeFileSync('reports/offline-test.json',JSON.stringify({errors,externalRequests:requests.filter(u=>/^https?:/.test(u)),storage,scope:'Startup screenshot only; gameplay requires further verification'},null,2));
 await application.close();if(errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
