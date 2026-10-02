const fs=require('fs');const {launch,ready,click,newGame}=require('./desktop-test-helpers');
(async()=>{
 const suffix=process.env.MINIDAYZ_TEST_PORTABLE?'portable':process.env.MINIDAYZ_TEST_NPM_DEV?'dev':'electron';
 const app=await launch(`phase2-keyboard-${suffix}-profile`,{dev:true}),out={environment:suffix,checks:[],errors:[],externalRequests:[]};
 try{
  const page=await ready(app);page.on('pageerror',e=>out.errors.push(e.message));page.on('request',r=>{if(/^https?:/.test(r.url()))out.externalRequests.push(r.url());});
  const snap=()=>page.evaluate(()=>__MINIDAYZ_PC_CONTROLS.snapshot());
  const check=(name,pass,evidence)=>out.checks.push({name,pass,evidence});
  for(const k of ['w','a','s','d','Space','Tab','e','r','1','2','3','q'])await page.keyboard.press(k);
  check('main menu isolation',(await snap()).state==='MENU',await snap());
  await newGame(page);check('new game',(await snap()).state==='GAMEPLAY',await snap());
  for(const ks of [['w'],['a'],['s'],['d'],['w','a'],['w','d'],['s','a'],['s','d'],['ArrowUp'],['ArrowLeft'],['ArrowDown'],['ArrowRight']]){
   const before=await snap();for(const k of ks)await page.keyboard.down(k);await page.waitForTimeout(350);const held=await snap();for(const k of ks)await page.keyboard.up(k);await page.waitForTimeout(60);const released=await snap();await page.waitForTimeout(200);const stopped=await snap();
   const dx=held.position.x-before.position.x,dy=held.position.y-before.position.y;
   const up=ks.includes('w')||ks.includes('ArrowUp'),down=ks.includes('s')||ks.includes('ArrowDown'),left=ks.includes('a')||ks.includes('ArrowLeft'),right=ks.includes('d')||ks.includes('ArrowRight');
   check(ks.join('+'),(!up||dy<-4)&&(!down||dy>4)&&(!left||dx<-4)&&(!right||dx>4),{dx,dy});
   check(ks.join('+')+' keyup stop',Math.hypot(stopped.position.x-released.position.x,stopped.position.y-released.position.y)<0.05,{released,stopped});
  }
  await page.keyboard.down('w');await page.keyboard.down('ArrowUp');await page.keyboard.up('w');await page.waitForTimeout(100);check('direction aliases',(await snap()).movement.up,await snap());await page.keyboard.up('ArrowUp');
  await page.keyboard.down('d');await page.waitForTimeout(150);await app.evaluate?.(({BrowserWindow})=>BrowserWindow.getAllWindows().find(w=>!w.webContents.getURL().startsWith('devtools:'))?.blur());await page.evaluate(()=>window.dispatchEvent(new Event('blur')));const blurred=await snap();await page.waitForTimeout(250);const afterBlur=await snap();check('window blur clears and stops',!Object.values(afterBlur.movement).some(Boolean)&&Math.hypot(afterBlur.position.x-blurred.position.x,afterBlur.position.y-blurred.position.y)<0.05,{blurred,afterBlur});await page.keyboard.up('d');
  await page.keyboard.press('Tab');await page.waitForTimeout(300);check('Tab opens inventory',(await snap()).state==='INVENTORY');const inv=await snap();await page.keyboard.down('w');await page.waitForTimeout(200);await page.keyboard.up('w');check('inventory isolation',Math.hypot((await snap()).position.x-inv.position.x,(await snap()).position.y-inv.position.y)<0.05);await page.screenshot({path:`reports/phase2-${suffix}-inventory.png`});
  await page.keyboard.press('Tab');await page.waitForTimeout(300);check('Tab closes inventory',(await snap()).state==='GAMEPLAY');
  await click(page,30,730,300);check('mouse opens inventory',(await snap()).state==='INVENTORY');await click(page,30,730,300);check('mouse closes inventory',(await snap()).state==='GAMEPLAY');
  await page.keyboard.press('Escape');await page.waitForTimeout(300);check('Esc pauses',(await snap()).state==='PAUSE');const paused=await snap();for(const k of ['w','Space','e','r','q','2'])await page.keyboard.press(k);await page.waitForTimeout(200);check('pause isolation',Math.hypot((await snap()).position.x-paused.position.x,(await snap()).position.y-paused.position.y)<0.05);await page.screenshot({path:`reports/phase2-${suffix}-pause.png`});await page.keyboard.press('Escape');await page.waitForTimeout(300);check('Esc resumes',(await snap()).state==='GAMEPLAY');
  async function controlMode(mode){
    await page.keyboard.press('Escape');await page.waitForTimeout(300);
    for(let i=0;i<3;i++){
      const current=await page.evaluate(()=>cr_getC2Runtime().tD.find(v=>v.name==='GUI_control_type').data);
      if(current===mode)break;
      const p=await page.evaluate(()=>{const r=cr_getC2Runtime(),o=r.S[630].q.find(o=>o.cc[0]===6);o.la();const x=(o.ka.left+o.ka.right)/2,y=(o.ka.top+o.ka.bottom)/2,b=r.canvas.getBoundingClientRect();return {x:b.x+o.C.Ra(x,y,true),y:b.y+o.C.Ra(x,y,false)};});
      await page.mouse.click(p.x,p.y);await page.waitForTimeout(850);
    }
    await page.keyboard.press('Escape');await page.waitForTimeout(300);
  }
  await controlMode(2);const legacyBefore=await snap();await page.keyboard.down('d');await page.waitForTimeout(350);await page.keyboard.up('d');const legacyAfter=await snap();check('original WASD setting compatibility',legacyAfter.position.x-legacyBefore.position.x>5,{legacyBefore,legacyAfter});await controlMode(0);
  await page.keyboard.press('F1');check('F1 help',await page.locator('pre').count()===1);await page.keyboard.press('F1');check('F1 closes help',await page.locator('pre').count()===0);
  if(suffix!=='portable'){await page.keyboard.press('F10');check('F10 dev overlay',await page.locator('pre').count()===1);await page.keyboard.press('F10');}
  const slots=await page.evaluate(()=>cr_getC2Runtime().S[181].q[0].cc[3]);for(const k of ['1','2','3'])await page.keyboard.press(k);check('empty slots no-op',(await page.evaluate(()=>cr_getC2Runtime().S[181].q[0].cc[3]))===slots);
  await page.keyboard.press('Space');await page.keyboard.press('e');await page.keyboard.press('r');await page.keyboard.press('q');check('no target / no ammo actions safe',out.errors.length===0);
  await page.screenshot({path:`reports/phase2-${suffix}-movement.png`});
  out.passed=out.checks.every(c=>c.pass)&&!out.errors.length&&!out.externalRequests.length;
  fs.writeFileSync('reports/phase2-keyboard-test.json',JSON.stringify(out,null,2));fs.writeFileSync(`reports/phase2-keyboard-${suffix}-test.json`,JSON.stringify(out,null,2));console.log(out.checks.map(c=>`${c.pass?'PASS':'FAIL'} ${c.name}`).join('\n'));if(!out.passed)process.exitCode=1;
 }finally{await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
