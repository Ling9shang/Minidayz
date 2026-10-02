const fs=require('fs'),path=require('path');
const results=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else if(/\.(html|js|json|css|xml)$/i.test(file)){const text=fs.readFileSync(file,'utf8');for(const expression of [/https?:\/\/[^\s"'<>]+/g,/\bfetch\s*\(/g,/XMLHttpRequest/g,/WebSocket/g,/<(?:script|img|audio)[^>]*(?:src)=.[^>]+/g]){for(const match of text.matchAll(expression))results.push({file,offset:match.index,match:match[0]});}}}}
walk('game');fs.writeFileSync('reports/asset-audit.json',JSON.stringify(results,null,2));console.log('Audit findings:',results.length,'(reports/asset-audit.json)');
