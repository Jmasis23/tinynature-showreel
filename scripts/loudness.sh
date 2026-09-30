#!/usr/bin/env bash
# Usage: scripts/loudness.sh [video.mp4]
# Analyzes audio loudness in the final showreel MP4 and reports integrated LUFS
# and true peak. Defaults to out/tinynature-showreel.mp4.
# Requirement: ffmpeg with the loudnorm audio filter.
# This is an analysis-only check; it does not rewrite the video or audio.

set -euo pipefail

input="${1:-out/tinynature-showreel.mp4}"
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg is required." >&2
  exit 127
fi
if [[ ! -f "$input" ]]; then
  echo "Error: input file not found: $input" >&2
  exit 1
fi

log_file="$(mktemp)"
trap 'rm -f "$log_file"' EXIT
if ! ffmpeg -hide_banner -nostats -i "$input" -vn \
  -af 'loudnorm=I=-16:TP=-1:LRA=11:print_format=json' \
  -f null - 2>"$log_file"; then
  cat "$log_file" >&2
  exit 1
fi

json_value() {
  sed -nE "s/.*\"$1\"[[:space:]]*:[[:space:]]*\"([^\"]+)\".*/\\1/p" "$log_file" | tail -n 1
}

integrated="$(json_value input_i)"
true_peak="$(json_value input_tp)"
if [[ -z "$integrated" || -z "$true_peak" ]]; then
  echo "Error: ffmpeg did not return loudnorm measurement fields." >&2
  cat "$log_file" >&2
  exit 1
fi

printf 'Measured integrated loudness: %s LUFS\n' "$integrated"
printf 'Measured true peak: %s dBFS\n' "$true_peak"
printf 'Targets: approximately -16 LUFS integrated; true peak no higher than -1 dBFS.\n'
