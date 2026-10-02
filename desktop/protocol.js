const {net}=require('electron');
const path=require('path');
const {pathToFileURL}=require('url');
module.exports=function(protocol){
 protocol.handle('app',request=>{
  const u=new URL(request.url);
  if(u.hostname!=='minidayz')return new Response('Forbidden',{status:403});
  const relative=decodeURIComponent(u.pathname).replace(/^\/mdz-cangshu-v233\//,'').replace(/^\/+/, '');
  const root=path.resolve(__dirname,'../game'),file=path.resolve(root,relative||'index.html');
  if(!file.startsWith(root+path.sep))return new Response('Forbidden',{status:403});
  return net.fetch(pathToFileURL(file).href);
 });
};
