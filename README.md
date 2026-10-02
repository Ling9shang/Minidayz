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

Original mouse and touch interface. F11 / Alt+Enter toggle fullscreen; Alt+F4 exits. Keyboard gameplay enhancements are deferred until complete gameplay verification.

## Capture and validation

`npm run capture` records requests from the public site. Already captured assets are served from disk to accelerate repeat captures; missing assets are retrieved only when requested by the browser. `node scripts/complete-assets.js` retries observed requests. `npm run audit` writes `reports/asset-audit.json`. `npm run test:offline` blocks all external HTTP/HTTPS/WebSocket requests. `npm run test:save` verifies localStorage and IndexedDB across actual Electron restarts using separate test profiles.

The application blocks external requests in normal mode as well. Node integration is disabled, context isolation and renderer sandbox are enabled. No preload bridge is needed. Only one instance can use a userData directory; opening the EXE again focuses its existing window.

## Upgrade

Back up the userData directory. Capture the new public version in a separate staging directory; compare assets and run offline and save tests before replacing game/. Preserve the existing origin and the base path for save compatibility; changing the site's version isolation suffix changes its database name. Do not automatically migrate saves between game versions without testing compatibility. Bump package version and artifact name after verification.

## Validation status

See reports/validation.md for results and remaining limitations. Actual portable EXE offline gameplay/save/restart verification passed in reports/gameplay-test.json; the saved state hashes match. The original public website returns 404 for menu_click.ogg, so that optional click sound is missing. Windows 10 and Windows 11 must be tested separately; this Windows 11 build host alone cannot establish both. Audible speaker output remains unverified.
