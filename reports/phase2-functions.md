# Construct 2 Function 清单

325 个唯一名称；340 个 handler。high 表示用途有事件动作证据，尚不表示所有参数均经过实际游戏验证。low 的描述仅列出可观察动作，不根据名字断言用途。函数参数表达式与完整事件见 phase2-function-events.json。无参数读取也可能接受未使用参数。

## AddLog

- 相关控制：其他
- 参数读取索引：0；调用参数数量：未发现调用点
- 用途：事件证据：t374 action 366；t374 action 370；t185 action 118；t185 action 241
- 置信度：low
- 证据：Game_events SID 9824165862632036

## Airdrop_fall

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：未发现调用点
- 用途：事件证据：
- 置信度：low
- 证据：Game_events SID 191760526050343

## Bed_activated

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Count_sleep_hours；调用 client_log；设置变量 SleepApproved；t181 action 88；t342 action 47
- 置信度：low
- 证据：Game_events SID 760795525771502

## Bot_bandits_check_situation

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Spawn_bandit_camp；调用 Remove_bandit_bots
- 置信度：low
- 证据：Game_events SID 344331524151629

## Bot_check_situation

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t252 action 73；t262 action 109；t262 action 56；t262 action 55；t262 action 73
- 置信度：low
- 证据：Game_events SID 7471016689732121

## Bot_check_situation_bandit

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t832 action 160；t829 action 105；t829 action 173；t829 action 88；t187 action 111
- 置信度：low
- 证据：Game_events SID 743526371956285

## Bot_check_situation_f

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t529 action 105；t529 action 173；t529 action 73；t262 action 109；t262 action 56
- 置信度：low
- 证据：Game_events SID 7471016689732121

## Bot_check_situation_puncher

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t547 action 105；t547 action 173；t547 action 73；t262 action 109；t262 action 56
- 置信度：low
- 证据：Game_events SID 7471016689732121

## Bot_check_situation_team

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t1064 action 160；t1030 action 160；t556 action 105；t556 action 173；t187 action 114
- 置信度：low
- 证据：Game_events SID 7471016689732121

## Bot_drop

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t1030 action 88；t1030 action 160；t1030 action 137；t1030 action 197；t1030 action 47
- 置信度：low
- 证据：Game_events SID 5748233661044243

## Bot_friend_bailout

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t529 action 161；t529 action 243；t529 action 174；t529 action 197；t187 action 114
- 置信度：low
- 证据：Game_events SID 664258407281136

## Bot_friend_command_follow

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t181 action 73；t532 action 56；t532 action 57；t532 action 55；t529 action 161
- 置信度：low
- 证据：Game_events SID 471847288352153

## Bot_friend_command_guard

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t181 action 73；t532 action 56；t532 action 55；t529 action 161；调用 client_log
- 置信度：low
- 证据：Game_events SID 107765208834758

## Bot_friend_getincar

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t529 action 161；t529 action 174；t529 action 197；t529 action 62；t529 action 57
- 置信度：low
- 证据：Game_events SID 767112418398151

## Bot_team_check_situation

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Spawn_team_camp；调用 Remove_team_bots
- 置信度：low
- 证据：Game_events SID 314824265290189

## Bots_bandit_agro

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t831 action 62；t831 action 56；t831 action 55；t831 action 57
- 置信度：low
- 证据：Game_events SID 116816510537378

## Bots_team_agro

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Q_status；调用 Quest_canceled；t181 action 73；t737 action 57；t529 action 73
- 置信度：low
- 证据：Game_events SID 471842586694500

## Building_mode

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1, 2
- 用途：事件证据：设置变量 Building_mode；t573 action 57；t573 action 72；t193 action 73；t346 action 88
- 置信度：low
- 证据：Game_events SID 1025534786344989

## Bunker_erase

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 perk_friend；设置变量 inRaid；t193 action 47；t631 action 163；t785 action 106
- 置信度：low
- 证据：Game_events SID 408003652625104；Game_events SID 617637128916264

## Bunker_generate

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：设置变量 HotspotX；设置变量 HotspotY；设置变量 inRaid；设置变量 Rain；t187 action 182
- 置信度：low
- 证据：Game_events SID 305470436850518

## Bunker_spawn

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3, 4；调用参数数量：5
- 用途：事件证据：t975 action 88；t975 action 160；t975 action 161
- 置信度：low
- 证据：Game_events SID 531259728150068

## Button_push

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t856 action 88；t857 action 73；t857 action 75；t187 action 114；调用 TD_load_wave
- 置信度：low
- 证据：Game_events SID 481575264931491；Game_events SID 635263669852108

## Call_sub_menu

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13；调用参数数量：12, 14, 8, 4, 6, 2, 10
- 用途：事件证据：t293 action 118；t292 action 88；t292 action 99；t293 action 344；t293 action 336
- 置信度：low
- 证据：Game_events SID 7930174831245556

## Call_sub_menu_craft

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：调用 Hide_sub_menu；调用 Call_sub_menu；设置变量 qiyou_id
- 置信度：low
- 证据：Game_events SID 2396756424412191

## Car_respawn_hammer

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t920 action 109；t921 action 57；t920 action 73；t824 action 57；t824 action 88
- 置信度：low
- 证据：Game_events SID 992596827703911

## Car_respawn_ka

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1342 action 57；t1343 action 73；t824 action 57；t824 action 88；t810 action 57
- 置信度：low
- 证据：Game_events SID 410051924834415

## Car_respawn_uaz

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t809 action 109；t808 action 57；t808 action 73；t1175 action 57；t809 action 73
- 置信度：low
- 证据：Game_events SID 862359914595848

## Car_respawn_volga

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t815 action 109；t816 action 57；t816 action 73；t1177 action 57；t815 action 73
- 置信度：low
- 证据：Game_events SID 431593263530698

## Casual_Respawn_player

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Reload_locations；t342 action 84；t342 action 207；t342 action 121；t342 action 168
- 置信度：low
- 证据：Game_events SID 685977769226326

## Check_ach_unlocks

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1043 action 47；t1043 action 88；调用 Show_unlock；调用 GameCenter_achieves_report
- 置信度：low
- 证据：Game_events SID 9203919783584112

## Check_ammo_backpack

- 相关控制：inventory, reload
- 参数读取索引：0；调用参数数量：3
- 用途：事件证据：调用 client_log；调用 init_item_activation2；调用 Items_update；调用 init_item_activation
- 置信度：low
- 证据：Game_events SID 4111161104940819

## Check_ammo_inventory

- 相关控制：inventory, reload
- 参数读取索引：0, 1, 2；调用参数数量：1
- 用途：按弹药种类检索库存，再进入原换弹路径
- 置信度：high
- 证据：Game_events SID 3748026804839239

## Check_ammo_outerwear

- 相关控制：reload
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：调用 Check_ammo_vest；调用 init_item_activation2；调用 Items_update；调用 init_item_activation
- 置信度：low
- 证据：Game_events SID 8669647854765533

## Check_ammo_pants

- 相关控制：reload
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：调用 Check_ammo_outerwear；调用 init_item_activation2；调用 Items_update；调用 init_item_activation
- 置信度：low
- 证据：Game_events SID 3874146297270453

## Check_ammo_vest

- 相关控制：reload
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：调用 Check_ammo_backpack；调用 init_item_activation2；调用 Items_update；调用 init_item_activation
- 置信度：low
- 证据：Game_events SID 3403395365591073

## Check_bot_firearm

- 相关控制：shoot
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Remove_bot_firearm；调用 Spawn_firearm_bot
- 置信度：low
- 证据：Game_events SID 926100981547379

## Check_bot_friend

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Remove_bot_friend；调用 Spawn_friend_bot
- 置信度：low
- 证据：Game_events SID 819784947048973

