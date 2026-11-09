// Parser test cases: what you say, and what the worklist should show.
// Each line in "expect" is one worklist row: "Group: Action (details)".
// Run with: node tests/run-parser-tests.mjs
export default [
  {
    about: "Plain referral with eye and urgency",
    say: "123456 refer cataract right eye, routine",
    number: "123456",
    expect: [
      "Referrals to write: Refer: cataract (right, routine)",
    ],
  },
  {
    about: "Repeat fields with timing, plus a result",
    say: "234567 repeat visual fields 4 weeks, fields borderline",
    number: "234567",
    expect: [
      "Fields to book: Fields: repeat (4 weeks)",
      "Records to update: Fields: abnormal (borderline)",
    ],
  },
  {
    about: "Normal result and no action",
    say: "345678 fields normal, no action",
    number: "345678",
    expect: [
      "Records to update: Fields: normal",
      "Records to update: No action",
    ],
  },
  {
    about: "Glaucoma referral with IOP readings and OCT",
    say: "456789 glaucoma referral, IOPs 28 and 30, OCT suspicious",
    number: "456789",
    expect: [
      "Referrals to write: Refer: glaucoma (\"IOPs 28 and 30\")",
      "Records to update: OCT review (suspicious)",
    ],
  },
  {
    about: "Number spoken as words",
    say: "one two three four five six refer AMD left eye urgent",
    number: "123456",
    expect: [
      "Referrals to write: Refer: AMD (left, urgent)",
    ],
  },
  {
    about: "Number with a space in it",
    say: "123 456 letter to GP about dry eyes",
    number: "123456",
    expect: [
      "Referrals to write: Letter to GP (\"about dry eyes\")",
    ],
  },
  {
    about: "Two actions in one entry",
    say: "135790 repeat VF in 6 weeks also refer cataract both eyes routine",
    number: "135790",
    expect: [
      "Fields to book: Fields: repeat (6 weeks)",
      "Referrals to write: Refer: cataract (both eyes, routine)",
    ],
  },
  {
    about: "Only 5 digits (mistake)",
    say: "12345 refer cataract",
    number: "12345",
    expect: [
      "Unsorted: 12345, check number",
      "Unsorted: Refer: cataract",
    ],
  },
  {
    about: "Unknown phrase",
    say: "246802 check dry eye drops",
    number: "246802",
    expect: [
      "Unsorted: \"check dry eye drops\"",
    ],
  },
  {
    about: "Referral with no condition, reason in the next part",
    say: "246813 refer to the hospital, flashes and floaters, urgent",
    number: "246813",
    expect: [
      "Referrals to write: Refer: other (urgent, \"flashes and floaters\")",
    ],
  },
  {
    about: "Wet AMD without saying refer",
    say: "357913 wet AMD left emergency",
    number: "357913",
    expect: [
      "Referrals to write: Refer: AMD (wet AMD, left, emergency)",
    ],
  },
  {
    about: "Recall",
    say: "998877 recall 6 months",
    number: "998877",
    expect: [
      "Records to update: Recall (6 months)",
    ],
  },
  {
    about: "Dotted abbreviations V.F. and O.C.T.",
    say: "112233 V.F. normal O.C.T. normal no action",
    number: "112233",
    expect: [
      "Records to update: Fields: normal",
      "Records to update: OCT: normal",
      "Records to update: No action",
    ],
  },
  {
    about: "Number with double, words and digits mixed",
    say: "double one two two three three refer diabetic maculopathy soon",
    number: "112233",
    expect: [
      "Referrals to write: Refer: diabetic (soon)",
    ],
  },
  {
    about: "Recall in a year plus OCT review",
    say: "500600 see in a year, OCT review",
    number: "500600",
    expect: [
      "Records to update: Recall (1 year)",
      "Records to update: OCT review",
    ],
  },
  {
    about: "R and L means both eyes, plus a GP letter",
    say: "801234 R and L cataracts refer routine, inform GP",
    number: "801234",
    expect: [
      "Referrals to write: Refer: cataract (both eyes, routine)",
      "Referrals to write: Letter to GP",
    ],
  },
  {
    about: "Retinal detachment referral",
    say: "778899 refer retinal detachment left eye emergency",
    number: "778899",
    expect: [
      "Referrals to write: Refer: other (retinal detachment, left, emergency)",
    ],
  },
  {
    about: "Only the number",
    say: "654321",
    number: "654321",
    expect: [
      "Unsorted: \"(nothing after the number)\"",
    ],
  },
  {
    about: "No number at all",
    say: "right eye routine",
    number: "no number",
    expect: [
      "Unsorted: no number, check number",
      "Unsorted: \"right eye routine\"",
    ],
  },
  {
    about: "Fields result, then repeat in its own part (4/52)",
    say: "314159 humphrey borderline right eye, repeat in 4/52",
    number: "314159",
    expect: [
      "Records to update: Fields: abnormal (borderline, right)",
      "Fields to book: Fields: repeat (right, 4 weeks)",
    ],
  },
  {
    about: "Double oh in the number",
    say: "seven seven eight nine double oh refer cataract left",
    number: "778900",
    expect: [
      "Referrals to write: Refer: cataract (left)",
    ],
  },
  {
    about: "OCT repeat and glaucoma suspect",
    say: "102030 o c t repeat 3 months, glaucoma suspect refer routine",
    number: "102030",
    expect: [
      "Records to update: OCT review (3 months)",
      "Referrals to write: Refer: glaucoma (routine, \"suspect\")",
    ],
  },
  {
    about: "Unknown phrase with an eye after it",
    say: "246802 check dry eye drops, right eye",
    number: "246802",
    expect: [
      "Unsorted: \"check dry eye drops, right eye\"",
    ],
  },
  {
    about: "CL order on its own",
    say: "123456 order CLs",
    number: "123456",
    expect: [
      "To order: Order CLs",
    ],
  },
  {
    about: "Fields, CL order and record to complete in one",
    say: "234567 fields normal, order up contact lenses, complete record",
    number: "234567",
    expect: [
      "Records to update: Fields: normal",
      "To order: Order CLs",
      "Records to update: Complete record",
    ],
  },
  {
    about: "Referral plus a record to complete",
    say: "345678 refer cataract right eye routine, records need completing",
    number: "345678",
    expect: [
      "Referrals to write: Refer: cataract (right, routine)",
      "Records to update: Complete record",
    ],
  },
  {
    about: "Dotted C.L.s with an eye",
    say: "456789 C.L.s to order left eye",
    number: "456789",
    expect: [
      "To order: Order CLs (left)",
    ],
  },
  {
    about: "CL type kept (dailies) plus recall",
    say: "567890 order dailies both eyes also recall 1 year",
    number: "567890",
    expect: [
      "To order: Order CLs (dailies, both eyes)",
      "Records to update: Recall (1 year)",
    ],
  },
  {
    about: "Toric CLs for one eye",
    say: "789012 order CLs toric right eye",
    number: "789012",
    expect: [
      "To order: Order CLs (toric, right)",
    ],
  },
  {
    about: "Notes to finish",
    say: "678901 finish notes",
    number: "678901",
    expect: [
      "Records to update: Complete record",
    ],
  },
];
