/* ═══════════════════════════════════════════════════════════
   NISHANT GAWANDE — PORTFOLIO
   https://portfoliong-web.netlify.app

   Table of Contents
   ─────────────────
   1.  Preloader             — SVG loading screen with timed reveal
   2.  Navbar Scroll         — Sticky nav background on scroll
   3.  Reading Progress      — Top-of-page progress bar
   4.  Mobile Menu           — Hamburger toggle, auto-close on nav, outside click
   5.  Active Nav             — IntersectionObserver highlights current section
   6.  Scroll Reveal         — Fade-up elements on scroll into view
   7.  Arc Dividers          — Staggered section divider animations
   8.  Stripe Section Label  — Right-edge label updates with anime SVG icons
   9.  Scroll to Top         — Floating button, appears after 400px
   10. URL Hash Sync         — Updates URL hash as user scrolls
   11. Time-Aware Greeting   — Morning/afternoon/evening/night with SVG icons
   12. Contact Form          — Formspree integration with success/error states
   13. Certificate Modal     — Click cert → full-size image + download
   14. Typewriter Effect     — Rotating role titles in hero
   15. Project Card 3D Tilt  — Perspective tilt on hover (desktop only)
   16. Stat Counter          — Animated count-up when stats enter viewport
   17. Copy Email            — Click email → clipboard + toast notification
   18. Magnetic CTA          — Buttons follow cursor on hover (desktop only)

   Easter Eggs
   ─────────────────
   19. Konami Code           — ↑↑↓↓←→←→BA visual flash
   20. Triple-Click Logo     — Matrix rain canvas animation
   21. Type '1337'           — Hacker flash overlay
   22. Logo Long-Hover       — Brand glitch animation
   23. Type 'bankai'         — Anime screen shake
   24. Type 'roll'           — 360° barrel roll
   25. 5× Click Year         — Random year scramble
   26. Color Themes          — Type 'blue', 'gold', 'green', 'purple', 'red'
   27. Solid Brick           — 3× click "Solid." in contact
   28. Cheat Sheet           — Hold ? to reveal secret menu
   29. Console Greeting      — Dev message in F12 console

   Premium Polish
   ─────────────────
   30. Dynamic Page Title    — Tab title updates per section
   31. Parallax Hero         — Grid + grain move on scroll
   32. Cursor Follower       — Smooth circle follows mouse (desktop)
   33. Skill Tag Stagger     — Tags animate in sequence
   34. Footer Auto-Year      — © year always current
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ── PRELOADER ───────────────────────────────────────────── */
(function () {
  const el = document.getElementById('preloader');
  if (!el) return;
  const MIN = 2000;
  let ready = false, rotated = false, done = false;
  
  const hide = () => {
    if (done) return;
    if (ready && rotated) {
      done = true;
      el.classList.add('hidden');
      setTimeout(() => {
        document.querySelectorAll('.stagger').forEach(s => s.classList.add('show'));
        setTimeout(() => el.remove(), 500); // Clean up DOM
      }, 100);
    }
  };
  
  setTimeout(() => { rotated = true; hide(); }, MIN);
  
  if (document.readyState === 'complete') { ready = true; hide(); }
  else window.addEventListener('load', () => { ready = true; hide(); });
  
  // Hard fallback: Force hide after 2.5s if load event fails (e.g. file:// protocol)
  setTimeout(() => {
    if (!done) { ready = true; rotated = true; hide(); }
  }, 2500);
})();

/* ── NAVBAR SCROLL ───────────────────────────────────────── */
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();

