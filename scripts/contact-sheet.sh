#!/usr/bin/env bash
#
# Usage: bash scripts/contact-sheet.sh
# Requirements: ffmpeg; rendered frames/frame-0000.png onward.
# Selects frames 0, 75, 150, ..., 825 and writes a 4x3 grid to out/contact-sheet.png.
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
mkdir -p out

ffmpeg -hide_banner -y \
  -framerate 60 -start_number 0 -i 'frames/frame-%04d.png' \
  -filter_complex "select='eq(n,0)+eq(n,75)+eq(n,150)+eq(n,225)+eq(n,300)+eq(n,375)+eq(n,450)+eq(n,525)+eq(n,600)+eq(n,675)+eq(n,750)+eq(n,825)',scale=480:-1,tile=4x3" \
  -frames:v 1 'out/contact-sheet.png'