## Check_bot_puncher

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Remove_bot_puncher；调用 Spawn_puncher_bot
- 置信度：low
- 证据：Game_events SID 660719805658600

## Check_craft

- 相关控制：其他
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：t189 action 272
- 置信度：low
- 证据：Game_events SID 8404227406772096

## Check_fire_cigarets

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 check_item_found；t189 action 272；t389 action 154；t388 action 154；t235 action 154
- 置信度：low
- 证据：Game_events SID 291301015010422

## Check_gl_avalible

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 check_item_exists；设置变量 state；t945 action 75；t945 action 160；t945 action 72
- 置信度：low
- 证据：Game_events SID 164179385728186

## Check_gl_obstacles

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t189 action 272
- 置信度：low
- 证据：Game_events SID 679893611554081

## Check_item_backpack

- 相关控制：inventory
- 参数读取索引：0, 1；调用参数数量：3
- 用途：事件证据：设置变量 check_item_found；调用 Items_update；t234 action 154；t198 action 154
- 置信度：low
- 证据：Game_events SID 6633395042052185

## Check_item_inventory

- 相关控制：inventory
- 参数读取索引：0, 1, 2；调用参数数量：2
- 用途：事件证据：调用 Check_item_pants；设置变量 check_item_found；调用 Items_update；t389 action 154；t388 action 154
- 置信度：low
- 证据：Game_events SID 5768589015397807

## Check_item_outerwear

- 相关控制：其他
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：调用 Check_item_vest；设置变量 check_item_found；调用 Items_update；t236 action 154；t228 action 154
- 置信度：low
- 证据：Game_events SID 732542982357222

## Check_item_pants

- 相关控制：其他
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：调用 Check_item_outerwear；设置变量 check_item_found；调用 Items_update；t235 action 154；t194 action 154
- 置信度：low
- 证据：Game_events SID 5597977116684253

## Check_item_vest

- 相关控制：其他
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：调用 Check_item_backpack；设置变量 check_item_found；调用 Items_update；t277 action 154；t276 action 154
- 置信度：low
- 证据：Game_events SID 6173495997913252

## Check_map_tip

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t422 action 224
- 置信度：low
- 证据：Game_events SID 350974245662269

## Check_night

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t240 action 163
- 置信度：low
- 证据：Game_events SID 245442339900310

## Check_space_backpack

- 相关控制：inventory
- 参数读取索引：0, 1, 2, 3；调用参数数量：4
- 用途：事件证据：调用 Pick_player_item；调用 client_log；调用 Spawn_drop_from_player；设置变量 properslotfound；调用 Check_stack_size
- 置信度：low
- 证据：Game_events SID 240035455345341

## Check_space_inventory

- 相关控制：inventory
- 参数读取索引：0, 1, 2, 3；调用参数数量：3, 2, 4
- 用途：事件证据：调用 Check_stack_size；调用 Check_space_pants；t1033 action 87；调用 Combine_ammo；调用 checkpile
- 置信度：low
- 证据：Game_events SID 2324199594797496

## Check_space_outerwear

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3；调用参数数量：4
- 用途：事件证据：调用 Check_space_vest；设置变量 properslotfound；调用 Check_stack_size；t1033 action 87；调用 Combine_ammo
- 置信度：low
- 证据：Game_events SID 4453309492654251

## Check_space_pants

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3；调用参数数量：4
- 用途：事件证据：调用 Check_space_outerwear；设置变量 properslotfound；调用 Check_stack_size；t1033 action 87；调用 Combine_ammo
- 置信度：low
- 证据：Game_events SID 9701800756687446

## Check_space_vest

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3；调用参数数量：4
- 用途：事件证据：调用 Check_space_backpack；设置变量 properslotfound；调用 Check_stack_size；t1033 action 87；调用 Combine_ammo
- 置信度：low
- 证据：Game_events SID 7787072839124623

## Check_stack_size

- 相关控制：其他
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：设置变量 Check_stack_count_ground；设置变量 Check_stack_count_pocket；设置变量 Check_stack_size；t231 action 294；t189 action 272
- 置信度：low
- 证据：Game_events SID 162010154329921

## Clear_bandit_camps

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t514 action 88
- 置信度：low
- 证据：Game_events SID 284487994368845

## Clear_pad

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Pad_switching；t520 action 47；t187 action 81；设置变量 Pad_on
- 置信度：low
- 证据：Game_events SID 7894940633725008

## Clear_team_camps

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t514 action 88
- 置信度：low
- 证据：Game_events SID 331127445595551

## Combine_ammo

- 相关控制：reload
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：t187 action 81；t187 action 114；t189 action 272；t235 action 154；调用 Check_space_inventory
- 置信度：low
- 证据：Game_events SID 7000606974658732

## Count_sleep_hours

- 相关控制：其他
- 参数读取索引：0；调用参数数量：0
- 用途：事件证据：设置变量 Starverate；设置变量 Thirstrate；设置变量 Foodlimit；设置变量 Waterlimit；设置变量 TimeAvalible
- 置信度：low
- 证据：Game_events SID 974086311952240

## Cut_arrays

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t187 action 111；t181 action 88；调用 Items_update；t625 action 72；t626 action 72
- 置信度：low
- 证据：Game_events SID 956631601523388

## Day_show_label

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：1
- 用途：事件证据：t187 action 81；t558 action 241；调用 unlock_char_19
- 置信度：low
- 证据：Game_events SID 2994106455760323

## Dead_screen

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：调用 GUI_hide_dpad；设置变量 gui_scale；设置变量 user_device_X_mid；设置变量 user_device_Y_mid；设置变量 user_device_X
- 置信度：low
- 证据：Game_events SID 3571230238231757

## Deploy_tent

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：未发现调用点
- 用途：事件证据：设置变量 Temporarystuff；t187 action 81；t181 action 88；t181 action 73；t397 action 56
- 置信度：low
- 证据：Game_events SID 765798888901491

## Detach_belt

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Check_space_inventory；t1030 action 88；t774 action 72；调用 checkpile
- 置信度：low
- 证据：Game_events SID 421164058042435

## Detach_grip

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Check_space_inventory；t1030 action 88；t949 action 72；调用 Switch_to_firearm；调用 set_wpn_dispersion_f
- 置信度：low
- 证据：Game_events SID 616922997378208

## Detach_scope

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Check_space_inventory；t1030 action 88；t768 action 72；调用 set_wpn_dispersion_f；调用 checkpile
- 置信度：low
- 证据：Game_events SID 739033031309976

## Detach_silencer

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Check_space_inventory；t1030 action 88；t769 action 72；调用 Switch_to_firearm；调用 set_wpn_dispersion_f
- 置信度：low
- 证据：Game_events SID 417289623598257

## Device_check

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 user_device_X；设置变量 user_device_Y；t362 action 47；设置变量 user_device_Y_mid；设置变量 gui_scale
- 置信度：low
- 证据：Game_events SID 750813040402794；Menu_Events SID 858806273832177

## Draw_pad

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t610 action 72；t520 action 163；t187 action 81；调用 close_inventory；调用 close_perks_menu
- 置信度：low
- 证据：Game_events SID 9613459391336836

## Drop_backpack

- 相关控制：inventory
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 160；t1030 action 137；t1030 action 88；t181 action 88；t1030 action 47
- 置信度：low
- 证据：Game_events SID 596668192020376；Game_events SID 620158115450093

## Drop_firearm

- 相关控制：shoot
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1 action 99；t768 action 99；t769 action 99；t774 action 99；t949 action 99
- 置信度：low
- 证据：Game_events SID 391028945976265；Game_events SID 5393653090152666