/* ── READING PROGRESS BAR ────────────────────────────────── */
(function () {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

/* ── MOBILE MENU ─────────────────────────────────────────── */
(function () {
  const btn = document.getElementById('menu-toggle');
  const links = document.getElementById('nav-links');
  const nav = document.getElementById('navbar');
  if (!btn || !links) return;

  btn.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', e => {
    if (nav && !nav.contains(e.target)) {
      links.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ── ACTIVE NAV ──────────────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));
})();

/* ── SCROLL REVEAL ───────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();

/* ── ARC DIVIDERS — one-time staggered ───────────────────── */
(function () {
  const divs = document.querySelectorAll('.arc-divider');
  if (!divs.length) return;
  window.addEventListener('load', () => {
    divs.forEach((d, i) => setTimeout(() => d.classList.add('animated'), 300 + i * 100));
  });
})();

/* ── STRIPE SECTION LABEL + ANIME SVG ICONS ────────────── */
(function () {
  const label = document.getElementById('stripe-label');
  if (!label) return;
  const sections = document.querySelectorAll('[data-section-label]');
  if (!sections.length) return;

  // Anime-accurate SVG icons per section
  const sectionIcons = {
    // Torii Gate (Japanese shrine entrance) — symbolizes home/beginning
    HOME: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><line x1="5" y1="4" x2="19" y2="4"/><line x1="3" y1="7" x2="21" y2="7"/><line x1="6" y1="4" x2="6" y2="22"/><line x1="18" y1="4" x2="18" y2="22"/><line x1="6" y1="12" x2="18" y2="12"/></svg>',
    // Sharingan Eye (Naruto) — concentric circles + 3 tomoe dots ✅ APPROVED
    ABOUT: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.8" fill="currentColor"/><circle cx="12" cy="6.5" r="1.2" fill="currentColor"/><circle cx="7.2" cy="15" r="1.2" fill="currentColor"/><circle cx="16.8" cy="15" r="1.2" fill="currentColor"/></svg>',
    // 4-point Shuriken throwing star (Naruto) — clean, iconic
    SKILLS: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="12" cy="12" r="2"/><path d="M12 2l-2 8h4zM22 12l-8-2v4zM12 22l2-8h-4zM2 12l8 2v-4z"/></svg>',
    // Nichirin Katana blade (Demon Slayer) ✅ APPROVED
    PROJECTS: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M6 2c4-1 9 1 14 6" stroke-width="1.5"/><path d="M5 2l1 3"/><line x1="4" y1="5" x2="7" y2="5" stroke-width="2"/><path d="M5.5 5.5L9 12.5"/><path d="M9 12.5c.3.5.3 1 0 1.5"/><path d="M7 14l-3 4"/><line x1="3" y1="19" x2="5" y2="21"/></svg>',
    // Death Note Book ✅ APPROVED
    EDUCATION: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M5 3h14a1 1 0 011 1v16a1 1 0 01-1 1H5a1 1 0 01-1-1V4a1 1 0 011-1z"/><line x1="8" y1="3" x2="8" y2="21"/><circle cx="14" cy="10" r="2.5"/><path d="M13 9.5v1M15 9.5v1"/><path d="M12.5 12.5l1.5 2 1.5-2"/></svg>',
    // Hunter License card (HxH) — rectangular card with star seal
    CERTS: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><rect x="3" y="5" width="18" height="14" rx="2"/><line x1="7" y1="9" x2="13" y2="9"/><line x1="7" y1="12" x2="11" y2="12"/><circle cx="17" cy="13" r="2.5"/><path d="M17 11l.5 1.2 1.3.2-1 .9.2 1.3-1-.6-1 .6.2-1.3-1-.9 1.3-.2z" fill="currentColor"/></svg>',
    // Chat speech bubble icon for Recommendations
    RECOMMENDATIONS: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><circle cx="9" cy="10" r="1" fill="currentColor"/><circle cx="12" cy="10" r="1" fill="currentColor"/><circle cx="15" cy="10" r="1" fill="currentColor"/></svg>',
    // Kunai with message tag (Naruto) — blade + diamond ring + cloth strip
    CONTACT: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"><path d="M12 2l-3 10h6z"/><circle cx="12" cy="14" r="2"/><path d="M12 16v2"/><path d="M10 18c-2 1-4 2.5-5 3"/><path d="M14 18c2 1 4 2.5 5 3"/></svg>',
    // Infinity loop
    END: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 12c-2-2.5-4-4-6-4s-4 1.8-4 4 1.8 4 4 4c2 0 4-1.5 6-4z"/><path d="M12 12c2 2.5 4 4 6 4s4-1.8 4-4-1.8-4-4-4c-2 0-4 1.5-6 4z"/></svg>'
  };

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const txt = e.target.dataset.sectionLabel || '';
        const currentTxt = label.dataset.current;
        if (currentTxt !== txt) {
          label.style.opacity = '0';
          setTimeout(() => {
            const icon = sectionIcons[txt] || '';
            label.innerHTML = icon + ' ' + txt;
            label.dataset.current = txt;
            label.style.opacity = '';
          }, 150);
        }
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => obs.observe(s));
})();

