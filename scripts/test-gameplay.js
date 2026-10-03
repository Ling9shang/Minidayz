const {_electron:electron}=require('playwright'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const report=name=>path.join('reports',(process.env.MINIDAYZ_REPORT_PREFIX||'phase3-')+name);
async function launch(options){
 if(!process.env.MINIDAYZ_TEST_PORTABLE)return electron.launch(options);
 return require('./desktop-test-helpers').launch(path.basename(options.env.MINIDAYZ_TEST_USERDATA));
}
(async()=>{
 const options={executablePath:process.env.MINIDAYZ_TEST_EXECUTABLE||undefined,args:process.env.MINIDAYZ_TEST_EXECUTABLE?[]:['.'],env:{...process.env,MINIDAYZ_TEST_USERDATA:path.resolve(report('sequential-gameplay-profile')),MINIDAYZ_OFFLINE_TEST:'1'}};
 let app=await launch(options),page=await app.firstWindow(),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>errors.push(r.url()));
 await page.waitForTimeout(20000);
 async function click(x,y,delay=2000){const rect=await page.locator('#c2canvas').boundingBox();await page.mouse.click(rect.x+x*rect.width/1024,rect.y+y*rect.height/768);await page.waitForTimeout(delay);}
 await click(512,380);await click(430,320);await click(590,445,7000);await page.screenshot({path:report('sequential-map.png')});
 await click(600,420);await click(30,730);await page.screenshot({path:report('sequential-inventory.png')});await click(30,730);await click(1000,60);await click(512,240,12000);await page.screenshot({path:report('sequential-saved-menu.png')});
 async function readSave(){return page.evaluate(async()=>{let save=localStorage.getItem('__c2save_mysave');if(!save){const names=await indexedDB.databases();const name=names.find(n=>n.name.startsWith('_C2SaveStates'))?.name;if(name)save=await new Promise(resolve=>{const request=indexedDB.open('_C2SaveStates');request.onsuccess=()=>{const db=request.result;if(!db.objectStoreNames.contains('saves')){db.close();resolve(null);return;}const get=db.transaction('saves').objectStore('saves').get('mysave');get.onsuccess=()=>{db.close();resolve(get.result?.data||null);};get.onerror=()=>resolve(null);};request.onerror=()=>resolve(null);});}return {save,flag:localStorage.getItem('localforage/gamesav_v7')};});}
 const before=await readSave();
 await app.close();app=await launch(options);page=await app.firstWindow();await page.waitForTimeout(20000);
 const after=await readSave();await page.screenshot({path:report('sequential-restarted-menu.png')});
 await click(512,350,8000);const continued=await page.evaluate(()=>cr_getC2Runtime().wa.name==='Map'&&cr_getC2Runtime().S[181].q.length===1);await page.screenshot({path:report('sequential-resumed-map.png')});await app.close();
 const hash=s=>s?crypto.createHash('sha256').update(s).digest('hex'):null;
 const criticalErrors=errors.filter(e=>!e.endsWith('/media/menu_click.ogg'));
 const result={portable:!!process.env.MINIDAYZ_TEST_PORTABLE,continued,errors,criticalErrors,knownUpstream404:'media/menu_click.ogg is also HTTP 404 on the public original',saveBytes:before.save?.length||0,beforeHash:hash(before.save),afterHash:hash(after.save),beforeFlag:before.flag,afterFlag:after.flag,passed:continued&&!!before.save&&before.save===after.save&&before.flag===after.flag};fs.writeFileSync(report('gameplay-test.json'),JSON.stringify(result,null,2));console.log(result);if(!result.passed||criticalErrors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
