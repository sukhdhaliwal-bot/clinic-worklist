# Clinic Worklist

A small phone app: after each eye test, tap the big button and say the patient number and what needs doing. It turns that into a sorted to-do list. Everything stays on your phone.

## Putting it on your iPhone's home screen

The app has to be opened from a web address once. After that it works from the home screen, even with no signal.

1. On your iPhone, open **Safari** (it must be Safari, not Chrome) and go to the app's address. Once it's published, that will be `https://sukhdhaliwal-bot.github.io/clinic-worklist/`.
2. Tap the **Share** button (the square with an arrow pointing up) at the bottom of the screen.
3. Scroll down and tap **Add to Home Screen**.
4. Leave the name as "Worklist" and tap **Add**.
5. Open it from the new icon **while on Wi-Fi** the first time: it downloads the speech model (about 75 MB) once and keeps it. The first time you tap the mic, iPhone asks to use the microphone. Tap **Allow**.

If the mic button does nothing or shows a message:

- Check **Settings › Siri › Dictation** (or **Settings › General › Keyboard › Enable Dictation** on older iOS) is on.
- Check **Settings › Safari › Microphone** is set to Ask or Allow.
- If dictation still won't work from the home-screen icon, open the same address in a normal Safari tab instead. Some iOS versions only allow speech recognition there. "Type instead" always works.

## Using it

- **Dictate:** tap the big button, say e.g. "123456 refer cataract right eye routine", then pause. It shows "Working…" for a moment and saves by itself. Tap **Undo** on the message if it misheard. If it ever misbehaves, Settings › "Big button uses" can switch to **Keyboard mic** (tap the big button, then the keyboard's mic) or Safari speech.
- **CLs and records:** say "order CLs" (or "order dailies", "order contact lenses") and it goes under **To order**. Say "complete record" or "finish notes" and it goes under **Records to update**.
- **Same patient again:** say the same number again the same day and the new actions are added to that patient.
- **Worklist:** tick things off as you do them, then tap **Clear ticked**. Anything older than 7 days is deleted automatically (change this in Settings).
- **Never say names or dates of birth.** Patient number and clinical action only.

## Getting updates

When a new version is published, close the app (swipe it away) and open it again, on Wi-Fi if you can. It may take two opens. The version number is at the bottom of **Settings**, so you can check which one your phone has. The speech model is only downloaded once; updates don't download it again.

## Teaching it new phrases

Open `index.html` in any text editor. Near the top is the block that starts `const KEYWORDS = {`. Each list is plain words in quotes. Add your phrase to the right list, save, then check it with:

```
node tests/run-parser-tests.mjs
```

If the speech-to-text keeps writing a word wrongly (e.g. "glycolma" for glaucoma), add it to `soundsLike` at the top of the same block: what it writes on the left, what you meant on the right.

Add an example of the new phrase to `tests/parser-cases.js` so it stays tested. The results table is in `tests/parser-results.md`.

## Where the voice goes

By default the app turns speech into text **on the phone itself**, using OpenAI's Whisper model stored inside the app. The audio never leaves the phone and is thrown away as soon as it has been turned into text. If you switch to Keyboard mic or Safari speech in Settings, Apple does the speech to text instead, which may happen on Apple's servers. See `privacy-note-for-specsavers.md`.
