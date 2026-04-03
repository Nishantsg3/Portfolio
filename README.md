<p align="center">
  <img src="img/og-preview.png" alt="Portfolio Preview" width="700" />
</p>

<h1 align="center">&lt;NG/&gt;</h1>

<p align="center">
  Personal portfolio of <strong>Nishant Gawande</strong> — Full-Stack Java Developer<br/>
  Built with vanilla HTML, CSS, and JavaScript. Zero frameworks, zero dependencies, zero compromise.
</p>

<p align="center">
  <a href="https://portfoliong-web.netlify.app"><img src="https://img.shields.io/badge/Live%20Site-00C7B7?style=flat&logo=netlify&logoColor=white" alt="Live Site"></a>
  <a href="https://linkedin.com/in/nishant-g3"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://github.com/Nishantsg3"><img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white" alt="GitHub"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white">
  <img src="https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white">
</p>

---

## Overview

A fully handcrafted single-page portfolio — dark theme, crimson accents, glassmorphism UI — built without any frontend framework. Features 34 JavaScript modules covering everything from IntersectionObserver-driven scroll reveals to a 3D card tilt engine, Konami Code easter eggs, and a working contact form. Scored for performance with `content-visibility: auto`, lazy loading, and `prefers-reduced-motion` support baked in.

---

## Features

### Design & UI
- Dark theme with crimson accent system and glassmorphism card surfaces
- Anime-inspired SVG icon set, custom cursor follower, magnetic CTAs
- 3D card tilt on hover, parallax hero section, dynamic `<title>` on tab blur

### Animation Engine
- Preloader sequence, typewriter effect, animated stat counters
- Scroll-reveal via `IntersectionObserver` — no ScrollMagic, no GSAP
- Barrel roll, Matrix rain, screen shake — all CSS-triggered via JS class injection

### Responsiveness & Accessibility
- 4 breakpoints: 1024 / 768 / 480 / 360px
- Touch-optimized, swipe scroll indicator on mobile
- ARIA labels, semantic HTML5, `prefers-reduced-motion` respected throughout

### Performance & SEO
- `content-visibility: auto` on off-screen sections
- Lazy-loaded images, preconnect hints for Google Fonts
- Full Open Graph + Twitter Card metadata, `sitemap.xml`, `robots.txt`

### Contact & PWA
- Functional contact form via Formspree, email copy-to-clipboard
- `manifest.json` for PWA-lite installability
- Netlify `_headers` for security + caching, `_redirects` for SPA fallback

---

## Easter Eggs

Hold `?` anywhere on the page to reveal the full cheat sheet, or explore:

| Trigger | Effect |
|:--------|:-------|
| `↑↑↓↓←→←→BA` | Konami Code flash |
| Triple-click `<NG/>` logo | Matrix rain |
| Type `1337` | Leet hacker flash |
| Hover logo for 2s | Logo glitch |
| Type `bankai` | Anime screen shake |
| Type `roll` | Barrel roll |
| 5× click the year | Time warp scramble |
| Type `blue` / `gold` / `green` | Live theme swap |
| Triple-click "Solid." | 🧱 |
| Open DevTools | Console greeting |

11 total. You probably won't find them all without the cheat sheet.

---

## Project Structure

```
Portfolio/
├── index.html                      
├── css/
│   └── style.css                  
├── js/
│   └── script.js                  
├── img/
│   ├── bg.jpg                      
│   ├── favicon.png                 
│   └── og-preview.png              
├── assets/
│   └── certificates/               
├── Nishant_Gawande_9421751107.pdf  
├── manifest.json                  
├── robots.txt
├── sitemap.xml
├── _headers                      
├── _redirects                     
└── .gitignore
```

---

## Tech Stack

| Layer | Tech |
|:------|:-----|
| Markup | HTML5 — semantic, ARIA-labeled, SEO meta |
| Styling | CSS3 — custom properties, BEM, glassmorphism, 4 breakpoints |
| Logic | JavaScript ES6+ — IIFEs, IntersectionObserver, Web APIs, strict mode |
| Icons | Font Awesome 6 |
| Fonts | JetBrains Mono, DM Serif Display, Outfit (Google Fonts) |
| Forms | Formspree |
| Hosting | Netlify (custom headers + redirects) |

---

## Run Locally

```bash
git clone https://github.com/Nishantsg3/Portfolio.git
cd Portfolio

# Option 1 — just open the file
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# Option 2 — local dev server (recommended)
npx serve .
```

No build step. No `npm install`. It just works.

---

## Browser Support

| Browser | Status |
|:--------|:-------|
| Chrome / Edge | ✅ Full support |
| Firefox | ✅ Full support |
| Safari | ✅ Full support |
| iOS / Android | ✅ Touch-optimized |

---

## Contact

**Nishant Gawande**
📧 [ngawande256@gmail.com](mailto:ngawande256@gmail.com)
💼 [linkedin.com/in/nishant-g3](https://linkedin.com/in/nishant-g3)
🐙 [github.com/Nishantsg3](https://github.com/Nishantsg3)

---

## License

Free to use for personal portfolios. Credit appreciated.

⭐ If this helped you, drop a star.