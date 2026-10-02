const fs=require('fs');
const {launch,ready,newGame,click}=require('./desktop-test-helpers');
(async()=>{
 const file='release/desktop-config.json', existed=fs.existsSync(file), previous=existed?fs.readFileSync(file):null;
 let app;try{
  fs.writeFileSync(file,JSON.stringify({keyboardControls:false}));
  process.env.MINIDAYZ_TEST_PORTABLE='1';delete process.env.MINIDAYZ_KEYBOARD_CONTROLS;
  app=await launch('phase2-config-disabled-profile');const page=await ready(app);
  const injected=await page.evaluate(()=>!!window.__MINIDAYZ_PC_CONTROLS);
  await newGame(page);await click(page,30,730);
  const inventory=await page.evaluate(()=>cr_getC2Runtime().tD.find(v=>v.name==='Inventory_opened').data);
  await page.screenshot({path:'reports/phase2-config-disabled-inventory.png'});
    await click(page,30,730);
  const target=await page.evaluate(()=>{const r=cr_getC2Runtime(),p=r.S[181].q[0],rect=r.canvas.getBoundingClientRect();return {before:{x:p.x,y:p.y},x:rect.x+p.C.Ra(p.x+120,p.y,true),y:rect.y+p.C.Ra(p.x+120,p.y,false)};});
  await page.mouse.click(target.x,target.y);await page.waitForTimeout(800);
  const after=await page.evaluate(()=>{const p=cr_getC2Runtime().S[181].q[0];return {x:p.x,y:p.y};});
  const mouseMoves=Math.hypot(after.x-target.before.x,after.y-target.before.y)>5;
  const report={passed:!injected&&inventory===1&&mouseMoves,portable:true,configuration:'EXE-side desktop-config.json',injected,inventory,mouseMoves,mouseEvidence:{target,after}};
  fs.writeFileSync('reports/phase2-config-disabled-test.json',JSON.stringify(report,null,2));console.log(report);if(!report.passed)process.exitCode=1;
 }finally{if(app)await app.close();if(existed)fs.writeFileSync(file,previous);else fs.unlinkSync(file);}
})().catch(e=>{console.error(e);process.exitCode=1});



