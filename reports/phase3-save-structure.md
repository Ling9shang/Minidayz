# Phase 3：真实存档结构

检查日期：2026-10-03。基线：Phase 2 tag v2.3.3-desktop-phase2。只使用隔离测试 profile，未打开正式玩家 profile。实际数据库探测见 phase3-storage-probe.json。

## userData 与来源

应用调用 app.getPath("userData")；正常运行此机器返回 C:\Users\Lenovo\AppData\Roaming\MiniDayZ Cangshu PC，即 %APPDATA%\MiniDayZ Cangshu PC。测试显式重定向到 F:\Game\MiniDayZ-Cangshu-PC\reports\phase3-*-profile。

游戏 origin 始终是 app://minidayz/mdz-cangshu-v233/。原 index.html 对 IndexedDB.open 追加 _mdz-cangshu-v233；游戏页调用数据库基础名，独立存储页使用实际名称，避免重复追加。

| 物理位置（相对 userData） | 实测用途 | 是否进入归档 |
|---|---|---|
| IndexedDB/app_minidayz_0.indexeddb.leveldb/ | 两个原游戏数据库共享的 Chromium LevelDB，包含 CURRENT、MANIFEST、日志和锁 | 读取原逻辑记录；不复制 LevelDB 文件 |
| IndexedDB/app_minidayz_0.indexeddb.blob/2/00/b | 实测原 C2 存档的大字符串由 Chromium 外置存储 | IndexedDB API 读取会包含字符串；不复制 blob 文件 |
| Local Storage/leveldb/ | 同一游戏 origin 的 localStorage；实测有效游戏进度在 IndexedDB，仍完整保留同 origin 的字符串键值及 C2 fallback | 是，逻辑键值 |
| Network/Cookies、Network/Cookies-journal | Chromium cookie 容器；隔离离线游戏检查 document.cookie 长度为 0 | 否 |
| Session Storage/ | 会话存储；探测游戏 sessionStorage 键为空 | 否 |
| Preferences、Local State | Chromium/Electron 设置，不是原游戏进度 | 否 |
| Cache、GPUCache、Code Cache、ShaderCache、GrShaderCache、Dawn*、Shared Dictionary | Chromium 资源、GPU、代码和着色器缓存 | 否 |
| blob_storage、WebStorage、DIPS、DevToolsActivePort、LOCK、LOG | 浏览器工作数据、运行期元数据或调试文件 | 否 |
| settings.json | 新增桌面设置，独立于原游戏存档 | 否 |
| backups/ | 应用生成的归档，避免递归打包 | 否 |
| save-transaction.json | 导入事务恢复日志，仅在未完成事务期间保留 | 否 |

## 原 schema

| 数据库 | version | store | keyPath | autoIncrement / indexes | 内容 |
|---|---:|---|---|---|---|
| _C2SaveStates_mdz-cangshu-v233 | 1 | saves | slot | false / 无 | mysave → {slot:"mysave", data:原 C2 JSON 字符串} |
| localforage_mdz-cangshu-v233 | 2 | keyvaluepairs | null | false / 无 | gamesav_v7、CONTROLS、SOUNDS、解锁、统计等原键值 |

localforage 还有空的 local-forage-detect-blob-support 辅助 store，属于库能力探测，不含游戏记录。创建全新数据库时按原 version 和 store 定义重建；既有数据库不升级、不删除数据库、不改变 schema。导入只 clear/put 原存档 store。

原 C2 data 字符串逐字保存，解析仅作有效性校验，不重写内部内容；不能向原 save 加入键盘或桌面配置。localforage 的原随机 userID 是原游戏数据，在 payload 中原样保留，manifest 不增加用户名、机器名、绝对路径或 IP。

## 备份边界

运行中的 Chromium LevelDB 有锁、日志和外置 blob；直接复制部分物理文件存在不一致风险。本阶段采用逻辑快照：暂停原游戏，等待原 IndexedDB readonly 事务完成，flushStorageData，读取上述两个数据库及游戏 origin localStorage。归档只含固定三份 JSON，不包含整个 userData。

导入先验证 ZIP，再创建 userData/save-stage-* 独立临时目录，仅写入固定白名单 JSON，重新读取并校验。替换之前销毁游戏页、备份原逻辑状态、写入事务日志。写入后读取核对 logicalSaveHash，成功才重新启动游戏页；失败恢复原状态。临时目录在 finally 清理。异常中断留下事务日志时，下次启动先恢复备份并验证，成功后才打开游戏。

导出、手动和自动备份均为已经提交到 IndexedDB/localStorage 的状态。当前地图尚未执行原 Save and Exit 的内存进度不会被桌面工具强行写入；需要保存当前进度时先使用原游戏保存功能。
