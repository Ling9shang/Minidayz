# Phase 3 — Save Manager & Settings Center

验收日期：2026-10-03。桌面版本：2.3.3-desktop.3；游戏版本：2.3.3。下表全部自动化验收 PASS，包含实际 Windows 11 x64 portable EXE；人工及跨系统验证限制见 Known Issues。Phase 2 tag 已保留，Phase 1 / Phase 2 的既有 reports 未修改。

## Save format

.mdczsave 是 ZIP stored（不压缩）格式 1，固定三项：

- manifest.json
- storage/indexeddb/records.json
- storage/localstorage/values.json

manifest 区分 gameVersion / desktopVersion，记录 UTC 时间、source、payload 大小、每份 SHA-256 和整体 logicalSaveHash。文件名、记录和键统一规范化计算 hash；时间等 manifest 元数据不进入去重 hash。manifest 不含用户名、机器名、绝对路径或 IP。只备份原两个游戏数据库记录和该 origin 的 localStorage；不备份 Chromium cache、Cookies、Preferences、桌面设置或其他 origin。原 C2 字符串不重写，数据库 version、store、keyPath 不改。详见 [真实结构](phase3-save-structure.md)。

## Export / Import

导出使用原生 Save Dialog，暂停游戏输入与原 runtime，flush 并等待 readonly 存储事务，生成本地归档后恢复之前状态。备份/导出是已保存进度；当前地图先使用原 Save and Exit。

导入使用原生 Open Dialog，限制文件大小为 64 MiB；严格验证 ZIP、manifest、必要项、schema 和 hashes，独立 save-stage-* 目录只写固定白名单文件并重新校验。销毁游戏页以终止同时写入，创建 pre-import（恢复则 pre-restore）备份、fsync 事务日志，再写原 store，重读 hash 验证后重新创建游戏页。失败回滚；回滚失败保留日志与备份并保持游戏关闭，下次启动先恢复。成功/普通失败均清理临时目录。同游戏不同桌面版本默认允许，未知游戏版本提示兼容性未知并要求明确确认；不自动转换存档 schema。

## Backup

正式目录：%APPDATA%\MiniDayZ Cangshu PC\backups\。默认 autoBackup=true、maxBackups=10（1–100）。已有存档启动后及正常关闭时检查，逻辑 hash 无变化不重复备份。自动轮换仅删除命名和有效 manifest 均匹配的 auto 文件；manual、pre-import、pre-restore、其他名称、损坏归档和符号链接均保留。备份列表显示时间、类型、大小、游戏版本，恢复前另建 pre-restore。

## Settings

F2 打开独立 Vanilla HTML/CSS/JS BrowserWindow。正式 settings.json：%APPDATA%\MiniDayZ Cangshu PC\settings.json。默认值 < userData/settings.json < EXE 同目录 desktop-config.json。旁置文件修改需重启，覆盖字段在 UI 中只读。字段严格验证，未知字段忽略，无 version 的旧设置合并默认并升级为 1；损坏配置隔离为 settings.corrupt.*.json 后恢复默认。键盘启用与键位立即生效；启动全屏在下一次创建游戏窗口生效。

## Keybindings

| 按键 | 操作 |
|---|---|
| W / ↑、S / ↓、A / ←、D / → | 移动，支持斜向与别名 |
| Space | 原生近战 / 射击 |
| E / R / Tab | 交互 / 换弹 / 背包 |
| 1 / 2 / 3 / Q | 近战 / 主武器 / 副武器 / 切换 |
| Esc | 原暂停 / 恢复；背包中先关闭背包 |
| F1 / F2 / F10 / F11 / Alt+Enter | 帮助 / 设置 / 开发调试 / 全屏 / 全屏 |

重复绑定、保留快捷键或不支持的按键明确拒绝，不静默覆盖。Reset Controls 只重置键位。实测 Space 改为 F 后 Space 不消耗弹药、F 消耗原弹药，重置后 Space 恢复攻击。鼠标 / touch 原事件保持可用，正式代码不创建装备或改弹药、生命、伤害。

## Security

ZIP 白名单、中央目录/本地头一致性、边界/数量/大小、CRC、SHA-256、逻辑 hash 校验；拒绝路径穿越、绝对路径、符号链接、额外条目、重复条目和非 stored ZIP。不调用 extractAllTo(userData)，只写随机临时目录里的固定文件及原 origin 的允许 store。

Settings renderer：nodeIntegration=false、contextIsolation=true、sandbox=true、独立内存 partition、CSP 不允许外部连接、拒绝导航与新窗口。preload 仅公开固定方法；IPC 校验 settings webContents、mainFrame、精确 URL 和参数。没有任意路径、shell command、fs API。打开目录只通过主进程 shell.openPath 打开固定 userData / backups。游戏仍以默认 session 阻止外部 HTTP/HTTPS/WebSocket，无新增账户、上传或 telemetry。

## Regression

测试均使用隔离 reports/phase3-*-profile。战斗夹具只在测试中创建原装备、弹药和敌人，不进入生产行为。

