export function mount() {
  const el = document.createElement('section');
  el.className = 'scene s5'; el.setAttribute('aria-hidden', 'true');
  el.innerHTML = `<div class="s5-outline"></div><div class="s5-rail"></div><div class="s5-letters">${Array.from('tinyNature', (letter) => `<span>${letter}</span>`).join('')}</div><div class="s5-accent"></div>`;
  return el;
}
mount.animate = (tl, el, start, duration) => {
  const outline = el.querySelector('.s5-outline'), letters = el.querySelectorAll('.s5-letters span'), rail = el.querySelector('.s5-rail'), accent = el.querySelector('.s5-accent');
  const scatter = [{x:-260,y:-210},{x:-124,y:208},{x:8,y:-250},{x:148,y:210},{x:260,y:-180},{x:-310,y:50},{x:-174,y:-228},{x:174,y:238},{x:316,y:-40},{x:0,y:276}];
  tl.fromTo(outline, { scale: .96, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: .45, ease: 'power2.out', immediateRender: false }, start + .08);
  letters.forEach((letter, i) => tl.fromTo(letter, { ...scatter[i], rotate: i % 2 ? -9 : 8 }, { x: 0, y: 0, rotate: 0, duration: .92, ease: 'power3.out', immediateRender: false }, start + .32 + i * .045));
  tl.fromTo(rail, { scaleX: 0 }, { scaleX: 1, duration: .6, ease: 'power2.out', immediateRender: false }, start + .72);
  tl.to(accent, { scaleX: 1.65, duration: .6, ease: 'power2.in' }, start + duration - .64);
};
