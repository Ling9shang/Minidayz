const {chromium}=require('playwright'),{spawn}=require('child_process'),path=require('path'),fs=require('fs');
(async()=>{
 const child=spawn(path.resolve('release/MiniDayZ-Cangshu-v2.3.3-x64.exe'),['--remote-debugging-port=9233'],{windowsHide:true,env:{...process.env,MINIDAYZ_OFFLINE_TEST:'1',MINIDAYZ_TEST_USERDATA:path.resolve('reports/portable-profile')}});
 let browser;for(let i=0;i<30;i++){try{browser=await chromium.connectOverCDP('http://127.0.0.1:9233');break;}catch{await new Promise(r=>setTimeout(r,1000));}}
 if(!browser)throw Error('Portable debugger did not become available');const page=browser.contexts()[0].pages()[0];await page.waitForTimeout(20000);await page.screenshot({path:'reports/portable-menu.png'});
 fs.writeFileSync('reports/portable-test.json',JSON.stringify({passed:true,url:page.url(),launcherPid:child.pid,scope:'Actual portable EXE startup and menu screenshot'},null,2));
 const cdp=await browser.newBrowserCDPSession();await cdp.send('Browser.close').catch(()=>{});await browser.close();console.log('Portable EXE startup passed');
})().catch(e=>{console.error(e);process.exitCode=1;});
