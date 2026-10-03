'use strict';
const {BrowserWindow,session}=require('electron');
const archive=require('./save-archive');
async function readSnapshot(schemas){
 const existing=await indexedDB.databases(),indexed=[];
 for(const [name,schema]of Object.entries(schemas)){
  const info=existing.find(d=>d.name===name);let entries=[];
  if(info){if(info.version!==schema.version)throw Error('不支持的原数据库版本');
   entries=await new Promise((resolve,reject)=>{const req=indexedDB.open(name);req.onerror=()=>reject(req.error);req.onsuccess=()=>{const db=req.result;if(!db.objectStoreNames.contains(schema.store)){db.close();reject(Error('缺少原存档 store'));return;}const tx=db.transaction(schema.store,'readonly'),s=tx.objectStore(schema.store);if(s.keyPath!==schema.keyPath||s.autoIncrement||s.indexNames.length){db.close();reject(Error('原存档 schema 不兼容'));return;}let keys,values;const k=s.getAllKeys(),v=s.getAll();k.onsuccess=()=>keys=k.result;v.onsuccess=()=>values=v.result;tx.oncomplete=()=>{db.close();resolve(keys.map((key,i)=>({key,value:values[i]})).sort((a,b)=>a.key<b.key?-1:a.key>b.key?1:0));};tx.onerror=()=>{db.close();reject(tx.error);};};});}
  indexed.push({name,version:schema.version,stores:[{name:schema.store,keyPath:schema.keyPath,autoIncrement:false,entries}]});
 }
 return {indexedDB:indexed,localStorage:Object.fromEntries(Object.keys(localStorage).sort().map(k=>[k,localStorage.getItem(k)]))};
}
async function writeSnapshot(snapshot){
 for(const data of snapshot.indexedDB){await new Promise((resolve,reject)=>{const req=indexedDB.open(data.name,data.version);req.onblocked=()=>reject(Error('数据库正在被另一页面使用'));req.onerror=()=>reject(req.error);req.onupgradeneeded=()=>{const db=req.result,s=data.stores[0];if(req.oldVersion!==0){req.transaction.abort();return;}db.createObjectStore(s.name,{keyPath:s.keyPath,autoIncrement:false});if(data.name.startsWith('localforage_'))db.createObjectStore('local-forage-detect-blob-support');};req.onsuccess=()=>{const db=req.result,schema=data.stores[0];if(!db.objectStoreNames.contains(schema.name)){db.close();reject(Error('原 store 缺失'));return;}const tx=db.transaction(schema.name,'readwrite'),s=tx.objectStore(schema.name);if(s.keyPath!==schema.keyPath||s.autoIncrement||s.indexNames.length){tx.abort();db.close();reject(Error('schema 不匹配'));return;}s.clear();for(const row of schema.entries)if(s.keyPath===null)s.put(row.value,row.key);else s.put(row.value);tx.oncomplete=()=>{db.close();resolve();};tx.onabort=tx.onerror=()=>{db.close();reject(tx.error||Error('存档写入失败'));};};});}
 localStorage.clear();for(const [key,value]of Object.entries(snapshot.localStorage))localStorage.setItem(key,value);
 return true;
}
class StorageBridge{
 async window(){if(!this.worker||this.worker.isDestroyed()){this.worker=new BrowserWindow({show:false,webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true,backgroundThrottling:false}});this.worker.webContents.setWindowOpenHandler(()=>({action:'deny'}));this.worker.webContents.on('will-navigate',e=>e.preventDefault());await this.worker.loadURL('app://minidayz/mdz-cangshu-v233/desktop-storage.html');}return this.worker;}
 async read(){session.defaultSession.flushStorageData();const w=await this.window();const snapshot=await w.webContents.executeJavaScript(`(${readSnapshot.toString()})(${JSON.stringify(archive.allowed)})`);return archive.validateSnapshot(snapshot);}
 async write(snapshot){archive.validateSnapshot(snapshot);const w=await this.window();await w.webContents.executeJavaScript(`(${writeSnapshot.toString()})(${JSON.stringify(snapshot)})`);session.defaultSession.flushStorageData();}
 close(){if(this.worker&&!this.worker.isDestroyed())this.worker.destroy();}
}
module.exports={StorageBridge};