/* ── SCROLL TO TOP ───────────────────────────────────────── */
(function () {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── URL HASH SCROLL SYNC ─────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const hashObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        if (location.hash !== '#' + id) {
          history.replaceState(null, '', '#' + id);
        }
      }
    });
  }, { rootMargin: '-30% 0px -65% 0px' });

  sections.forEach(s => hashObs.observe(s));

  // Also handle hero/home — when at top, clear hash
  const hero = document.querySelector('.hero');
  if (hero) {
    const heroObs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        history.replaceState(null, '', window.location.pathname);
      }
    }, { rootMargin: '0px 0px -50% 0px' });
    heroObs.observe(hero);
  }
})();

/* ── TIME-AWARE GREETING + SVG ────────────────────────── */
(function () {
  const el = document.getElementById('time-greeting');
  const svgEl = document.getElementById('time-svg');
  if (!el) return;
  const h = new Date().getHours();
  let greeting, icon;

  if (h >= 5 && h < 12) {
    greeting = 'Good morning';
    // Rising sun with rays
    icon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-2px;margin-right:4px;color:#e8a838"><circle cx="12" cy="14" r="4" fill="rgba(232,168,56,0.3)"/><path d="M12 6v2M4.9 9.9l1.4 1.4M2 16h2M20 16h2M17.7 11.3l1.4-1.4"/><line x1="4" y1="20" x2="20" y2="20" stroke-width="1"/></svg>';
  } else if (h >= 12 && h < 17) {
    greeting = 'Good afternoon';
    // Bright sun
    icon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-2px;margin-right:4px;color:#f0b429"><circle cx="12" cy="12" r="4" fill="rgba(240,180,41,0.3)"/><path d="M12 3v2M12 19v2M5.6 5.6l1.4 1.4M17 7l1.4-1.4M3 12h2M19 12h2M5.6 18.4l1.4-1.4M17 17l1.4 1.4"/></svg>';
  } else if (h >= 17 && h < 21) {
    greeting = 'Good evening';
    // Sunset — half sun sinking below horizon
    icon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-2px;margin-right:4px;color:#e07840"><path d="M17 12a5 5 0 10-10 0" fill="rgba(224,120,64,0.2)"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 4v2M4.9 6.9l1.4 1.4M19.1 6.9l-1.4 1.4"/></svg>';
  } else {
    greeting = 'Good night';
    // Moon with stars — deep night
    icon = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="vertical-align:-2px;margin-right:4px;color:#7b9ec4"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z" fill="rgba(123,158,196,0.15)"/><circle cx="18" cy="5" r="0.8" fill="currentColor"/><circle cx="20" cy="9" r="0.5" fill="currentColor"/><circle cx="16" cy="3" r="0.4" fill="currentColor"/></svg>';
  }

  el.textContent = greeting;
  if (svgEl) svgEl.innerHTML = icon;
})();

/* ── CONTACT FORM ────────────────────────────────────────── */
(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form || !status) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const sub = form.querySelector('button[type="submit"]');
    sub.disabled = true;
    sub.textContent = 'Sending...';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        status.textContent = "Message sent. I'll get back to you soon.";
        status.style.color = '#3a9e5f';
        form.reset();
      } else throw new Error();
    } catch {
      status.textContent = 'Something went wrong. Try emailing directly.';
      status.style.color = 'var(--accent)';
    } finally {
      sub.disabled = false;
      sub.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }
  });
})();

/* ── CERTIFICATE MODAL ───────────────────────────────────── */
(function () {
  const certData = {
    Intro2SDE: 'assets/certificates/Intro2SDE.jpg',
    JavaAppDev: 'assets/certificates/SQL.jpg',
    Java4begineers: 'assets/certificates/Java4begineers.jpg',
    OOPJava: 'assets/certificates/Java4begineers.jpg',
    Python: 'assets/certificates/Python.jpg',
    GitGitHub: 'assets/certificates/TCSYP.jpg'
  };

  const modal = document.getElementById('certModal');
  const imgEl = document.getElementById('certImage');
  const dlEl = document.getElementById('certDownload');
  if (!modal || !imgEl || !dlEl) return;

  function openModal(id, el) {
    const src = certData[id];
    if (!src) return;
    imgEl.src = src;
    dlEl.href = src;
    // Populate header from data attributes
    const titleEl = document.getElementById('modal-cert-title');
    const issuerEl = document.getElementById('modal-cert-issuer');
    if (titleEl && el) titleEl.textContent = el.dataset.certTitle || '';
    if (issuerEl && el) issuerEl.textContent = el.dataset.certIssuer || '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach click + keyboard listeners to all cert items
  document.querySelectorAll('[data-cert]').forEach(el => {
    el.addEventListener('click', () => openModal(el.dataset.cert, el));
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(el.dataset.cert, el);
      }
    });
  });

  // Close listeners
  const closeBtn = document.getElementById('modal-close');
  const closeBtnAlt = document.getElementById('modal-close-btn');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBtnAlt) closeBtnAlt.addEventListener('click', closeModal);

  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
})();