## Drop_helmet

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t181 action 88；t1030 action 160；t1030 action 137；t1030 action 88；t1030 action 47
- 置信度：low
- 证据：Game_events SID 3986174633875914

## Drop_melee

- 相关控制：attack
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 160；t1030 action 137；t1030 action 88；t1030 action 47；t1030 action 75
- 置信度：low
- 证据：Game_events SID 8770993780530118

## Drop_outerwear

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 160；t1030 action 137；t1030 action 88；t181 action 88；t1030 action 47
- 置信度：low
- 证据：Game_events SID 4032128882218101

## Drop_pants

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 160；t1030 action 137；t1030 action 88；t181 action 88；t1030 action 47
- 置信度：low
- 证据：Game_events SID 7795414536719574

## Drop_pistol

- 相关控制：shoot
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 160；t1030 action 137；t1030 action 88；t181 action 88；调用 one_handed_in_hands
- 置信度：low
- 证据：Game_events SID 868967313702583

## Drop_slot

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：调用 Spawn_drop_from_player；t228 action 154；t236 action 154；t187 action 81；t276 action 154
- 置信度：low
- 证据：Game_events SID 967333361312322

## Drop_vest

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 160；t1030 action 137；t1030 action 88；t181 action 88；t1030 action 47
- 置信度：low
- 证据：Game_events SID 9202852813264204

## EP_update

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t422 action 136
- 置信度：low
- 证据：Game_events SID 531182994145997

## Eject Battery

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Check_space_inventory；t1030 action 88；调用 items_update；调用 checkpile
- 置信度：low
- 证据：Game_events SID 237368492518907

## Eject_pistol

- 相关控制：shoot
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Check_space_inventory；t1030 action 88；设置变量 GUI_slot_bufer_counter；t187 action 81；调用 checkpile
- 置信度：low
- 证据：Game_events SID 613761028489336

## Equip_flare

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t181 action 73；t410 action 62；t410 action 88；t410 action 137；t410 action 57
- 置信度：low
- 证据：Game_events SID 4813525869906111

## Error_message

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：1, 2
- 用途：事件证据：调用 clear_error_message；t424 action 118；t414 action 84；t414 action 88；t414 action 73
- 置信度：low
- 证据：Login_events SID 4491070487051304

## Expierence

- 相关控制：其他
- 参数读取索引：0；调用参数数量：未发现调用点
- 用途：事件证据：
- 置信度：low
- 证据：Game_events SID 571800664853456

## FinalStand_generate

- 相关控制：其他
- 参数读取索引：0；调用参数数量：未发现调用点
- 用途：事件证据：设置变量 HotspotX；设置变量 HotspotY；设置变量 inRaid；设置变量 Rain；t187 action 182
- 置信度：low
- 证据：Game_events SID 113177369442063

## GUI_draw_vehicle

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t471 action 73；设置变量 isAim；t507 action 75；t507 action 72；t507 action 47
- 置信度：low
- 证据：Game_events SID 555389652221271

## GUI_erase_vehicle

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t256 action 131；t279 action 131；t400 action 131；t719 action 131；t720 action 131
- 置信度：low
- 证据：Game_events SID 947043827146555

## GUI_hide_dpad

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：隐藏原控制 UI
- 置信度：high
- 证据：Game_events SID 226788225963254

## GUI_info_popup_clear

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：2, 0
- 用途：事件证据：
- 置信度：low
- 证据：Game_events SID 796294119880853

## GUI_info_popup_show

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：t914 action 73；t917 action 343；t917 action 356；t6 action 99；t6 action 47
- 置信度：low
- 证据：Game_events SID 203245727234232

## GUI_show_dpad

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：恢复原控制 UI
- 置信度：high
- 证据：Game_events SID 606845616403155

## GUI_show_tutorial_tip

- 相关控制：其他
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：调用 GUI_hide_dpad；t225 action 73；t671 action 160；t671 action 73；t653 action 327
- 置信度：low
- 证据：Game_events SID 958839021098998

## Generate_quest

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Generate_quest_item；调用 check_item_exists；调用 Generate_quest_case
- 置信度：low
- 证据：Game_events SID 508568451570238

## Generate_quest_bandits

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：未发现调用点
- 用途：事件证据：设置变量 Q_task_id；设置变量 Bunker；设置变量 Boat；设置变量 Car；设置变量 Secret
- 置信度：low
- 证据：Game_events SID 643185864704699

## Generate_quest_case

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Q_target_sid；设置变量 Q_task_id；设置变量 Bunker；设置变量 Boat；设置变量 Car
- 置信度：low
- 证据：Game_events SID 946427270947794

## Generate_quest_item

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Q_target_sid；设置变量 Q_task_id；设置变量 Bunker；设置变量 Boat；设置变量 Car
- 置信度：low
- 证据：Game_events SID 619369878587524

## Gift_menu

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：调用 close_inventory；调用 close_perks_menu；调用 Clear_pad；设置变量 helpmenu_on；t848 action 73
- 置信度：low
- 证据：Game_events SID 632777502754755

## Gl_boom

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t947 action 73；t261 action 121；t261 action 207；t947 action 109；t273 action 109
- 置信度：low
- 证据：Game_events SID 273764979242553

## Global_respawn

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t296 action 72；t442 action 88；调用 Trigger_spawn；t525 action 199
- 置信度：low
- 证据：Game_events SID 388188595587361

## Global_respawn_TD

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：
- 置信度：low
- 证据：Game_events SID 427988906245361

## GotoSleep

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：设置变量 Statmultiplier；设置变量 StatTimeMultiplier；t181 action 87；t1247 action 75；设置变量 perk_pilao
- 置信度：low
- 证据：Game_events SID 242979671087187

## Hide_sub_menu

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：
- 置信度：low
- 证据：Game_events SID 5602611270100988

## Hit_effect

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：
- 置信度：low
- 证据：Game_events SID 3858777444767401

## Items_update

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 achieved；调用 unlock_char_8；调用 unlock_char_12；调用 unlock_wpn_deagle；t6 action 88
- 置信度：low
- 证据：Game_events SID 899906165070251；Game_events SID 259649045616293；Game_events SID 955489170436681；Game_events SID 206529162257509

## Karma

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：设置变量 char_unlock_14_progress；调用 unlock_char_14；设置变量 karma_points
- 置信度：low
- 证据：Game_events SID 604356122626061

## Level_change

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 qiehuan；调用 Check_item_inventory；调用 Save_loot；调用 client_log；t546 action 75
- 置信度：low
- 证据：Game_events SID 8294409464439039

## Level_menu

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：调用 close_inventory；调用 close_perks_menu；调用 Clear_pad；设置变量 helpmenu_on；t639 action 73
- 置信度：low
- 证据：Game_events SID 1265083545004611

## Load_bridge_element

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3, 4；调用参数数量：5, 4
- 用途：事件证据：t508 action 88；t318 action 72；t318 action 73；t345 action 72；t345 action 88
- 置信度：low
- 证据：Game_events SID 188790626923654

## Load_bridge_level

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 onBridge；设置变量 HotspotX；设置变量 HotspotY；设置变量 inRaid；调用 Zed_check
- 置信度：low
- 证据：Game_events SID 482054460208135

## Load_loot

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 string；t181 action 88；t181 action 87；t181 action 73；t1284 action 160
- 置信度：low
- 证据：Game_events SID 8065660783245603

## Mag_reload

- 相关控制：reload
- 参数读取索引：0, 1, 2；调用参数数量：2
- 用途：内部换弹执行阶段；参数控制时间/动画分支/pellets；不能替代带库存 guards 的 R 入口
- 置信度：high
- 证据：Game_events SID 5384543709695899

