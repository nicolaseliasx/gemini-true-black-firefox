// Keeps Gemini's own dark palette active, whatever theme the account has saved.
// Only toggles CSS classes; nothing is read, stored or sent anywhere.
const HOST = "theme-host";
const LIGHT = "light-theme";
const DARK = "dark-theme";
const SELECTOR = `.${HOST}, .${LIGHT}`;

// Writes only when needed, so our own change never wakes the observer again.
function forceDark(element) {
  const { classList } = element;
  if (classList.contains(LIGHT)) classList.remove(LIGHT);
  if (!classList.contains(DARK)) classList.add(DARK);
}

function sweep() {
  document.querySelectorAll(SELECTOR).forEach(forceDark);
}

// Gemini's DOM changes constantly while it streams answers: coalesce into one sweep per frame.
let scheduled = false;
function scheduleSweep() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(() => {
    scheduled = false;
    sweep();
  });
}

sweep();

new MutationObserver((records) => {
  for (const record of records) {
    if (record.type === "childList") {
      if (record.addedNodes.length) return scheduleSweep();
    } else if (record.target.classList.contains(LIGHT)) {
      return scheduleSweep();
    }
  }
}).observe(document, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"]
});
