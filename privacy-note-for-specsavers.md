# Clinic Worklist: how patient information is handled

I've made a small personal to-do app for my iPhone. At the end of an eye test I dictate the patient's number and the clinical action (for example "123456 refer cataract right eye routine"). Later I use the list on my phone to update the records myself. I'd like to check this is acceptable.

**What is recorded:** the patient number and the clinical action only, as text. The app has no fields for names, dates of birth, addresses or NHS numbers, and shows a reminder not to say them. No audio is ever saved.

**Where it is stored:** only in the iPhone's own browser storage. There is no server, account, cloud sync, analytics or export. Entries are deleted automatically after 7 days (adjustable), and ticked items can be cleared at any time.

**Network:** the app makes no network requests of its own. It blocks requests to any other website, both in its security settings and in its offline cache. It's a static web page loaded once from GitHub Pages; after that it runs offline.

**Speech to text:** the app uses the iPhone's built-in speech recognition (Apple dictation, through Safari), not any third-party service. Apple decides where that runs: depending on the iPhone model, iOS version and language, the audio is processed on the phone or sent to Apple's servers, the same as when using the dictation button on the iPhone keyboard. A web page can't force on-device processing. Apple's statement on dictation privacy: Settings › Siri › "About Siri, Dictation & Privacy…". If that isn't acceptable, the app has a "Type instead" option that involves no speech processing at all.