## Menu_main_draw_start

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t630 action 160；t630 action 88；t630 action 73；t415 action 118
- 置信度：low
- 证据：Menu_Events SID 372870248098466

## Menu_text_update_achieves

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t363 action 118；t364 action 118；t1043 action 73；t281 action 317；t281 action 56
- 置信度：low
- 证据：Menu_Events SID 999177012722659

## NPC_get_damage

- 相关控制：其他
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：t476 action 87；t609 action 84；t479 action 87；t616 action 87；t1062 action 87
- 置信度：low
- 证据：Game_events SID 865556630856137

## Options

- 相关控制：pause
- 参数读取索引：未发现；调用参数数量：0
- 用途：创建原暂停菜单，调用方设置暂停状态
- 置信度：high
- 证据：Game_events SID 1265083545004611

## Pad_load_page

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：t871 action 47；t871 action 57；t874 action 47；t874 action 57；t874 action 103
- 置信度：low
- 证据：Game_events SID 943440217112868；Game_events SID 7632683941336436

## Pick_inventory_item

- 相关控制：inventory, interaction
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：调用 Check_space_inventory
- 置信度：low
- 证据：Game_events SID 3524786551650812

## Pick_player_item

- 相关控制：interaction
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t181 action 197；t193 action 47；t181 action 47；调用 Hide_sub_menu；调用 Drop_melee
- 置信度：low
- 证据：Game_events SID 5927561196015282

## Player_check_targets

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Target_aim_uid；设置变量 dispersion_angle；t507 action 72；t507 action 160；t507 action 75
- 置信度：low
- 证据：Game_events SID 6778344140084263

## Player_get_hit

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：t181 action 88；设置变量 perk_sleep；设置变量 def_percent；设置变量 Dealt_damage；t181 action 106
- 置信度：low
- 证据：Game_events SID 5825591609025338

## Quest_canceled

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Q_status；设置变量 Q_reward_id；设置变量 Q_target_sid；设置变量 Q_task_id
- 置信度：low
- 证据：Game_events SID 771956424882102

## Quest_menu

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：调用 close_inventory；调用 close_perks_menu；调用 Clear_pad；设置变量 helpmenu_on；t848 action 73
- 置信度：low
- 证据：Game_events SID 567001397485880

## Quest_spawn_reward_box

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t514 action 73；t796 action 160；t796 action 56；t796 action 88；设置变量 secret_location_revealed
- 置信度：low
- 证据：Game_events SID 908646050311334

## Questbox_crack

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 randy；调用 Karma；设置变量 Q_status；t386 action 88；t564 action 88
- 置信度：low
- 证据：Game_events SID 824255588114194

## Radio_scan

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t629 action 73；t689 action 99；设置变量 New_game_minimap_tip；t187 action 81；设置变量 smth_found
- 置信度：low
- 证据：Game_events SID 366744068234562

## Recheck_inventory_cards

- 相关控制：inventory
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t13 action 72；t503 action 72；t503 action 47；t4 action 72；t504 action 72
- 置信度：low
- 证据：Game_events SID 133511104559086

## Reload_locations

- 相关控制：reload
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t225 action 73；调用 erase_map_location；调用 create_map_location
- 置信度：low
- 证据：Game_events SID 837778084141211；Game_events SID 4959923607871348

## Reload_locations_aftersave

- 相关控制：reload
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t193 action 73；调用 erase_map_location；调用 create_map_location；设置变量 HotspotX；设置变量 HotspotY
- 置信度：low
- 证据：Game_events SID 793361912924261

## Reload_locations_start

- 相关控制：reload
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t193 action 73；调用 create_map_location
- 置信度：low
- 证据：Game_events SID 1456743768298146

## Remove_bandit_bots

- 相关控制：movement
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t216 action 87
- 置信度：low
- 证据：Game_events SID 165961644444345

## Remove_bot_firearm

- 相关控制：movement, shoot
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：
- 置信度：low
- 证据：Game_events SID 2744266434520068

## Remove_bot_friend

- 相关控制：movement
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t712 action 75；t529 action 88；设置变量 friend_yes；设置变量 friend_tk；设置变量 friend_tk_s
- 置信度：low
- 证据：Game_events SID 856669100409152

## Remove_bot_puncher

- 相关控制：movement
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t547 action 88
- 置信度：low
- 证据：Game_events SID 8164529950740237

## Remove_team_bots

- 相关控制：movement
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Quest_canceled
- 置信度：low
- 证据：Game_events SID 368886393675748

## Replace_clear_slot

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3, 4, 5, 6；调用参数数量：7
- 用途：事件证据：调用 Replace_fit_slot；t228 action 154；t236 action 154；t276 action 154；t277 action 154
- 置信度：low
- 证据：Game_events SID 4968530110309809

## Replace_fit_slot

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3；调用参数数量：4
- 用途：事件证据：t189 action 272；设置变量 GUI_slot_bufer；设置变量 GUI_slot_bufer_counter；t228 action 154；t236 action 154
- 置信度：low
- 证据：Game_events SID 8099732282435878

## Replace_slot_ground

- 相关控制：其他
- 参数读取索引：0, 2, 3, 4, 5, 6；调用参数数量：7
- 用途：事件证据：调用 Drop_slot；t194 action 154；t235 action 154；t228 action 154；t236 action 154
- 置信度：low
- 证据：Game_events SID 772111039201607

## Restart_game

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 recount_achievements；t546 action 75；t507 action 75；设置变量 sav_checked；设置变量 Timer_ALL
- 置信度：low
- 证据：Game_events SID 3763965325798157

## Roll_tent

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Check_space_inventory；调用 dianli；设置变量 Temporarystuff；t187 action 81；t181 action 88
- 置信度：low
- 证据：Game_events SID 4662265555468058

## Save_loot

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 perk_jk；t492 action 241；设置变量 friend_yes；设置变量 perk_dc；设置变量 nvg_nj
- 置信度：low
- 证据：Game_events SID 768475149962931

## Save_run_progress

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t422 action 146
- 置信度：low
- 证据：Game_events SID 398740622982942

## Show_unlock

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：t1043 action 47；t1043 action 73；t354 action 72；t354 action 57；t1043 action 72
- 置信度：low
- 证据：Game_events SID 9101422979672560

## Show_unlock_char

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t187 action 81；t558 action 231；t558 action 118；t558 action 232；t558 action 234
- 置信度：low
- 证据：Game_events SID 322286374063404

## Show_unlock_wpn

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t187 action 81；t558 action 231；t558 action 118；t558 action 232；t558 action 234
- 置信度：low
- 证据：Game_events SID 468926042289809

## Sleep_menu_open

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t187 action 81；调用 close_inventory；调用 close_perks_menu；t610 action 72；t610 action 73
- 置信度：low
- 证据：Game_events SID 342492468195145

## Spawn_NPC

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3；调用参数数量：4, 3
- 用途：事件证据：设置变量 Spawn_offset；t216 action 83；t216 action 73；t256 action 47；t256 action 88
- 置信度：low
- 证据：Game_events SID 180375540292947

## Spawn_attack_wave

- 相关控制：attack
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：t984 action 97；t216 action 72
- 置信度：low
- 证据：Game_events SID 362575544431883

## Spawn_bandit_camp

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：1
- 用途：事件证据：t514 action 88
- 置信度：low
- 证据：Game_events SID 479173668948756

## Spawn_drop

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3, 4, 5, 189；调用参数数量：4, 5, 6, 3
- 用途：事件证据：t30 action 88；t30 action 83；t29 action 88；t29 action 83；t31 action 88
- 置信度：low
- 证据：Game_events SID 5418835019314848

