document.addEventListener('DOMContentLoaded', function () {

  /* -------------------------------------------------- */
  /*  1. Scroll Reveal                                  */
  /* -------------------------------------------------- */

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  function observeRevealElements(root) {
    (root || document).querySelectorAll('.fl-reveal:not(.visible)').forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  observeRevealElements();

  var bodyMO = new MutationObserver(function (mutations) {
    mutations.forEach(function (m) {
      m.addedNodes.forEach(function (node) {
        if (node.nodeType !== 1) return;
        if (node.classList && node.classList.contains('fl-reveal')) revealObserver.observe(node);
        if (node.querySelectorAll) {
          node.querySelectorAll('.fl-reveal:not(.visible)').forEach(function (el) {
            revealObserver.observe(el);
          });
        }
      });
    });
  });
  bodyMO.observe(document.body, { childList: true, subtree: true });

  /* -------------------------------------------------- */
  /*  2. Nav Scroll                                     */
  /* -------------------------------------------------- */

  var nav = document.querySelector('.fl-nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* -------------------------------------------------- */
  /*  3. Mobile Menu                                    */
  /* -------------------------------------------------- */

  var hamburger = document.querySelector('.fl-nav__hamburger');
  var mobileMenu = document.querySelector('.fl-nav__mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  /* -------------------------------------------------- */
  /*  4. Testimonials Carousel                          */
  /* -------------------------------------------------- */

  var testimonialCards = document.querySelectorAll('.fl-testimonial-card');
  var testimonialDots = document.querySelectorAll('.fl-testimonial-dot');
  var testimonialWrap = document.querySelector('.fl-testimonials__wrap');

  if (testimonialCards.length) {
    var tIdx = 0;
    var tTimer = null;
    var tPaused = false;

    function showTestimonial(idx) {
      tIdx = idx;
      testimonialCards.forEach(function (c, i) {
        c.classList.toggle('active', i === idx);
      });
      testimonialDots.forEach(function (d, i) {
        d.classList.toggle('active', i === idx);
      });
    }

    function nextTestimonial() {
      showTestimonial((tIdx + 1) % testimonialCards.length);
    }

    function startTestimonialTimer() {
      clearInterval(tTimer);
      tTimer = setInterval(function () {
        if (!tPaused) nextTestimonial();
      }, 5000);
    }

    testimonialDots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showTestimonial(i);
        startTestimonialTimer();
      });
    });

    if (testimonialWrap) {
      testimonialWrap.addEventListener('mouseenter', function () { tPaused = true; });
      testimonialWrap.addEventListener('mouseleave', function () { tPaused = false; });
    }

    showTestimonial(0);
    startTestimonialTimer();
  }

  /* -------------------------------------------------- */
  /*  5. Flywheel (mirrors original static site)         */
  /* -------------------------------------------------- */

  var segments = [
    { name: 'Checkout', color: '#8AC8AE',
      description: 'Built for the full complexity of direct selling commerce. Enrollments, subscriptions, multi-market pricing at the variant level, Order on Behalf Of \u2014 all handled natively, without plugins or workarounds.',
      media: 'screen-checkout.png', mediaType: 'image', chrome: true, tabTitle: 'Fluid Checkout' },
    { name: 'Payments', color: '#82CC9A',
      description: 'Every transaction deserves to go through. Fluid Payments uses cascading retries, decline recovery, network tokens, and a global suite of payment methods to make sure it does.',
      media: 'screen-payments.mp4', mediaType: 'video', chrome: true, tabTitle: 'Fluid Payments' },
    { name: 'FairShare', color: '#F2D270',
      description: 'Credit goes to the rep who showed up. FairShare tracks the full customer journey \u2014 every share, every touchpoint, every return visit \u2014 and resolves attribution automatically at checkout.',
      media: 'screen-fairshare.png', mediaType: 'image', chrome: true, tabTitle: 'Fluid FairShare' },
    { name: 'Connect', color: '#F0B088',
      description: 'Your commission engine and your commerce platform, continuously in sync. Bi-directional. Automatic. Real-time. No scripts, no exports, no IT dependency.',
      media: 'screen-sync.png', mediaType: 'image', chrome: true, tabTitle: 'Fluid Connect' },
    { name: 'App', color: '#E09098',
      description: 'A rep-facing business tool for mobile and desktop. Content sharing with automatic attribution, Smart Links, contact management, and Catchups \u2014 an AI-powered assistant that tells reps exactly when to reach out and why.',
      media: ['screen-app1.png', 'screen-app2.png', 'screen-app3.png'], mediaType: 'phones', chrome: false },
    { name: 'Builder', color: '#C4A8D4',
      description: 'The drag-and-drop web tool that puts your website in your team\u2019s hands. Launch campaigns, redesign pages, update products \u2014 without a developer ticket. Every page carries FairShare attribution automatically.',
      media: 'screen-builder.png', mediaType: 'image', chrome: true, tabTitle: 'Fluid Builder' },
    { name: 'Droplets', color: '#96C4EC',
      description: 'The extensibility layer. An open marketplace of installable capabilities \u2014 tax tools, fulfillment providers, back office integrations, and more \u2014 built by Fluid and by third parties. One-click install. The platform grows with you.',
      media: 'screen-droplets.png', mediaType: 'image', chrome: true, tabTitle: 'Fluid Droplets' }
  ];

  var N = segments.length;
  var SEG = 360 / N;
  var CX = 300, CY = 300;
  var P = {
    midR: 240, halfW: 25, textOffset: -1,
    rotationOffset: -4, textShift: 3.5,
    wheelDuration: 1.3, fadeDuration: 1.5,
    segFontSize: 19, outlineWidth: 1, glowRadius: 25
  };
  var outerR = P.midR + P.halfW;
  var innerR = P.midR - P.halfW;
  var textR = P.midR + P.textOffset;

  function polar(r, deg) {
    var rad = (deg - 90) * Math.PI / 180;
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
  }

  function segShape(i) {
    var a1 = i * SEG, a2 = (i + 1) * SEG;
    var oS = polar(outerR, a1), oE = polar(outerR, a2);
    var iS = polar(innerR, a2), iE = polar(innerR, a1);
    return 'M' + oS.x.toFixed(2) + ',' + oS.y.toFixed(2) +
      ' A' + outerR + ',' + outerR + ' 0 0 1 ' + oE.x.toFixed(2) + ',' + oE.y.toFixed(2) +
      ' A' + P.halfW + ',' + P.halfW + ' 0 0 1 ' + iS.x.toFixed(2) + ',' + iS.y.toFixed(2) +
      ' A' + innerR + ',' + innerR + ' 0 0 0 ' + iE.x.toFixed(2) + ',' + iE.y.toFixed(2) +
      ' A' + P.halfW + ',' + P.halfW + ' 0 0 0 ' + oS.x.toFixed(2) + ',' + oS.y.toFixed(2) + ' Z';
  }

  function textArcD(i) {
    var pad = 2, shift = P.textShift;
    var a1 = i * SEG + pad + shift, a2 = (i + 1) * SEG - pad + shift;
    var s = polar(textR, a1), e = polar(textR, a2);
    return 'M' + s.x.toFixed(2) + ',' + s.y.toFixed(2) +
      ' A' + textR + ',' + textR + ' 0 0 1 ' + e.x.toFixed(2) + ',' + e.y.toFixed(2);
  }

  var svgEl = document.querySelector('.fl-flywheel-svg');
  var panelEl = document.querySelector('.fl-flywheel-panel');
  var wheelEl = document.querySelector('.fl-flywheel-wheel');
  var activeSegment = 0;
  var currentRotation = 0;

  if (svgEl && panelEl) {
    var svgNS = 'http://www.w3.org/2000/svg';

    var defs = document.createElementNS(svgNS, 'defs');
    segments.forEach(function (seg, i) {
      var p = document.createElementNS(svgNS, 'path');
      p.setAttribute('id', 'fwTp' + i);
      p.setAttribute('d', textArcD(i));
      p.setAttribute('fill', 'none');
      defs.appendChild(p);
    });
    svgEl.appendChild(defs);

    segments.forEach(function (seg, i) {
      var outline = document.createElementNS(svgNS, 'path');
      outline.setAttribute('d', segShape(i));
      outline.setAttribute('data-seg', i);
      outline.style.fill = '#000000';
      outline.style.stroke = seg.color;
      outline.style.strokeWidth = P.outlineWidth + 'px';
      outline.style.strokeLinejoin = 'round';
      outline.style.cursor = 'pointer';
      outline.style.transition = 'opacity ' + P.fadeDuration + 's ease';
      svgEl.appendChild(outline);
    });

    segments.forEach(function (seg, i) {
      var filled = document.createElementNS(svgNS, 'path');
      filled.setAttribute('d', segShape(i));
      filled.setAttribute('data-seg-filled', i);
      filled.style.fill = seg.color;
      filled.style.stroke = seg.color;
      filled.style.strokeWidth = '1px';
      filled.style.opacity = '0';
      filled.style.pointerEvents = 'none';
      filled.style.transition = 'opacity ' + P.fadeDuration + 's ease, filter ' + P.fadeDuration + 's ease';
      svgEl.appendChild(filled);
    });

    segments.forEach(function (seg, i) {
      var text = document.createElementNS(svgNS, 'text');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dy', '0.35em');
      text.setAttribute('data-seg-text', i);
      text.style.fill = seg.color;
      text.style.opacity = '0.5';
      text.style.fontFamily = "var(--ff-heading), 'Inter', sans-serif";
      text.style.fontWeight = '900';
      text.style.fontSize = P.segFontSize + 'px';
      text.style.letterSpacing = '0.02em';
      text.style.transition = 'fill ' + P.fadeDuration + 's ease, opacity ' + P.fadeDuration + 's ease';
      text.style.pointerEvents = 'none';
      var tp = document.createElementNS(svgNS, 'textPath');
      tp.setAttribute('href', '#fwTp' + i);
      tp.setAttribute('startOffset', '50%');
      tp.textContent = seg.name;
      text.appendChild(tp);
      svgEl.appendChild(text);
    });

    svgEl.addEventListener('click', function (e) {
      var target = e.target.closest('[data-seg]');
      if (target) {
        setActiveSegment(parseInt(target.getAttribute('data-seg')));
      }
    });

    function assetUrl(filename) {
      var el = document.querySelector('[data-asset-base]');
      if (el) return el.getAttribute('data-asset-base') + filename;
      var links = document.querySelectorAll('link[rel="stylesheet"][href*="/assets/"]');
      for (var j = 0; j < links.length; j++) {
        var m = links[j].href.match(/(.*\/assets\/)/);
        if (m) return m[1] + filename;
      }
      return filename;
    }

    segments.forEach(function (seg, i) {
      var card = document.createElement('div');
      card.className = 'fl-flywheel-card' + (i === 0 ? ' active' : '');

      var mediaHTML = '';
      if (seg.chrome) {
        var mediaSrc = seg.mediaType === 'video'
          ? '<video src="' + assetUrl(seg.media) + '" autoplay loop muted playsinline></video>'
          : '<img src="' + assetUrl(seg.media) + '" alt="' + seg.name + '" loading="lazy">';
        mediaHTML =
          '<div class="fl-browser-chrome">' +
            '<div class="fl-browser-chrome__bar">' +
              '<div class="fl-browser-chrome__dots"><span></span><span></span><span></span></div>' +
              '<div class="fl-browser-chrome__tab">' + seg.tabTitle + '</div>' +
            '</div>' +
            '<div class="fl-browser-chrome__addr">' +
              '<svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M6 1C3.79 1 2 2.79 2 5v2c0 .55.45 1 1 1h1V5c0-1.1.9-2 2-2s2 .9 2 2v3h1c.55 0 1-.45 1-1V5c0-2.21-1.79-4-4-4z" fill="rgba(255,255,255,0.25)"/><rect x="4" y="7" width="4" height="4" rx="1" fill="rgba(255,255,255,0.25)"/></svg>' +
              '<span>fluid.app/' + seg.name.toLowerCase() + '</span>' +
            '</div>' +
            '<div class="fl-browser-chrome__body">' + mediaSrc + '</div>' +
          '</div>';
      } else if (seg.mediaType === 'phones') {
        mediaHTML = '<div style="display:flex;gap:12px;align-items:center;justify-content:center;">';
        seg.media.forEach(function (src) {
          mediaHTML += '<img src="' + assetUrl(src) + '" alt="' + seg.name + '" style="height:360px;border-radius:24px;object-fit:contain;" loading="lazy">';
        });
        mediaHTML += '</div>';
      }

      card.innerHTML =
        '<div class="fl-flywheel-card__name" style="color:' + seg.color + '">' + seg.name + '</div>' +
        '<p class="fl-flywheel-card__desc">' + seg.description + '</p>' +
        mediaHTML;
      panelEl.appendChild(card);
    });

    function setActiveSegment(index) {
      var targetAngle = -(index * SEG + SEG / 2);

      var diff = targetAngle - currentRotation;
      diff = ((diff % 360) + 540) % 360 - 180;
      currentRotation = currentRotation + diff;

      activeSegment = index;
      if (wheelEl) {
        wheelEl.style.transform = 'rotate(' + currentRotation + 'deg)';
        wheelEl.style.transition = 'transform ' + P.wheelDuration + 's cubic-bezier(0.33, 1, 0.68, 1)';
      }

      document.querySelectorAll('[data-seg-filled]').forEach(function (el) {
        var i = parseInt(el.getAttribute('data-seg-filled'));
        var active = i === index;
        el.style.opacity = active ? '1' : '0';
        el.style.filter = active ? 'drop-shadow(0 0 ' + P.glowRadius + 'px ' + segments[i].color + '88)' : 'none';
      });

      document.querySelectorAll('[data-seg-text]').forEach(function (el) {
        var i = parseInt(el.getAttribute('data-seg-text'));
        var active = i === index;
        el.style.fill = active ? '#000000' : segments[i].color;
        el.style.opacity = active ? '1' : '0.5';
      });

      panelEl.querySelectorAll('.fl-flywheel-card').forEach(function (card, i) {
        card.classList.toggle('active', i === index);
      });
    }

    setActiveSegment(0);
  }

  /* -------------------------------------------------- */
  /*  6. AI Catchup Cards                               */
  /* -------------------------------------------------- */

  var phoneMockup = document.querySelector('.fl-phone-mockup');
  if (phoneMockup) {
    var catchupObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var cards = document.querySelectorAll('.fl-catchup-card');
          cards.forEach(function (card, i) {
            setTimeout(function () {
              card.classList.add('visible');
            }, i * 300);
          });
          catchupObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    catchupObserver.observe(phoneMockup);
  }

  /* -------------------------------------------------- */
  /*  7. Stat Count-Up                                  */
  /* -------------------------------------------------- */

  var statsGrid = document.querySelector('.fl-stats__grid');
  if (statsGrid) {
    var statsObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var numbers = entry.target.querySelectorAll('.fl-stat-card__number[data-count]');
          numbers.forEach(function (el) {
            var target = parseFloat(el.getAttribute('data-count'));
            var suffix = el.getAttribute('data-suffix') || '';
            var prefix = el.getAttribute('data-prefix') || '';
            var isFloat = target % 1 !== 0;
            var steps = 40;
            var stepTime = 30;
            var current = 0;
            var increment = target / steps;
            var step = 0;
            var timer = setInterval(function () {
              step++;
              current += increment;
              if (step >= steps) {
                current = target;
                clearInterval(timer);
              }
              var display = isFloat ? current.toFixed(1) : Math.round(current);
              el.textContent = prefix + display + suffix;
            }, stepTime);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsGrid);
  }

});
