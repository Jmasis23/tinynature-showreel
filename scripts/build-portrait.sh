#!/usr/bin/env bash
#
# Usage: bash scripts/build-portrait.sh
# Requirements: ffmpeg with libx264; portrait PNG sequence in portrait/frame-0000.png onward.
# Encodes portrait/frame-%04d.png at 60fps as out/tinynature-showreel-portrait.mp4.
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
mkdir -p out

ffmpeg -hide_banner -y \
  -framerate 60 -start_number 0 -i 'portrait/frame-%04d.png' \
  -an -c:v libx264 -pix_fmt yuv420p -r 60 -movflags +faststart \
  'out/tinynature-showreel-portrait.mp4'