## Spawn_drop_from_player

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3；调用参数数量：4
- 用途：事件证据：t202 action 88；t32 action 88；t34 action 88；t366 action 88；t368 action 88
- 置信度：low
- 证据：Game_events SID 40850173976167

## Spawn_firearm_bot

- 相关控制：shoot
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t254 action 73
- 置信度：low
- 证据：Game_events SID 816869688720880

## Spawn_friend_bot

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t254 action 73
- 置信度：low
- 证据：Game_events SID 938302763780472

## Spawn_puncher_bot

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t254 action 73
- 置信度：low
- 证据：Game_events SID 318676253367408

## Spawn_team_camp

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t514 action 88
- 置信度：low
- 证据：Game_events SID 133082475356618

## Spoiler_Heli

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0, 2
- 用途：事件证据：t1004 action 73；t1006 action 57；t187 action 114；t1004 action 109；设置变量 Spoiler_helicopter_done
- 置信度：low
- 证据：Game_events SID 459965693107348

## Sub_menu_highlight

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：未发现调用点
- 用途：事件证据：t292 action 72
- 置信度：low
- 证据：Game_events SID 635062984909321

## Switch_to_firearm

- 相关控制：shoot, weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：检查 primary 槽非空，切换槽 1、双手持枪、UI/散布更新
- 置信度：high
- 证据：Game_events SID 8756428701869769

## Switch_to_melee

- 相关控制：attack, weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：原武器切换：槽 0、按钮帧、持物/动画更新
- 置信度：high
- 证据：Game_events SID 8357157227448187

## Switch_to_pistol

- 相关控制：shoot, weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：检查 secondary 槽非空，切换槽 2、持枪、UI/散布更新
- 置信度：high
- 证据：Game_events SID 316962018178555

## TD_drop_help

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t711 action 126；t711 action 88
- 置信度：low
- 证据：Game_events SID 818388505807546；Game_events SID 111798959891863；Game_events SID 441071565898951

## TD_drop_weapons

- 相关控制：weapon
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t711 action 126；t711 action 88
- 置信度：low
- 证据：Game_events SID 999061074398052

## TD_load_wave

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t181 action 88；调用 Update_Stats；t906 action 73；t256 action 47；t256 action 88
- 置信度：low
- 证据：Game_events SID 914919051235214

## The_End

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t621 action 197；t181 action 161；t193 action 257；t193 action 258；t193 action 259
- 置信度：low
- 证据：Game_events SID 256591544741457

## Toggle NVG

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t187 action 81；t1030 action 88；t707 action 190；t240 action 160；调用 Check_night
- 置信度：low
- 证据：Game_events SID 6284485061111712

## Toggle torch

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t187 action 81；t92 action 88；t92 action 73；t261 action 57；t261 action 263
- 置信度：low
- 证据：Game_events SID 6698289101382889

## Trigger_spawn

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：调用 Spawn_drop；设置变量 randy；t218 action 73；t796 action 88
- 置信度：low
- 证据：Game_events SID 7952760861768009

## Tutorial_script_final

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t181 action 88；调用 Clear_pad；调用 close_perks_menu；调用 close_inventory；设置变量 Tutor_hint_onscreen
- 置信度：low
- 证据：Game_events SID 803815332169110

## Update_Stats

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t11 action 84；t2 action 84；t8 action 84；t3 action 84；t27 action 84
- 置信度：low
- 证据：Game_events SID 6090484104052963

## Wpn_cooldown

- 相关控制：weapon
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t938 action 75；t939 action 75；t939 action 275；t939 action 276；t939 action 269
- 置信度：low
- 证据：Game_events SID 212794549805475

## Zed_check

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1062 action 88；t849 action 88；t934 action 88；t716 action 88；t476 action 88
- 置信度：low
- 证据：Game_events SID 4887856514204788

## Zed_dodge

- 相关控制：其他
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：t256 action 161；t256 action 105；t256 action 109；t256 action 174；t256 action 173
- 置信度：low
- 证据：Game_events SID 300662354922573

## ach_move_text

- 相关控制：movement
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t371 action 58；t371 action 57
- 置信度：low
- 证据：Menu_Events SID 8485146971072874

## animation_redraw

- 相关控制：movement
- 参数读取索引：未发现；调用参数数量：0
- 用途：根据玩家原状态刷新动画
- 置信度：high
- 证据：Game_events SID 649116243220724

## baopi

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 client_log；t181 action 88；调用 Wpn_cooldown；t480 action 73；调用 Check_space_inventory
- 置信度：low
- 证据：Game_events SID 559040119760527

## box_weapon

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 88；t1030 action 47；调用 checkpile
- 置信度：low
- 证据：Game_events SID 111168925991337

## c4_boom

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：1
- 用途：事件证据：t1338 action 73；t273 action 88；t273 action 109
- 置信度：low
- 证据：Game_events SID 891620771582973

## camera_roll

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：调用 close_inventory；调用 close_perks_menu；调用 Clear_pad；调用 GUI_hide_dpad；t225 action 325
- 置信度：low
- 证据：Game_events SID 8241361262422337

## camera_roll_back

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Tutor_hint_blocked_gui；t1062 action 137；t296 action 137；t476 action 137；t442 action 137
- 置信度：low
- 证据：Game_events SID 2531058582172127

## camera_roll_menu

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 camera_roll_menu；t657 action 109；t657 action 161；t657 action 106
- 置信度：low
- 证据：Menu_Events SID 5283739633107587

## car_box

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 close_perks_menu；调用 Clear_pad；设置变量 bb_gui；设置变量 inventory_reloader；t181 action 161
- 置信度：low
- 证据：Game_events SID 787240265571276

## car_box_no

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1033 action 47
- 置信度：low
- 证据：Game_events SID 784941098822951

## car_box_yes

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t1033 action 62；t1033 action 88；调用 checkpile
- 置信度：low
- 证据：Game_events SID 188197338824694

## car_box_zb_no

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 47
- 置信度：low
- 证据：Game_events SID 151765044977078

## car_box_zb_yes

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t1030 action 62；t1030 action 57；t1030 action 88；调用 checkpile
- 置信度：low
- 证据：Game_events SID 352041274282950

## char_selet_outline_off

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t740 action 72
- 置信度：low
- 证据：Menu_Events SID 601382911346503

## check_ach_survivegod

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t173 action 88；调用 Check_ach_unlocks
- 置信度：low
- 证据：Game_events SID 816353895285849

## check_item_exists

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：设置变量 check_item_found；t189 action 272
- 置信度：low
- 证据：Game_events SID 5220729418493595

## check_item_max

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：设置变量 check_item_found；t189 action 272
- 置信度：low
- 证据：Game_events SID 831171368036175

## check_item_spend

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：设置变量 check_item_found；t189 action 272；t389 action 154；t388 action 154；t235 action 154
- 置信度：low
- 证据：Game_events SID 957019327427477

## check_lvl_bridge

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Enemies_nearby；调用 client_log
- 置信度：low
- 证据：Game_events SID 494356081271936

## check_lvl_change

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Enemies_nearby；调用 check_item_exists；调用 Level_menu；调用 check_item_max；调用 client_log
- 置信度：low
- 证据：Game_events SID 769501989646228

## check_map_edges

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t418 action 189；t208 action 189；t211 action 189
- 置信度：low
- 证据：Game_events SID 586609795756584

## checkpile

- 相关控制：interaction
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 gui_clearpile；t539 action 210；t539 action 199；设置变量 gui_pickpile_maxpage；设置变量 car_box_lb
- 置信度：low
- 证据：Game_events SID 7537935905760986

## chicken_sp

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：t1222 action 57；t1221 action 88；t1222 action 88；t1221 action 130；t1221 action 139
- 置信度：low
- 证据：Game_events SID 951688747695650

