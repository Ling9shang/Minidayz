'use strict';
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const defaults=require('./config.json');
const reserved=new Set(['F1','F2','F10','F11','Enter','AltLeft','AltRight','MetaLeft','MetaRight','ControlLeft','ControlRight']);
const clone=x=>JSON.parse(JSON.stringify(x));
function validate(input,partial=false){
 if(!input||typeof input!=='object'||Array.isArray(input))throw Error('设置必须是 JSON 对象');
 const out={};
 if(input.version!==undefined&&input.version!==1)throw Error('不支持的设置版本');
 for(const key of ['keyboardControls','startFullscreen','autoBackup'])if(input[key]!==undefined){if(typeof input[key]!=='boolean')throw Error(`${key} 必须为 boolean`);out[key]=input[key];}
 if(input.maxBackups!==undefined){if(!Number.isInteger(input.maxBackups)||input.maxBackups<1||input.maxBackups>100)throw Error('备份数量必须为 1–100 的整数');out.maxBackups=input.maxBackups;}
 if(input.keybindings!==undefined){
  if(!input.keybindings||typeof input.keybindings!=='object'||Array.isArray(input.keybindings))throw Error('键位格式错误');
  const bindings=clone(defaults.keybindings);
  const validCode=/^(Key[A-Z]|Digit[0-9]|Arrow(Up|Down|Left|Right)|Space|Tab|Escape|ShiftLeft|ShiftRight|Backspace|Delete|Home|End|PageUp|PageDown|F([3-9]|12)|BracketLeft|BracketRight|Semicolon|Quote|Comma|Period|Slash|Backslash|Minus|Equal)$/;
  for(const action of Object.keys(bindings))if(input.keybindings[action]!==undefined){
   const codes=input.keybindings[action];
   if(!Array.isArray(codes)||codes.length<1||codes.length>4||codes.some(c=>typeof c!=='string'||!validCode.test(c)||reserved.has(c)))throw Error(`无效或保留键位：${action}`);
   bindings[action]=[...new Set(codes)];
  }
  const seen=new Map();for(const [a,codes]of Object.entries(partial?Object.fromEntries(Object.keys(input.keybindings).filter(a=>Object.hasOwn(bindings,a)).map(a=>[a,bindings[a]])):bindings))for(const c of codes){if(seen.has(c))throw Error(`${c} 已分配给 ${seen.get(c)}`);seen.set(c,a);}out.keybindings=partial?Object.fromEntries(Object.keys(input.keybindings).filter(a=>Object.hasOwn(bindings,a)).map(a=>[a,bindings[a]])):bindings;
 }
 return partial?out:{...clone(defaults),...out,version:1};
}
function atomicWrite(file,data){fs.mkdirSync(path.dirname(file),{recursive:true});const temp=`${file}.${crypto.randomUUID()}.tmp`;try{const fd=fs.openSync(temp,'wx');try{fs.writeFileSync(fd,data);fs.fsyncSync(fd);}finally{fs.closeSync(fd);}fs.renameSync(temp,file);}finally{if(fs.existsSync(temp))fs.unlinkSync(temp);}}
class ConfigStore{
 constructor(userData,sidecar){this.file=path.join(userData,'settings.json');this.sidecar=sidecar;this.warnings=[];this.user=clone(defaults);this.overrides={};this.load();}
 load(){
  if(fs.existsSync(this.file)){try{this.user=validate(JSON.parse(fs.readFileSync(this.file,'utf8').replace(/^\uFEFF/,'')));}catch(e){fs.renameSync(this.file,path.join(path.dirname(this.file),`settings.corrupt.${Date.now()}.${crypto.randomUUID()}.json`));this.warnings.push(`配置损坏，已保留副本并恢复默认：${e.message}`);this.user=clone(defaults);atomicWrite(this.file,JSON.stringify(this.user,null,2));}}
  if(this.sidecar&&fs.existsSync(this.sidecar)){try{this.overrides=validate(JSON.parse(fs.readFileSync(this.sidecar,'utf8').replace(/^\uFEFF/,'')),true);validate({...this.user,...this.overrides,keybindings:{...this.user.keybindings,...this.overrides.keybindings}});}catch(e){this.overrides={};this.warnings.push(`忽略无效旁置配置：${e.message}`);}}
 }
 get effective(){const config=validate({...this.user,...this.overrides,keybindings:{...this.user.keybindings,...this.overrides.keybindings}});if(process.env.MINIDAYZ_KEYBOARD_CONTROLS==='false')config.keyboardControls=false;return config;}
 get(){return {settings:this.effective,userSettings:clone(this.user),overrideFields:Object.keys(this.overrides),warnings:this.warnings,settingsPath:this.file};}
 save(input){const next=validate(input);validate({...next,...this.overrides,keybindings:{...next.keybindings,...this.overrides.keybindings}});atomicWrite(this.file,JSON.stringify(next,null,2));this.user=next;return this.get();}
}
module.exports={ConfigStore,validate,defaults,atomicWrite};

