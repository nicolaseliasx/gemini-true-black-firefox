// Use Gemini's own dark palette for text and controls, regardless of its saved theme.
function forceDarkTheme(element) {
  if (!element.classList) return;
  if (!element.classList.contains("theme-host") && !element.classList.contains("light-theme")) return;
  if (element.classList.contains("light-theme")) element.classList.remove("light-theme");
  if (!element.classList.contains("dark-theme")) element.classList.add("dark-theme");
}

function forceDarkThemeInTree(root) {
  forceDarkTheme(root);
  root.querySelectorAll?.(".theme-host, .light-theme").forEach(forceDarkTheme);
}

forceDarkThemeInTree(document);
new MutationObserver((records) => {
  for (const record of records) {
    if (record.type === "attributes") {
      forceDarkTheme(record.target);
    } else {
      for (const node of record.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) forceDarkThemeInTree(node);
      }
    }
  }
}).observe(document, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ["class"]
});
