#!/usr/bin/env bash
# Usage: mix-audio.sh <music-file> [sfx-dir]
# Creates out/music-only.mp3 from the supplied music file and out/mixed.mp4
# by mixing six quiet whooshes at 1.9, 4, 6, 8.2, 10.2, and 12.3 seconds.
# Uses audio files in the optional SFX directory when available; otherwise it
# synthesizes soft filtered-noise/swept-tone bursts. The video is taken from
# out/tinynature-showreel.mp4 and its video stream is copied unchanged.
# Requirement: ffmpeg with loudnorm and the standard audio filters.

set -euo pipefail

if [[ $# -lt 1 || $# -gt 2 ]]; then
  echo "Usage: mix-audio.sh <music-file> [sfx-dir]" >&2
  exit 2
fi
if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg is required." >&2
  exit 127
fi

music_file="$1"
sfx_dir="${2:-}"
video="out/tinynature-showreel.mp4"
music_out="out/music-only.mp3"
final_out="out/mixed.mp4"
duration=15

if [[ ! -f "$music_file" ]]; then
  echo "Error: music file not found: $music_file" >&2
  exit 1
fi
if [[ ! -f "$video" ]]; then
  echo "Error: source video not found: $video" >&2
  exit 1
fi
if [[ -n "$sfx_dir" && ! -d "$sfx_dir" ]]; then
  echo "Error: SFX directory not found: $sfx_dir" >&2
  exit 1
fi
mkdir -p out
work_dir="$(mktemp -d)"
trap 'rm -rf "$work_dir"' EXIT

# Make a music-only deliverable with a practical loudness target for the mix.
ffmpeg -hide_banner -loglevel error -y -i "$music_file" -vn \
  -af 'loudnorm=I=-16:TP=-1:LRA=11' -c:a libmp3lame -b:a 192k \
  "$music_out"

# Collect common audio formats from the optional SFX directory. Reuse a
# supplied asset round-robin if fewer than six files are available.
sfx_files=()
if [[ -n "$sfx_dir" ]]; then
  while IFS= read -r -d '' file; do
    sfx_files+=("$file")
  done < <(find "$sfx_dir" -type f \( -iname '*.wav' -o -iname '*.mp3' -o -iname '*.m4a' -o -iname '*.aac' -o -iname '*.ogg' -o -iname '*.flac' -o -iname '*.opus' -o -iname '*.aif' -o -iname '*.aiff' \) -print0 | sort -z)
fi

transitions=(1900 4000 6000 8200 10200 12300)
effect_files=()
if (( ${#sfx_files[@]} == 0 )); then
  # A quiet, band-limited pink-noise puff layered with a low-level ascending
  # sine sweep makes a soft whoosh without bright/harsh high-frequency energy.
  for i in 0 1 2 3 4 5; do
    generated="$work_dir/whoosh-$i.wav"
    ffmpeg -hide_banner -loglevel error -y \
      -f lavfi -i 'anoisesrc=color=pink:duration=0.55:sample_rate=48000' \
      -f lavfi -i 'aevalsrc=0.08*sin(2*PI*(220*t+900*t*t)):s=48000:d=0.55' \
      -filter_complex '[0:a]highpass=f=220,lowpass=f=1500,volume=0.10[n];[1:a]volume=0.18[s];[n][s]amix=inputs=2:normalize=0,afade=t=in:st=0:d=0.04,afade=t=out:st=0.30:d=0.25,volume=0.15[out]' \
      -map '[out]' -c:a pcm_s16le "$generated"
    effect_files+=("$generated")
  done
else
  for i in 0 1 2 3 4 5; do
    effect_files+=("${sfx_files[$((i % ${#sfx_files[@]}))]}")
  done
fi

ffmpeg_args=(-hide_banner -loglevel error -y -i "$video" -stream_loop -1 -i "$music_out")
filter='[1:a]atrim=duration=15,asetpts=PTS-STARTPTS[music]'
for i in 0 1 2 3 4 5; do
  ffmpeg_args+=(-i "${effect_files[$i]}")
  input_index=$((i + 2))
  delay="${transitions[$i]}"
  filter+=";[${input_index}:a]atrim=duration=0.55,asetpts=PTS-STARTPTS,highpass=f=220,lowpass=f=1800,afade=t=in:st=0:d=0.04,afade=t=out:st=0.30:d=0.25,volume=0.025,adelay=${delay}|${delay}[s${i}]"
done
filter+=';[music][s0][s1][s2][s3][s4][s5]amix=inputs=7:duration=first:dropout_transition=0:normalize=0,alimiter=limit=0.95[aout]'

ffmpeg -hide_banner -loglevel error -y "${ffmpeg_args[@]}" \
  -filter_complex "$filter" -map 0:v:0 -map '[aout]' \
  -c:v copy -c:a aac -b:a 192k -t "$duration" -movflags +faststart \
  "$final_out"

echo "Created $music_out and $final_out"
