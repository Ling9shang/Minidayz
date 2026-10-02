# Phase 2 — PC Keyboard Controls

## Implemented

版本：2.3.3-desktop.2。Windows 11 x64 主机完成源码开发模式及实际 portable EXE 验证。

| 按键 | 行为 | 结果 |
|---|---|---|
| WASD / 方向键 | 四向、WA/WD/SA/SD 斜向；同方向别名可同时按住 | PASS |
| 松键 / window blur | 原 Stop 动作停止，清空 held movement / attack | PASS |
| Space | firearm 连续射击；melee 请求原自动近战事件 | PASS |
| E | 原交互按钮；本轮实测原拾取装备/弹药入口 | PASS |
| R | 原库存检查、换弹时间、动画和弹匣容量 | PASS |
| Tab | 背包 toggle，背包期间隔离移动 | PASS |
| 1 / 2 / 3 | 原近战、主武器、副武器 Function；空槽不操作 | PASS |
| Q | 原切换按钮 | PASS |
| Esc | 暂停、恢复；背包中关闭背包 | PASS |
| F1 | 独立操作帮助 overlay，二次关闭 | PASS |
| F10 | 仅开发模式显示输入调试 overlay | PASS |
| F11 / Alt+Enter | 保留 Phase 1 原主进程全屏 handler | PASS（原生 Electron 输入） |

## Implementation

- 移动：原 t193 AltMove 的 SimulateControl / Stop runtime action，在原行为 tick 前提交方向。保留速度上限、斜向速度、碰撞及加减速。键盘期间阻止旧点击目标速度覆盖；松键后原鼠标控制继续生效。原 GUI_control_type=2 的 WASD 设置也经过验证。
- 武器槽：调用原 Switch_to_melee / Switch_to_firearm / Switch_to_pistol，按原游戏状态及空槽条件限制。
- 近战：使用 runtime.TE 执行原 Melee_2_auto 组，保留父事件、SOL、范围/LOS、目标、冷却及伤害逻辑。原自动近战继续存在。
- 射击、交互、换弹、背包、暂停、Q：调用原 Touch.mm/lm/kg handler。按钮位置来自原 UI 对象边界中心、原 layerToCanvas 变换及 canvas offset；不使用固定屏幕坐标，不创建 DOM Pointer/Touch 事件。
- 使用原游戏 tick，未引入 1ms interval 或 DOM 事件洪泛。失焦及状态切换取消 held touch。增强状态只在闭包/页面中，未加入原序列化数据。

原瞄准使用原自动目标选择和 LOS；鼠标 UI/目标操作保持原有行为。未证实鼠标坐标直接决定射击角度，因此未加入自由鼠标瞄准；X 未映射，原 Zoom_test 不能作为通用 Aim。

分析证据：[控制分析](phase2-control-analysis.md)、[325 个唯一 Function 清单](phase2-functions.md)、[参数/动作/调用点 JSON](phase2-functions.json)。高置信度表示有原事件证据，不表示每个内部 Function 可以跳过调用方 guards。

## Modified files

- desktop/main.js：配置读取、可选独立注入、开发 DevTools 分离显示。
- desktop/config.json、desktop/injections/keyboard-controls.js：新增配置和增强实现。
- package.json、package-lock.json：版本升为 2.3.3-desktop.2，增加 test:keyboard；未增加浏览器运行时依赖。
- README.md、.gitignore：键位、关闭方式、测试命令、隔离测试 profile。
- scripts/test-offline.js、test-save-persistence.js、test-gameplay.js：Phase 2 输出前缀、portable 测试路径及离线判定。
- scripts/desktop-test-helpers.js、test-keyboard.js、test-keyboard-actions.js、test-phase2-save-compatibility.js、test-keyboard-config.js、test-fullscreen.js：新增回归测试。
- scripts/analyze-controls.js、extract-functions.js、extract-touch-events.js、extract-control-events.js、list-functions.js、write-phase2-summary.js：静态分析、Function 清单及汇总核对生成。
- reports/phase2-*：全部新增报告、事件证据与实测截图。
- release/MiniDayZ-Cangshu-v2.3.3-x64.exe：重新生成 x64 portable；Phase 1 backup EXE 保留。

