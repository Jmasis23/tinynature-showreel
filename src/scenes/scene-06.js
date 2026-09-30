export function mount() {
  const el = document.createElement('section');
  el.className = 'scene s6'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="s6-panels">${['p1','p2','p3','p4'].map((p) => `<div class="s6-panel ${p}"><div class="s6-type wordmark">tinyNature</div></div>`).join('')}</div><div class="s6-lead wordmark">tinyNature</div>`;
  return el;
}
mount.animate = (tl, el, start, duration) => {
  const panels = el.querySelectorAll('.s6-panel'), lead = el.querySelector('.s6-lead');
  tl.fromTo(panels, { y: 82, rotateY: (i) => i % 2 ? -7 : 7, scale: .91, autoAlpha: .55 }, { y: 0, rotateY: 0, scale: 1, autoAlpha: 1, duration: .82, stagger: .08, ease: 'power3.out', immediateRender: false }, start + .08);
  tl.to(panels, { x: (i) => (i - 1.5) * 260, scale: .84, duration: .6, stagger: .03, ease: 'power2.in' }, start + 1.02);
  tl.fromTo(lead, { scale: .72, autoAlpha: 0 }, { scale: 1.08, autoAlpha: 1, duration: .54, ease: 'power3.out', immediateRender: false }, start + 1.28);
  tl.to(lead, { scale: 1.3, duration: .34, ease: 'power2.in' }, start + duration - .36);
};
