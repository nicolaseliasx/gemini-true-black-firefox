"""Loads the real extension in Firefox ESR (Marionette) and screenshots the signed-out Gemini.

Usage (inside the tests/e2e image, repo mounted at /repo):
  python shot.py <out.png> [plain]     # "plain" skips the extension
No Google account, cookies or user data are involved.
"""
import base64, os, sys, time, zipfile
from marionette_driver.addons import Addons
from marionette_driver.marionette import Marionette

out = sys.argv[1]
with_ext = not (len(sys.argv) > 2 and sys.argv[2] == "plain")
os.environ["MOZ_HEADLESS"] = "1"

client = Marionette(bin="/usr/bin/firefox-esr", startup_timeout=90, prefs={"intl.accept_languages": "pt-BR"})
client.start_session()
if with_ext:
    xpi = "/tmp/ext.xpi"  # a packed XPI loads; a bare directory hangs
    with zipfile.ZipFile(xpi, "w") as z:
        for name in ("manifest.json", "theme.css", "theme.js"):
            z.write(f"/repo/{name}", name)
    Addons(client).install(xpi, temp=True)
client.set_window_rect(width=1400, height=900)
client.navigate("https://gemini.google.com/app")
time.sleep(12)
open(out, "wb").write(base64.b64decode(client.screenshot()))
try:
    client.cleanup()  # stops Firefox; without it the process can hang at exit
finally:
    os._exit(0)
