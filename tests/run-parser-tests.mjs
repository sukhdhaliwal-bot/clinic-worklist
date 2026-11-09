// Runs the parser from index.html against tests/parser-cases.js.
// Usage (from the project folder):  node tests/run-parser-tests.mjs
// Writes tests/parser-results.md, a table you can check by hand.
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(here, "..", "index.html"), "utf8");
const m = html.match(/<script id="parser">([\s\S]*?)<\/script>/);
if (!m) { console.error('Could not find <script id="parser"> in index.html'); process.exit(1); }

const ctx = {};
vm.createContext(ctx);
vm.runInContext(m[1], ctx);
const { parseDictation, summarize } = ctx.CWLParser;
const cases = (await import("./parser-cases.js")).default;

let pass = 0;
const rows = [];
cases.forEach((c, i) => {
  const got = summarize(parseDictation(c.say));
  const ok = got.number === c.number && JSON.stringify(got.lines) === JSON.stringify(c.expect);
  if (ok) pass++;
  rows.push({ i: i + 1, c, got, ok });
  const mark = ok ? "PASS" : "FAIL";
  console.log(`${mark}  ${String(i + 1).padStart(2)}. ${c.about}`);
  if (!ok) {
    console.log(`      said:     ${c.say}`);
    console.log(`      expected: ${c.number} | ${c.expect.join(" | ")}`);
    console.log(`      got:      ${got.number} | ${got.lines.join(" | ")}`);
  }
});
console.log(`\n${pass} of ${cases.length} passed`);

const esc = (s) => String(s).replace(/\|/g, "\\|");
let md = `# Parser test results\n\n${pass} of ${cases.length} passed. Run on ${new Date().toISOString().slice(0, 10)} with \`node tests/run-parser-tests.mjs\`.\n\n`;
md += `Each row is one thing you might say. "Worklist rows" is what the app files it under. Check that each one is what you'd want.\n\n`;
md += `| # | What it tests | You say | Patient | Worklist rows | Result |\n| --- | --- | --- | --- | --- | --- |\n`;
for (const r of rows) {
  md += `| ${r.i} | ${esc(r.c.about)} | ${esc(r.c.say)} | ${esc(r.got.number)} | ${r.got.lines.map(esc).join("<br>")} | ${r.ok ? "Pass" : "**Fail**"} |\n`;
}
fs.writeFileSync(path.join(here, "parser-results.md"), md);
process.exit(pass === cases.length ? 0 : 1);
