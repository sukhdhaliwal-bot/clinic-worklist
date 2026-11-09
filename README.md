# Clinic Worklist

A small phone app: after each eye test, tap the big button and say the patient number and what needs doing. It turns that into a sorted to-do list. Everything stays on your phone.

## Putting it on your iPhone's home screen

The app has to be opened from a web address once. After that it works from the home screen, even with no signal.

1. On your iPhone, open **Safari** (it must be Safari, not Chrome) and go to the app's address. Once it's published, that will be `https://sukhdhaliwal-bot.github.io/clinic-worklist/`.
2. Tap the **Share** button (the square with an arrow pointing up) at the bottom of the screen.
3. Scroll down and tap **Add to Home Screen**.
4. Leave the name as "Worklist" and tap **Add**.
5. Open it from the new icon. The first time you tap the mic, iPhone asks to use the microphone and speech recognition. Tap **Allow**.

If the mic button does nothing or shows a message:

- Check **Settings › Siri › Dictation** (or **Settings › General › Keyboard › Enable Dictation** on older iOS) is on.
- Check **Settings › Safari › Microphone** is set to Ask or Allow.
- If dictation still won't work from the home-screen icon, open the same address in a normal Safari tab instead. Some iOS versions only allow speech recognition there. "Type instead" always works.

## Using it

- **Dictate:** tap, wait for the button to say **Speak now**, then say e.g. "123456 refer cataract right eye routine" and pause. It saves by itself. Tap **Undo** on the message if it misheard.
- **CLs and records:** say "order CLs" (or "order dailies", "order contact lenses") and it goes under **To order**. Say "complete record" or "finish notes" and it goes under **Records to update**.
- **Same patient again:** say the same number again the same day and the new actions are added to that patient.
- **Worklist:** tick things off as you do them, then tap **Clear ticked**. Anything older than 7 days is deleted automatically (change this in Settings).
- **Never say names or dates of birth.** Patient number and clinical action only.

## Teaching it new phrases

Open `index.html` in any text editor. Near the top is the block that starts `const KEYWORDS = {`. Each list is plain words in quotes. Add your phrase to the right list, save, then check it with:

```
node tests/run-parser-tests.mjs
```

Add an example of the new phrase to `tests/parser-cases.js` so it stays tested. The results table is in `tests/parser-results.md`.

## Where the voice goes

The app uses Safari's built-in speech recognition (Apple dictation). The app itself never sends anything anywhere and never keeps audio, only the text. Apple turns the speech into text: depending on the iPhone model, iOS version and language, that happens on the phone or on Apple's servers, the same as keyboard dictation. A web page can't force it to stay on the phone. See `privacy-note-for-specsavers.md`.