/* ── TYPEWRITER EFFECT ───────────────────────────────────── */
(function () {
  const el = document.getElementById('typed-role');
  if (!el) return;

  const roles = [
    'Full-Stack Developer',
    'Java Enthusiast',
    'Freelance Developer',
    'Problem Solver',
    'Open Source Contributor'
  ];

  let roleIdx = 0, charIdx = 0, deleting = false;

  function tick() {
    const current = roles[roleIdx];
    if (!deleting) {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, 2000); // Pause before deleting
        return;
      }
      setTimeout(tick, 55);
    } else {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(tick, 400); // Pause before next word
        return;
      }
      setTimeout(tick, 30);
    }
  }

  // Start after preloader + stagger (2.5s)
  setTimeout(tick, 2500);
})();

/* ── PROJECT CARD 3D TILT ────────────────────────────────── */
(function () {
  const cards = document.querySelectorAll('.ch-card');
  if (!cards.length) return;
  const MAX_TILT = 5;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * MAX_TILT * 2;
      const rotateX = (0.5 - y) * MAX_TILT * 2;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();

/* ── UBUNTU DEV TERMINAL SYSTEM ───────────────────────────── */
(function () {
  const overlay = document.getElementById('terminal-overlay');
  const input = document.getElementById('terminal-input');
  const history = document.getElementById('terminal-history');
  const closeBtn = document.getElementById('terminal-close');

  if (!overlay || !input || !history || !closeBtn) return;

  let active = false;

  function openTerminal() {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    input.focus();
    active = true;
    document.body.style.overflow = 'hidden';
  }

  function closeTerminal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    active = false;
    document.body.style.overflow = '';
  }

  // Ctrl + ` key toggle
  document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === '`') {
      e.preventDefault();
      if (active) closeTerminal();
      else openTerminal();
    }
  });

  closeBtn.addEventListener('click', closeTerminal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeTerminal();
  });

  // Focus input when clicking anywhere inside console box
  const body = document.getElementById('terminal-body');
  if (body) {
    body.addEventListener('click', () => {
      input.focus();
    });
  }

  // Command History System
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value.trim();
      input.value = '';
      if (!val) return;

      // Echo command
      echo(`nishant@portfolio:~$ ${val}`, 'prompt-line');

      // Process command
      processCommand(val.toLowerCase());
      history.scrollTop = history.scrollHeight;
    }
  });

  function echo(text, type = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerHTML = text;
    history.appendChild(line);
  }

  function processCommand(cmd) {
    const args = cmd.split(' ');
    const primary = args[0];

    switch (primary) {
      case 'help':
        echo('Available commands:', 'term-header');
        echo('  <span class="term-highlight">help</span>     - Display this menu');
        echo('  <span class="term-highlight">skills</span>   - List core developer skill stack');
        echo('  <span class="term-highlight">projects</span> - List featured engineering works');
        echo('  <span class="term-highlight">contact</span>  - Get primary contact methods');
        echo('  <span class="term-highlight">resume</span>   - View professional resume');
        echo('  <span class="term-highlight">matrix</span>   - Trigger green matrix cascade');
        echo('  <span class="term-highlight">clear</span>    - Clear console history');
        echo('  <span class="term-highlight">github</span>   - Redirect to GitHub profile');
        echo('  <span class="term-highlight">learniq</span>  - Redirect to LearnIQ assessment engine');
        echo('  <span class="term-highlight">exit</span>     - Close the terminal shell');
        break;

      case 'skills':
        echo('CORE TECHNICAL STACK:', 'term-header');
        echo('  Languages  : Java, JavaScript, HTML5, CSS3, SQL');
        echo('  Frameworks : Spring Boot, Spring Security, React, JPA');
        echo('  Databases  : MySQL, PostgreSQL');
        echo('  Tools      : Git, GitHub, REST APIs, Linux, VS Code');
        break;

      case 'projects':
        echo('FEATURED ENGINEERING WORKS:', 'term-header');
        echo('  CH.01 [LearnIQ] - Flagship assessment platform');
        echo('  CH.02 [Engiplex Solutions] - Live commercial EdTech site');
        echo('  CH.03 [Symphony] - Playable multi-instrument app');
        echo('  CH.04 [FinCore Banking] - Secure financial schema API');
        echo('  CH.05 [Grocery Shopping] - Console inventory flow');
        echo('  CH.06 [Quiz Hub] - Responsive categories quiz');
        break;

      case 'contact':
        echo('PRIMARY CHANNELS:', 'term-header');
        echo('  Email: nishantsg3@gmail.com');
        echo('  GitHub: <a href="https://github.com/Nishantsg3" target="_blank" class="term-link">github.com/Nishantsg3</a>');
        echo('  LinkedIn: <a href="https://linkedin.com/in/nishant-g3" target="_blank" class="term-link">linkedin.com/in/nishant-g3</a>');
        break;

      case 'resume':
        echo('Opening professional resume...');
        window.open('assets/Nishant_Gawande_Resume.pdf', '_blank');
        break;

      case 'matrix':
        echo('Activating Matrix cascade rain...', 'term-success');
        setTimeout(() => {
          closeTerminal();
          triggerMatrixRainGlobal();
        }, 300);
        break;

      case 'clear':
        history.innerHTML = '';
        break;

      case 'github':
        echo('Redirecting to GitHub...');
        window.open('https://github.com/Nishantsg3', '_blank');
        break;

      case 'learniq':
        echo('Redirecting to LearnIQ Assessment Engine...');
        window.open('https://learniq-frontend-7oyn.onrender.com', '_blank');
        break;

      case 'exit':
        closeTerminal();
        break;

      case 'sudo':
        if (args[1] === 'hire' && args[2] === 'nishant') {
          echo('ACCESS UNLOCKED: Nishant is highly qualified. Redirecting to Contact...', 'term-success');
          setTimeout(() => {
            closeTerminal();
            window.location.hash = '#contact';
          }, 1500);
        } else {
          echo('Permission denied. Try "sudo hire nishant"');
        }
        break;

      default:
        echo(`bash: ${cmd}: command not found. Type <span class="term-highlight">help</span> for options.`);
    }
  }

  // Export openTerminal globally so easter eggs can trigger it
  window.openDevTerminal = openTerminal;
  window.echoTerminal = echo;
})();

