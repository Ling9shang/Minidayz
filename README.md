# MiniDayZ Cangshu PC

## Development

```powershell
npm install
npm run start
npm run dev
```

## Build

```powershell
npm run build:win
```

Output: `release/MiniDayZ-Cangshu-v2.3.3-x64.exe` (Windows x64 portable).

## Saves

`%APPDATA%\MiniDayZ Cangshu PC\` contains Chromium localStorage and IndexedDB. Keep this directory when updating. The game uses Construct 2 IndexedDB `_C2SaveStates_mdz-cangshu-v233`, with localStorage fallback. The fixed origin is `app://minidayz/mdz-cangshu-v233/`.

## Controls

Original mouse and touch interface remains available. See PC Controls below. F11 / Alt+Enter toggle fullscreen; Alt+F4 exits.

## Capture and validation

`npm run capture` records requests from the public site. Already captured assets are served from disk to accelerate repeat captures; missing assets are retrieved only when requested by the browser. `node scripts/complete-assets.js` retries observed requests. `npm run audit` writes `reports/asset-audit.json`. `npm run test:offline` blocks all external HTTP/HTTPS/WebSocket requests. `npm run test:save` verifies localStorage and IndexedDB across actual Electron restarts using separate test profiles.

The application blocks external requests in normal mode as well. Node integration is disabled, context isolation and renderer sandbox are enabled. The isolated settings window uses a minimal contextBridge preload; the game renderer has no filesystem API. Only one instance can use a userData directory; opening the EXE again focuses its existing window.

## Upgrade

Back up the userData directory. Capture the new public version in a separate staging directory; compare assets and run offline and save tests before replacing game/. Preserve the existing origin and the base path for save compatibility; changing the site's version isolation suffix changes its database name. Do not automatically migrate saves between game versions without testing compatibility. Bump package version and artifact name after verification.

## Validation status

See reports/validation.md for results and remaining limitations. Actual portable EXE offline gameplay/save/restart verification passed in reports/gameplay-test.json; the saved state hashes match. The original public website returns 404 for menu_click.ogg, so that optional click sound is missing. Windows 10 and Windows 11 must be tested separately; this Windows 11 build host alone cannot establish both. Audible speaker output remains unverified.

## PC Controls

| 按键 | 操作 |
|---|---|
| WASD / 方向键 | 移动；支持斜向，松键停止，失焦清空输入 |
| Space | 原生近战 / 射击；保留目标、范围、弹药和冷却条件 |
| E | 原交互按钮：拾取、开门、目标交互 |
| R | 原换弹入口，使用库存弹药和原动画/时间 |
| Tab | 打开 / 关闭背包 |
| 1 / 2 / 3 | 近战 / 主武器 / 副武器；空槽不操作 |
| Q | 原武器切换按钮 |
| Esc | 暂停 / 恢复；背包中先关闭背包 |
| F1 | PC 操作帮助 |
| F2 | 独立设置与存档管理 |
| F10 | 开发模式的输入调试 overlay |
| F11 / Alt+Enter | 全屏 |

鼠标保留原菜单、地图、背包、拖动和点击移动。该版本采用原自动目标选择和自动近战；Space 请求原近战事件，不能强制攻击范围外目标。未将鼠标坐标强行改成射击方向。X 没有映射：原 scope/zoom 按钮不等同于通用 Aim。

键盘增强只在适用的游戏状态生效，菜单、暂停、死亡、加载及背包不会接收角色移动。文本 input/textarea 保留输入。全屏由既有主进程 handler 处理。

## Keyboard settings

按 F2 打开独立设置窗口，可以立即启用/关闭键盘增强及修改键位。默认配置在 `desktop/config.json`，用户设置写入 `%APPDATA%\MiniDayZ Cangshu PC\settings.json`。

Portable EXE 也支持在 EXE 同目录创建 `desktop-config.json`，例如：

```json
{"keyboardControls": false}
```

优先级：默认值 < userData/settings.json < EXE 同目录 desktop-config.json。旁置覆盖下的设置在 UI 中只读，修改旁置文件需重启。首次启动禁用时不注入脚本；热禁用时适配器清空输入并停止增强，原 mouse/touch 继续可用。桌面配置不会写入游戏存档。

增强逻辑独立放在 `desktop/injections/keyboard-controls.js`。`game/data.js` 和 `game/c2runtime.js` 未修改。适配器依赖此版本的 runtime action SID 和对象定义，更新 game/ 后需要重新分析和测试；遇到不兼容可先关闭增强。

## Phase 2 verification

分析报告：`reports/phase2-control-analysis.md`。325 个唯一 Function 的动作、参数读取与事件证据：`reports/phase2-functions.json` / `.md`。验证结果及实际 portable 结果见 `reports/phase2-summary.md`。

Phase 1 / Phase 2 reports 保留原样。当前测试输出统一为 reports/phase3-*。

## Phase 3：存档与设置

F2 窗口提供导出、导入、立即备份、备份列表恢复、打开存档目录与备份目录。导出格式为 .mdczsave（固定三份 JSON 的 ZIP），包含每份 payload SHA-256 和整体 logicalSaveHash。操作完全本地。

自动备份默认开启，启动已有存档及正常退出时检查变化；相同逻辑 hash 不重复创建。默认保留最近 10 个自动备份，可设 1–100。备份目录：%APPDATA%\MiniDayZ Cangshu PC\backups。手动、pre-import、pre-restore 不参与自动轮换。

导入及恢复会先备份，关闭游戏页，验证写入后重开游戏页。出错回滚；异常中断在下次启动先恢复。导出/备份只包含已提交的游戏进度，当前地图请先使用原 Save and Exit。

设置损坏会隔离为 settings.corrupt.*.json 并恢复默认值。键位立即生效，冲突或保留键拒绝；重置仅恢复键位。启动全屏在下次打开游戏窗口时生效。

结构分析：reports/phase3-save-structure.md。验收和限制：reports/phase3-summary.md。

```powershell
npm run test:settings
npm run test:export
npm run test:import
node scripts/test-import-safety.js
node scripts/test-backup-rotation.js
node scripts/test-auto-backup.js
node scripts/test-settings-ui.js
node scripts/test-native-dialogs.js
npm run test:offline
npm run test:save
npm run test:keyboard
node scripts/test-fullscreen.js
npm run build:win
node scripts/test-portable.js
node scripts/test-portable-manager.js
$env:MINIDAYZ_TEST_PORTABLE = '1'
npm run test:keyboard
node scripts/test-keyboard-actions.js
node scripts/test-gameplay.js
node scripts/test-phase2-save-compatibility.js
node scripts/test-keyboard-config.js
node scripts/test-fullscreen.js
```

兼容性测试需要保留的 Phase 1 backup EXE。游戏动作测试仅在隔离夹具中创建装备、设置测试弹药和敌人；正式适配器调用原事件，不修改装备、弹药、生命或伤害。所有测试使用隔离 profile，不访问玩家正式存档。

Phase 3 专项测试也可针对实际 portable EXE 运行：设置 `$env:MINIDAYZ_PHASE3_PORTABLE = '1'` 后运行 test:export、test:import、test-import-safety、test-auto-backup、test-settings-ui 和 test-native-dialogs。测试主进程调试端口仅由隔离测试 harness 显式启用，普通运行不启用。
