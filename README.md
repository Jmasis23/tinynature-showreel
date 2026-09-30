# tinyNature — typographic showreel

A 15-second, deterministic GSAP typography study assembled from seven HTML/GSAP scene modules on one paused master timeline. The composition is authored at 1920×1080, 60 fps (900 frames); the browser renderers seek the timeline to exact timestamps and capture PNG sequences. FFmpeg scripts can encode those sequences as silent H.264 MP4s. There is no 3D engine, external footage, runtime clock, timer-driven animation, or random scene behavior in the source.

The main entry point is [`film.html`](film.html). Run it through Vite for the local preview; the standalone [`scene-01.html`](scene-01.html) through [`scene-07.html`](scene-07.html) pages provide per-scene play/pause and frame-seek controls. The master also accepts `?scene=1` through `?scene=7` for an isolated scene view.

## Brand tokens

Shared values are defined in [`src/tokens.js`](src/tokens.js) and [`src/styles.css`](src/styles.css).

| Token | Value | Use |
| --- | --- | --- |
| Ink | `#202532` | Primary type and strokes |
| Secondary | `#667085` | Supporting text |
| Tertiary | `#98A1B2` | Quiet glyph details |
| Accent | `#3559A8` | Persistent handoff dot, rules and selected details |
| Accent soft | `#EDF2FC` | Pale blue scene surfaces |
| Line | `#E8EBF0` | Hairlines, panel and grid borders |
| Canvas | `#F7F8FA` | Neutral background |
| Type | `-apple-system`, BlinkMacSystemFont, `SF Pro Display`, `SF Pro Text`, `Helvetica Neue`, sans-serif | Shared system font stack |

The design-space canvas is 1920×1080; the handoff dot is 24×24. Scene durations and dot knots are data in `src/tokens.js`, rather than separate per-scene clocks.

## Seven-scene storyboard

The scene modules are in [`src/scenes/`](src/scenes/); the master mounts them in order in [`src/film.js`](src/film.js). Scene times below use the master timeline. The persistent accent dot follows a cubic-Hermite path through the listed knots; its centered tangents preserve matching incoming/outgoing velocity at each cut. Coordinates are the dot's top-left in the 1920×1080 design space.

| # | Master time | Typographic beat | Dot handoff (start → end) |
| --- | --- | --- | --- |
| 1 | 0–1.9s | A pale-blue title card sets `tinyNature` over a hairline and `MOTION DESIGN`; the wordmark scales forward toward the cut. | (330, 610) → (1480, 336) |
| 2 | 1.9–4.0s | An oversized wordmark, selection frame and horizontal rules shift into a thin fragment/rail, opening into the glyph-study grid. | (1480, 336) → (1512, 622) |
| 3 | 4.0–6.0s | Six drawn glyph studies appear in a grid; one is framed and enlarged as the surrounding grid recedes. A rail leads into the next scene. | (1512, 622) → (954, 242) |
| 4 | 6.0–8.2s | A giant `N` is traced by a blue diagonal Bézier stroke, then the letter stretches toward the transition. | (954, 242) → (408, 524) |
| 5 | 8.2–10.2s | The individual letters of `tinyNature` gather from scattered positions inside a rounded outline; an accent underline extends at the exit. | (408, 524) → (1450, 786) |
| 6 | 10.2–12.3s | Four oversized wordmark panels rise into view, slide apart, and give way to a centered `tinyNature` lead wordmark. | (1450, 786) → (960, 158) |
| 7 | 12.3–15.0s | Closing lockup: `MOTION DESIGN`, `tinyNature`, a rule, `@Jmasis23`, and `available for work`. The final layout remains on screen at the end. | (960, 158) → (1510, 902) |

## Install and preview

Requirements: Node.js 20 or newer, npm, Playwright's Chromium browser, and FFmpeg with the `libx264` encoder for MP4 assembly. On Linux, Playwright browser system libraries may also be needed.

**UNVERIFIED — these commands were not executed while updating this README.**

