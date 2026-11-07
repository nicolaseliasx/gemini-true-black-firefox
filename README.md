# Gemini True Black

A Firefox extension that gives [Gemini](https://gemini.google.com) a **true black (OLED) dark theme**.

Gemini's own dark mode uses dark greys. This extension replaces them with pure `#000` backgrounds on the sidebar, chat area and menus, so the interface blends into the screen on OLED displays, with subtle raised surfaces for the input box and selected items.

- **Always dark.** Works regardless of the light/dark setting in Gemini or your Google account, and never changes that saved preference.
- **Nothing else changes.** Layout, features, images and syntax-highlighting colors are preserved.
- **Firefox only.** Built and tested for Firefox (Manifest V3); other browsers are not supported.

## Install

Download the latest `.xpi`/`.zip` from the [Releases](../../releases) page. Firefox requires add-ons to be signed by Mozilla for permanent installation in release builds; unsigned builds can be loaded in Firefox Developer Edition, Nightly or ESR with `xpinstall.signatures.required` set to `false`.

## Privacy

The extension only injects CSS and toggles theme classes on `gemini.google.com`. It does not read your conversations, make network requests or store any data.
