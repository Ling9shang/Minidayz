const fs = require('fs');
const path = require('path');
const {spawnSync} = require('child_process');
const project = JSON.parse(fs.readFileSync('game/data.js', 'utf8').replace(/^\uFEFF/, '')).project;
fs.writeFileSync('reports/phase2-project-structure.json', JSON.stringify(project.map((value,index) => ({index,type:typeof value,length:Array.isArray(value)?value.length:undefined})), null, 2));
for (const script of ['extract-functions.js','extract-touch-events.js','extract-control-events.js','list-functions.js']) {
  const result = spawnSync(process.execPath, [path.join(__dirname,script)], {encoding:'utf8'});
  if (result.status !== 0) throw new Error(`${script}: ${result.stderr}`);
  console.log(`${script}: complete`);
}
