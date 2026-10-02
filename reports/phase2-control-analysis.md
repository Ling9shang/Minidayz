# Phase 2 控制分析与实测

原始 `game/data.js` 与 `game/c2runtime.js` 保持不变。项目有 6 个 event sheet、1429 个对象类型、340 个 Function handler。证据保存在 phase2-function-events.json、phase2-touch-events.json 和运行时快照中。

## 移动
`Game_events / GUI / Mobile_GUI / Movement_wasd` 已存在：Keyboard t180 的 W/A/S/D 条件向 t193 的 AltMove 八方向行为提交 SimulateControl，方向为 0 左、1 右、2 上、3 下。行为保存字段 dx/dy、maxspeed、acc/dec 不需要更改。原 tap 和 stick 两个移动组同时存在，默认采用 tap。增强层在 AltMove 的原 tick 前提交相同 simulated input，并通过原 Stop action 松键停止。斜向速度、碰撞、加速保持行为实现。不会修改 GUI_control_type 设置。

## 攻击 / 射击
不存在可安全统一调用的 Attack Function。`Interaction / Firearm shooting` 的原 Touch t495 条件对攻击按钮 t505 同时处理 tap 和 held touch，事件 SID 7708888474205845、1671415525337555。条件包含死亡/特殊状态、helpmenu、Reloading_mag、Building_mode、tutorial block；弹药、射速和动画在子事件中处理。近战同一控制的其他事件也必须沿原输入路径检查。firearm 模式的 Space 调用原 Touch pointer handler；坐标从按钮实际对象、layerToCanvas 和 canvas offset 计算。

## 交互
`GUI / Mobile_GUI / Merged pick and interact`，按钮 t512，SID 8880091309135125；替代拾取按钮 t736，SID 622335141267763。入口进一步按原目标 UID、LOS/范围及物体类型选择开门、拾取、建筑等行为。未找到一个能替代整个入口的统一 Function。不会直接调用内部 Pick_inventory_item 或批量拾取。

## 背包
t497 的 tap 事件 SID 787240265571276，原 guards 控制打开/关闭；`close_inventory` 是清理 Function（SID 905162597338779），而不是完整 toggle。Tab 走 t497 原事件以保留所有 guards。

## 换弹
t522 的 TouchStartOnObject，SID 8302300112826202。按当前武器种类调用 Check_ammo_inventory，继而进入带参数的 Mag_reload。Mag_reload 是内部执行阶段，直接调用会绕开库存和武器条件，不能作为 R 入口。

## 武器
`Switch_to_melee` SID 8357157227448187；`Switch_to_firearm` 8756428701869769；`Switch_to_pistol` 316962018178555。三个 Function 都不需要参数，更新当前槽、UI、持枪和动画。外层必须保留原 switch-button 的 gameplay、building、tutorial 和特殊状态限制，并检查槽是否有物品。Q 使用 t509 原 tap 路径。

## 瞄准
t181 的 PlayerAim 是原 LOS 行为。原事件负责目标选择及武器散布，尚未证实存在鼠标位置决定射击角度的入口。t798 的 Zoom_test 为独立 zoom/scope 控件，不能凭名称把 X 实现为 Aim。保留原鼠标和自动目标选择；X 不映射。

## 暂停和状态
t288 的原 TouchStart 事件 SID 1982214218846053 同时打开和关闭暂停，Options Function 创建菜单，helpmenu_on 反映暂停状态。t630 的 cc[0] = 3 是 Resume。状态判断用当前 layout、玩家实例、生命/特殊状态、helpmenu_on、Inventory_opened、perkmenu_on、tutorial blockers 等；菜单/loading/death 不接收 gameplay 输入。

## 输入机制
优先级 1：已验证武器槽 Function。优先级 2：AltMove SimulateControl/Stop 原行为；按钮输入调用原 Touch.mm/lm/kg handler。按钮坐标由 layer.Ra 和 canvas offset 得出，不使用固定屏幕坐标，不按键逐帧创建 DOM event。所有 held touch 在 blur、菜单切换和 keyup 时取消。未使用 Priority 4。

## 实测修正及最终入口

原 Touch condition 273 是 OnTouchStartOnObject（Mq）；227 是 OnTapGestureObject（Su）；274 是 IsTouchingObject（zA）。适配器完整调用 mm / kg，所以原 start 和 tap 均按引擎顺序发生。按钮不以对象原点作为中心：原 HUD 大量使用角点 hotspot，实际点由 la() 更新后的 ka 边界中心、C.Ra() 和 canvas offset 得出，也支持系统 DPI。

近战明确属于 `Melee_2_auto`，该版本隐藏近战攻击按钮并自动近战；Space 使用原 runtime.TE 执行这个组，TE 保存/恢复 SOL、检查父事件 guards，并运行原目标选择、LOS、朝向、动画、伤害与冷却条件。不会造出一个新的近战伤害入口。鼠标和默认自动近战都保留。

移动的关键补充证据：`GUI / Mobile_GUI` 事件 SID 220131629839661，在 IsMoving 且无 touch 时会按 t506 目标写速度。其 action SID 9625642696643534 / 9930687941620704 会覆盖八方向输入，t506 不存在时甚至取坐标 0。键盘移动期间仅让这些原速度写入和 touch-movement 速度写入暂不执行；其他时间调用原 action。没有改变 event group ci、GUI_control_type、加速度、速度上限或碰撞。原 Stop action（862554514106281）松键/失焦归零。键盘第一次接管清除 t506 原点击移动标记及 run_touch_id，等同取消旧输入。动画在原 event sheet 之后用 animation_redraw 刷新。

运行时 Eg 表在初始化后释放；实际 action 函数须从 runtime.Hg[actionSID].Ac 读取。状态变量在模型异步加载完后才可缓存，适配器按 tD 长度变化刷新，避免启动早期空表。所有附加状态在闭包/页面中，原序列化器保存 Fa()，不会序列化这些函数包装或按键集合。

测试夹具的物品结构：ammo cc[1] 为数量，cc[2] 为原物品 ID；5.56 为 11、.45 为 12（由原 reload branch 的 Check_ammo_inventory 参数核对）。没有把换弹动画出现作为射击成功的唯一证据，额外验证原装弹、弹药消耗和原近战 swing 创建。

