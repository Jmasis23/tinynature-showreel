#!/usr/bin/env bash
#
# Usage: bash scripts/build-mp4.sh
# Requirements: ffmpeg with libx264; master PNG sequence in frames/frame-0000.png onward.
# Encodes frames/frame-%04d.png at 60fps as out/tinynature-showreel.mp4.
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
mkdir -p out

ffmpeg -hide_banner -y \
  -framerate 60 -start_number 0 -i 'frames/frame-%04d.png' \
  -an -c:v libx264 -pix_fmt yuv420p -r 60 -movflags +faststart \
  'out/tinynature-showreel.mp4'