## clear_error_message

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：
- 置信度：low
- 证据：Login_events SID 4894831069619861

## clear_pause_menu

- 相关控制：pause
- 参数读取索引：未发现；调用参数数量：0
- 用途：恢复时间倍率，销毁暂停菜单，延迟清空 helpmenu_on
- 置信度：high
- 证据：Game_events SID 876276180942427

## clear_perkz

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t551 action 88
- 置信度：low
- 证据：Game_events SID 7393938541082541

## clear_tab_perks

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t753 action 353
- 置信度：low
- 证据：Game_events SID 381662533622701

## clear_tab_stats

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t753 action 353
- 置信度：low
- 证据：Game_events SID 847691547569839

## client_log

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：t474 action 116；t474 action 383；t474 action 57；t474 action 384；t474 action 385
- 置信度：low
- 证据：Game_events SID 2833097896176918

## close_inventory

- 相关控制：inventory
- 参数读取索引：未发现；调用参数数量：0
- 用途：关闭背包并清理 UI/拖动状态，恢复控制显示
- 置信度：high
- 证据：Game_events SID 905162597338779

## close_perks_menu

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 perkmenu_on；调用 GUI_show_dpad
- 置信度：low
- 证据：Game_events SID 6062213284710921

## create_map_element

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t508 action 88；t508 action 73；t184 action 73；t345 action 72；t184 action 88
- 置信度：low
- 证据：Game_events SID 7736925111997576

## create_map_location

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t867 action 88；t514 action 88；t508 action 88；t525 action 199；调用 create_map_element
- 置信度：low
- 证据：Game_events SID 883424076789016；Game_events SID 8627807469654645

## crow_fly

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t693 action 174；t693 action 280；t693 action 173；t693 action 88；t693 action 126
- 置信度：low
- 证据：Game_events SID 259018450158252

## d_lei1

- 相关控制：其他
- 参数读取索引：0；调用参数数量：0
- 用途：事件证据：t189 action 272；调用 client_log；t181 action 88；t181 action 106；t187 action 81
- 置信度：low
- 证据：Game_events SID 2175922693531284

## d_lei2

- 相关控制：其他
- 参数读取索引：0；调用参数数量：0
- 用途：事件证据：t189 action 272；调用 client_log；t181 action 88；t181 action 106；t187 action 81
- 置信度：low
- 证据：Game_events SID 330071806134744

## d_lei3

- 相关控制：其他
- 参数读取索引：0；调用参数数量：0
- 用途：事件证据：t189 action 272；调用 client_log；t181 action 88；t181 action 106；t187 action 81
- 置信度：low
- 证据：Game_events SID 610331637953213

## debug_hide_chars

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t740 action 208；t740 action 161；t740 action 163
- 置信度：low
- 证据：Menu_Events SID 722733657198837

## dianli

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1239 action 72；t1424 action 72；t785 action 88；t785 action 72；t1239 action 73
- 置信度：low
- 证据：Game_events SID 584694209715570

## dmg_hint

- 相关控制：其他
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：t1062 action 73；t536 action 126；t536 action 118；t536 action 329；设置变量 tutorZedFighted
- 置信度：low
- 证据：Game_events SID 947566610642077

## erase_map_element

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t508 action 88
- 置信度：low
- 证据：Game_events SID 185349761267888

## erase_map_location

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：t514 action 88；t525 action 199；调用 erase_map_element
- 置信度：low
- 证据：Game_events SID 4737519930673551

## fanghuafu_check

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 163；t61 action 163；t74 action 163；t1088 action 163；t1089 action 163
- 置信度：low
- 证据：Game_events SID 281509386225623

## fire_qu

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：t261 action 121；t900 action 97；t900 action 121；t901 action 97；t901 action 121
- 置信度：low
- 证据：Game_events SID 342789185655336

## friend_bb

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 88；t1030 action 208；t1030 action 137；t1030 action 57；t529 action 88
- 置信度：low
- 证据：Game_events SID 187551094574983

## friend_bx

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 137；t1030 action 57；t529 action 88；t1030 action 88
- 置信度：low
- 证据：Game_events SID 235509884521617

## friend_kz

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 88；t1030 action 208；t1030 action 137；t1030 action 57；t529 action 88
- 置信度：low
- 证据：Game_events SID 258165177680063

## friend_tk

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 88；t1030 action 208；t1030 action 137；t1030 action 57；t529 action 88
- 置信度：low
- 证据：Game_events SID 954176944511476

## friend_yf

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 88；t1030 action 208；t1030 action 137；t1030 action 57；t529 action 88
- 置信度：low
- 证据：Game_events SID 671025544955190

## from_loader

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t411 action 73；t665 action 169；t665 action 84；t665 action 47；t665 action 73
- 置信度：low
- 证据：Menu_Events SID 7188341391234074

## fs_byt_1

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Zed_dmg；设置变量 Zed_fast_dmg；设置变量 Zed_army_dmg
- 置信度：low
- 证据：Game_events SID 587157328650940

## fs_byt_2

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Zed_dmg；设置变量 Zed_fast_dmg；设置变量 Zed_army_dmg
- 置信度：low
- 证据：Game_events SID 256854207751193

## generate_array_locations

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 secret_location_spawned；设置变量 secret_location；设置变量 villages；设置变量 militaries；设置变量 gas_stations
- 置信度：low
- 证据：Game_events SID 6938246402369311

## generate_array_locations_TD

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 secret_location_spawned；设置变量 secret_location；设置变量 villages；设置变量 militaries；设置变量 gas_stations
- 置信度：low
- 证据：Game_events SID 138340901669044

## generate_array_roads_1

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Row；设置变量 anotherX；设置变量 anotherX2；t518 action 199
- 置信度：low
- 证据：Game_events SID 921061167763666；Game_events SID 218522443826106

## generate_array_roads_2

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Row；t703 action 210；设置变量 anotherX；设置变量 anotherX2；t518 action 199
- 置信度：low
- 证据：Game_events SID 484111970403648

## generate_array_tomap

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t514 action 88；设置变量 yes_1；设置变量 yes_2；设置变量 yes_3；设置变量 yes_4
- 置信度：low
- 证据：Game_events SID 1694439930581699

## generate_bunker_entrance

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t514 action 73；t785 action 47；t785 action 88；t785 action 72
- 置信度：low
- 证据：Game_events SID 659670773379791

## generate_helicrashes

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 helispawned；设置变量 hammerspawned；t514 action 88；t514 action 73；t344 action 47
- 置信度：low
- 证据：Game_events SID 924737797383123

## generate_location

- 相关控制：其他
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：设置变量 hotspotX；设置变量 hotspotY；设置变量 TilemapspotX；设置变量 TilemapspotY；t525 action 199
- 置信度：low
- 证据：Game_events SID 5017992314331459

## generate_mapgen_toelements

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 generate_location
- 置信度：low
- 证据：Game_events SID 7785053978136909

## generate_minimap

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t520 action 84；t520 action 73；t1098 action 47；t1098 action 57；t519 action 160
- 置信度：low
- 证据：Game_events SID 6302523114231127

## gui_clearpile

- 相关控制：interaction
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：
- 置信度：low
- 证据：Game_events SID 4305946926834817

## gui_showpile

- 相关控制：interaction
- 参数读取索引：0；调用参数数量：1
- 用途：事件证据：调用 gui_clearpile；设置变量 slots_filled；设置变量 full_panels；t569 action 163；t637 action 75
- 置信度：low
- 证据：Game_events SID 6779741347727959

## init_item_activation

- 相关控制：其他
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：调用 item_activate；t234 action 154；t198 action 154；t236 action 154；t228 action 154
- 置信度：low
- 证据：Game_events SID 1301737176667813

