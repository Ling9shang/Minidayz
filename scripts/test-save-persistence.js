const {_electron:electron}=require('playwright');const path=require('path'),fs=require('fs');
const options={args:['.'],env:{...process.env,MINIDAYZ_TEST_USERDATA:path.resolve('reports/test-profile')}};
(async()=>{
 let app=await electron.launch(options),page=await app.firstWindow();await page.waitForLoadState();
 const token=Date.now().toString();
 await page.evaluate(async token=>{localStorage.setItem('__desktop_persistence_test',token);await new Promise((resolve,reject)=>{const request=indexedDB.open('__desktop_persistence_test',1);request.onupgradeneeded=()=>request.result.createObjectStore('test');request.onerror=()=>reject(request.error);request.onsuccess=()=>{const db=request.result,transaction=db.transaction('test','readwrite');transaction.objectStore('test').put(token,'token');transaction.oncomplete=()=>{db.close();resolve();};};});},token);
 await app.close();app=await electron.launch(options);page=await app.firstWindow();await page.waitForLoadState();
 const result=await page.evaluate(async()=>({localStorage:localStorage.getItem('__desktop_persistence_test'),indexedDB:await new Promise((resolve,reject)=>{const request=indexedDB.open('__desktop_persistence_test',1);request.onerror=()=>reject(request.error);request.onsuccess=()=>{const db=request.result,get=db.transaction('test').objectStore('test').get('token');get.onsuccess=()=>{db.close();resolve(get.result);};};})}));
 await app.close();const passed=result.localStorage===token&&result.indexedDB===token;fs.writeFileSync('reports/save-persistence.json',JSON.stringify({passed,result,scope:'Storage restart test; does not prove in-game Save and Exit'},null,2));console.log('Storage persistence:',passed);if(!passed)process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1;});
