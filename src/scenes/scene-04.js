export function mount() {
  const el = document.createElement('section');
  el.className = 'scene s4'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="s4-letter">N</div><svg class="s4-stroke" viewBox="0 0 1920 1080" aria-hidden="true"><path d="M280 910 C610 720 860 560 1120 426 S1510 250 1780 126"/></svg>`;
  return el;
}
mount.animate = (tl, el, start, duration) => {
  const letter = el.querySelector('.s4-letter'), path = el.querySelector('.s4-stroke path');
  const length = path.getTotalLength();
  gsapSetDash(path, length);
  tl.to(path, { strokeDashoffset: 0, duration: .92, ease: 'power2.inOut' }, start + .08);
  tl.fromTo(letter, { scale: .86 }, { scale: 1.02, duration: .78, ease: 'power2.out', immediateRender: false }, start + .16);
  tl.to(letter, { scaleX: 1.42, scaleY: 1.24, x: -22, duration: duration - 1.05, ease: 'power3.in' }, start + 1.05);
};
function gsapSetDash(path, length) {
  path.style.strokeDasharray = `${length} ${length}`;
  path.style.strokeDashoffset = String(length);
}