## init_item_activation2

- 相关控制：其他
- 参数读取索引：0, 1, 2；调用参数数量：3
- 用途：事件证据：调用 item_activate2；t234 action 154；t198 action 154；t236 action 154；t228 action 154
- 置信度：low
- 证据：Game_events SID 3059816892652346

## item_activate

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：t189 action 272；t187 action 111；t181 action 88；调用 Wpn_cooldown；t181 action 83
- 置信度：low
- 证据：Game_events SID 8381242860269222

## item_activate2

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：调用 client_log；t189 action 272；t1030 action 83；t181 action 88；调用 Wpn_cooldown
- 置信度：low
- 证据：Game_events SID 3890676334551161

## jiaoyi

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 money_1；设置变量 money_2；调用 close_inventory；调用 close_perks_menu；调用 Clear_pad
- 置信度：low
- 证据：Game_events SID 301293151094495

## loader_pic_setup

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t342 action 47；t342 action 103；t411 action 126；t665 action 126；t665 action 173
- 置信度：low
- 证据：Game_events SID 7446314620251445；Menu_Events SID 4411942911669095

## menu_clear

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：
- 置信度：low
- 证据：Menu_Events SID 4840337410468069

## menu_draw_achieves

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 menu_section；t426 action 118；t415 action 231；t415 action 336；t630 action 88
- 置信度：low
- 证据：Menu_Events SID 206819409511362

## menu_draw_character

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：未发现调用点
- 用途：事件证据：设置变量 menu_section；t426 action 118；t415 action 231；t415 action 336
- 置信度：low
- 证据：Menu_Events SID 680842477763542

## menu_draw_exit

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t639 action 73；t660 action 343；t630 action 88；t630 action 73；t415 action 118
- 置信度：low
- 证据：Menu_Events SID 408339871984184

## menu_draw_language

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 menu_section；t426 action 118；t415 action 231；t415 action 336；t630 action 88
- 置信度：low
- 证据：Menu_Events SID 895871040147501

## menu_draw_main

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 menu_section；t756 action 58；t422 action 224；设置变量 SEED_RUN；设置变量 SEED_morezeds
- 置信度：low
- 证据：Menu_Events SID 3982936664290626

## menu_draw_new

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：未发现调用点
- 用途：事件证据：设置变量 menu_section；t426 action 118；t415 action 231；t415 action 336；t630 action 88
- 置信度：low
- 证据：Menu_Events SID 859295602979660

## menu_draw_new_game

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 menu_section；t426 action 118；t415 action 231；t415 action 336；设置变量 SEED_RUN
- 置信度：low
- 证据：Menu_Events SID 5317338826398092

## menu_draw_new_game_gamemode

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 menu_section；t426 action 118；t415 action 231；t415 action 336；t630 action 88
- 置信度：low
- 证据：Menu_Events SID 338436884849691

## menu_draw_options

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 menu_section；t426 action 118；t415 action 231；t415 action 336；t630 action 88
- 置信度：low
- 证据：Menu_Events SID 611404084763296

## menu_draw_stick

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 gui_scale；t362 action 47；设置变量 menu_section；t411 action 75；设置变量 user_device_X
- 置信度：low
- 证据：Menu_Events SID 169770673992716

## noice

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3；调用参数数量：3, 4
- 用途：事件证据：t478 action 105；t478 action 109；t478 action 88；t478 action 174；t615 action 105
- 置信度：low
- 证据：Game_events SID 9136457099326052

## one_handed_in_hands

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Default_idle_anim_down；设置变量 Default_idle_anim_left；设置变量 Default_idle_anim_right；设置变量 Default_idle_anim_up
- 置信度：low
- 证据：Game_events SID 2021964277550402

## perks_hide_buyed

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t551 action 208；t551 action 163；t551 action 73；t970 action 72；t551 action 161
- 置信度：low
- 证据：Game_events SID 2823635935420925

## picky

- 相关控制：interaction
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Pick_player_item；调用 Pick_inventory_item
- 置信度：low
- 证据：Game_events SID 6285067262554528

## pig_sp

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：2
- 用途：事件证据：t1222 action 57；t1221 action 88；t1222 action 88；t1221 action 130；t1221 action 139
- 置信度：low
- 证据：Game_events SID 944199483461614

## pubg_set_zone

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 pubg_set_zone；t876 action 73；t877 action 88；t876 action 97；t876 action 88
- 置信度：low
- 证据：Game_events SID 263003230560249

## qc1

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 client_log；t187 action 114；调用 Spawn_drop；设置变量 perk_y0；设置变量 perk_y1
- 置信度：low
- 证据：Game_events SID 3625017209140399

## qc1_end

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 88；t1030 action 208；t1030 action 47
- 置信度：low
- 证据：Game_events SID 672094219225554

## qc2

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 client_log；t187 action 114；调用 Spawn_drop；设置变量 perk_k0；设置变量 perk_k1
- 置信度：low
- 证据：Game_events SID 6829731125381634

## qc2_end

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 88；t1030 action 208；t1030 action 47
- 置信度：low
- 证据：Game_events SID 790508580200943

## qc3

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 client_log；t187 action 114；调用 Spawn_drop；设置变量 perk_t0；设置变量 perk_t1
- 置信度：low
- 证据：Game_events SID 849787440175015

## qc3_end

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 88；t1030 action 208；t1030 action 47
- 置信度：low
- 证据：Game_events SID 224516789266661

## qiehuan

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t181 action 88；t628 action 72；t95 action 62；t95 action 88；t95 action 137
- 置信度：low
- 证据：Game_events SID 786644205874595

## qiehuangjz

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t181 action 88；t19 action 72；t1030 action 62；t1030 action 88；t1030 action 137
- 置信度：low
- 证据：Game_events SID 782330625809870

## qiehuangqx

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t181 action 88；t1 action 72；t1 action 99；t768 action 99；t769 action 99
- 置信度：low
- 证据：Game_events SID 782330625809870

## qiehuangsq

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t181 action 88；t24 action 72；t187 action 81；t1030 action 62；t1030 action 88
- 置信度：low
- 证据：Game_events SID 489542117351180

## recount_achievements

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：1, 0
- 用途：事件证据：t1043 action 47；t1043 action 57；t1043 action 88；t1043 action 72；t490 action 320
- 置信度：low
- 证据：Game_events SID 7961900910461118

## seed_decode

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 seedid；设置变量 SEED_stalker；设置变量 SEED_RUN；设置变量 SEED_Wildlife；设置变量 SEED_gunnerzeds
- 置信度：low
- 证据：Menu_Events SID 153779621618202

## seed_gunz

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t216 action 72
- 置信度：low
- 证据：Game_events SID 232281774594851

## seed_pubg_call_to_bots

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t555 action 62；t555 action 97；t831 action 62；t831 action 97；t226 action 62
- 置信度：low
- 证据：Game_events SID 113063891670655

## set_loader

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t411 action 73；t665 action 169；t665 action 84；t665 action 47；t411 action 62
- 置信度：low
- 证据：Loading_events SID 8454044013158848

## set_wpn_dispersion_car

- 相关控制：shoot, aim, weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 dispersion_angle_max；设置变量 dispersion_default；设置变量 dispersion_cooldown_step；设置变量 dispersion_pershot；设置变量 dispersion_run_penalty
- 置信度：low
- 证据：Game_events SID 533899303554992

## set_wpn_dispersion_f

- 相关控制：shoot, aim, weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 dispersion_angle_max；设置变量 dispersion_default；设置变量 dispersion_cooldown_step；设置变量 dispersion_pershot；设置变量 dispersion_run_penalty
- 置信度：low
- 证据：Game_events SID 413031251531079