```sh
npm install
npx playwright install chromium
ffmpeg -version
# Confirm the H.264 encoder is available:
ffmpeg -hide_banner -encoders | grep libx264
# Optional local preview (Vite reports the local URL):
npm run dev
```

## Rendering

**UNVERIFIED — the following commands were not executed.** The checked-in direct scripts are documented here; see [Repository command-status notes](#repository-command-status) before relying on package-script aliases.

### Smoke render (one still, not a five-second clip)

```sh
node scripts/render-test.cjs
```

This opens `film.html`, seeks to 2.0 seconds, and writes/checks `frames/test.png`. It does **not** render a five-second clip or encode a video. There is no checked-in five-second test-clip renderer in the inspected `scripts/` directory.

### Full 16:9 master

```sh
node scripts/render-film.cjs
bash scripts/build-mp4.sh
```

The renderer captures 900 deterministic PNGs at 60 fps to `frames/frame-0000.png` … `frames/frame-0899.png` at 1920×1080. The encoder reads that sequence and writes `out/tinynature-showreel.mp4` using `libx264`/`yuv420p` with fast-start metadata. The encoding script uses `-an`, so this is a silent video.

### Portrait render

```sh
node scripts/render-portrait.cjs
bash scripts/build-portrait.sh
```

This captures 900 frames at 60 fps with a 1080×1920 viewport into `portrait/frame-0000.png` … `portrait/frame-0899.png`; the tall viewport uses the existing 16:9 design at cover scale, so the portrait result is a center crop, not a separately reflowed layout. The encoder writes the silent `out/tinynature-showreel-portrait.mp4`.

### Contact sheet

After rendering the master frames:

```sh
bash scripts/contact-sheet.sh
```

This selects frames 0, 75, 150, …, 825 and writes a 4×3 grid to `out/contact-sheet.png`.

### Frozen-time inspection

After rendering the master frames:

```sh
bash scripts/frozen-time.sh
```

The script uses FFmpeg decoded-frame MD5s to report the longest run of consecutive pixel-identical frames and prints the source's guidance: at most 1 second frozen per 30 seconds, and no hold over 0.6 seconds except the final CTA. It reports the longest run; it does not implement an automated threshold pass/fail or a per-30-second audit.

## Audio and loudness

No `scripts/mix-audio.sh` or loudness-check script is present in the inspected repository. Therefore there is no supported music-path/mix command to document, no claim of included or mixed music, and no loudness measurement to report. Both checked-in MP4 build scripts explicitly encode video only (`-an`).

## 9:16 note

The portrait renderer uses a 1080×1920 viewport but keeps the 1920×1080 artwork and scales it to cover the taller viewport. This produces a center-cropped portrait export; review the crop for important text and artwork. It is not an alternate, responsive 9:16 composition.

## Repository command-status

The commands above are **UNVERIFIED**: this documentation update inspected source files but did not install dependencies, run a browser render, encode video, make a contact sheet, inspect frozen frames, or measure audio.

The `scripts/` directory contains the direct render/build/contact-sheet/frozen-time scripts listed above. Some `package.json` aliases refer to files not present in that directory at this revision: `render` and `render:portrait` reference `scripts/capture.mjs` and `scripts/encode.sh`; `test-render` references `scripts/test-render.sh`; `contact-sheet` references `scripts/contact-sheet.mjs`; and `frozen-time` references `scripts/frozen-time.mjs`. Use the direct checked-in scripts described above rather than assuming those aliases work. No `mix-audio.sh` or loudness checker is present.

## Honest claims

This repository contains the animation source and rendering/encoding scripts; this README does not assert that an MP4 has been rendered, visually reviewed, or quality-checked. Do not present unrun commands as completed work, infer an audio mix or loudness result, or add résumé, performance, client, or product claims not evidenced by the actual project. The visible closing copy is limited to `tinyNature`, `@Jmasis23`, `available for work`, and `MOTION DESIGN`.
