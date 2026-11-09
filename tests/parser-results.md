# Parser test results

30 of 30 passed. Run on 2026-11-09 with `node tests/run-parser-tests.mjs`.

Each row is one thing you might say. "Worklist rows" is what the app files it under. Check that each one is what you'd want.

| # | What it tests | You say | Patient | Worklist rows | Result |
| --- | --- | --- | --- | --- | --- |
| 1 | Plain referral with eye and urgency | 123456 refer cataract right eye, routine | 123456 | Referrals to write: Refer: cataract (right, routine) | Pass |
| 2 | Repeat fields with timing, plus a result | 234567 repeat visual fields 4 weeks, fields borderline | 234567 | Fields to book: Fields: repeat (4 weeks)<br>Records to update: Fields: abnormal (borderline) | Pass |
| 3 | Normal result and no action | 345678 fields normal, no action | 345678 | Records to update: Fields: normal<br>Records to update: No action | Pass |
| 4 | Glaucoma referral with IOP readings and OCT | 456789 glaucoma referral, IOPs 28 and 30, OCT suspicious | 456789 | Referrals to write: Refer: glaucoma ("IOPs 28 and 30")<br>Records to update: OCT review (suspicious) | Pass |
| 5 | Number spoken as words | one two three four five six refer AMD left eye urgent | 123456 | Referrals to write: Refer: AMD (left, urgent) | Pass |
| 6 | Number with a space in it | 123 456 letter to GP about dry eyes | 123456 | Referrals to write: Letter to GP ("about dry eyes") | Pass |
| 7 | Two actions in one entry | 135790 repeat VF in 6 weeks also refer cataract both eyes routine | 135790 | Fields to book: Fields: repeat (6 weeks)<br>Referrals to write: Refer: cataract (both eyes, routine) | Pass |
| 8 | Only 5 digits (mistake) | 12345 refer cataract | 12345 | Unsorted: 12345, check number<br>Unsorted: Refer: cataract | Pass |
| 9 | Unknown phrase | 246802 check dry eye drops | 246802 | Unsorted: "check dry eye drops" | Pass |
| 10 | Referral with no condition, reason in the next part | 246813 refer to the hospital, flashes and floaters, urgent | 246813 | Referrals to write: Refer: other (urgent, "flashes and floaters") | Pass |
| 11 | Wet AMD without saying refer | 357913 wet AMD left emergency | 357913 | Referrals to write: Refer: AMD (wet AMD, left, emergency) | Pass |
| 12 | Recall | 998877 recall 6 months | 998877 | Records to update: Recall (6 months) | Pass |
| 13 | Dotted abbreviations V.F. and O.C.T. | 112233 V.F. normal O.C.T. normal no action | 112233 | Records to update: Fields: normal<br>Records to update: OCT: normal<br>Records to update: No action | Pass |
| 14 | Number with double, words and digits mixed | double one two two three three refer diabetic maculopathy soon | 112233 | Referrals to write: Refer: diabetic (soon) | Pass |
| 15 | Recall in a year plus OCT review | 500600 see in a year, OCT review | 500600 | Records to update: Recall (1 year)<br>Records to update: OCT review | Pass |
| 16 | R and L means both eyes, plus a GP letter | 801234 R and L cataracts refer routine, inform GP | 801234 | Referrals to write: Refer: cataract (both eyes, routine)<br>Referrals to write: Letter to GP | Pass |
| 17 | Retinal detachment referral | 778899 refer retinal detachment left eye emergency | 778899 | Referrals to write: Refer: other (retinal detachment, left, emergency) | Pass |
| 18 | Only the number | 654321 | 654321 | Unsorted: "(nothing after the number)" | Pass |
| 19 | No number at all | right eye routine | no number | Unsorted: no number, check number<br>Unsorted: "right eye routine" | Pass |
| 20 | Fields result, then repeat in its own part (4/52) | 314159 humphrey borderline right eye, repeat in 4/52 | 314159 | Records to update: Fields: abnormal (borderline, right)<br>Fields to book: Fields: repeat (right, 4 weeks) | Pass |
| 21 | Double oh in the number | seven seven eight nine double oh refer cataract left | 778900 | Referrals to write: Refer: cataract (left) | Pass |
| 22 | OCT repeat and glaucoma suspect | 102030 o c t repeat 3 months, glaucoma suspect refer routine | 102030 | Records to update: OCT review (3 months)<br>Referrals to write: Refer: glaucoma (routine, "suspect") | Pass |
| 23 | Unknown phrase with an eye after it | 246802 check dry eye drops, right eye | 246802 | Unsorted: "check dry eye drops, right eye" | Pass |
| 24 | CL order on its own | 123456 order CLs | 123456 | To order: Order CLs | Pass |
| 25 | Fields, CL order and record to complete in one | 234567 fields normal, order up contact lenses, complete record | 234567 | Records to update: Fields: normal<br>To order: Order CLs<br>Records to update: Complete record | Pass |
| 26 | Referral plus a record to complete | 345678 refer cataract right eye routine, records need completing | 345678 | Referrals to write: Refer: cataract (right, routine)<br>Records to update: Complete record | Pass |
| 27 | Dotted C.L.s with an eye | 456789 C.L.s to order left eye | 456789 | To order: Order CLs (left) | Pass |
| 28 | CL type kept (dailies) plus recall | 567890 order dailies both eyes also recall 1 year | 567890 | To order: Order CLs (dailies, both eyes)<br>Records to update: Recall (1 year) | Pass |
| 29 | Toric CLs for one eye | 789012 order CLs toric right eye | 789012 | To order: Order CLs (toric, right) | Pass |
| 30 | Notes to finish | 678901 finish notes | 678901 | Records to update: Complete record | Pass |
