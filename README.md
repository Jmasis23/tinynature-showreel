# tinyNature — typographic showreel

A 15-second, 1920×1080 typographic motion study authored as seven deterministic HTML/GSAP scenes under one root timeline. Browser output is captured at 60 fps and assembled to H.264 MP4 with FFmpeg. No 3D engine, external footage, runtime clock, timers, or unseeded randomness are used.

Visible copy is deliberately restricted to **tinyNature**, **@Jmasis23**, **available for work**, and **MOTION DESIGN**. No résumé claims or interface labels are invented. The graphic language uses shared CSS tokens, oversized type, SVG hairlines, panels, and one 24×24 accent dot.

## Requirements

- Node.js 20+ and npm
- FFmpeg with `libx264`, AAC, and the `loudnorm` filter
- macOS or Linux (commands below use POSIX `sh`)

## Install (macOS / Linux)

```sh
git clone https://github.com/Jmasis23/tinynature-showreel.git
cd tinynature-showreel
npm install
npx playwright install chromium
ffmpeg -version
```

For missing Linux browser libraries, `npx playwright install-deps chromium` may be used (administrator privileges may be required).

## Preview and render

```sh
# Local preview at http://127.0.0.1:4173/film.html
npm run dev

# First render check: capture 5 seconds / 300 frames and encode output/test-5s.mp4
npm run test-render

# Full 15-second 1920×1080 master (900 PNG frames, then H.264 MP4)
npm run render

# Separate 1080×1920 center-crop master
npm run render:portrait

# Standalone scene pages: scenes/scene-01.html through scene-07.html
# Or load ?scene=1…7 on film.html
```

A render command starts and stops its own Vite server. PNG sequences go under ignored `output/`. Capture seeks `window.__film` to exact timestamps before each screenshot; it does not wait for playback.

## Contact sheet, frozen-time, and audio

```sh
npm run contact-sheet -- output/showreel.mp4 output/contact-sheet.png
npm run frozen-time

# Optional supplied music plus six generated, restrained cut whooshes
node scripts/mix-audio.mjs --video output/showreel.mp4 --music /path/to/music.wav \
  --out output/full-unmastered.mp4 --music-only-out output/music-only.mp4
sh scripts/loudness.sh output/full-unmastered.mp4 output/full.mp4
sh scripts/loudness.sh output/music-only.mp4 output/music-only-normalized.mp4

# Direct frame assembly, if needed
sh scripts/encode.sh output/frames output/showreel.mp4
```

`mix-audio.mjs` accepts a local music file; none is bundled. `--music` may be omitted to generate the six soft whooshes only. The mixer can write a separate music-only MP4 when `--music-only-out` is supplied with music. Loudness normalization targets -16 LUFS and -1 dBTP. Audio has not been mixed or measured in this source delivery.

## Determinism / handoff

`src/tokens.js` is the shared palette, scene map, and pixel handoff source. `src/scenes/scene-01.js` … `scene-07.js` mount isolated compositions. `src/film.js` puts the seven components on one paused GSAP master timeline. Use `window.__film.seek(seconds)` to repeat a state. The single persistent SVG dot is 24×24 in 1920×1080 stage pixels (top-left origin); a cubic Hermite path passes through each specified cut coordinate with continuous velocity at the handoffs.

## Kit review and honest status

This follows the [business-motion-film skill](https://github.com/echris6/motion-video-kit/blob/main/business-motion-film/SKILL.md), [motion grammar](https://github.com/echris6/motion-video-kit/blob/main/business-motion-film/references/motion-grammar.md), [quality bar](https://github.com/echris6/motion-video-kit/blob/main/business-motion-film/references/quality-bar.md), and [critic prompts](https://github.com/echris6/motion-video-kit/blob/main/business-motion-film/references/critic-prompts.md). `CRITIC.md` includes prompt templates and an honest review ledger. This repository delivery provides runnable source/scripts only. No browser capture, FFmpeg test render, pixel critique, audio measurement, or MP4 export has been run in the GitHub tool environment; do not claim a render occurred until those commands are run locally.
