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

The application blocks external requests in normal mode as well. Node integration is disabled, context isolation and renderer sandbox are enabled. No preload bridge is needed. Only one instance can use a userData directory; opening the EXE again focuses its existing window.

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
| F10 | 开发模式的输入调试 overlay |
| F11 / Alt+Enter | 全屏 |

鼠标保留原菜单、地图、背包、拖动和点击移动。该版本采用原自动目标选择和自动近战；Space 请求原近战事件，不能强制攻击范围外目标。未将鼠标坐标强行改成射击方向。X 没有映射：原 scope/zoom 按钮不等同于通用 Aim。

键盘增强只在适用的游戏状态生效，菜单、暂停、死亡、加载及背包不会接收角色移动。文本 input/textarea 保留输入。全屏由既有主进程 handler 处理。

## Disable keyboard controls

源码开发：将 `desktop/config.json` 改为：

```json
{"keyboardControls": false}
```

Portable EXE：在 EXE 同一目录创建 `desktop-config.json`，写入同样内容，然后重启。关闭后不注入增强脚本，继续使用原 mouse/touch 操作及同一个存档目录。这个配置不会写入游戏存档。

增强逻辑独立放在 `desktop/injections/keyboard-controls.js`。`game/data.js` 和 `game/c2runtime.js` 未修改。适配器依赖此版本的 runtime action SID 和对象定义，更新 game/ 后需要重新分析和测试；遇到不兼容可先关闭增强。

## Phase 2 verification

分析报告：`reports/phase2-control-analysis.md`。325 个唯一 Function 的动作、参数读取与事件证据：`reports/phase2-functions.json` / `.md`。验证结果及实际 portable 结果见 `reports/phase2-summary.md`。

```powershell
$env:MINIDAYZ_REPORT_PREFIX = 'phase2-'
npm run test:offline
npm run test:save
npm run test:keyboard
node scripts/test-keyboard-actions.js
node scripts/test-phase2-save-compatibility.js

$env:MINIDAYZ_TEST_PORTABLE = '1'
npm run test:keyboard
node scripts/test-keyboard-actions.js
node scripts/test-gameplay.js
node scripts/test-phase2-save-compatibility.js
node scripts/test-keyboard-config.js
```

Phase 2 测试报告和测试 profile 使用 `reports/phase2-*`。动作测试使用独立场景夹具，通过原生动作创建装备、设置测试弹药并搬移原生敌人；正式增强代码不创建装备或修改弹药、生命、伤害等数值。存档兼容测试需要保留的 Phase 1 backup EXE。
