# Validation

## Passed

- Original site browser capture reached main menu and started single-player gameplay. Resources are local in game/.
- Electron offline startup reached main menu: no page exceptions, failed resource requests or external HTTP/HTTPS requests in reports/offline-test.json.
- Actual Electron restart retained both localStorage and IndexedDB test values: reports/save-persistence.json.
- Offline new game, map, mouse movement, inventory, pause and return-to-menu: visually confirmed, reports/sequential-*.png.
- Final portable EXE in-game save survived actual EXE restart: 912433-byte IndexedDB save, identical SHA-256 before/after; reports/gameplay-test.json (`portable:true`, `passed:true`, no critical errors). The restarted menu displayed Continue and the resumed-map screenshot restored the map.
- Windows x64 portable build produced release/MiniDayZ-Cangshu-v2.3.3-x64.exe. Actual launcher startup and offline menu screenshot passed; reports/portable-test.json. Assets passed JSON/signature checks; reports/asset-integrity.json. Release checksum: reports/release-sha256.json.

## Known issues and test limits

- Original website itself returns HTTP 404 for media/menu_click.ogg. This optional menu sound is also missing locally. It does not prevent menu operation, gameplay or save/resume; no replacement sound or game logic was introduced.
- Earlier gameplay test exited nonzero because it counted this original-site missing sound as a failure, even though save hash comparison passed. The current script separates this documented optional error from critical errors.
- Sandboxed command execution in this workspace caused Windows ACL-related renderer launch failures. Normal execution outside that restricted token succeeded; application sandbox remains enabled. No global ACL was changed.
- Windows 11 build host tested. Windows 10 was unavailable for independent testing.
- Audio files loaded locally; actual audible speaker output and all clips have not been independently verified.
- Long play, every map/item/NPC and combat behavior are not exhaustively tested.
- Online account/social links are unavailable offline. Gameplay keyboard enhancements are deferred pending complete phase-one acceptance. Original mouse/touch controls, F11 and Alt+Enter fullscreen are provided.

## Repeat

npm run test:offline
npm run test:save
node scripts/test-gameplay.js
node scripts/test-portable.js

To repeat actual portable gameplay/save verification in PowerShell: `$env:MINIDAYZ_TEST_PORTABLE='1'; node scripts/test-gameplay.js`.

Tests use separate directories under reports/, never the real user save directory. Desktop builds preserve %APPDATA%\MiniDayZ Cangshu PC\.
