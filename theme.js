// Keeps Gemini's own dark palette active, whatever theme the account has saved.
// Only toggles CSS classes; nothing is read, stored or sent anywhere.
const HOST = "theme-host";
const LIGHT = "light-theme";
const DARK = "dark-theme";

function forceDark(element) {
  const { classList } = element;
  if (!classList || !(classList.contains(HOST) || classList.contains(LIGHT))) return;
  classList.remove(LIGHT);
  classList.add(DARK);
}

function forceDarkInTree(root) {
  forceDark(root);
  root.querySelectorAll?.(`.${HOST}, .${LIGHT}`).forEach(forceDark);
}

forceDarkInTree(document);

new MutationObserver((records) => {
  for (const record of records) {
    if (record.type === "attributes") {
      forceDark(record.target);
      continue;
    }
    for (const node of record.addedNodes) {
      if (node.nodeType === Node.ELEMENT_NODE) forceDarkInTree(node);
    }
  }
}).observe(document, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"]
});
