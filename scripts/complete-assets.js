const fs=require('fs'),path=require('path');
(async()=>{
 const urls=JSON.parse(fs.readFileSync('reports/observed-requests.json','utf8'));
 const rows=JSON.parse(fs.readFileSync('reports/network-resources.json','utf8'));
 let cursor=0;
 await Promise.all(Array.from({length:8},async()=>{while(cursor<urls.length){const url=urls[cursor++],u=new URL(url);if(u.hostname!=='moyu-camp.info')continue;let relative=decodeURIComponent(u.pathname).replace(/^\/mdz-cangshu-v233\/?/,'')||'index.html';if(relative.includes('..'))continue;const file=path.join('game',relative);if(fs.existsSync(file)&&fs.statSync(file).size)continue;for(let retry=0;retry<3;retry++){try{const response=await fetch(url,{signal:AbortSignal.timeout(60000)});if(!response.ok)throw Error('HTTP '+response.status);const body=Buffer.from(await response.arrayBuffer());fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,body);rows.push({url,status:response.status,contentType:response.headers.get('content-type'),size:body.length,localPath:file,category:'A',source:'Browser observed request; fetch recovery'});break;}catch(e){if(retry===2)console.error(url,e.message);}}}}));
 fs.writeFileSync('reports/network-resources.json',JSON.stringify(rows,null,2));console.log('Resource recovery complete');
})().catch(e=>{console.error(e);process.exitCode=1;});
