const {_electron:electron}=require('playwright');
const fs=require('fs'),path=require('path');
const report=name=>path.join('reports',(process.env.MINIDAYZ_REPORT_PREFIX||'phase2-')+name);
(async()=>{
 const application=await electron.launch({args:['.'],env:{...process.env,MINIDAYZ_OFFLINE_TEST:'1',MINIDAYZ_TEST_USERDATA:path.resolve(report('offline-profile'))}});
 const page=await application.firstWindow(),errors=[],requests=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()+': '+r.failure()?.errorText));page.on('request',r=>requests.push(r.url()));
 await page.waitForTimeout(30000);await page.screenshot({path:report('offline-menu.png')});
 const storage=await page.evaluate(()=>({localStorage:Object.keys(localStorage),indexedDB:typeof indexedDB}));
 const externalRequests=requests.filter(u=>/^https?:/.test(u));const passed=!errors.length&&!externalRequests.length;fs.writeFileSync(report('offline-test.json'),JSON.stringify({passed,errors,externalRequests,storage,scope:'Startup only; actual offline gameplay, save and restart are covered by phase2-gameplay-test.json'},null,2));console.log('Offline startup:',passed);
 await application.close();if(!passed)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
