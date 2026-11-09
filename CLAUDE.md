# Clinic Worklist

## Privacy rules (non-negotiable)

These come before everything else in this file. If a request conflicts with them, stop and ask Sukh.

- **Everything stays on the phone.** No backend, no accounts, no analytics, no external fonts or CDNs. The app makes no network requests of its own. The only files it loads are its own (`index.html`, `manifest.webmanifest`, `sw.js`, `icons/`, `fonts/`), from the same place it is served.
- **The service worker blocks outside requests.** Any request to another origin gets an error response. Keep it that way.
- **Voice uses only the browser's built-in speech recognition** (Safari's Web Speech API, which is Apple's dictation). No third-party speech or AI services: no Whisper, OpenAI, Google Cloud or similar. Always ask for on-device processing (`processLocally = true`) where the browser supports it.
- **Where the audio goes (tell Sukh plainly, never overstate it):** a web page cannot force Safari to keep audio on the phone. Depending on the iPhone model, iOS version and language, Apple may process it on the device or on Apple's servers, the same as keyboard dictation. Safari currently ignores the on-device request.
- **Never store audio.** Only the text transcript is saved.
- **Patient number plus clinical action only.** The reminder "Never say names or dates of birth" stays visible under the mic button. Never add fields for names, dates of birth, addresses or NHS numbers.
- **Data is temporary.** Ticked items clear with one tap. Anything older than the retention setting (default 7 days) is deleted automatically every time the app opens or comes back to the front.
- **Storage is on the device only:** `localStorage`, key `cwl.v1`. Never sync it anywhere. There is no export to the work PC by design.
- **Before installing any skill or tool, show Sukh what it is allowed to run.** Don't install anything else without asking.
- **Ask before publishing** (GitHub Pages on the `sukhdhaliwal-bot` account).

## What the app is

Sukh is a UK optometrist, new to coding. At the end of each eye test Sukh taps one big button and says the 6-digit patient number and what needs doing, with no typing. The app turns that into a sorted worklist. Later, at the work computer, Sukh reads the list on the phone and updates the records by hand.

Example dictations: "123456 refer cataract right eye routine", "234567 repeat visual fields 4 weeks, fields borderline", "345678 fields normal no action", "456789 glaucoma referral IOPs 28 and 30, OCT suspicious".

### v1 behaviour

0. **Big button mode (Settings › "Big button uses"):** default is **Keyboard mic**: the big button opens the text box with the iPhone keyboard up; Sukh taps the keyboard's own mic, speaks, and it saves by itself 2.5 s after the words stop. This exists because Safari's Web Speech API in a home-screen app gets stuck (mic shows live, returns no words) and a page reload does not clear it (seen in Sukh's screen recording, 9 Nov 2026). The **Safari speech** mode below is kept as an option.
1. (Safari speech mode) A huge mic button that fills most of the Dictate screen. Tap, wait for "Speak now" (shown only once Safari reports the mic is live), speak, and it stops by itself after a 2-second pause (or tap again to stop). In a home-screen app Safari gives each page load only one working mic session (later ones show as open but hear nothing), so after every mic session, heard or not, the page reloads itself and the toast (with a working Undo, carried in `sessionStorage` key `cwl.toast`, wiped on load) is shown on the fresh page. The app never starts the mic by itself, so this can't loop. If nothing is heard the toast says so. Never let it fail silently. It also reloads when it comes back after a minute away. Keep `continuous = false`: iPhone Safari hears nothing in continuous mode. Reloading is safe because the worklist is in localStorage. The entry is sorted and saved straight away, with no Add or Confirm step. A toast shows what was heard, with Undo for 6 seconds. "Type instead" is a small link for when Sukh can't speak aloud.
2. One entry per patient. Dictating the same number again on the same day adds the new actions to that entry.
3. The keyword parser turns text into the patient number plus tags. **All keywords and synonyms live in the `KEYWORDS` object at the top of the parser script in `index.html`.** Sukh can add phrases there without touching the logic.
4. Anything the parser can't match goes in **Unsorted** with the original text. Never drop words. A number that isn't exactly 6 digits still saves, flagged "Check number".
5. Worklist groups: **Referrals to write** (referrals, letter to GP), **Fields to book** (repeat fields), **To order** (CLs), **Records to update** (fields normal/abnormal, OCT review, recall, complete record, no action), **Unsorted**. Simple one-phrase actions live in `KEYWORDS.otherActions`, so new ones can be added there without touching the logic. Each row has a tick box, Edit, Copy, and the original dictation underneath.
6. If speech recognition isn't supported or the mic is refused, show a plain message and open the typing box.

## Tech rules

- One self-contained `index.html` with vanilla JS. No React, no build step, no npm packages in the app.
- `manifest.webmanifest` + `sw.js` so it installs to the home screen and works offline. Bump `CACHE` in `sw.js` whenever any cached file changes, and the version number shown in Settings to match.
- The parser lives in `<script id="parser">` inside `index.html` and must stay free of DOM code, because `tests/run-parser-tests.mjs` extracts and runs it in Node.
- Target: iPhone Safari, also from the home screen. Works at 360px wide with no sideways scroll. Tap targets at least 44px. Inputs at least 16px so iOS doesn't zoom. Never disable zoom.

## Design rules

- Match Lume, so the two apps feel like siblings. Tokens are copied from `/Users/sd/Documents/Lume/src/styles/tokens.css`. Read Lume, never change it.
- Colours: Lume's light and dark palettes (`--bg`, `--surface`, `--ink`, `--muted`, `--line`, `--accent` #5557F0 / #AFC0FF dark, ok/warn/bad for urgency, `--eye-r` blue and `--eye-l` orange for eye chips). Dark mode follows the phone setting.
- Type: Geist for text, Geist Mono for patient numbers, Outfit for headings, on Lume's scale (11, 13, 15, 17, 20, 24, 28–32px) and 8px spacing. Fonts are stored in `fonts/` (SIL OFL, see `fonts/LICENSE.txt`). Never load fonts from Google or any CDN.
- Radii 8px for controls and 14px for containers. Lume's violet-tinted shadows, for raised things only.
- Clean, minimal, clinical. Clarity over flair. No scroll or animation libraries (no GSAP, no Lenis). Short CSS transitions only (under 200 ms), off when Reduce Motion is on.
- Writing: plain UK English, short labels that say what happens ("Clear ticked", "Type instead").

## Testing

- `node tests/run-parser-tests.mjs` runs every case in `tests/parser-cases.js` and rewrites `tests/parser-results.md` (a table Sukh can check by hand). Add a case whenever a new phrase is added to `KEYWORDS`.
- Take phone-width screenshots (360px and 390px, light and dark) into `tests/screenshots/` with Playwright, and check there are no requests to other origins.

## Skills

Installed in `.claude/skills/` (sources and commits in `.claude/skills/SOURCES.txt`): mobile-native, apple-design, frontend-design, better-accessibility, better-interface, better-writing, impeccable (use `audit` and `polish`; its edit hooks stay off), playwright-cli. Sukh approved Impeccable's downloaded program on 9 Nov 2026.