/* ── KONAMI CODE EASTER EGG (REWORKED) ────────────────────────── */
(function () {
  const code = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let pos = 0;

  document.addEventListener('keydown', e => {
    if (e.key === code[pos]) {
      pos++;
      if (pos === code.length) {
        pos = 0;
        triggerKonami();
      }
    } else {
      pos = 0;
    }
  });

  function triggerKonami() {
    if (typeof window.openDevTerminal === 'function') {
      window.openDevTerminal();
      if (typeof window.echoTerminal === 'function') {
        window.echoTerminal('&nbsp;');
        window.echoTerminal('nishant@portfolio:~$ ACCESS GRANTED', 'term-success');
        window.echoTerminal('Loading root developer console profiles...', 'term-success');
        window.echoTerminal('System stats: cpu=1.2% memory=41% uptime=133.7h');
        window.echoTerminal('&nbsp;');
      }
    }
  }
})();

/* ── EASTER EGG: TYPE '1337' (REWORKED) ────────────────────── */
(function () {
  const seq = '1337';
  let buf = '';

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    buf += e.key;
    if (buf.length > 4) buf = buf.slice(-4);
    if (buf === seq) {
      buf = '';
      if (typeof window.openDevTerminal === 'function') {
        window.openDevTerminal();
        if (typeof window.echoTerminal === 'function') {
          window.echoTerminal('&nbsp;');
          window.echoTerminal('nishant@portfolio:~$ 1337_MODE = TRUE', 'term-success');
          window.echoTerminal('Displaying custom dev stats panel:', 'term-header');
          window.echoTerminal('  - BE Focus     : Java / Spring Boot 3 / Spring Security');
          window.echoTerminal('  - FE Focus     : React 18 / Vite / Vanilla CSS');
          window.echoTerminal('  - DB Focus     : PostgreSQL / MySQL');
          window.echoTerminal('  - Total Work   : 6 Projects (2 Live Deployed)');
          window.echoTerminal('&nbsp;');
        }
      }
    }
  });
})();