## Original files modified

- data.js: **NO**
- c2runtime.js: **NO**

两个文件的 Git blob hash 与 v2.3.3-desktop-phase1 完全相同。原 Phase 1 tracked reports 无差异，稳定标签指向 6dcf572。新测试只使用独立 reports/phase2-* profile，不使用正常玩家存档目录。

## Regression

| 检查 | 结果 | 证据 |
|---|---|---|
| npm run dev 移动 / UI / F1 / F10 | PASS | [开发键盘矩阵](phase2-keyboard-dev-test.json) |
| npm run dev 拾取 / 攻击 / 换弹 / 切槽 / 拖拽 | PASS | [开发动作矩阵](phase2-combat-dev-test.json) |
| 实际 EXE 键盘、斜向、松键、blur、菜单隔离、鼠标背包 | PASS | [portable 键盘矩阵](phase2-keyboard-portable-test.json) |
| 实际 EXE 攻击 / E / R / 武器 / 原鼠标拖拽 | PASS | [portable 动作矩阵](phase2-combat-portable-test.json) |
| Offline | PASS：启动 0 外部 HTTP/HTTPS，0 错误；游戏矩阵 0 外部请求，portable gameplay 0 关键错误 | [启动](phase2-offline-test.json)、[游戏](phase2-gameplay-test.json) |
| Save persistence | PASS：localStorage / IndexedDB 跨重启一致 | [存储测试](phase2-save-persistence.json) |
| Portable Save / Restart / Continue | PASS：943166 bytes，跨重启 SHA256 一致；截图恢复到 Map | [实际游戏测试](phase2-gameplay-test.json)、[Continue 截图](phase2-sequential-resumed-map.png) |
| Phase 1 save compatibility | PASS：Phase 1 EXE 创建的真实存档可继续；Phase 2 保存后关闭增强可继续；无增强状态写入，原 C2 schema 一致 | [兼容性测试](phase2-save-compatibility.json) |
| Disable keyboard controls | PASS：EXE 旁配置 false 不注入，原鼠标移动和背包正常 | [配置关闭测试](phase2-config-disabled-test.json) |
| F11 / Alt+Enter | PASS：原生输入切换，isFullScreen 确认并恢复 | [全屏测试](phase2-fullscreen-test.json) |
| 原始文件 / 打包内容 | PASS：原始 blob 不变，asar 中入口、适配器、配置与游戏和工作区逐字节一致，package name/version/main 相同 | [最终核对](phase2-final-verification.json) |

原生弹匣证据：portable 装弹 30 发，Space 后 23 发，原换弹后 30 发；换弹期间 Space 未额外消耗弹药。近战实测原 swing 对象创建。测试夹具仅在独立 profile 中用原动作提供装备、60 发测试弹药和原敌人；正式增强代码不创建装备或直接写弹药、HP、伤害。

## Disable

源码：desktop/config.json 设为 {"keyboardControls":false}。

Portable：在 EXE 同目录创建 desktop-config.json，内容同上，再重启。配置不写入存档；测试结束未遗留关闭配置。

## Known Issues / Scope

- 沿用 Phase 1 记录的可选 media/menu_click.ogg 缺失，不影响关键资源、游戏或存档。
- X 未映射；自由鼠标瞄准不是已确认的原游戏功能。鼠标 UI、原目标选择及自动近战保留。
- 实测平台为 Windows 11 x64；Windows 10 尚未单独实机验证。扬声器音频输出未核验。
- blur 清理通过：源码测试调用原生 BrowserWindow.blur，portable 矩阵派发相同 blur 事件；未自动化真实操作系统 Alt+Tab 按键切换。CPU 未做量化对比基准。
- 当前适配器依赖 v2.3.3 的对象定义及 action SID。更新 game/ 后需重新分析和回归；可先关闭增强。

## Artifact

EXE：release/MiniDayZ-Cangshu-v2.3.3-x64.exe

大小：113273950 bytes。

SHA256：c0496fad17b7a9f1025d65097b8155d4d667d6c6da3c33ef0346cd8c71b7b440

Phase 2 源码与验证记录以 v2.3.3-desktop-phase2 标签归档。release/ 被 Git 忽略，portable EXE 不包含在源码提交中。
