export const TOKENS = Object.freeze({
  ink: '#202532', secondary: '#667085', tertiary: '#98A1B2', accent: '#3559A8',
  accentSoft: '#EDF2FC', line: '#E8EBF0', canvas: '#F7F8FA',
  font: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Helvetica Neue', sans-serif",
  width: 1920, height: 1080, fps: 60, dotSize: 24
});
export const SCENES = Object.freeze([
  { id: 1, start: 0, end: 1.9, duration: 1.9 },
  { id: 2, start: 1.9, end: 4, duration: 2.1 },
  { id: 3, start: 4, end: 6, duration: 2 },
  { id: 4, start: 6, end: 8.2, duration: 2.2 },
  { id: 5, start: 8.2, end: 10.2, duration: 2 },
  { id: 6, start: 10.2, end: 12.3, duration: 2.1 },
  { id: 7, start: 12.3, end: 15, duration: 2.7 }
]);
// Top-left coordinates of the 24×24 dot in the 1920×1080 design space.
export const DOT_KNOTS = Object.freeze([
  { time: 0, x: 330, y: 610 },
  { time: 1.9, x: 1480, y: 336 },
  { time: 4, x: 1512, y: 622 },
  { time: 6, x: 954, y: 242 },
  { time: 8.2, x: 408, y: 524 },
  { time: 10.2, x: 1450, y: 786 },
  { time: 12.3, x: 960, y: 158 },
  { time: 15, x: 1510, y: 902 }
]);
