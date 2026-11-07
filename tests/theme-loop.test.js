// Regression: theme.js must not keep rewriting classes it has already fixed,
// otherwise its own MutationObserver re-triggers forever and slows Firefox down.
// Run: NODE_PATH=<dir with jsdom> node tests/theme-loop.test.js
const { JSDOM } = require("jsdom");
const fs = require("fs");
const path = require("path");

const dom = new JSDOM('<div class="theme-host light-theme"></div>', { runScripts: "outside-only", pretendToBeVisual: true });
const { window } = dom;
const host = window.document.querySelector(".theme-host");

let classWrites = 0;
new window.MutationObserver((records) => { classWrites += records.length; })
  .observe(host, { attributes: true, attributeFilter: ["class"] });

window.eval(fs.readFileSync(path.join(__dirname, "..", "theme.js"), "utf8"));

// A light-theme element added later (Gemini rebuilds parts of its UI) must be fixed too.
setTimeout(() => {
  const late = window.document.createElement("div");
  late.className = "theme-host light-theme";
  window.document.body.append(late);
  window.late = late;
}, 50);

setTimeout(() => {
  const late = window.late;
  if (!late.classList.contains("dark-theme") || late.classList.contains("light-theme")) {
    console.error("FAIL: late element is not dark"); process.exit(1);
  }
  const ok = host.classList.contains("dark-theme") && !host.classList.contains("light-theme");
  if (!ok) { console.error("FAIL: host is not dark"); process.exit(1); }
  if (classWrites > 2) { console.error(`FAIL: ${classWrites} class writes (loop)`); process.exit(1); }
  console.log(`ok: ${classWrites} class write(s)`);
  process.exit(0);
}, 300);
