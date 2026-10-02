const fs = require('fs');
const {launch, ready, newGame} = require('./desktop-test-helpers');
(async () => {
  const suffix = process.env.MINIDAYZ_TEST_PORTABLE ? 'portable' : process.env.MINIDAYZ_TEST_NPM_DEV ? 'dev' : 'electron';
  const app = await launch(`phase2-combat-${suffix}-profile`);
  const result = {
    environment: suffix,
    fixturePolicy: 'Isolated profile: original Create object and Set instance variable actions supply native weapons, ammo IDs 11/12 and 60 test rounds. A native enemy is relocated or created with default stats. Production code creates no items and writes no ammo/health/damage.',
    errors: [], externalRequests: [], steps: [], checks: []
  };
  try {
    const page = await ready(app);
    page.on('pageerror', e => result.errors.push(e.message));
    page.on('request', r => {if (/^https?:/.test(r.url())) result.externalRequests.push(r.url());});
    await newGame(page);
    const snap = () => page.evaluate(() => {
      const r = cr_getC2Runtime();
      return {
        controls: __MINIDAYZ_PC_CONTROLS.snapshot(),
        player: r.S[181].q[0].cc,
        vars: r.tD.filter(v => /reload|ammo|pickpile|pile|bb_gui|Action_menu|inventory/i.test(v.name)).map(v => ({name:v.name,data:v.data})),
        weapons: r.S[1030].q.filter(o => o.C.name === 'player_weapons').map(o => ({uid:o.uid,type:o.type.index,cc:o.cc})),
        counters: window.__combatCounters
      };
    });
    const record = async name => result.steps.push({name,after:await snap()});
    const check = (name,pass,evidence) => result.checks.push({name,pass,evidence});
    await page.evaluate(() => {
      const r=cr_getC2Runtime(), create=r.Yn;
      window.__combatCounters={melee:0};
      r.Yn=function(type){const o=create.apply(this,arguments);if(type.index===204)__combatCounters.melee++;return o;};
    });
    for (const type of [33,45,71,30,29]) {
      const item = await page.evaluate(type => {
        const r=cr_getC2Runtime(), p=r.S[181].q[0];
        const layer=Object.values(r.wa).find(v=>Array.isArray(v)&&v.some(l=>l?.name==='items_on_ground')).find(l=>l.name==='items_on_ground');
        r.Hg['108991656877317'].Ac.call(r.Bf,r.S[type],layer,p.x+12,p.y);
        const o=r.S[type].aa().q[0];
        if([30,29].includes(type)){
          const offset=o.type.ro[r.S[1033].Vf];
          r.Hg['219109209720855'].Ac.call(o,offset+1,60);
          r.Hg['420457239822843'].Ac.call(o,offset+2,type===30?11:12);
        }
        return {uid:o.uid,type,originalValues:o.cc.slice()};
      },type);
      await page.waitForTimeout(500);
      await page.keyboard.press('e');
      await page.waitForTimeout(500);
      result.steps.push({name:`E ${type}`,item,after:await snap()});
      // Clear the native pickup panel; never call pickup directly to make E pass.
      await page.evaluate(()=>{c2_callFunction('gui_clearpile',[]);c2_callFunction('Hide_sub_menu',[]);});
      await page.waitForTimeout(500);
    }
    for (const key of ['1','2','3','q','2']) {
      await page.keyboard.press(key);await page.waitForTimeout(350);await record(`key ${key}`);
    }
    await page.keyboard.press('r');await page.waitForTimeout(100);await record('initial reload begins');
    await page.waitForTimeout(3500);await record('initial native reload');
    await page.keyboard.down('Space');await page.waitForTimeout(700);await record('Space held');
    await page.screenshot({path:`reports/phase2-shooting-${suffix}.png`});await page.keyboard.up('Space');
    await page.keyboard.press('r');await page.waitForTimeout(100);await record('R begin');
    await page.keyboard.down('Space');await page.waitForTimeout(300);await record('Space during reload');await page.keyboard.up('Space');
    await page.waitForTimeout(3500);await record('R finished');
    await page.screenshot({path:`reports/phase2-combat-${suffix}.png`});
    await page.keyboard.press('Tab');await page.waitForTimeout(300);
    const drag = await page.evaluate(()=>{
      const r=cr_getC2Runtime(), rect=r.canvas.getBoundingClientRect();
      for(const t of r.S.filter(t=>!t.R))for(const o of t.q){
        const b=o.da?.find(b=>b.type.name.includes('Drag')&&b.enabled&&typeof b.gf==='boolean');
        if(!b||!o.visible||o.C.visible===false)continue;
        o.la();const cx=(o.ka.left+o.ka.right)/2,cy=(o.ka.top+o.ka.bottom)/2,x=o.C.Ra(cx,cy,true),y=o.C.Ra(cx,cy,false);
        if(x>20&&x<rect.width-20&&y>20&&y<rect.height-20)return {uid:o.uid,x:rect.x+x,y:rect.y+y,behavior:b.type.name};
      }return null;
    });
    if(drag){
      await page.mouse.move(drag.x,drag.y);await page.mouse.down();await page.mouse.move(drag.x+12,drag.y+8,{steps:3});
      const active=await page.evaluate(uid=>cr_getC2Runtime().tj(uid).da.some(b=>b.type.name.includes('Drag')&&b.gf),drag.uid);
      await page.mouse.move(drag.x,drag.y,{steps:3});await page.mouse.up();check('original mouse drag',active,drag);
    }else check('original mouse drag',false,'No enabled visible original DragDrop control found');
    await page.keyboard.press('Tab');await page.waitForTimeout(300);await page.keyboard.press('1');
    const enemy = await page.evaluate(()=>{
      const r=cr_getC2Runtime(), p=r.S[181].q[0];let enemy=r.S[1062].q.find(o=>o.x>0&&o.y>0);
      if(!enemy){
        const layer=Object.values(r.wa).find(v=>Array.isArray(v)&&v.some(l=>l?.name==='Survivors')).find(l=>l.name==='Survivors');
        r.Hg['108991656877317'].Ac.call(r.Bf,r.S[547],layer,p.x+25,p.y);enemy=r.S[547].aa().q[0];
      }
      const related=new Set([enemy,...(enemy.siblings||[])]);
      for(const b of enemy.da)for(const v of Object.values(b))if(v&&v.type&&typeof v.x==='number')related.add(v);
      for(const o of related){o.x=p.x+25;o.y=p.y;o.P();}
      return {uid:enemy.uid,type:enemy.type.index,originalValues:enemy.cc.slice()};
    });
    await page.keyboard.down('Space');await page.waitForTimeout(1200);
    result.steps.push({name:'melee Space near enemy',enemy,after:await snap()});await page.keyboard.up('Space');
    await page.screenshot({path:`reports/phase2-melee-${suffix}.png`});
    const step=name=>result.steps.find(s=>s.name===name).after;
    const rounds=name=>step(name).weapons.find(w=>w.type===45).cc[3];
    const reloading=name=>step(name).vars.find(v=>v.name==='Reloading_mag').data;
    check('E equips melee',step('E 33').player[4]>0);
    check('E equips primary',step('E 45').player[1]>0);
    check('E equips secondary',step('E 71').player[44]>0);
    for(const [name,mode]of [['key 1',0],['key 2',1],['key 3',2],['key q',0]])check(name,step(name).player[3]===mode);
    check('reload begins',reloading('initial reload begins')===1&&reloading('R begin')===1);
    check('reload finishes',reloading('R finished')===0);
    check('native ammo loaded',rounds('initial native reload')===30);
    check('Space consumes primary ammo',rounds('Space held')<rounds('initial native reload'));
    check('reload blocks firing',rounds('Space during reload')===rounds('R begin'));
    check('reload respects magazine',rounds('R finished')===30);
    check('melee swing created',step('melee Space near enemy').counters.melee>0);
    check('melee original event requested',step('melee Space near enemy').controls.lastAction.includes('Melee_2_auto'));
    result.ammoEvidence={loaded:rounds('initial native reload'),afterSpace:rounds('Space held'),afterReload:rounds('R finished')};
    result.passed=result.checks.every(c=>c.pass)&&!result.errors.length&&!result.externalRequests.length;
    fs.writeFileSync('reports/phase2-combat-test.json',JSON.stringify(result,null,2));
    fs.writeFileSync(`reports/phase2-combat-${suffix}-test.json`,JSON.stringify(result,null,2));
    console.log(result.checks.map(c=>`${c.pass?'PASS':'FAIL'} ${c.name}`).join('\n'));console.log(result.ammoEvidence);
    if(!result.passed)process.exitCode=1;
  }finally{await app.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});



