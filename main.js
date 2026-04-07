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

// ── Hero Benefits ──
function initHeroBenefits() {
  const container = document.querySelector('.hero-benefits');
  if (!container) return;

  const hasGSAP = typeof gsap !== 'undefined';
  const tabs = container.querySelectorAll('.hero-benefits__tab');
  const scenes = container.querySelectorAll('.hb-scene');
  const chromeTab = container.querySelector('[data-hb-chrome-tab]');
  const chromeAddr = container.querySelector('[data-hb-chrome-addr]');
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  const tabData = [
    { label: 'Orders', addr: 'admin.fluid.app/orders' },
    { label: 'Operations', addr: 'admin.fluid.app/operations' },
    { label: 'Payment Reports', addr: 'admin.fluid.app/company-payment-reports' },
  ];

  let activeTab = 0;
  let progressTween = null;
  let timelines = [null, null, null];
  let hasPlayed = false;

  function buildTimeline1() {
    var s = scenes[0];
    var tl = gsap.timeline({ paused: true });
    var phaseA = s.querySelector('.hb-s1-phase--a');
    var phaseB = s.querySelector('.hb-s1-phase--b');

    var annoCircle = s.querySelector('.hb-anno--circle');
    var annoText = s.querySelector('.hb-anno--credit-text');
    var inkCirclePath = s.querySelector('.hb-ink-circle path');

    var newRow = s.querySelector('.hb-s1-trow--new');
    var existingRows = s.querySelectorAll('.hb-s1-trow--existing');
    var statsBar = s.querySelector('.hb-s1-stats');

    gsap.set(phaseA, { opacity: 0, scale: 1, filter: 'none', transformOrigin: 'left center' });
    gsap.set(phaseB, { opacity: 0, x: '40px', filter: 'blur(10px)', boxShadow: 'none' });
    gsap.set(annoCircle, { opacity: 0, scale: 0.8, transformOrigin: 'center center' });
    gsap.set(annoText, { opacity: 0, scale: 0.8, rotation: -12, transformOrigin: 'left center' });
    if (inkCirclePath) {
      var circleLen = inkCirclePath.getTotalLength ? inkCirclePath.getTotalLength() : 600;
      gsap.set(inkCirclePath, { strokeDasharray: circleLen, strokeDashoffset: circleLen });
    }
    
    // Set up the push illusion
    gsap.set(existingRows, { y: -38 });
    if (newRow) gsap.set(newRow, { opacity: 0 });

    phaseA.classList.remove('hb-s1-phase--visible');
    phaseB.classList.remove('hb-s1-phase--visible');

    tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0);
    tl.to(phaseA, { opacity: 1, duration: 0.3, onComplete: function() { phaseA.classList.add('hb-s1-phase--visible'); } }, 0.2);

    if (statsBar) {
      tl.from(statsBar, { opacity: 0, y: -10, duration: 0.6, ease: 'power3.out' }, 0.3);
    }

    // Fade in existing rows in their shifted position
    tl.fromTo(existingRows, { opacity: 0 }, { opacity: 1, duration: 0.4, stagger: 0.04, ease: 'power2.out' }, 0.4);

    // The Push
    tl.to(existingRows, { y: 0, duration: 0.6, ease: 'expo.out' }, 2.0);
    if (newRow) {
      tl.fromTo(newRow, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 2.05);
      tl.fromTo(newRow, { backgroundColor: '#dbeafe' }, { backgroundColor: '#eff6ff', duration: 1.0 }, 2.05);
    }

    // Phase transition with depth
    tl.to(phaseA, { 
      opacity: 0.3, 
      scale: 0.96, 
      filter: 'blur(2px)', 
      duration: 0.6, 
      ease: 'power3.inOut' 
    }, 4.0);

    tl.to(phaseB, {
      opacity: 1, 
      x: 0, 
      filter: 'blur(0px)',
      duration: 0.6, 
      ease: 'power3.inOut',
      boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
      onComplete: function() { phaseB.classList.add('hb-s1-phase--visible'); }
    }, 4.1);

    tl.add(function() {
      if (chromeAddr) chromeAddr.textContent = 'admin.fluid.app/orders/4329';
    }, 4.4);

    tl.from(s.querySelector('.hb-s1-detail-header'), { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' }, 4.5);

    var steps = s.querySelectorAll('.hb-tl-step');
    steps.forEach(function(step, i) {
      var icon = step.querySelector('.hb-tl-icon');
      var body = step.querySelector('.hb-tl-body');
      var conn = step.querySelector('.hb-tl-connector');

      tl.fromTo(icon, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, 4.7 + i * 0.2);
      tl.fromTo(body, { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 4.8 + i * 0.2);
      
      if (conn) {
        gsap.set(conn, { transformOrigin: 'top center', scaleY: 0 });
        tl.to(conn, { scaleY: 1, duration: 0.4, ease: 'power2.inOut' }, 4.9 + i * 0.2);
      }
    });

    var metaRows = s.querySelectorAll('.hb-tl-meta__row');
    metaRows.forEach(function(row, i) {
      tl.fromTo(row, { opacity: 0, x: -6 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }, 5.5 + i * 0.1);
    });

    tl.to(annoCircle, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.2)' }, 6.2);
    if (inkCirclePath) {
      tl.to(inkCirclePath, { strokeDashoffset: 0, duration: 0.6, ease: 'power3.out' }, 6.2);
    }
    tl.to(annoText, { opacity: 1, scale: 1, rotation: -8, duration: 0.5, ease: 'back.out(1.5)' }, 6.4);

    return tl;
  }

  function buildTimeline2() {
    var s = scenes[1];
    var tl = gsap.timeline({ paused: true });

    var statuses = s.querySelectorAll('.hb-s2-status');
    var existingRows = s.querySelectorAll('.hb-s2-row--existing');
    var newRow = s.querySelector('.hb-s2-row--new');
    var scanner = s.querySelector('.hb-s2-scanner');
    var flash = s.querySelector('.hb-s2-row-flash');
    var counter = s.querySelector('.hb-s2-counter');

    gsap.set(statuses, { opacity: 0, y: -10, filter: 'blur(4px)' });
    gsap.set(existingRows, { opacity: 0, x: -10 });
    gsap.set(newRow, { opacity: 0, x: -10 });
    if (flash) gsap.set(flash, { opacity: 0, x: '-100%' });
    gsap.set(scanner, { opacity: 0, y: -100 });
    gsap.set(counter, { opacity: 0 });

    var newChecks = newRow ? newRow.querySelectorAll('.hb-check-wrap') : [];
    newChecks.forEach(function(wrap) {
      gsap.set(wrap.querySelector('.hb-check'), { scale: 0 });
      gsap.set(wrap.querySelector('.hb-check-loader'), { opacity: 0, scale: 0 });
    });

    tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0);

    // Initial load sequence
    tl.to(statuses, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.1, ease: 'back.out(1.2)' }, 0.2);
    
    // Existing rows stagger in
    tl.to(existingRows, { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }, 0.4);

    // After pause, the new row slams in
    tl.fromTo(existingRows, { y: 0 }, { y: 43, duration: 0.6, ease: 'expo.out' }, 2.0); // push existing down
    tl.to(newRow, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, 2.05);
    tl.fromTo(newRow, { backgroundColor: '#dbeafe' }, { backgroundColor: '#eff6ff', duration: 1.0 }, 2.05);

    // Swipe flash effect across the new row
    if (flash) {
      tl.to(flash, { opacity: 1, duration: 0.1 }, 2.1);
      tl.to(flash, { x: '100%', duration: 0.8, ease: 'power2.out' }, 2.1);
      tl.to(flash, { opacity: 0, duration: 0.2 }, 2.7);
    }

    // The system sync/scanner sweep
    tl.to(scanner, { opacity: 1, duration: 0.3 }, 2.4);
    tl.to(scanner, { y: 240, duration: 2.0, ease: 'power1.inOut' }, 2.4);
    tl.to(scanner, { opacity: 0, duration: 0.3 }, 4.1);

    // The checks sequentially resolving
    newChecks.forEach(function(wrap, i) {
      var loader = wrap.querySelector('.hb-check-loader');
      var check = wrap.querySelector('.hb-check');
      
      tl.to(loader, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 2.5 + i * 0.3);
      tl.to(loader, { opacity: 0, scale: 0.5, duration: 0.2 }, 3.0 + i * 0.3);
      
      tl.to(check, { 
        scale: 1, 
        className: '+=hb-check hb-check--done',
        duration: 0.4, 
        ease: 'back.out(2)' 
      }, 3.1 + i * 0.3);
      
      tl.add(function() {
        check.innerHTML = '<svg viewBox="0 0 12 12" width="8" height="8" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      }, 3.1 + i * 0.3);
    });

    tl.to(counter, { opacity: 1, y: -5, duration: 0.5, ease: 'power2.out' }, 5.0);

    return tl;
  }

  function buildTimeline3() {
    var s = scenes[2];
    var tl = gsap.timeline({ paused: true });

    tl.fromTo(s, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0);

    s.querySelectorAll('.hb-s3-kpi').forEach(function(k, i) {
      tl.from(k, { opacity: 0, y: 15, duration: 0.5, ease: 'power3.out' }, 0.2 + i * 0.2);
    });

    var amountEl = s.querySelector('[data-hb-kpi-amount]');
    var approvalEl = s.querySelector('[data-hb-kpi-approval]');

    var amountObj = { val: 0 };
    tl.fromTo(amountObj, { val: 0 }, {
      val: 2.4, duration: 1.5, ease: 'power3.out',
      onUpdate: function() { amountEl.textContent = '$' + amountObj.val.toFixed(1) + 'M'; }
    }, 0.5);

    var approvalObj = { val: 90 };
    tl.fromTo(approvalObj, { val: 90 }, {
      val: 98.7, duration: 1.2, ease: 'power3.out',
      onUpdate: function() { approvalEl.textContent = approvalObj.val.toFixed(1) + '%'; }
    }, 0.7);

    s.querySelectorAll('.hb-s3-trend').forEach(function(t, i) {
      tl.from(t, { opacity: 0, x: -10, duration: 0.4, ease: 'power2.out' }, 0.9 + i * 0.15);
    });

    s.querySelectorAll('.hb-grid-line').forEach(function(l, i) {
      tl.to(l, { opacity: 1, duration: 0.4 }, 1.0 + i * 0.1);
    });

    var areaClip = s.querySelector('.hb-area-clip-rect');
    var areaLine = s.querySelector('.hb-area-line');
    var areaFill = s.querySelector('.hb-area-fill');
    var scrubberWrap = s.querySelector('.hb-chart-scrubber-wrap');
    var scrubber = s.querySelector('.hb-chart-scrubber');
    var playhead = s.querySelector('.hb-chart-playhead');
    var tooltip = s.querySelector('.hb-chart-tooltip');
    var tooltipVal = s.querySelector('[data-hb-tooltip-val]');
    
    gsap.set(scrubberWrap, { width: '0%' });
    gsap.set(scrubber, { opacity: 0 });
    gsap.set(playhead, { opacity: 0, scale: 0 });
    gsap.set(tooltip, { opacity: 0, y: 10 });
    if (areaClip) gsap.set(areaClip, { attr: { width: 0 } });
    if (areaLine) {
      gsap.set(areaLine, { strokeDasharray: 'none', strokeDashoffset: 0 });
    }
    if (areaFill) gsap.set(areaFill, { opacity: 1 });

    // Scrubber sweep follows the clip expansion exactly
    if (areaClip) {
      tl.to(areaClip, { attr: { width: 280 }, duration: 1.8, ease: 'power2.out' }, 1.2);
    }
    tl.to(scrubber, { opacity: 1, duration: 0.2 }, 1.2);
    tl.to(scrubberWrap, { width: '100%', duration: 1.8, ease: 'power2.out' }, 1.2);
    tl.to(playhead, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, 2.6);
    tl.to(tooltip, { opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.5)' }, 2.6);

    var ttObj = { val: 148 };
    tl.fromTo(ttObj, { val: 148 }, {
      val: 240, duration: 1.8, ease: 'power2.out',
      onUpdate: function() { if (tooltipVal) tooltipVal.textContent = '$' + Math.round(ttObj.val) + 'K'; }
    }, 1.2);

    s.querySelectorAll('.hb-bar-grid__line').forEach(function(l, i) {
      tl.to(l, { opacity: 1, duration: 0.4 }, 1.5 + i * 0.1);
    });

    s.querySelectorAll('.hb-bar').forEach(function(bar, i) {
      tl.add(function() { bar.classList.add('hb-bar--animated'); }, 1.8 + i * 0.08);
    });

    var marketsSummary = s.querySelector('.hb-s3-markets-summary');
    if (marketsSummary) {
      tl.from(marketsSummary, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' }, 2.4);
    }

    s.querySelectorAll('.hb-s3-market-row').forEach(function(row, i) {
      tl.from(row, { opacity: 0, x: -10, duration: 0.4, ease: 'power2.out' }, 2.6 + i * 0.15);
    });

    s.querySelectorAll('.hb-s3-progress__fill').forEach(function(fill, i) {
      tl.add(function() { fill.classList.add('hb-s3-progress__fill--animated'); }, 2.8 + i * 0.15);
    });

    var m1 = s.querySelector('[data-hb-m1]');
    var m2 = s.querySelector('[data-hb-m2]');
    var m3 = s.querySelector('[data-hb-m3]');
    
    if (m1) {
      var m1Obj = { val: 0 };
      tl.fromTo(m1Obj, { val: 0 }, {
        val: 1.87, duration: 1.2, ease: 'power2.out',
        onUpdate: function() { m1.textContent = '$' + m1Obj.val.toFixed(2) + 'M'; }
      }, 2.8);
    }
    if (m2) {
      var m2Obj = { val: 0 };
      tl.fromTo(m2Obj, { val: 0 }, {
        val: 412, duration: 1.2, ease: 'power2.out',
        onUpdate: function() { m2.textContent = '$' + Math.round(m2Obj.val) + 'K'; }
      }, 2.95);
    }
    if (m3) {
      var m3Obj = { val: 0 };
      tl.fromTo(m3Obj, { val: 0 }, {
        val: 178, duration: 1.2, ease: 'power2.out',
        onUpdate: function() { m3.textContent = '$' + Math.round(m3Obj.val) + 'K'; }
      }, 3.1);
    }

    var annoArrow = s.querySelector('.hb-anno--arrow');
    var annoArrowPathList = s.querySelectorAll('.hb-ink-arrow path');
    var annoText = s.querySelector('.hb-anno--launch-text');

    gsap.set(annoArrow, { opacity: 1 });
    gsap.set(annoText, { opacity: 0, scale: 0.8, transformOrigin: 'center center' });
    
    annoArrowPathList.forEach(function(p) {
      var l = p.getTotalLength ? p.getTotalLength() : 200;
      gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
      tl.to(p, { strokeDashoffset: 0, duration: 0.4, ease: 'power2.out' }, 3.6);
    });

    tl.to(annoText, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' }, 4.0);

    return tl;
  }

  var builders = [buildTimeline1, buildTimeline2, buildTimeline3];

  function resetScene(index) {
    if (timelines[index]) {
      timelines[index].kill();
      timelines[index] = null;
    }
    if (hasGSAP) gsap.set(scenes[index], { opacity: 0 });

    if (index === 0) {
      var phaseA = scenes[0].querySelector('.hb-s1-phase--a');
      var phaseB = scenes[0].querySelector('.hb-s1-phase--b');
      if (phaseA) { phaseA.classList.remove('hb-s1-phase--visible'); gsap.set(phaseA, { opacity: 0, scale: 1, filter: 'none' }); }
      if (phaseB) { phaseB.classList.remove('hb-s1-phase--visible'); gsap.set(phaseB, { opacity: 0, x: '40px', filter: 'blur(10px)', boxShadow: 'none' }); }
      var newR = scenes[0].querySelector('.hb-s1-trow--new');
      if (newR) gsap.set(newR, { opacity: 0 });
      var existingR = scenes[0].querySelectorAll('.hb-s1-trow--existing');
      if (existingR.length) gsap.set(existingR, { y: -38 });
      var aCir = scenes[0].querySelector('.hb-anno--circle');
      var aTxt = scenes[0].querySelector('.hb-anno--credit-text');
      if (aCir) gsap.set(aCir, { opacity: 0, scale: 0.8 });
      if (aTxt) gsap.set(aTxt, { opacity: 0, scale: 0.8, rotation: -12 });
      var inkPath = scenes[0].querySelector('.hb-ink-circle path');
      if (inkPath) {
        var inkLen = inkPath.getTotalLength ? inkPath.getTotalLength() : 600;
        gsap.set(inkPath, { strokeDasharray: inkLen, strokeDashoffset: inkLen });
      }
    }

    if (index === 1) {
      scenes[1].querySelectorAll('.hb-s2-row--new .hb-check').forEach(function(c) {
        c.innerHTML = '';
        c.className = 'hb-check hb-check--pending';
        gsap.set(c, { scale: 0 });
      });
      scenes[1].querySelectorAll('.hb-s2-row--new .hb-check-loader').forEach(function(l) {
        gsap.set(l, { opacity: 0 });
      });
      var scanner = scenes[1].querySelector('.hb-s2-scanner');
      if (scanner) gsap.set(scanner, { opacity: 0, y: -100 });
      var newR2 = scenes[1].querySelector('.hb-s2-row--new');
      if (newR2) gsap.set(newR2, { height: 0, opacity: 0, overflow: 'hidden' });
    }

    if (index === 2) {
      var amountEl = scenes[2].querySelector('[data-hb-kpi-amount]');
      var approvalEl = scenes[2].querySelector('[data-hb-kpi-approval]');
      if (amountEl) amountEl.textContent = '$0.0M';
      if (approvalEl) approvalEl.textContent = '0.0%';

      scenes[2].querySelectorAll('.hb-bar').forEach(function(bar) {
        bar.classList.remove('hb-bar--animated');
      });
      scenes[2].querySelectorAll('.hb-s3-progress__fill').forEach(function(fill) {
        fill.classList.remove('hb-s3-progress__fill--animated');
      });

      var areaClip = scenes[2].querySelector('.hb-area-clip-rect');
      var areaLine = scenes[2].querySelector('.hb-area-line');
      var areaFill = scenes[2].querySelector('.hb-area-fill');
      if (areaClip) gsap.set(areaClip, { attr: { width: 0 } });
      if (areaLine) {
        gsap.set(areaLine, { strokeDasharray: 'none', strokeDashoffset: 0 });
      }
      if (areaFill) gsap.set(areaFill, { opacity: 1 });

      var scrubberWrap = scenes[2].querySelector('.hb-chart-scrubber-wrap');
      var scrubber = scenes[2].querySelector('.hb-chart-scrubber');
      var playhead = scenes[2].querySelector('.hb-chart-playhead');
      var tooltip = scenes[2].querySelector('.hb-chart-tooltip');
      if (scrubberWrap) gsap.set(scrubberWrap, { width: '0%' });
      if (scrubber) gsap.set(scrubber, { opacity: 0 });
      if (playhead) gsap.set(playhead, { opacity: 0, scale: 0 });
      if (tooltip) gsap.set(tooltip, { opacity: 0, y: 10 });

      var annoArrowPathList = scenes[2].querySelectorAll('.hb-ink-arrow path');
      var annoText = scenes[2].querySelector('.hb-anno--launch-text');
      if (annoText) gsap.set(annoText, { opacity: 0, scale: 0.8 });
      annoArrowPathList.forEach(function(p) {
        var l = p.getTotalLength ? p.getTotalLength() : 200;
        gsap.set(p, { strokeDasharray: l, strokeDashoffset: l });
      });
    }
  }

  function switchTab(index) {
    if (index === activeTab && hasPlayed) return;

    resetScene(activeTab);
    scenes[activeTab].classList.remove('hb-scene--active');

    tabs.forEach(function(t, i) {
      t.classList.toggle('hero-benefits__tab--active', i === index);
    });

    if (chromeTab) chromeTab.textContent = tabData[index].label;
    if (chromeAddr) chromeAddr.textContent = tabData[index].addr;

    scenes[index].classList.add('hb-scene--active');

    if (index === 0) {
      var phaseA = scenes[0].querySelector('.hb-s1-phase--a');
      if (phaseA) phaseA.style.padding = '';
    }

    activeTab = index;
    hasPlayed = true;

    if (!isMobile && hasGSAP) {
      timelines[index] = builders[index]();
      timelines[index].play();
    } else {
      scenes[index].style.opacity = '1';
    }

    startProgress(index);
  }

  function startProgress(index) {
    if (progressTween) progressTween.kill();

    tabs.forEach(function(t) {
      var bar = t.querySelector('.hero-benefits__progress');
      if (bar) bar.style.width = '0';
    });

    if (!hasGSAP) return;

    var bar = tabs[index].querySelector('.hero-benefits__progress');
    progressTween = gsap.to(bar, {
      width: '100%', duration: 8, ease: 'none',
      onComplete: function() {
        switchTab((index + 1) % 3);
      }
    });
  }

  tabs.forEach(function(tab, i) {
    tab.addEventListener('click', function() { switchTab(i); });
  });

  container.addEventListener('mouseenter', function() {
    if (progressTween) progressTween.pause();
  });
  container.addEventListener('mouseleave', function() {
    if (progressTween) progressTween.resume();
  });

  var benefitObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !hasPlayed) {
        switchTab(0);
        benefitObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  benefitObserver.observe(container);
}

// ── Init on DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', () => {
  // Re-observe reveals (for dynamically added elements)
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  initFlywheel();
  initHeroBenefits();
});
