export function mount() {
  const el = document.createElement('section');
  el.className = 'scene s7'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="s7-wash"></div><div class="s7-layout"><div class="s7-design">MOTION DESIGN</div><div class="s7-word wordmark">tinyNature</div><div class="s7-rule"></div><div class="s7-handle">@Jmasis23</div><div class="s7-status">available for work</div></div>`;
  return el;
}
mount.animate = (tl, el, start, duration) => {
  const layout = el.querySelector('.s7-layout'), rule = el.querySelector('.s7-rule');
  tl.fromTo(layout, { y: 5, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .3, ease: 'power2.out', immediateRender: false }, start + .04);
  tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: .48, ease: 'power2.out', immediateRender: false }, start + .12);
  tl.to(layout, { y: -5, scale: 1.012, duration: duration - .42, ease: 'sine.inOut' }, start + .42);
};
