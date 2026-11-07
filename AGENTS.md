# Project

- Firefox Manifest V3 extension: a true black (OLED) theme for `gemini.google.com`. Firefox only.
- Preserve layout, content, interactions, images and syntax colors; change only the surfaces and contrast needed for the black theme.
- Keep permissions and code minimal: CSS for colors (palette tokens `--tb-*` at the top of `theme.css`) and one local script that only keeps the dark theme class, with no network or storage.
- Before changing the theme, run `sh tests/theme.test.sh` (needs Firefox headless and ImageMagick) and confirm a regression test fails; then make the smallest fix and run it again.
- After changing selectors, check the real Gemini in light and dark. The local fixture does not prove compatibility with the site's current DOM.
- `tests/theme-loop.test.js` (jsdom) guards against `theme.js` re-triggering its own MutationObserver. Run: `NODE_PATH=<dir with jsdom> node tests/theme-loop.test.js`.
- Real-browser check without a Google login: `tests/e2e/` builds a Firefox ESR image (`docker build -t gtb-test tests/e2e`); run `docker run --rm -v "$PWD":/repo:ro -v <outdir>:/out -w /out gtb-test python /repo/tests/e2e/shot.py /out/shot.png` and inspect pixels with `magick`. It renders the signed-out Gemini, so logged-in-only UI (conversation list, search dialog) still needs a manual check.
- Gotchas: Marionette must install the extension as a packed XPI (a directory hangs); the Linux headless scrollbar is light unless `scrollbar-color` is set.
