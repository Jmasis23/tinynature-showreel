const glyphs = [
  '<path d="M18 20V4l18 32V20"/>',
  '<path d="M11 35V7l22 28V7"/>',
  '<path d="M12 12h24M24 12v24M12 36h24"/>',
  '<path d="M10 9h27M10 24h27M10 39h27"/>',
  '<path d="M13 35V9h24M13 22h18M31 22v13"/>',
  '<path d="M12 8v32M24 8v32M36 8v32"/>'
];
export function mount() {
  const el = document.createElement('section');
  el.className = 'scene s3'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="s3-wash"></div><div class="s3-grid">${glyphs.map((g) => `<div class="s3-cell"><svg class="s3-glyph" viewBox="0 0 48 48" aria-hidden="true">${g}</svg></div>`).join('')}</div><div class="s3-selected"></div><div class="s3-rail"></div>`;
  return el;
}
mount.animate = (tl, el, start, duration) => {
  const cells = el.querySelectorAll('.s3-cell'), selected = el.querySelector('.s3-cell:nth-child(2)'), frame = el.querySelector('.s3-selected'), wash = el.querySelector('.s3-wash'), rail = el.querySelector('.s3-rail');
  tl.fromTo(cells, { y: 34, autoAlpha: .35 }, { y: 0, autoAlpha: 1, duration: .52, stagger: .055, ease: 'power2.out', immediateRender: false }, start + .08);
  tl.fromTo(frame, { scale: .86, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .34, ease: 'power2.out', immediateRender: false }, start + .28);
  tl.to(selected, { scale: 1.12, zIndex: 3, duration: .6, ease: 'power3.out' }, start + .72);
  tl.to(cells, { autoAlpha: .35, duration: .48, stagger: .035, ease: 'power2.in' }, start + 1.08);
  tl.to(wash, { scaleY: .68, transformOrigin: 'top', duration: .62, ease: 'power2.inOut' }, start + .92);
  tl.fromTo(rail, { scaleX: 0 }, { scaleX: 1, duration: .52, ease: 'power2.out', immediateRender: false }, start + duration - .58);
};
