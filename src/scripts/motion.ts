import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const motionOk = document.documentElement.classList.contains('motion-ok');
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel) as NodeListOf<T>);

/* Story manifesto: words light up as the paragraph scrolls through the viewport */
function initManifesto() {
  const el = document.querySelector<HTMLElement>('[data-words]');
  if (!el) return;
  gsap.to($$('.word', el), {
    opacity: 1,
    ease: 'none',
    stagger: 0.1,
    scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
  });
}

function initSmoothScroll() {
  const lenis = new Lenis({ duration: 1.15, anchors: { offset: -80 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

function initHero() {
  const hero = document.querySelector<HTMLElement>('#top');
  if (!hero) return;

  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.from('[data-hero-word]', { yPercent: 18, autoAlpha: 0, letterSpacing: '0.02em', duration: 1.8 }, 0)
    .from('[data-hero-product]', { y: 60, scale: 0.92, autoAlpha: 0, duration: 1.8 }, 0.25)
    .from($$('[data-callout]', hero), { autoAlpha: 0, x: (i, el: HTMLElement) => (el.classList.contains('flex-row-reverse') ? 24 : -24), duration: 1.1, stagger: 0.12 }, 1)
    .to($$('[data-hero-in]', hero), { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1, ease: 'power3.out' }, 0.9);

  const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
  gsap.to('[data-hero-word]', { yPercent: -35, ease: 'none', scrollTrigger: scrub });
  gsap.to('[data-hero-product]', { yPercent: 10, ease: 'none', scrollTrigger: { ...scrub } });

  if (window.matchMedia('(pointer: fine)').matches) {
    const product = hero.querySelector<HTMLElement>('[data-float]')!;
    const xTo = gsap.quickTo(product, 'x', { duration: 1.4, ease: 'power3' });
    const rTo = gsap.quickTo(product, 'rotation', { duration: 1.4, ease: 'power3' });
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      xTo(px * 24);
      rTo(px * 2);
    });
  }
}

function initHeroVideo() {
  const video = document.querySelector<HTMLVideoElement>('[data-hero-video]');
  if (!video) return;
  video.addEventListener('playing', () => video.classList.add('is-playing'), { once: true });
  video.preload = 'auto';
  video.play().catch(() => {});
  // pause off-screen to save battery
  ScrollTrigger.create({
    trigger: video,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => (self.isActive ? video.play().catch(() => {}) : video.pause()),
  });
}

function initFloat() {
  // the hero video already floats on its own
  $$('[data-float]').filter((el) => !el.closest('#top')).forEach((el, i) => {
    gsap.to(el, { y: -14, duration: 3 + i * 0.4, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  });
}

function initReveals() {
  // the hero runs its own intro timeline
  const items = $$('[data-reveal]').filter((el) => !el.closest('#top'));
  ScrollTrigger.batch(items, {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.09 }),
  });

  $$('[data-split]')
    .filter((el) => !el.closest('#top'))
    .forEach((el) => {
      gsap.to($$('.line-inner', el), {
        yPercent: 0,
        y: 0,
        duration: 1.1,
        ease: 'power4.out',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });
}

function initHorizontalRitual(mm: gsap.MatchMedia) {
  const section = document.querySelector<HTMLElement>('[data-hscroll-section]');
  const wrap = document.querySelector<HTMLElement>('[data-hscroll]');
  const track = document.querySelector<HTMLElement>('[data-hscroll-track]');
  if (!section || !wrap || !track) return;

  mm.add('(min-width: 768px)', () => {
    wrap.classList.add('is-pinned');
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
      },
    });
    $$('[data-card-img]', track).forEach((img) => {
      gsap.fromTo(img, { scale: 1.12 }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: img, containerAnimation: tween, start: 'left right', end: 'center center', scrub: true },
      });
    });
    return () => wrap.classList.remove('is-pinned');
  });
}

function initParallaxAndCounters() {
  $$('[data-parallax]').forEach((img) => {
    gsap.fromTo(img, { yPercent: -8, scale: 1.15 }, {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  $$('[data-spin]').forEach((el, i) => {
    gsap.to(el, {
      rotation: i % 2 ? -90 : 90,
      scale: 1.15,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  $$('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: target,
      duration: 1.8,
      ease: 'power2.out',
      onUpdate: () => (el.textContent = String(Math.round(obj.v))),
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}

if (motionOk) {
  const mm = gsap.matchMedia();
  initSmoothScroll();
  initHero();
  initHeroVideo();
  initFloat();
  initManifesto();
  initReveals();
  initHorizontalRitual(mm);
  initParallaxAndCounters();
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
