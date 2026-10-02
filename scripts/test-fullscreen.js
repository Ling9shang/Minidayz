const fs=require('fs');const {launch,ready}=require('./desktop-test-helpers');
(async()=>{const app=await launch('phase2-fullscreen-profile');try{
 await ready(app);
 const send=event=>app.evaluate(({BrowserWindow},event)=>BrowserWindow.getAllWindows()[0].webContents.sendInputEvent(event),event);
 const state=()=>app.evaluate(({BrowserWindow})=>BrowserWindow.getAllWindows()[0].isFullScreen());
 const initial=await state();await send({type:'keyDown',keyCode:'F11'});await new Promise(r=>setTimeout(r,600));const f11=await state();await send({type:'keyUp',keyCode:'F11'});await send({type:'keyDown',keyCode:'F11'});await new Promise(r=>setTimeout(r,600));const restored=await state();await send({type:'keyUp',keyCode:'F11'});
 await send({type:'keyDown',keyCode:'Enter',modifiers:['alt']});await new Promise(r=>setTimeout(r,600));const altEnter=await state();await send({type:'keyUp',keyCode:'Enter',modifiers:['alt']});await send({type:'keyDown',keyCode:'Enter',modifiers:['alt']});await new Promise(r=>setTimeout(r,600));const final=await state();
 const result={passed:!initial&&f11&&!restored&&altEnter&&!final,environment:'Electron source entry',method:'native webContents input; BrowserWindow.isFullScreen',initial,f11,restored,altEnter,final};fs.writeFileSync('reports/phase2-fullscreen-test.json',JSON.stringify(result,null,2));console.log(result);if(!result.passed)process.exitCode=1;
 }finally{await app.close();}})().catch(e=>{console.error(e);process.exitCode=1});
