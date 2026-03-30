/* ═══════════════════════════════════════════════════
   Fluid We-Commerce — Main JS
   ═══════════════════════════════════════════════════ */

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Nav Scroll ──
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
  }, { passive: true });
}

// ── Mobile Menu ──
const hamburger = document.querySelector('.nav__hamburger');
const mobileMenu = document.querySelector('.nav__mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
    });
  });
}

// ── Testimonials Carousel ──
const testimonials = document.querySelectorAll('.testimonial-card');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 0;
let testimonialTimer;

function showTestimonial(index) {
  testimonials.forEach((t, i) => {
    t.classList.toggle('active', i === index);
  });
  testimonialDots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
  });
  currentTestimonial = index;
}

function nextTestimonial() {
  showTestimonial((currentTestimonial + 1) % testimonials.length);
}

if (testimonials.length > 0) {
  showTestimonial(0);
  testimonialTimer = setInterval(nextTestimonial, 5000);

  const testimonialWrap = document.querySelector('.testimonials__wrap');
  if (testimonialWrap) {
    testimonialWrap.addEventListener('mouseenter', () => clearInterval(testimonialTimer));
    testimonialWrap.addEventListener('mouseleave', () => {
      testimonialTimer = setInterval(nextTestimonial, 5000);
    });
  }

  testimonialDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showTestimonial(i);
      clearInterval(testimonialTimer);
      testimonialTimer = setInterval(nextTestimonial, 5000);
    });
  });
}

// ── Flywheel ──
const segments = [
  {
    name: 'Checkout', color: '#8AC8AE',
    tagline: 'One-click checkout experience',
    media: 'assets/images/screen-checkout.png', mediaType: 'image', chrome: true, tabTitle: 'Fluid Checkout',
    props: [
      { text: 'Apple Pay, Google Pay & saved cards for one-tap buying', icon: 'assets/icons/icon-one-click-checkout.png' },
      { text: 'Smart upsells and cross-sells based on cart contents', icon: 'assets/icons/icon-shop.png' },
      { text: 'Attribution-aware — every sale credits the right rep', icon: 'assets/icons/icon-attribution.png' },
    ],
  },
  {
    name: 'Payments', color: '#82CC9A',
    tagline: 'Global payment processing & smart routing',
    media: 'assets/images/screen-payments.mp4', mediaType: 'video', chrome: true, tabTitle: 'Fluid Payments',
    props: [
      { text: 'Apple Pay, cards & local methods across 130+ countries', icon: 'assets/icons/icon-global-payments.png' },
      { text: 'Smart routing optimizes approval rates and cuts fees', icon: 'assets/icons/icon-performance.png' },
      { text: 'Real-time settlement with automatic commission splitting', icon: 'assets/icons/icon-real-time-visibility.png' },
    ],
  },
  {
    name: 'FairShare', color: '#F2D270',
    tagline: 'Commission & compensation engine',
    media: 'assets/images/screen-fairshare.png', mediaType: 'image', chrome: true, tabTitle: 'Fluid FairShare',
    props: [
      { text: 'Flexible comp plans — binary, unilevel & hybrid structures', icon: 'assets/icons/icon-templates.png' },
      { text: 'Real-time commission calculations visible to the field', icon: 'assets/icons/icon-real-time-visibility.png' },
      { text: 'Built-in compliance guardrails for 50+ global markets', icon: 'assets/icons/icon-global-payments.png' },
    ],
  },
  {
    name: 'Connect', color: '#F0B088',
    tagline: 'Integration & bi-directional data sync',
    media: 'assets/images/screen-sync.png', mediaType: 'image', chrome: true, tabTitle: 'Fluid Connect',
    props: [
      { text: 'Bi-directional sync across checkout, commissions & inventory', icon: 'assets/icons/icon-bi-directional-sync.png' },
      { text: 'Pre-built connectors for ERP, CRM & warehouse systems', icon: 'assets/icons/icon-builder.png' },
      { text: 'Event-driven architecture with zero-lag propagation', icon: 'assets/icons/icon-performance.png' },
    ],
  },
  {
    name: 'App', color: '#E09098',
    tagline: 'White-label native mobile experience',
    media: ['assets/images/screen-app1.png', 'assets/images/screen-app2.png', 'assets/images/screen-app3.png'],
    mediaType: 'phones', chrome: false,
    props: [
      { text: 'iOS & Android apps published under your brand identity', icon: 'assets/icons/icon-shop.png' },
      { text: 'Push notifications, social sharing & in-app ordering', icon: 'assets/icons/icon-one-click-checkout.png' },
      { text: 'Offline-capable with real-time sync on reconnect', icon: 'assets/icons/icon-bi-directional-sync.png' },
    ],
  },
  {
    name: 'Builder', color: '#C4A8D4',
    tagline: 'Visual drag-and-drop site builder',
    media: 'assets/images/screen-builder.png', mediaType: 'image', chrome: true, tabTitle: 'Fluid Builder',
    props: [
      { text: '100+ conversion-optimized templates with visual editor', icon: 'assets/icons/icon-templates.png' },
      { text: 'Replicated sites for every distributor, centrally managed', icon: 'assets/icons/icon-builder.png' },
      { text: 'Built-in A/B testing and per-page analytics', icon: 'assets/icons/icon-performance.png' },
    ],
  },
  {
    name: 'Droplets', color: '#96C4EC',
    tagline: 'Drop commerce into any website, instantly',
    media: 'assets/images/screen-droplets.png', mediaType: 'image', chrome: true, tabTitle: 'Fluid Droplets',
    props: [
      { text: 'Embed checkout, enrollment & product widgets anywhere', icon: 'assets/icons/icon-one-click-checkout.png' },
      { text: 'One line of code drops components into any existing site', icon: 'assets/icons/icon-builder.png' },
      { text: 'Full brand customization with your design tokens', icon: 'assets/icons/icon-templates.png' },
    ],
  },
];

