'use strict';
// Deliberately narrow ZIP dialect: three stored entries; no filesystem extraction.
const crypto=require('crypto');
const LIMIT=64*1024*1024;
const names=['manifest.json','storage/indexeddb/records.json','storage/localstorage/values.json'];
const table=Array.from({length:256},(_,n)=>{for(let k=0;k<8;k++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0;});
const crc=b=>{let n=0xffffffff;for(const v of b)n=table[(n^v)&255]^(n>>>8);return (n^0xffffffff)>>>0;};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const stable=x=>JSON.stringify(x,(_,v)=>v&&typeof v==='object'&&!Array.isArray(v)?Object.fromEntries(Object.keys(v).sort().map(k=>[k,v[k]])):v);
function zip(files){let offset=0;const local=[],central=[];for(const [name,buf]of Object.entries(files)){const n=Buffer.from(name),h=Buffer.alloc(30);h.writeUInt32LE(0x04034b50);h.writeUInt16LE(20,4);h.writeUInt32LE(crc(buf),14);h.writeUInt32LE(buf.length,18);h.writeUInt32LE(buf.length,22);h.writeUInt16LE(n.length,26);local.push(h,n,buf);const c=Buffer.alloc(46);c.writeUInt32LE(0x02014b50);c.writeUInt16LE(20,4);c.writeUInt16LE(20,6);c.writeUInt32LE(crc(buf),16);c.writeUInt32LE(buf.length,20);c.writeUInt32LE(buf.length,24);c.writeUInt16LE(n.length,28);c.writeUInt32LE(offset,42);central.push(c,n);offset+=h.length+n.length+buf.length;}const size=central.reduce((n,b)=>n+b.length,0),end=Buffer.alloc(22);end.writeUInt32LE(0x06054b50);end.writeUInt16LE(Object.keys(files).length,8);end.writeUInt16LE(Object.keys(files).length,10);end.writeUInt32LE(size,12);end.writeUInt32LE(offset,16);return Buffer.concat([...local,...central,end]);}
function unzip(buf){
 if(!Buffer.isBuffer(buf)||buf.length>LIMIT||buf.length<22)throw Error('Save file is corrupted: archive size');
 const end=buf.length-22;if(buf.readUInt32LE(end)!==0x06054b50||buf.readUInt16LE(end+4)||buf.readUInt16LE(end+6)||buf.readUInt16LE(end+20))throw Error('Save file is corrupted: ZIP envelope');
 const count=buf.readUInt16LE(end+10),centralSize=buf.readUInt32LE(end+12),start=buf.readUInt32LE(end+16);
 if(count!==3||buf.readUInt16LE(end+8)!==count||start+centralSize!==end)throw Error('Save file is corrupted: entries');
 let cursor=start,localEnd=0;const files={};
 for(let i=0;i<count;i++){
  if(cursor+46>end||buf.readUInt32LE(cursor)!==0x02014b50)throw Error('Invalid ZIP directory');
  const flags=buf.readUInt16LE(cursor+8),method=buf.readUInt16LE(cursor+10),sum=buf.readUInt32LE(cursor+16),size=buf.readUInt32LE(cursor+20),rawSize=buf.readUInt32LE(cursor+24),nameLen=buf.readUInt16LE(cursor+28),extra=buf.readUInt16LE(cursor+30),comment=buf.readUInt16LE(cursor+32),attrs=buf.readUInt32LE(cursor+38),offset=buf.readUInt32LE(cursor+42);
  if(cursor+46+nameLen+extra+comment>end)throw Error('Invalid ZIP bounds');
  const name=buf.subarray(cursor+46,cursor+46+nameLen).toString('utf8');
  if(!names.includes(name)||Object.hasOwn(files,name)||flags||method||extra||comment||size!==rawSize||size>LIMIT||((attrs>>>16)&0xf000)===0xa000||offset!==localEnd)throw Error('Unsafe or unsupported ZIP entry');
  if(offset+30>start||buf.readUInt32LE(offset)!==0x04034b50||buf.readUInt16LE(offset+6)!==flags||buf.readUInt16LE(offset+8)!==method||buf.readUInt32LE(offset+14)!==sum||buf.readUInt32LE(offset+18)!==size||buf.readUInt32LE(offset+22)!==size||buf.readUInt16LE(offset+26)!==nameLen||buf.readUInt16LE(offset+28)!==0)throw Error('Invalid ZIP local header');
  const dataStart=offset+30+nameLen;if(dataStart+size>start||buf.subarray(offset+30,dataStart).toString('utf8')!==name)throw Error('Invalid ZIP entry bounds');
  const data=buf.subarray(dataStart,dataStart+size);if(crc(data)!==sum)throw Error('Save file is corrupted: CRC');files[name]=data;localEnd=dataStart+size;cursor+=46+nameLen+extra+comment;
 }
 if(cursor!==end||localEnd!==start)throw Error('Invalid ZIP trailing data');return files;
}
const allowed={'_C2SaveStates_mdz-cangshu-v233':{version:1,store:'saves',keyPath:'slot'},'localforage_mdz-cangshu-v233':{version:2,store:'keyvaluepairs',keyPath:null}};
function jsonValue(v,depth=0){if(depth>100)throw Error('Storage nesting too deep');if(v===null||typeof v==='string'||typeof v==='boolean')return;if(typeof v==='number'&&Number.isFinite(v))return;if(Array.isArray(v)){for(const x of v)jsonValue(x,depth+1);return;}if(v&&typeof v==='object'&&Object.getPrototypeOf(v)===Object.prototype){for(const x of Object.values(v))jsonValue(x,depth+1);return;}throw Error('Unsupported non-JSON storage value');}
function validateSnapshot(snapshot){
 jsonValue(snapshot);
 if(!snapshot||!Array.isArray(snapshot.indexedDB)||snapshot.indexedDB.length!==2||!snapshot.localStorage||typeof snapshot.localStorage!=='object'||Array.isArray(snapshot.localStorage))throw Error('Invalid storage snapshot');
 const seen=new Set();for(const db of snapshot.indexedDB){const schema=allowed[db.name];if(!schema||seen.has(db.name)||db.version!==schema.version||!Array.isArray(db.stores)||db.stores.length!==1)throw Error('Unsupported database schema');seen.add(db.name);const store=db.stores[0];if(store.name!==schema.store||store.keyPath!==schema.keyPath||store.autoIncrement!==false||!Array.isArray(store.entries))throw Error('Unsupported store schema');const keys=new Set();for(const entry of store.entries){if(!entry||typeof entry.key!=='string'||keys.has(entry.key)||!Object.hasOwn(entry,'value'))throw Error('Invalid database record');keys.add(entry.key);if(schema.keyPath==='slot'){const v=entry.value;if(!v||v.slot!==entry.key||typeof v.data!=='string')throw Error('Invalid C2 save record');const save=JSON.parse(v.data);if(!save.c2save||!save.types||!save.system||!save.rt||!save.layouts||!save.events)throw Error('Invalid C2 save content');}}}
 for(const [k,v]of Object.entries(snapshot.localStorage))if(k.length>4096||typeof v!=='string')throw Error('Invalid localStorage record');
 if(Buffer.byteLength(stable(snapshot))>LIMIT)throw Error('Storage snapshot too large');return snapshot;
}
function pack(snapshot,desktopVersion,source){validateSnapshot(snapshot);const idb=Buffer.from(stable(snapshot.indexedDB)),ls=Buffer.from(stable(snapshot.localStorage));const manifest={format:1,game:'MiniDayZ Cangshu',gameVersion:'2.3.3',desktopVersion,createdAt:new Date().toISOString(),source,storage:{indexedDB:true,localStorage:true},files:{[names[1]]:{size:idb.length,sha256:hash(idb)},[names[2]]:{size:ls.length,sha256:hash(ls)}},logicalSaveHash:hash(stable(snapshot))};const buffer=zip({[names[0]]:Buffer.from(JSON.stringify(manifest,null,2)),[names[1]]:idb,[names[2]]:ls});if(buffer.length>LIMIT)throw Error('Save archive too large');return {buffer,manifest};}
function unpack(buffer){const files=unzip(buffer),manifest=JSON.parse(files[names[0]]);if(manifest.format!==1||manifest.game!=='MiniDayZ Cangshu'||typeof manifest.gameVersion!=='string'||typeof manifest.desktopVersion!=='string'||!Number.isFinite(Date.parse(manifest.createdAt))||!manifest.storage?.indexedDB||!manifest.storage?.localStorage)throw Error('Invalid save manifest');for(const n of names.slice(1)){const f=manifest.files?.[n];if(f?.size!==files[n].length||f.sha256!==hash(files[n]))throw Error('Save file is corrupted: SHA-256');}const snapshot=validateSnapshot({indexedDB:JSON.parse(files[names[1]]),localStorage:JSON.parse(files[names[2]])});if(hash(stable(snapshot))!==manifest.logicalSaveHash)throw Error('Save file is corrupted: logical hash');return {manifest,snapshot,compatibility:manifest.gameVersion==='2.3.3'?'same-game-version':'unknown-game-version'};}
module.exports={pack,unpack,zip,unzip,hash,stable,allowed,LIMIT,validateSnapshot};
