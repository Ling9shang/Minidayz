const {chromium}=require('playwright');
const fs=require('fs'),path=require('path');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:1024,height:768}});
 const page=await context.newPage(), rows=[], pending=[],requested=new Set();
 await page.route('https://moyu-camp.info/**',async route=>{
  const u=new URL(route.request().url());let relative=decodeURIComponent(u.pathname).replace(/^\/mdz-cangshu-v233\/?/,'')||'index.html';const file=path.join('game',relative);
  if(fs.existsSync(file)&&fs.statSync(file).isFile()){
   const ext=path.extname(file),mime={'.html':'text/html','.js':'application/javascript','.png':'image/png','.ogg':'audio/ogg','.m4a':'audio/mp4','.json':'application/json'}[ext]||'application/octet-stream';await route.fulfill({status:200,contentType:mime,body:fs.readFileSync(file)});
  }else {try{const response=await fetch(u.href,{signal:AbortSignal.timeout(60000)});const body=Buffer.from(await response.arrayBuffer());if(response.ok){fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,body);}await route.fulfill({status:response.status,contentType:response.headers.get('content-type')||'application/octet-stream',body});}catch(e){await route.abort();}}
 });
 page.on('request',r=>{requested.add(r.url());fs.writeFileSync('reports/observed-requests.json',JSON.stringify([...requested],null,2));});
 page.on('response',response=>pending.push((async()=>{
  const url=response.url(),u=new URL(url),request=response.request();
  const row={url,status:response.status(),contentType:response.headers()['content-type'],method:request.method(),type:request.resourceType(),category:u.hostname==='moyu-camp.info'?'A':'unclassified',size:0,localPath:null};rows.push(row);
  if(u.hostname==='moyu-camp.info' && request.method()==='GET' && response.ok()){
   try {const body=await response.body();let relative=u.pathname.replace(/^\/mdz-cangshu-v233\/?/,'');if(!relative)relative='index.html';if(relative.includes('..'))throw Error('Unsafe path');const destination=path.join('game',relative);fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,body);row.size=body.length;row.localPath=destination;}catch(e){row.error=e.message;}
  }
  fs.writeFileSync('reports/network-resources.json',JSON.stringify(rows,null,2));
 })()));
 page.on('console',m=>console.log(m.type(),m.text()));
 for(let attempt=0;attempt<3;attempt++){try{await page.goto('https://moyu-camp.info/mdz-cangshu-v233',{waitUntil:'domcontentloaded',timeout:120000});break;}catch(e){if(attempt===2){await browser.close();throw e;}}}
 await page.waitForTimeout(60000);
 const canvas=await page.locator('#c2canvas').boundingBox();
 await page.mouse.click(canvas.x+canvas.width/2,canvas.y+canvas.height*380/768);
 await page.waitForTimeout(3000);
 await page.mouse.click(canvas.x+canvas.width*430/1024,canvas.y+canvas.height*320/768);
 await page.waitForTimeout(2000);
 await page.mouse.click(canvas.x+canvas.width*590/1024,canvas.y+canvas.height*445/768);
 await page.waitForTimeout(10000);
 await page.screenshot({path:'reports/online-menu.png'});
 await Promise.allSettled(pending);
 fs.writeFileSync('reports/network-resources.json',JSON.stringify(rows,null,2));
 fs.writeFileSync('reports/network-resources.md','# Observed browser requests\n\n| URL | Status | MIME | Bytes | Local | Category |\n|---|---|---|---|---|---|\n'+rows.map(r=>`| ${r.url} | ${r.status} | ${r.contentType} | ${r.size} | ${r.localPath||''} | ${r.category} |`).join('\n'));
 await browser.close();console.log('Captured',rows.length,'requests');
})().catch(e=>{console.error(e);process.exitCode=1;});
