# Network and dependency analysis

## Observed execution

Public URL: https://moyu-camp.info/mdz-cangshu-v233
Construct 2; 1024x768 logical canvas; jquery-3.4.1.min.js, c2runtime.js, data.js, image sprite sheets and OGG audio. The final browser capture reached the Chinese main menu. Large responses evicted by CDP were recovered using their already-observed URLs. Repeat captures replay existing files at their original URL; the resource inventory labels this limitation.

## Storage

Construct runtime supports IndexedDB `_C2SaveStates`, with localStorage `__c2save_mysave` fallback. The supplied HTML appends `_mdz-cangshu-v233` to IndexedDB names. localforage handles settings/unlocks/save-present flags and can fall back to localStorage. Normal Windows execution used IndexedDB for the actual save; one restricted test environment fell back to localStorage. This is why the base path and origin remain fixed. No cookies or server saves were observed as necessary for startup or the exercised single-player flow.

## Dependencies

| Category | Evidence | Desktop handling |
|---|---|---|
| A: required | Same-origin JS, images, OGG, data.js | Packaged under game/ |
| B: optional | sw.js/offline.js/offlineClient.js cache, appmanifest.json | Preserved; desktop has its own local resource delivery |
| B: optional online account | Static data.js references account.bistudio.com/api/user and /api/oauth/token | No requests seen in startup; blocked externally; no simulated account or authentication |
| C: advertising/analytics | None observed in captured startup | No new tracking added |
| D: external links | Facebook, VK, Bohemia store/account; HTML5 browser-help links | Navigation/new windows blocked |

No iframe, WebSocket, external font, CDN script or server-dependent game-data response was observed in the exercised startup flow. Runtime contains generic XHR and worker capabilities; that does not prove their use by this game. The audit reports literal references without treating all references as live network dependencies. Account requests were not invoked, so their payload/response are not claimed to have been examined.

## Offline delivery

app://minidayz/mdz-cangshu-v233/index.html maps to local game/. Standard, secure, fetch-capable and CORS-enabled scheme. All HTTP/HTTPS/WS/WSS requests are blocked in normal and offline-test modes. Browser storage is held under fixed userData. No game event, value or runtime logic was rewritten.
