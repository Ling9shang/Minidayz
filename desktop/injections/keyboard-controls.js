/* MiniDayZ Cangshu 2.3.3 desktop adapter. No game data or save schema edits. */
(() => {
  'use strict';
  if (window.__MINIDAYZ_PC_CONTROLS) return;
  const directions = {KeyA:0,ArrowLeft:0,KeyD:1,ArrowRight:1,KeyW:2,ArrowUp:2,KeyS:3,ArrowDown:3};
  const controls = new Set([...Object.keys(directions),'Space','KeyE','KeyR','Tab','Digit1','Digit2','Digit3','KeyQ','Escape']);
  const keys = new Set(), hooked = new WeakSet(), actionHooks = new WeakSet();
  let runtime, variableCount=0, vars = {}, movement, ownedMovement = false, attack, nextId = 900000, help, debug, lastAnimation = 0, lastAction = '';
  const config = window.__MINIDAYZ_PC_CONFIG || {};
  function refresh() {
    const r = window.cr_getC2Runtime?.();
    if (r && (r !== runtime || r.tD.length!==variableCount)) {runtime=r;variableCount=r.tD.length;vars=Object.fromEntries(r.tD.map(v=>[v.name,v]));}
    return r;
  }
  const value = name => vars[name]?.data;
  const objects = i => runtime?.S[i]?.q || [];
  const player = () => objects(181)[0];
  function state() {
    refresh();
    if (!runtime || !['Map','Tutorial'].includes(runtime.wa?.name) || !player()) return 'MENU';
    const p=player();
    if (p.cc[15]<=0 || p.cc[21]!==0) return 'DEAD_OR_BLOCKED';
    if (value('helpmenu_on')) return 'PAUSE';
    if (value('Inventory_opened')) return 'INVENTORY';
    if (value('perkmenu_on') || value('Building_mode') || value('Tutor_hint_moveblock') || value('Tutor_hint_onscreen') || value('level_loading') || p.cc[27]!==0) return 'BLOCKED';
    return 'GAMEPLAY';
  }
  function stop() {
    if (movement && ownedMovement) {
      const action=runtime.Hg['862554514106281'];
      if (typeof action?.Ac==='function') action.Ac.call(movement);
      movement.ug=movement.vg=movement.wg=movement.tg=false;
    }
    ownedMovement=false;
  }
  function point(o) {
    const canvas=runtime.canvas, rect=canvas.getBoundingClientRect();
    o.la();
    const cx=(o.ka.left+o.ka.right)/2,cy=(o.ka.top+o.ka.bottom)/2;
    const x=o.C.Ra(cx,cy,true),y=o.C.Ra(cx,cy,false);
    // Touch handlers consume CSS pixels relative to jQuery(canvas).offset().
    return {pointerType:'touch',pointerId:++nextId,pageX:rect.left+window.scrollX+x,pageY:rect.top+window.scrollY+y,target:canvas,preventDefault(){}};
  }
  function button(i,predicate=()=>true) {
    return objects(i).find(o=>o.visible && o.C.visible!==false && o.opacity>0 && Math.abs(o.width)>1 && Math.abs(o.height)>1 && predicate(o));
  }
  function startTouch(o) {
    if(!o)return null;
    const touch=objects(495)[0];if(!touch?.mm || !touch.kg)return null;
    const event=point(o);touch.mm(event);lastAction=`Touch t${o.type.index}`;return {touch,event,object:o};
  }
  function endTouch(active,cancel=false) {if(active)active.touch.kg(active.event,cancel);}
  function tap(o) {const active=startTouch(o);endTouch(active);}
  function reset() {keys.clear();stop();endTouch(attack,true);attack=null;}
  function tick() {
    const s=state();
    if(s!=='GAMEPLAY'||help){reset();} else {
      for(const sid of ['9625642696643534','9930687941620704','7757159177161953','1517613854353735','8419439398002459','1099329243773422','836549825138281','815508659066383','619738897100984','649783150272213']){
        const a=runtime.Hg[sid];
        if(a && !actionHooks.has(a)){const original=a.Ac;a.Ac=function(){if([...keys].some(k=>k in directions)&&state()==='GAMEPLAY')return;return original.apply(this,arguments);};actionHooks.add(a);}
      }
      const m=objects(193)[0]?.da.find(b=>b.type.name==='AltMove');
      if(m && !hooked.has(m)) {
        const original=m.ya;
        m.ya=function(){
          const playable=state()==='GAMEPLAY'&&!help;
          const active=playable?[...new Set([...keys].filter(k=>k in directions).map(k=>directions[k]))]:[];
          if(active.length){
            movement=this;ownedMovement=true;
            const simulate=runtime.Hg['2236462314679869']?.Ac;
            if(typeof simulate==='function')for(const d of active)simulate.call(this,d);
          } else if(this===movement)stop();
          original.call(this);
        };
        hooked.add(m);
      }
      if(attack){
        const o=button(505);
        if(!o||o!==attack.object){endTouch(attack,true);attack=null;keys.delete('Space');}
        else {const p=point(o);p.pointerId=attack.event.pointerId;attack.touch.lm(p);attack.event=p;}
      }
      // Animation refresh runs after the native event sheet, where its input state is current.
    }
    if(debug)debug.textContent=JSON.stringify(snapshot(),null,2);
  }
  function snapshot(){return {state:state(),movement:{up:keys.has('KeyW')||keys.has('ArrowUp'),down:keys.has('KeyS')||keys.has('ArrowDown'),left:keys.has('KeyA')||keys.has('ArrowLeft'),right:keys.has('KeyD')||keys.has('ArrowRight')},attack:keys.has('Space'),controlMethod:'Native AltMove actions / C2 Function / native Touch handler',lastAction,nativeMovement:movement?{x:movement.j.x,y:movement.j.y,dx:movement.M,dy:movement.L}:null,position:player()?{x:player().x,y:player().y}:null};}
  function overlay(kind) {
    let o=kind==='help'?help:debug;
    if(o){o.remove();if(kind==='help')help=null;else debug=null;return;}
    o=document.createElement('pre');o.style.cssText='position:fixed;z-index:99999;top:24px;left:24px;max-width:calc(100vw - 80px);padding:20px;color:#fff;background:rgba(15,20,24,.95);border:1px solid #9ca;font:16px/1.65 Consolas,monospace;white-space:pre-wrap;pointer-events:none';
    if(kind==='help'){
      reset();o.textContent='PC Controls\n\nWASD / Arrow Keys — Move\nMouse — Original targeting / UI\nSpace — Attack / Shoot\nE — Interact\nR — Reload\nTab — Inventory\n1 / 2 / 3 — Melee / Primary / Secondary\nQ — Switch weapon\nEsc — Pause / Resume\nF11 / Alt+Enter — Fullscreen\nF1 — Close controls\n\nMouse controls remain available.';help=o;
    }else debug=o;
    document.body.append(o);
  }
  const typing=e=>e.target?.closest?.('input,textarea,[contenteditable="true"]');
  window.addEventListener('keydown',e=>{
    if(typing(e)||e.ctrlKey||e.metaKey||e.altKey)return;
    if(e.code==='F1'||(e.code==='F10'&&config.dev)){e.preventDefault();e.stopImmediatePropagation();if(!e.repeat)overlay(e.code==='F1'?'help':'debug');return;}
    if(!controls.has(e.code))return;
    const s=state();
    if(s==='MENU'||s==='DEAD_OR_BLOCKED')return;
    e.preventDefault();e.stopImmediatePropagation();
    if(e.repeat || help)return;
    if(e.code==='Escape') {reset();if(s==='PAUSE')tap(button(630,o=>o.cc[0]===3));else if(s==='INVENTORY')window.c2_callFunction('close_inventory',[]);else if(s==='GAMEPLAY')tap(button(288));return;}
    if(e.code==='Tab' && (s==='GAMEPLAY'||s==='INVENTORY')){reset();tap(button(497));return;}
    if(s!=='GAMEPLAY')return;
    if(e.code in directions && ![...keys].some(k=>k in directions)){
      const destroy=runtime.Hg['1952441083829329']?.Ac;
      if(typeof destroy==='function')for(const marker of objects(506).slice())destroy.call(marker);
      vars.run_touch_id?.rg(-1);
      for(const sid of ['9625642696643534','9930687941620704','7757159177161953','1517613854353735','8419439398002459','1099329243773422','836549825138281','815508659066383','619738897100984','649783150272213']){
        const a=runtime.Hg[sid];
        if(a && !actionHooks.has(a)){const original=a.Ac;a.Ac=function(){if([...keys].some(k=>k in directions)&&state()==='GAMEPLAY')return;return original.apply(this,arguments);};actionHooks.add(a);}
      }
      const m=objects(193)[0]?.da.find(b=>b.type.name==='AltMove');
      if(m){movement=m;ownedMovement=true;stop();}
    }
    keys.add(e.code);
    if(e.code==='Space'){
      if(player().cc[3]===0){const event=runtime.wj.melee_2_auto;if(event?.ci&&typeof runtime.TE==='function'){runtime.TE(null,'system',event,0);lastAction='Native Melee_2_auto event (original target/range/cooldown)';}}
      else attack=startTouch(button(505));
    }
    if(e.code==='KeyE')tap(button(512,o=>o.opacity===1)||button(736));
    if(e.code==='KeyR')tap(button(522));
    if(e.code==='KeyQ')tap(button(509));
    const slots={Digit1:['Switch_to_melee',4],Digit2:['Switch_to_firearm',1],Digit3:['Switch_to_pistol',44]};
    if(slots[e.code] && !value('Reloading_mag') && player().cc[slots[e.code][1]]>0){window.c2_callFunction(slots[e.code][0],[]);lastAction=slots[e.code][0];}
  },true);
  window.addEventListener('keyup',e=>{
    if(!keys.has(e.code))return;
    keys.delete(e.code);e.preventDefault();e.stopImmediatePropagation();
    if(e.code==='Space'){endTouch(attack);attack=null;}
    if(e.code in directions && ![...keys].some(k=>k in directions))stop();
  },true);
  window.addEventListener('blur',reset);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
  window.__MINIDAYZ_PC_CONTROLS={snapshot,reset,version:'2.3.3-phase2'};
  // One adapter tick; movement feeds the existing behavior immediately before its native tick.
  function attach(){if(refresh()){runtime.Ef({ya:tick});runtime.rH({Oi(){if(ownedMovement&&state()==='GAMEPLAY'&&performance.now()-lastAnimation>100){window.c2_callFunction('animation_redraw',[]);lastAnimation=performance.now();}}});}else requestAnimationFrame(attach);}
  attach();
})();