const N = segments.length;
const SEG = 360 / N;
const CX = 300, CY = 300;

// Flywheel geometry params
const P = {
  midR: 240, halfW: 25, textOffset: -1,
  rotationOffset: -4, textShift: 3.5,
  wheelDuration: 1.3, stripDuration: 1.15, fadeDuration: 1.5,
  segFontSize: 19, outlineWidth: 1, outlineOpacity: 1, glowRadius: 25,
};
const outerR = P.midR + P.halfW;
const innerR = P.midR - P.halfW;
const textR = P.midR + P.textOffset;

function polar(r, deg) {
  const rad = (deg - 90) * Math.PI / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function segShape(i) {
  const oR = outerR, iR = innerR, hW = P.halfW;
  const a1 = i * SEG, a2 = (i + 1) * SEG;
  const oS = polar(oR, a1), oE = polar(oR, a2);
  const iS = polar(iR, a2), iE = polar(iR, a1);
  return [
    `M${oS.x.toFixed(2)},${oS.y.toFixed(2)}`,
    `A${oR},${oR} 0 0 1 ${oE.x.toFixed(2)},${oE.y.toFixed(2)}`,
    `A${hW},${hW} 0 0 1 ${iS.x.toFixed(2)},${iS.y.toFixed(2)}`,
    `A${iR},${iR} 0 0 0 ${iE.x.toFixed(2)},${iE.y.toFixed(2)}`,
    `A${hW},${hW} 0 0 0 ${oS.x.toFixed(2)},${oS.y.toFixed(2)}`,
    'Z'
  ].join(' ');
}

function textArcD(i) {
  const pad = 2, shift = P.textShift;
  const a1 = i * SEG + pad + shift, a2 = (i + 1) * SEG - pad + shift;
  const s = polar(textR, a1), e = polar(textR, a2);
  return `M${s.x.toFixed(2)},${s.y.toFixed(2)} A${textR},${textR} 0 0 1 ${e.x.toFixed(2)},${e.y.toFixed(2)}`;
}

let activeSegment = 0;

function initFlywheel() {
  const svg = document.querySelector('.flywheel-svg');
  const panel = document.querySelector('.flywheel-panel');
  const dotsContainer = document.querySelector('.flywheel-dots');
  const scrollSection = document.querySelector('.solution-scroll');

  if (!svg || !panel || !scrollSection) return;

  // Build SVG
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  segments.forEach((seg, i) => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('id', `fwTp${i}`);
    path.setAttribute('d', textArcD(i));
    path.setAttribute('fill', 'none');
    defs.appendChild(path);
  });
  svg.appendChild(defs);

  // Outline + filled + text layers
  segments.forEach((seg, i) => {
    const outline = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    outline.setAttribute('d', segShape(i));
    outline.setAttribute('data-seg', i);
    outline.setAttribute('class', 'fw-outline');
    outline.style.fill = '#000000';
    outline.style.stroke = seg.color;
    outline.style.strokeWidth = P.outlineWidth + 'px';
    outline.style.strokeLinejoin = 'round';
    outline.style.opacity = P.outlineOpacity;
    outline.style.cursor = 'pointer';
    outline.style.transition = `opacity ${P.fadeDuration}s ease`;
    svg.appendChild(outline);
  });

  segments.forEach((seg, i) => {
    const filled = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    filled.setAttribute('d', segShape(i));
    filled.setAttribute('data-seg-filled', i);
    filled.setAttribute('class', 'fw-filled');
    filled.style.fill = seg.color;
    filled.style.stroke = seg.color;
    filled.style.strokeWidth = '1px';
    filled.style.opacity = '0';
    filled.style.pointerEvents = 'none';
    filled.style.transition = `opacity ${P.fadeDuration}s ease, filter ${P.fadeDuration}s ease`;
    svg.appendChild(filled);
  });

  segments.forEach((seg, i) => {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dy', '0.35em');
    text.setAttribute('data-seg-text', i);
    text.style.fill = seg.color;
    text.style.opacity = '0.5';
    text.style.fontFamily = "'NeueHaas', sans-serif";
    text.style.fontWeight = '900';
    text.style.fontSize = P.segFontSize + 'px';
    text.style.letterSpacing = '0.02em';
    text.style.transition = `fill ${P.fadeDuration}s ease, opacity ${P.fadeDuration}s ease`;
    text.style.pointerEvents = 'none';
    const tp = document.createElementNS('http://www.w3.org/2000/svg', 'textPath');
    tp.setAttribute('href', `#fwTp${i}`);
    tp.setAttribute('startOffset', '50%');
    tp.textContent = seg.name;
    text.appendChild(tp);
    svg.appendChild(text);
  });

  // Build content panels
  segments.forEach((seg, i) => {
    const card = document.createElement('div');
    card.className = 'flywheel-card' + (i === 0 ? ' active' : '');
    card.setAttribute('data-seg-card', i);

    let mediaHTML = '';
    if (seg.chrome) {
      const mediaSrc = seg.mediaType === 'video'
        ? `<video src="${seg.media}" autoplay loop muted playsinline></video>`
        : `<img src="${seg.media}" alt="${seg.name}" loading="lazy">`;
      mediaHTML = `
        <div class="browser-chrome">
          <div class="browser-chrome__bar">
            <div class="browser-chrome__dots"><span></span><span></span><span></span></div>
            <div class="browser-chrome__tab">${seg.tabTitle}</div>
          </div>
          <div class="browser-chrome__addr">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1C3.79 1 2 2.79 2 5v2c0 .55.45 1 1 1h1V5c0-1.1.9-2 2-2s2 .9 2 2v3h1c.55 0 1-.45 1-1V5c0-2.21-1.79-4-4-4z" fill="rgba(255,255,255,0.25)"/><rect x="4" y="7" width="4" height="4" rx="1" fill="rgba(255,255,255,0.25)"/></svg>
            <span>fluid.app/${seg.name.toLowerCase()}</span>
          </div>
          <div class="browser-chrome__body">${mediaSrc}</div>
        </div>`;
    } else if (seg.mediaType === 'phones') {
      mediaHTML = `<div style="display:flex;gap:12px;align-items:center;justify-content:center;">
        ${seg.media.map(src => `<img src="${src}" alt="${seg.name}" style="height:360px;border-radius:24px;object-fit:contain;" loading="lazy">`).join('')}
      </div>`;
    }

    card.innerHTML = `
      <div class="flywheel-card__name" style="color:${seg.color}">${seg.name}</div>
      <div class="flywheel-card__tagline">${seg.tagline}</div>
      <div class="flywheel-card__props">
        ${seg.props.map(p => `
          <div class="flywheel-prop">
            <div class="flywheel-prop__icon" style="background-color:${seg.color};mask-image:url(${p.icon});-webkit-mask-image:url(${p.icon})"></div>
            <div class="flywheel-prop__text">${p.text}</div>
          </div>
        `).join('')}
      </div>
      ${mediaHTML}
    `;
    panel.appendChild(card);
  });

  // Build dots
  if (dotsContainer) {
    segments.forEach((seg, i) => {
      const dot = document.createElement('span');
      dot.className = 'flywheel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('data-seg-dot', i);
      dot.style.background = i === 0 ? seg.color : 'rgba(255,255,255,0.15)';
      dotsContainer.appendChild(dot);
    });
  }

  // Click handlers on SVG segments
  svg.addEventListener('click', (e) => {
    const seg = e.target.closest('[data-seg]');
    if (seg) {
      setActiveSegment(parseInt(seg.getAttribute('data-seg')));
    }
  });

  // Scroll-driven segment switching
  function onScroll() {
    const rect = scrollSection.getBoundingClientRect();
    const sectionHeight = scrollSection.offsetHeight;
    const scrollableDistance = sectionHeight - window.innerHeight;
    // How far we've scrolled into the section (0 = top stuck, 1 = about to unstick)
    const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
    const segIndex = Math.min(N - 1, Math.floor(progress * N));

    if (segIndex !== activeSegment) {
      setActiveSegment(segIndex);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initialize
  setActiveSegment(0);
}

function setActiveSegment(index) {
  activeSegment = index;
  const wheel = document.querySelector('.flywheel-wheel');
  if (wheel) {
    const rotation = 90 - SEG / 2 - index * SEG + P.rotationOffset;
    wheel.style.transform = `rotate(${rotation}deg)`;
    wheel.style.transition = `transform ${P.wheelDuration}s cubic-bezier(0.33, 1, 0.68, 1)`;
  }

  // Update filled segments
  document.querySelectorAll('[data-seg-filled]').forEach(el => {
    const i = parseInt(el.getAttribute('data-seg-filled'));
    const active = i === index;
    el.style.opacity = active ? '1' : '0';
    el.style.filter = active ? `drop-shadow(0 0 ${P.glowRadius}px ${segments[i].color}88)` : 'none';
  });

  // Update text
  document.querySelectorAll('[data-seg-text]').forEach(el => {
    const i = parseInt(el.getAttribute('data-seg-text'));
    const active = i === index;
    el.style.fill = active ? '#000000' : segments[i].color;
    el.style.opacity = active ? '1' : '0.5';
  });

  // Update content cards
  document.querySelectorAll('.flywheel-card').forEach((card, i) => {
    card.classList.toggle('active', i === index);
  });

  // Update dots
  document.querySelectorAll('.flywheel-dot').forEach((dot, i) => {
    const active = i === index;
    dot.classList.toggle('active', active);
    dot.style.background = active ? segments[i].color : 'rgba(255,255,255,0.15)';
  });
}

// ── AI Catchup Cards stagger ──
const catchupObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.catchup-card');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('visible'), i * 300);
      });
      catchupObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const phoneMockup = document.querySelector('.phone-mockup');
if (phoneMockup) catchupObserver.observe(phoneMockup);

// ── Stat Count-Up ──
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-card__number[data-count]');
      nums.forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = prefix + Math.round(current) + suffix;
        }, 30);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats__grid');
if (statsSection) statObserver.observe(statsSection);

// ── Init on DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', () => {
  // Re-observe reveals (for dynamically added elements)
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  initFlywheel();
});