| 项目 | 结果 | 证据 |
|---|---|---|
| 存档导出 / 原 C2 字符串不变 | PASS | [报告](phase3-save-export.json) |
| 存档导入 / 重启 / pre-import / pre-restore | PASS | [报告](phase3-save-import.json) |
| 损坏归档、SHA-256、Zip Slip、回滚 | PASS | [报告](phase3-import-safety.json) |
| 自动备份 / 变化去重 / 崩溃恢复 | PASS | [报告](phase3-auto-backup.json) |
| 轮换 / 手动备份与其他文件保留 | PASS | [报告](phase3-backup-rotation.json) |
| 默认配置、验证、迁移、损坏隔离、旁置覆盖 | PASS | [报告](phase3-settings-test.json) |
| F2 / 持久化 / 热开关 / 仅重置键位 / 固定目录 API | PASS | [报告](phase3-settings-ui-test.json) |
| 对话框 API / 取消 / 同游戏不同桌面版本 / 未知版本确认 | PASS | [报告](phase3-native-dialogs-test.json) |
| 离线启动 | PASS | [报告](phase3-offline-test.json) |
| IndexedDB 与 localStorage 跨重启 | PASS | [报告](phase3-save-persistence.json) |
| 源码键盘与失焦 / 帮助 / debug / 原鼠标 UI | PASS | [报告](phase3-keyboard-electron-test.json) |
| 便携版键盘回归 | PASS | [报告](phase3-keyboard-portable-test.json) |
| 源码攻击、交互、换弹、武器槽、近战、实际重映射 | PASS | [报告](phase3-combat-electron-test.json) |
| 便携版战斗与实际 Space → F → Reset | PASS | [报告](phase3-combat-portable-test.json) |
| 便携版 Save / Restart / Continue / 原存档 hash 相同 | PASS | [报告](phase3-gameplay-test.json) |
| Phase 1 旧存档兼容 / 原 schema / 禁用后 Continue | PASS | [报告](phase3-save-compatibility.json) |
| EXE 旁置关闭增强 / 原鼠标操作 | PASS | [报告](phase3-config-disabled-test.json) |
| 源码 F11 / Alt+Enter | PASS | [报告](phase3-fullscreen-electron-test.json) |
| 便携版 F11 / Alt+Enter | PASS | [报告](phase3-fullscreen-portable-test.json) |
| 实际 EXE 离线启动 | PASS | [报告](phase3-portable-test.json) |
| 实际 EXE 设置、导入、恢复、原 C2 Continue、staging 清理 | PASS | [报告](phase3-portable-manager-test.json) |
| 核心 / 旧报告 / 打包文件 / EXE hash | PASS | [报告](phase3-build-verification.json) |

完整 Phase 1 兼容测试由保留的 Phase 1 EXE 创建新原生存档，再由 Phase 3 Continue/Save；关闭增强后再次 Continue，原 schema 相同。实际便携版游戏重启 hash 和导入后原 C2 Continue 均验证。原生失焦通过 BrowserWindow.blur + 原输入状态清理验证。

## Original files

data.js 修改：NO。c2runtime.js 修改：NO。整个 game/ 相对 Phase 2 无 Git diff，打包核心文件与当前原文件字节一致。Git tag 的 LF 与既有 Windows checkout 的 CRLF 经正常 Git 归一化一致。

| 文件 | 当前 / 打包 SHA-256 |
|---|---|
| game/data.js | `fc10b8edae15128ff2d68c54c35eeacbabfdd14405d2c4304eee452fe334028a` |
| game/c2runtime.js | `0b12a1f2dd11957884b699008fbd02569332a3003492c05d92d4e8d95226cfbc` |

## Final EXE

路径：`F:\Game\MiniDayZ-Cangshu-PC\release\MiniDayZ-Cangshu-v2.3.3-x64.exe`

大小：113282900 bytes

SHA-256：`c36444d42d59690a5dbff0bdce09985bbc65166db7335ea3617fd70733c745fc`

[打包验证](phase3-build-verification.json)确认桌面文件全部与 app.asar 一致。Phase 1 和 Phase 2 backup EXE 保留在 release/，Phase 3 尚未新建提交或 tag。

## Known Issues

- 当前主机 Windows 11 x64；Windows 10 实机尚未验证。
- 上游缺失可选 media/menu_click.ogg，沿用 Phase 1 的已知菜单点击音问题；可听扬声器输出未人工验证。
- 原生 Save/Open Dialog 在实际主进程中测试了 API 参数、筛选、取消和版本确认分支，自动化使用固定路径或 mock 原生 API；系统选择器和 Explorer 窗口的人工操作未验证。
- 导出/备份仅包含已提交状态，不能替代原游戏 Save and Exit；不增加自动保存当前地图功能。
- 格式 1 仅接受本应用固定三项 stored ZIP，最大 64 MiB；不支持第三方重打包的压缩 ZIP，也不自动迁移未知游戏 schema。原游戏当前使用 JSON 值，不对外来 Blob/Date 等非 JSON 存储提供转换。
- 手动与事务备份不自动轮换，需用户自行管理容量。