/* ── TRIPLE-CLICK LOGO — HACKER MATRIX RAIN ───────────── */
(function () {
  const brand = document.querySelector('.nav-brand');
  if (!brand) return;
  let clicks = 0, timer;

  brand.addEventListener('click', e => {
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 400);
    if (clicks === 3) {
      clicks = 0;
      e.preventDefault();
      triggerMatrixRainGlobal();
    }
  });
})();

function triggerMatrixRainGlobal() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;inset:0;z-index:99998;pointer-events:none;';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  const chars = '01$_#@*NG</>'.split('');
  const cols = Math.floor(canvas.width / 14);
  const drops = Array(cols).fill(1);
  let frame = 0;

  function draw() {
    ctx.fillStyle = 'rgba(13,13,13,0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(122,30,43,0.7)';
    ctx.font = '12px monospace';

    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * 14, drops[i] * 14);
      if (drops[i] * 14 > canvas.height && Math.random() > 0.97) drops[i] = 0;
      drops[i]++;
    }

    frame++;
    if (frame < 120) requestAnimationFrame(draw);
    else {
      canvas.style.transition = 'opacity 0.5s';
      canvas.style.opacity = '0';
      setTimeout(() => canvas.remove(), 600);
    }
  }
  draw();
}

/* ── EASTER EGG: LOGO GLITCH ON HOVER (REWORKED TO TOOLTIP) ── */
(function () {
  const brand = document.querySelector('.nav-brand');
  if (!brand) return;

  const tooltip = document.createElement('div');
  tooltip.textContent = 'sudo hire nishant';
  tooltip.style.cssText = `
    position: absolute; top: calc(var(--nav-h) - 10px); left: 2rem;
    background: #111; border: 1px solid rgba(122,30,43,0.5);
    color: var(--text-2); padding: 0.35rem 0.65rem; border-radius: 4px;
    font-family: var(--mono); font-size: 0.66rem; pointer-events: none;
    opacity: 0; transition: opacity 0.2s, transform 0.2s;
    transform: translateY(-5px); z-index: 2000;
  `;
  brand.parentNode.appendChild(tooltip);

  let holdTimer;
  brand.addEventListener('mouseenter', () => {
    holdTimer = setTimeout(() => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateY(0)';
    }, 2000);
  });

  brand.addEventListener('mouseleave', () => {
    clearTimeout(holdTimer);
    tooltip.style.opacity = '0';
    tooltip.style.transform = 'translateY(-5px)';
  });
})();

/* ── EASTER EGG: 5-CLICK FOOTER YEAR ─────────────────────── */
(function () {
  const yearEl = document.getElementById('year');
  if (!yearEl) return;
  let clicks = 0;
  let timer;

  yearEl.addEventListener('click', () => {
    clicks++;
    clearTimeout(timer);
    timer = setTimeout(() => { clicks = 0; }, 500);

    if (clicks === 5) {
      clicks = 0;
      yearEl.style.color = 'var(--accent)';
      yearEl.style.fontWeight = 'bold';
      
      let iters = 0;
      const interval = setInterval(() => {
        yearEl.textContent = Math.floor(Math.random() * (2099 - 1990 + 1)) + 1990;
        iters++;
        if (iters > 20) {
          clearInterval(interval);
          yearEl.textContent = new Date().getFullYear();
          setTimeout(() => {
            yearEl.style.color = '';
            yearEl.style.fontWeight = '';
          }, 1000);
        }
      }, 50);
    }
  });
})();

/* ── STAT COUNTER ANIMATION ──────────────────────────────── */
(function () {
  const statNums = document.querySelectorAll('.stat__num');
  if (!statNums.length) return;

  const countUp = (el) => {
    const text = el.textContent.trim();
    const hasPlus = text.includes('+');
    const target = parseInt(text);
    if (isNaN(target)) return;

    let current = 0;
    const duration = 1500;
    const step = Math.max(1, Math.floor(target / (duration / 30)));
    el.textContent = '0' + (hasPlus ? '+' : '');

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + (hasPlus ? '+' : '');
    }, 30);
  };

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        countUp(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => obs.observe(el));
})();

