#!/usr/bin/env bash
#
# Usage: bash scripts/frozen-time.sh
# Requirements: ffmpeg and the master PNG sequence frames/frame-0000.png onward.
# Computes decoded-frame MD5 hashes and reports the longest run of identical frames.
# Threshold guidance: max 1s frozen per 30s; no hold over 0.6s except the final CTA.
#
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo 'ffmpeg is unavailable; cannot sample/compare rendered frames.' >&2
  echo 'Usage: bash scripts/frozen-time.sh' >&2
  echo 'Requirements: install ffmpeg and render frames/frame-0000.png onward first.' >&2
  echo 'Thresholds: max 1s frozen per 30s; no hold over 0.6s except the final CTA.' >&2
  exit 0
fi
if [[ ! -f frames/frame-0000.png ]]; then
  echo 'Missing frames/frame-0000.png; render the master frame sequence first.' >&2
  echo 'Thresholds: max 1s frozen per 30s; no hold over 0.6s except the final CTA.' >&2
  exit 1
fi

ffmpeg -hide_banner -v error -framerate 60 -start_number 0 \
  -i 'frames/frame-%04d.png' -f framemd5 - |
awk -F, '
  /^[[:space:]]*#/ || NF < 6 { next }
  {
    hash = $NF
    gsub(/^[[:space:]]+|[[:space:]]+$/, "", hash)
    if (NR == 1 || hash != previous) {
      if (run > longest) longest = run
      run = 1
    } else {
      run++
    }
    previous = hash
  }
  END {
    if (run > longest) longest = run
    if (longest < 1) longest = 0
    printf "Longest pixel-identical consecutive run: %d frames (%.3f seconds at 60fps)\n", longest, longest / 60
    print "Thresholds: max 1s frozen per 30s; no hold over 0.6s except the final CTA."
  }
'
