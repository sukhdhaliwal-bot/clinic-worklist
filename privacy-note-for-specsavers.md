# Clinic Worklist: how patient information is handled

I've made a small personal to-do app for my iPhone. At the end of an eye test I dictate the patient's number and the clinical action (for example "123456 refer cataract right eye routine"). Later I use the list on my phone to update the records myself. I'd like to check this is acceptable.

**What is recorded:** the patient number and the clinical action only, as text. The app has no fields for names, dates of birth, addresses or NHS numbers, and shows a reminder not to say them. No audio is ever saved.

**Where it is stored:** only in the iPhone's own browser storage. There is no server, account, cloud sync, analytics or export. Entries are deleted automatically after 7 days (adjustable), and ticked items can be cleared at any time.

**Network:** the app only ever downloads its own files (the page and the speech model) from GitHub Pages, to install and to pick up updates. It never sends patient information anywhere, and it blocks requests to any other website, both in its security settings and in its offline cache. Once installed it works offline.

**Speech to text:** by default the speech is turned into text **on the iPhone itself**, by a copy of OpenAI's open-source Whisper model stored inside the app. The audio is not sent anywhere (not to OpenAI, Apple or anyone else), is held in memory only for the few seconds it takes to transcribe, and is never saved. As backups, the app can instead use the iPhone's own dictation (keyboard mic or Safari), where Apple may process the audio on its servers depending on the iPhone and iOS version, or "Type instead", which involves no speech processing at all.
