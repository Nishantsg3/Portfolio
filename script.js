/* Wait for DOM */
document.addEventListener('DOMContentLoaded', () => {

  // Smooth Scroll
  const navbarEl = document.querySelector('header .navbar');
  const NAV_OFFSET = navbarEl ? (navbarEl.offsetHeight + 8) : 80;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
      const navCollapse = document.querySelector('.navbar-collapse');
      const navbarToggler = document.querySelector('.navbar-toggler');
      if (navCollapse && navCollapse.classList.contains('show') && navbarToggler) {
        navbarToggler.click();
      }
    });
  });
});