/* ── COPY EMAIL TO CLIPBOARD ─────────────────────────────── */
(function () {
  const emailLink = document.querySelector('a[href^="mailto:"]');
  if (!emailLink) return;

  emailLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailLink.href.replace('mailto:', '');
    navigator.clipboard.writeText(email).then(() => {
      // Show toast
      const toast = document.createElement('div');
      toast.textContent = '✓ Email copied to clipboard';
      toast.style.cssText = `
        position:fixed;bottom:2rem;left:50%;transform:translateX(-50%) translateY(20px);
        background:var(--bg-3);color:var(--text);border:1px solid var(--border-h);
        padding:0.75rem 1.5rem;border-radius:8px;font-family:var(--font);font-size:0.82rem;
        z-index:9999;opacity:0;transition:opacity 0.3s,transform 0.3s;
        box-shadow:0 8px 30px rgba(0,0,0,0.3);
      `;
      document.body.appendChild(toast);
      requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
      });
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
      }, 2500);
    });
  });
})();

/* ── MAGNETIC CTA BUTTONS (desktop only) ─────────────────── */
(function () {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
  const btns = document.querySelectorAll('.hero__cta .btn');
  if (!btns.length) return;
  const STRENGTH = 0.3;

  btns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * STRENGTH}px, ${y * STRENGTH}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => { btn.style.transition = ''; }, 400);
    });
  });
})();

/* ── SUBTLE EASTER EGG: DEV CONSOLE GREETING ───────────────── */
(function () {
  console.log(
    `%c<NG/>%c\nAh, a fellow developer! Peek behind the curtain all you like.\nIf you like what you see, let's build something together: ngawande256@gmail.com\n\n%cPsst… hold %c?%c on the page for a surprise.`,
    'font-family: monospace; font-size: 40px; color: #7a1e2b; font-weight: bold; text-shadow: 2px 2px 0 #000;',
    'font-family: sans-serif; font-size: 14px; color: #a1a1aa; line-height: 1.8;',
    'font-family: sans-serif; font-size: 12px; color: #555; font-style: italic;',
    'font-family: monospace; font-size: 13px; color: #7a1e2b; font-weight: bold; background: rgba(122,30,43,0.15); padding: 1px 5px; border-radius: 3px;',
    'font-family: sans-serif; font-size: 12px; color: #555; font-style: italic;'
  );
})();

/* ── SUBTLE EASTER EGG: SECRET COLOR THEMES ──────────────── */
(function () {
  const themes = {
    'red': { h: '#991122', base: '#7a1e2b', light: 'rgba(122, 30, 43, 0.1)' },
    'blue': { h: '#3b82f6', base: '#2563eb', light: 'rgba(37, 99, 235, 0.1)' },
    'green': { h: '#22c55e', base: '#16a34a', light: 'rgba(22, 163, 74, 0.1)' },
    'purple': { h: '#a855f7', base: '#9333ea', light: 'rgba(147, 51, 234, 0.1)' },
    'gold': { h: '#facc15', base: '#eab308', light: 'rgba(234, 179, 8, 0.1)' }
  };
  
  let buf = '';
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    buf += e.key.toLowerCase();
    if (buf.length > 10) buf = buf.slice(-10);
    
    for (const [color, hexes] of Object.entries(themes)) {
      if (buf.endsWith(color)) {
        document.documentElement.style.setProperty('--accent-h', hexes.h);
        document.documentElement.style.setProperty('--accent', hexes.base);
        document.documentElement.style.setProperty('--accent-light', hexes.light);
        buf = ''; // reset
        break;
      }
    }
  });
})();

/* ── SUBTLE EASTER EGG: SOLID BRICK ──────────────────────── */
(function () {
  const solidText = document.querySelector('.contact__headline');
  if (!solidText) return;
  
  // Replace "Solid." with a clickable span
  solidText.innerHTML = solidText.innerHTML.replace('Solid.', '<span id="solid-word" style="cursor:pointer; position:relative;">Solid.</span>');
  
  const solidWord = document.getElementById('solid-word');
  let clicks = 0;
  
  solidWord.addEventListener('click', () => {
    clicks++;
    if (clicks === 3) {
      const emoji = document.createElement('span');
      emoji.textContent = '🧱';
      emoji.style.cssText = `
        position:absolute; top:-20px; right:-15px; font-size:1.5rem;
        opacity:0; transform:translateY(10px); transition:all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        pointer-events:none;
      `;
      solidWord.appendChild(emoji);
      
      requestAnimationFrame(() => {
        emoji.style.opacity = '1';
        emoji.style.transform = 'translateY(-10px) rotate(15deg)';
      });
      
      setTimeout(() => {
        emoji.style.opacity = '0';
        emoji.style.transform = 'translateY(-20px) rotate(30deg)';
        setTimeout(() => emoji.remove(), 400);
      }, 2000);
      
      clicks = 0;
    }
  });
})();

