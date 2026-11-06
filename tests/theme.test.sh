#!/bin/sh
set -eu
root_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
test_dir=$(mktemp -d)
trap 'rm -rf "$test_dir"' EXIT
for mode in dark light; do
  profile_dir="$test_dir/profile-$mode"
  mkdir "$profile_dir"
  firefox --headless --no-remote --profile "$profile_dir" --window-size 1200,800 --screenshot "$test_dir/$mode.png" "file://$root_dir/tests/fixture.html?$mode" >/dev/null 2>&1
  for probe in 'main 500 80 srgb(0,0,0)' 'sidebar 100 200 srgb(0,0,0)' 'glow 750 300 srgb(0,0,0)' 'composer 750 580 srgb(27,27,27)' 'dark-theme 520 720 srgb(0,128,0)'; do
    set -- $probe
    actual=$(magick "$test_dir/$mode.png" -format "%[pixel:p{$2,$3}]" info: | sed 's/^srgba(/srgb(/; s/,1)$/)/')
    if [ "$actual" != "$4" ]; then
      printf '%s %s: expected %s, got %s\n' "$mode" "$1" "$4" "$actual" >&2
      exit 1
    fi
  done
done
printf 'theme screenshots: dark and light passed\n'
