const fs=require('fs');const p=JSON.parse(fs.readFileSync('game/data.js','utf8').replace(/^\uFEFF/,'')).project,handlers=require('../reports/phase2-function-events.json');
const parameterReads=new Map(),calls=new Map();
function walk(x,fn){if(!Array.isArray(x))return;fn(x);for(const y of x)walk(y,fn);}
walk(p[6],x=>{if(x[0]===189&&x[1]===69&&typeof x[5]?.[0]?.[1]?.[1]==='string'){const name=x[5][0][1][1];if(!calls.has(name))calls.set(name,[]);calls.get(name).push({actionSID:x[3],arguments:x[5][1]?.slice(1)||[]});}});
const descriptions={Switch_to_melee:'原武器切换：槽 0、按钮帧、持物/动画更新',Switch_to_firearm:'检查 primary 槽非空，切换槽 1、双手持枪、UI/散布更新',Switch_to_pistol:'检查 secondary 槽非空，切换槽 2、持枪、UI/散布更新',close_inventory:'关闭背包并清理 UI/拖动状态，恢复控制显示',Mag_reload:'内部换弹执行阶段；参数控制时间/动画分支/pellets；不能替代带库存 guards 的 R 入口',Check_ammo_inventory:'按弹药种类检索库存，再进入原换弹路径',clear_pause_menu:'恢复时间倍率，销毁暂停菜单，延迟清空 helpmenu_on',Options:'创建原暂停菜单，调用方设置暂停状态',animation_redraw:'根据玩家原状态刷新动画',GUI_show_dpad:'恢复原控制 UI',GUI_hide_dpad:'隐藏原控制 UI'};
const names=[...new Set(handlers.map(h=>h.name))].sort();const out=names.map(name=>{
 const hs=handlers.filter(h=>h.name===name),reads=new Map(),effects=[];
 for(const h of hs)walk([h.conditions,h.actions,h.children],x=>{
  if((x[0]===20&&x[1]===189&&x[2]===93)||(x[0]===189&&x[1]===112)){const index=x[0]===20?x[5]?.[0]?.[1]:x[9]?.[0]?.[1]?.[1];if(Number.isInteger(index))reads.set(index,(reads.get(index)||0)+1);}
  if(x.length===6&&Number.isInteger(x[0])&&Number.isInteger(x[1])&&typeof x[3]==='number'&&typeof x[4]==='boolean'){if(x[0]===-1&&x[1]===41)effects.push('设置变量 '+x[5]?.[0]?.[1]);else if(x[0]===189&&x[1]===69)effects.push('调用 '+x[5]?.[0]?.[1]?.[1]);else if(x[0]>=0)effects.push('t'+x[0]+' action '+x[1]);}
 });
 const callsites=calls.get(name)||[];const counts=[...new Set(callsites.map(c=>c.arguments.length))];
 return {name,parameters:[...reads].sort((a,b)=>a[0]-b[0]).map(([index,count])=>({index,observedReads:count,meaning:name==='Mag_reload'?['换弹时间（秒），写入 mareloadtime','原换弹动画/武器分支索引','pellets 参数，写入 reloading_pellets'][index]||'未验证':name==='Check_ammo_inventory'&&index===0?'原弹药物品 ID（5.56 = 11，.45 = 12）':'见 handler 表达式及调用点；未验证业务含义'})),observedArgumentCounts:counts,likelyPurpose:descriptions[name]||('事件证据：'+[...new Set(effects)].slice(0,5).join('；')),confidence:descriptions[name]?'high':'low',relatedControls:['movement','attack','shoot','aim','inventory','interaction','reload','weapon','pause'].filter(tag=>({movement:/move|animation_redraw/i,attack:/attack|melee/i,shoot:/firearm|pistol|dispersion/i,aim:/aim|dispersion/i,inventory:/inventory|backpack/i,interaction:/pick|door|interact|pile/i,reload:/reload|ammo/i,weapon:/weapon|switch_to|hands|wpn/i,pause:/pause|^Options$/i}[tag]).test(name)),evidence:{handlers:hs.map(h=>({eventSheet:p[6][h.sheet][0],eventSID:h.sid})),effects:[...new Set(effects)],callsites}};
});
fs.writeFileSync('reports/phase2-functions.json',JSON.stringify(out,null,2));fs.writeFileSync('reports/phase2-functions.md','# Construct 2 Function 清单\n\n'+out.length+' 个唯一名称；'+handlers.length+' 个 handler。high 表示用途有事件动作证据，尚不表示所有参数均经过实际游戏验证。low 的描述仅列出可观察动作，不根据名字断言用途。函数参数表达式与完整事件见 phase2-function-events.json。无参数读取也可能接受未使用参数。\n\n'+out.map(x=>'## '+x.name+'\n\n- 相关控制：'+(x.relatedControls.join(', ')||'其他')+'\n- 参数读取索引：'+(x.parameters.map(p=>p.index).join(', ')||'未发现')+'；调用参数数量：'+(x.observedArgumentCounts.join(', ')||'未发现调用点')+'\n- 用途：'+x.likelyPurpose+'\n- 置信度：'+x.confidence+'\n- 证据：'+x.evidence.handlers.map(h=>h.eventSheet+' SID '+h.eventSID).join('；')+'\n').join('\n'));
console.log(out.length,'unique functions');