## set_wpn_dispersion_p

- 相关控制：shoot, aim, weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 dispersion_angle_max；设置变量 dispersion_default；设置变量 dispersion_cooldown_step；设置变量 dispersion_pershot；设置变量 dispersion_run_penalty
- 置信度：low
- 证据：Game_events SID 474158843142732

## shengdan_box

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 randy；t386 action 88；t564 action 88；t385 action 88；t80 action 88
- 置信度：low
- 证据：Game_events SID 517995587672141

## show_tab_perks

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 clear_tab_stats；设置变量 Perkmenu_tab；t753 action 353；设置变量 HotspotX；设置变量 HotspotY
- 置信度：low
- 证据：Game_events SID 830038677941922

## show_tab_stats

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 clear_tab_perks；设置变量 Perkmenu_tab；t753 action 353；t632 action 73；t754 action 118
- 置信度：low
- 证据：Game_events SID 227735143718535

## two_handed_in_hands

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 Default_idle_anim_down；设置变量 Default_idle_anim_left；设置变量 Default_idle_anim_right；设置变量 Default_idle_anim_up
- 置信度：low
- 证据：Game_events SID 342695089384035

## unlock_char_10

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_10；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 916184079219421

## unlock_char_11

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_11；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 607763635487453

## unlock_char_12

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_12；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 408583304695462

## unlock_char_13

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_13；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 752570634763403

## unlock_char_14

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_14；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 555673592114669

## unlock_char_15

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_15；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 161238139261904

## unlock_char_16

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_16；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 695118645352583

## unlock_char_17

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_17；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 656535358517975

## unlock_char_18

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_18；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 920393472871166

## unlock_char_19

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_19；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 686823133078595

## unlock_char_20

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_20；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 576804768865388

## unlock_char_4

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_4；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 342337640420868

## unlock_char_5

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_5；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 673701121795563

## unlock_char_6

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_6；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 257422929574255

## unlock_char_7

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_7；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 911046727061036

## unlock_char_8

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_8；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 864118795091366

## unlock_char_9

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 char_unlock_9；t422 action 146；调用 Show_unlock_char
- 置信度：low
- 证据：Game_events SID 214944839091825

## unlock_wpn_aug

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 aug_unlock；t422 action 146；调用 Show_unlock_wpn
- 置信度：low
- 证据：Game_events SID 773341353919427

## unlock_wpn_deagle

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 deagle_unlock；t422 action 146；调用 Show_unlock_wpn
- 置信度：low
- 证据：Game_events SID 317108558398180

## unlock_wpn_katana

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 katana_unlock；t422 action 146；调用 Show_unlock_wpn
- 置信度：low
- 证据：Game_events SID 886064301957621

## unlock_wpn_mac10

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 mac10_unlock；t422 action 146；调用 Show_unlock_wpn
- 置信度：low
- 证据：Game_events SID 292404379232008

## unlock_wpn_mgl

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 mgl_unlock；t422 action 146；调用 Show_unlock_wpn
- 置信度：low
- 证据：Game_events SID 112737945296992

## unlock_wpn_saiga12

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 saiga12_unlock；t422 action 146；调用 Show_unlock_wpn
- 置信度：low
- 证据：Game_events SID 700927844775829

## unlock_wpn_sv98

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 sv98_unlock；t422 action 146；调用 Show_unlock_wpn
- 置信度：low
- 证据：Game_events SID 128606089964661

## unlock_wpn_vss

- 相关控制：weapon
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 vss_unlock；t422 action 146；调用 Show_unlock_wpn
- 置信度：low
- 证据：Game_events SID 644436515735248

## warn_zed

- 相关控制：其他
- 参数读取索引：0, 1, 2, 3, 4；调用参数数量：5
- 用途：事件证据：t256 action 105；t256 action 88；t256 action 173；t256 action 174；t256 action 109
- 置信度：low
- 证据：Game_events SID 87027259076358

## wiki

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 menu_section；设置变量 char_select_gap；设置变量 switching；调用 menu_clear；t422 action 146
- 置信度：low
- 证据：Menu_Events SID 681129657708265

## wiki_ui

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 wiki_2；t1207 action 88；t1207 action 72；t6 action 99；t6 action 88
- 置信度：low
- 证据：Menu_Events SID 913125334281320

## wuranqu

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1113 action 88；t1113 action 47；t836 action 137；t514 action 73；t1126 action 47
- 置信度：low
- 证据：Game_events SID 316200290612230

## xiexiajz

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 client_log；调用 Spawn_drop；调用 qiehuangjz；设置变量 perk_melee0；设置变量 perk_melee1
- 置信度：low
- 证据：Game_events SID 4755387740411929

## xiexiapj

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t1030 action 88；调用 set_wpn_dispersion_p；调用 Check_space_inventory
- 置信度：low
- 证据：Game_events SID 372647398317702

## xiexiaqx

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 client_log；调用 Spawn_drop；调用 qiehuangqx；设置变量 perk_gun0；设置变量 perk_gun1
- 置信度：low
- 证据：Game_events SID 597402818486474

## xiexiasq

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 client_log；调用 Spawn_drop；调用 qiehuangsq；设置变量 perk_pistol0；设置变量 perk_pistol1
- 置信度：low
- 证据：Game_events SID 714338869457695

## xx_beidai

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Switch_to_melee；设置变量 perk_beidai；调用 Check_space_inventory；调用 Spawn_drop；调用 qiehuangqx
- 置信度：low
- 证据：Game_events SID 750973714386036

## xx_kuabao

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t181 action 88；调用 qiehuan；设置变量 perk_kb；调用 Check_space_inventory；设置变量 perk_kb1
- 置信度：low
- 证据：Game_events SID 768091186844152

## xx_neiceng

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Check_space_inventory；设置变量 perk_neiceng1；设置变量 perk_neiceng2；t602 action 72；调用 checkpile
- 置信度：low
- 证据：Game_events SID 8256746254342412

## xx_skin

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：t623 action 72；t602 action 72；设置变量 skin_h；调用 Check_space_inventory
- 置信度：low
- 证据：Game_events SID 707100719568138

## xx_tuoqiangtao

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：调用 Switch_to_melee；设置变量 perk_qiangtao；调用 Check_space_inventory；调用 Spawn_drop；调用 qiehuangsq
- 置信度：low
- 证据：Game_events SID 726190491621724

## xx_tuoshoutao

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 perk_shoutao；调用 Check_space_inventory
- 置信度：low
- 证据：Game_events SID 304593263081717

## xx_tuoxie

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 perk_xie；调用 Check_space_inventory
- 置信度：low
- 证据：Game_events SID 423998029655065

## xx_tuoyao

- 相关控制：其他
- 参数读取索引：未发现；调用参数数量：0
- 用途：事件证据：设置变量 perk_yao；调用 Check_space_inventory；调用 Spawn_drop；调用 qiehuangjz；设置变量 perk_melee0
- 置信度：low
- 证据：Game_events SID 226158501833153

## zm

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：0
- 用途：事件证据：t189 action 272；调用 client_log；t181 action 73；t265 action 106；t265 action 121
- 置信度：low
- 证据：Game_events SID 8219457393320234

## zx1

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：0
- 用途：事件证据：t189 action 272；t187 action 81；t181 action 88；调用 Wpn_cooldown；t150 action 83
- 置信度：low
- 证据：Game_events SID 5604706359310846

## zx2

- 相关控制：其他
- 参数读取索引：0, 1；调用参数数量：0
- 用途：事件证据：t189 action 272；t187 action 81；t181 action 88；调用 Wpn_cooldown；t150 action 83
- 置信度：low
- 证据：Game_events SID 778263560963772
