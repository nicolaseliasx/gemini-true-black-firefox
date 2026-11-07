# Project

- Firefox Manifest V3 extension: a true black (OLED) theme for `gemini.google.com`. Firefox only.
- Preserve layout, content, interactions, images and syntax colors; change only the surfaces and contrast needed for the black theme.
- Keep permissions and code minimal: CSS for colors (palette tokens `--tb-*` at the top of `theme.css`) and one local script that only keeps the dark theme class, with no network or storage.
- Before changing the theme, run `sh tests/theme.test.sh` (needs Firefox headless and ImageMagick) and confirm a regression test fails; then make the smallest fix and run it again.
- After changing selectors, check the real Gemini in light and dark. The local fixture does not prove compatibility with the site's current DOM.
- `tests/theme-loop.test.js` (jsdom) guards against `theme.js` re-triggering its own MutationObserver. Run: `NODE_PATH=<dir with jsdom> node tests/theme-loop.test.js`.