/* ── CHEAT SHEET: HOLD ? TO REVEAL ───────────────────────── */
(function () {
  const sheet = document.getElementById('cheat-sheet');
  if (!sheet) return;

  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === '?' && !sheet.classList.contains('visible')) {
      sheet.classList.add('visible');
    }
  });

  document.addEventListener('keyup', e => {
    if (e.key === '?' || e.key === 'Shift') {
      sheet.classList.remove('visible');
    }
  });
})();

/* ── PREMIUM POLISH FEATURES ─────────────────────────────── */
(function () {
  // 1. DYNAMIC PAGE TITLE
  const baseTitle = 'Nishant Gawande';
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        let name = e.target.getAttribute('id');
        if (name) {
          name = name.charAt(0).toUpperCase() + name.slice(1);
          if (name === 'Home') name = 'Portfolio';
          document.title = `${baseTitle} | ${name}`;
        }
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('section').forEach(s => obs.observe(s));

  // 2. PARALLAX HERO
  const heroGrid = document.querySelector('.hero__grid');
  const heroGrain = document.querySelector('.hero__grain');
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    if (s < window.innerHeight) {
      if (heroGrid) heroGrid.style.transform = `translateY(${s * 0.35}px)`;
      if (heroGrain) heroGrain.style.transform = `translateY(${s * 0.15}px)`;
    }
  }, { passive: true });

  // 3. CURSOR FOLLOWER
  if (window.matchMedia('(pointer: fine)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);

    let curX = window.innerWidth / 2, curY = window.innerHeight / 2;
    let tgX = curX, tgY = curY;

    document.addEventListener('mousemove', e => {
      tgX = e.clientX;
      tgY = e.clientY;
    });

    function anim() {
      curX += (tgX - curX) * 0.15;
      curY += (tgY - curY) * 0.15;
      cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
      requestAnimationFrame(anim);
    }
    anim();

    document.querySelectorAll('a, button, .btn, .nav-brand').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }

  // 4. SKILL TAG STAGGER
  document.querySelectorAll('.skill-group').forEach(grp => {
    const items = grp.querySelectorAll('.skill-group__items span');
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * 0.04}s`;
    });
    const sobs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        grp.classList.add('revealed');
        sobs.unobserve(grp); // run only once
      }
    }, { threshold: 0.2 });
    sobs.observe(grp);
  });

  // 5. FOOTER AUTO-YEAR
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ── RECOMMENDATIONS SYSTEM ────────────────────────────────── */
(function () {
  const form = document.getElementById('recommendation-form');
  const grid = document.getElementById('recs-grid');
  const modal = document.getElementById('recModal');
  const closeBtn = document.getElementById('rec-modal-close');
  const closeBtnBtn = document.getElementById('rec-modal-close-btn');

  if (!form || !grid || !modal) return;

  function openModal() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBtnBtn) closeBtnBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();

    const nameVal = document.getElementById('rec-name').value.trim();
    const roleVal = document.getElementById('rec-role').value.trim() || 'Professional Endorser';
    const textVal = document.getElementById('rec-text').value.trim();

    if (!nameVal || !textVal) return;

    // Create a new recommendation card
    const card = document.createElement('div');
    card.className = 'rec-card reveal visible';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    // Cycle through matching avatars
    const avatars = ['fa-user-tie', 'fa-user-check', 'fa-user-astronaut', 'fa-user-gear'];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    card.innerHTML = `
      <div class="rec-card__quote"><i class="fas fa-quote-left" aria-hidden="true"></i></div>
      <p class="rec-card__text">${escapeHTML(textVal)}</p>
      <div class="rec-card__author">
          <div class="rec-card__avatar"><i class="fas ${randomAvatar}" aria-hidden="true"></i></div>
          <div class="rec-card__meta">
              <span class="rec-card__name">${escapeHTML(nameVal)}</span>
              <span class="rec-card__role">${escapeHTML(roleVal)}</span>
          </div>
      </div>
    `;

    // Append to grid
    grid.appendChild(card);

    // Trigger transition
    requestAnimationFrame(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });

    // Reset form
    form.reset();

    // Open confirmation modal
    openModal();
  });

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
})();

