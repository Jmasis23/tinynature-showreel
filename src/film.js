import { gsap } from 'gsap';
import './styles.css';
import { SCENES, DOT_KNOTS, TOKENS } from './tokens.js';
import { mount as scene01 } from './scenes/scene-01.js';
import { mount as scene02 } from './scenes/scene-02.js';
import { mount as scene03 } from './scenes/scene-03.js';
import { mount as scene04 } from './scenes/scene-04.js';
import { mount as scene05 } from './scenes/scene-05.js';
import { mount as scene06 } from './scenes/scene-06.js';
import { mount as scene07 } from './scenes/scene-07.js';

const modules = [scene01, scene02, scene03, scene04, scene05, scene06, scene07];
const film = document.querySelector('#film');
const root = document.querySelector('#scene-root');
const dot = document.querySelector('#handoff-dot');
const sceneId = Number(new URLSearchParams(location.search).get('scene')) || 0;
const isolated = sceneId >= 1 && sceneId <= 7;
const fit = () => Math.max(innerWidth / TOKENS.width, innerHeight / TOKENS.height);
const applyFit = () => film.style.setProperty('--fit', String(fit()));
applyFit();
addEventListener('resize', applyFit, { passive: true });

// Cubic Hermite interpolation hits every handoff coordinate exactly. Centered
// tangents make incoming and outgoing dot velocity identical at each cut.
function pointAt(time) {
  let i = 0;
  while (i < DOT_KNOTS.length - 2 && time > DOT_KNOTS[i + 1].time) i++;
  const a = DOT_KNOTS[i], b = DOT_KNOTS[i + 1];
  const span = b.time - a.time;
  const u = Math.max(0, Math.min(1, (time - a.time) / span));
  const tangent = (key, at) => {
    if (at === 0) return (DOT_KNOTS[1][key] - DOT_KNOTS[0][key]) / (DOT_KNOTS[1].time - DOT_KNOTS[0].time);
    if (at === DOT_KNOTS.length - 1) {
      const last = DOT_KNOTS.length - 1, prev = DOT_KNOTS[last - 1];
      return (DOT_KNOTS[last][key] - prev[key]) / (DOT_KNOTS[last].time - prev.time);
    }
    const prev = DOT_KNOTS[at - 1], next = DOT_KNOTS[at + 1];
    return (next[key] - prev[key]) / (next.time - prev.time);
  };
  const h00 = 2*u*u*u - 3*u*u + 1, h10 = u*u*u - 2*u*u + u;
  const h01 = -2*u*u*u + 3*u*u, h11 = u*u*u - u*u;
  const p = {};
  for (const key of ['x', 'y']) p[key] = h00*a[key] + h10*span*tangent(key, i) + h01*b[key] + h11*span*tangent(key, i + 1);
  return p;
}
const dotTimeOffset = isolated ? 0 : DOT_KNOTS[1].time;
const placeDot = (time) => {
  const pathTime = Math.min(DOT_KNOTS[DOT_KNOTS.length - 1].time, time + dotTimeOffset);
  const p = pointAt(pathTime);
  dot.style.left = `${p.x}px`;
  dot.style.top = `${p.y}px`;
};

const timeline = gsap.timeline({ paused: true, smoothChildTiming: false });
const specs = isolated ? [SCENES[sceneId - 1]] : SCENES;
for (const spec of specs) {
  const element = modules[spec.id - 1]();
  root.append(element);
  const start = isolated ? 0 : spec.start;
  const end = start + spec.duration;
  const finishedMasterIntro = !isolated && spec.id === 1;
  if (finishedMasterIntro) {
    // The master opens on the completed, visible title-card composition.
    // Its scene-local motion may begin after t=0, but the opening frame never fades in.
    timeline.set(element, { autoAlpha: 1 }, start);
  } else {
    timeline.set(element, { autoAlpha: 0 }, start);
    timeline.to(element, { autoAlpha: 1, duration: Math.min(0.14, spec.duration / 8), ease: 'none' }, start);
  }
  modules[spec.id - 1].animate(timeline, element, start, spec.duration);
  if (spec.id < 7) timeline.to(element, { autoAlpha: 0, duration: 0.14, ease: 'none' }, end - 0.14);
}
if (isolated) {
  const knot = DOT_KNOTS[sceneId - 1];
  dot.style.left = `${knot.x}px`;
  dot.style.top = `${knot.y}px`;
} else {
  // Dot placement is computed directly from the requested timeline time in seek().
  placeDot(0);
}
const duration = isolated ? SCENES[sceneId - 1].duration : 15;
timeline.pause(0);
placeDot(0);
gsap.ticker.sleep();
window.__film = Object.freeze({
  duration,
  fps: TOKENS.fps,
  width: TOKENS.width,
  height: TOKENS.height,
  scene: isolated ? sceneId : null,
  seek(seconds) {
    const t = Math.max(0, Math.min(duration, Number(seconds) || 0));
    timeline.time(t, false);
    if (!isolated) placeDot(t);
    return t;
  }
});
