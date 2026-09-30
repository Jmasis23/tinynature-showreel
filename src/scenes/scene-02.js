export function mount() {
  const el = document.createElement('section');
  el.className = 'scene s2'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="s2-wash"></div><div class="s2-rule-a"></div><div class="s2-rule-b"></div><div class="s2-word wordmark">tinyNature</div><div class="s2-select"></div><div class="s2-fragments"></div>`;
  return el;
}
mount.animate = (tl, el, start, duration) => {
  const word = el.querySelector('.s2-word'), select = el.querySelector('.s2-select'), lines = el.querySelectorAll('.s2-rule-a,.s2-rule-b'), fragments = el.querySelector('.s2-fragments');
  tl.fromTo(word, { scale: 1.32, x: 0 }, { scale: 1.04, x: -64, duration: .76, ease: 'power3.out', immediateRender: false }, start + .06);
  tl.to(select, { scale: 1.12, x: 68, duration: .62, ease: 'power2.inOut' }, start + .45);
  tl.to(lines, { scaleX: .76, duration: .42, ease: 'power2.in' }, start + 1.22);
  tl.to(word, { scale: .69, x: -310, y: -148, autoAlpha: .08, duration: .46, ease: 'power3.in' }, start + duration - .54);
  tl.fromTo(fragments, { scaleX: 0, autoAlpha: .2 }, { scaleX: 1, autoAlpha: 1, duration: .4, ease: 'power2.out', immediateRender: false }, start + duration - .48);
};
