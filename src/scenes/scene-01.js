export function mount() {
  const el = document.createElement('section');
  el.className = 'scene s1'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="s1-word wordmark">tinyNature</div><div class="s1-rule"></div><div class="s1-caption">MOTION DESIGN</div>`;
  return el;
}
mount.animate = (tl, el, start, duration) => {
  const word = el.querySelector('.s1-word'), rule = el.querySelector('.s1-rule'), caption = el.querySelector('.s1-caption');
  tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: .55, ease: 'power2.out', immediateRender: false }, start + .08);
  tl.fromTo(caption, { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .34, ease: 'power2.out', immediateRender: false }, start + .24);
  tl.to(word, { scale: 1.08, duration: .7, ease: 'power2.out' }, start + .12);
  tl.to(word, { scale: 4.8, x: 130, y: -68, duration: duration - 1.03, ease: 'power3.in' }, start + 1.03);
  tl.to(rule, { scaleX: 1.4, duration: .5, ease: 'power2.in' }, start + duration - .55);
};
