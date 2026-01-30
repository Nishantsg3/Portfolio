// Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      preloader.style.visibility = "hidden";
      // Optional: remove it from DOM after transition
      setTimeout(() => preloader.remove(), 500);
    }, 800);
  }
});

// Typing Effect
const typingText = document.querySelector(".typing-text");
const roles = [
  "Full Stack Developer",
  "Java Developer",
  "Software Engineer",
  "React Developer",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typingText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typingText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

if (typingText) setTimeout(type, 1500); // Start after preloader

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const navCollapse = document.querySelector(".navbar-collapse");
      if (navCollapse && navCollapse.classList.contains("show")) {
        document.querySelector(".navbar-toggler").click();
      }
    }
  });
});

// Persistent 3D Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      if (entry.boundingClientRect.y > 0) {
        entry.target.classList.remove("active");
      }
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Hero Canvas Animation
const canvas = document.getElementById("hero-canvas");
if (canvas) {
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 3 + 1.5;
      this.baseSpeedX = Math.random() * 0.8 - 0.4;
      this.baseSpeedY = Math.random() * 0.8 - 0.4;
      this.speedX = this.baseSpeedX;
      this.speedY = this.baseSpeedY;
      // Add drift for automatic movement
      this.driftX = Math.random() * 0.3 - 0.15;
      this.driftY = Math.random() * 0.3 - 0.15;
    }

    update() {
      // Automatic endless drift
      this.x += this.speedX + this.driftX;
      this.y += this.speedY + this.driftY;

      if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
      const isDark =
        document.documentElement.getAttribute("data-theme") !== "light";
      ctx.fillStyle = isDark
        ? "rgba(59, 130, 246, 0.9)"
        : "rgba(59, 130, 246, 1)";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(59, 130, 246, 0.5)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function init() {
    particles = [];
    const numberOfParticles = Math.min(
      100,
      (canvas.width * canvas.height) / 10000,
    );
    for (let i = 0; i < numberOfParticles; i++) {
      particles.push(new Particle());
    }
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const isDark =
            document.documentElement.getAttribute("data-theme") !== "light";
          ctx.strokeStyle = isDark
            ? `rgba(168, 85, 247, ${0.8 - distance / 180})`
            : `rgba(168, 85, 247, ${1 - distance / 150})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    connect();
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resize);

  resize();
  animate();
}

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem("theme") || "dark";
html.setAttribute("data-theme", currentTheme);

// Update icon based on theme
function updateThemeIcon() {
  const icon = themeToggle.querySelector("i");
  if (html.getAttribute("data-theme") === "light") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon();
});

// Magnetic Button Effect
const magneticButtons = document.querySelectorAll(".btn-premium, .btn-glass");

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "translate(0, 0)";
  });
});

// Ripple Effect on Buttons
magneticButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Contact Form Handler
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      // Simulate form submission (replace with actual API endpoint)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For now, just show success and mailto link
      const mailtoLink = `mailto:ngawande256@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;

      formStatus.className = "form-status success";
      formStatus.textContent = "Opening your email client...";
      contactForm.reset();
    } catch (error) {
      formStatus.className = "form-status error";
      formStatus.textContent = "Something went wrong. Please try again.";
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
    }
  });
}

// Parallax Effect for Hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const heroCanvas = document.getElementById("hero-canvas");

  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / window.innerHeight;

    if (heroCanvas) {
      heroCanvas.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
  }
});

// Navbar background on scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(5, 6, 15, 0.95)";
    navbar.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.5)";
  } else {
    navbar.style.background = "rgba(5, 6, 15, 0.85)";
    navbar.style.boxShadow = "none";
  }
});

// Sections Canvas Animation (All sections except hero)
const sectionsCanvas = document.getElementById("sections-canvas");
if (sectionsCanvas) {
  const ctx2 = sectionsCanvas.getContext("2d");
  let particles2 = [];

  function resizeSections() {
    sectionsCanvas.width = window.innerWidth;
    sectionsCanvas.height = document.body.scrollHeight;
    initSections();
  }

  class SectionParticle {
    constructor() {
      this.x = Math.random() * sectionsCanvas.width;
      this.y = Math.random() * sectionsCanvas.height;
      this.size = Math.random() * 4 + 1.5; // Much larger: 1.5 to 5.5px
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.8 + 0.5; // Higher opacity: 0.5 to 1.3

      // Particle variety: 0 = solid, 1 = hollow, 2 = ring
      this.type = Math.floor(Math.random() * 3);

      // Vary the glow intensity
      this.glowIntensity = Math.random() * 15 + 10; // Stronger glow: 10-25px
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > sectionsCanvas.width || this.x < 0) this.speedX *= -1;
      if (this.y > sectionsCanvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
      const isDark =
        document.documentElement.getAttribute("data-theme") !== "light";
      const baseOpacity = isDark ? this.opacity * 2 : this.opacity * 4;

      // Section-specific colors
      const scrollY = window.scrollY;
      let color;
      if (scrollY < 1000) {
        color = `rgba(59, 130, 246, ${baseOpacity})`; // Blue for about
      } else if (scrollY < 2000) {
        color = `rgba(20, 184, 166, ${baseOpacity})`; // Teal for skills
      } else if (scrollY < 3500) {
        color = `rgba(168, 85, 247, ${baseOpacity})`; // Purple for projects
      } else {
        color = `rgba(59, 130, 246, ${baseOpacity})`; // Blue for timeline/certs
      }

      // Add varied glow effect
      ctx2.shadowBlur = this.glowIntensity;
      ctx2.shadowColor = color;

      // Draw based on particle type
      if (this.type === 0) {
        // Solid filled circle
        ctx2.fillStyle = color;
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx2.fill();
      } else if (this.type === 1) {
        // Hollow circle (stroke only)
        ctx2.strokeStyle = color;
        ctx2.lineWidth = 1.2;
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx2.stroke();
      } else {
        // Ring (thick stroke, larger)
        ctx2.strokeStyle = color;
        ctx2.lineWidth = 1.5;
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.size * 1.2, 0, Math.PI * 2);
        ctx2.stroke();
      }

      ctx2.shadowBlur = 0;
    }
  }

  function initSections() {
    particles2 = [];
    const numberOfParticles = Math.min(
      150,
      (sectionsCanvas.width * sectionsCanvas.height) / 15000,
    );
    for (let i = 0; i < numberOfParticles; i++) {
      particles2.push(new SectionParticle());
    }
  }

  function connectSections() {
    for (let a = 0; a < particles2.length; a++) {
      for (let b = a; b < particles2.length; b++) {
        const dx = particles2[a].x - particles2[b].x;
        const dy = particles2[a].y - particles2[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const isDark =
            document.documentElement.getAttribute("data-theme") !== "light";
          const scrollY = window.scrollY;
          let strokeColor;

          // Match particle colors
          if (scrollY < 1000) {
            strokeColor = isDark
              ? `rgba(59, 130, 246, ${0.5 - distance / 240})`
              : `rgba(59, 130, 246, ${0.8 - distance / 150})`;
          } else if (scrollY < 2000) {
            strokeColor = isDark
              ? `rgba(20, 184, 166, ${0.5 - distance / 240})`
              : `rgba(20, 184, 166, ${0.8 - distance / 150})`;
          } else if (scrollY < 3500) {
            strokeColor = isDark
              ? `rgba(168, 85, 247, ${0.5 - distance / 240})`
              : `rgba(168, 85, 247, ${0.8 - distance / 150})`;
          } else {
            strokeColor = isDark
              ? `rgba(59, 130, 246, ${0.5 - distance / 240})`
              : `rgba(59, 130, 246, ${0.8 - distance / 150})`;
          }

          ctx2.strokeStyle = strokeColor;
          ctx2.lineWidth = 1.5;
          ctx2.beginPath();
          ctx2.moveTo(particles2[a].x, particles2[a].y);
          ctx2.lineTo(particles2[b].x, particles2[b].y);
          ctx2.stroke();
        }
      }
    }
  }

  function animateSections() {
    ctx2.clearRect(0, 0, sectionsCanvas.width, sectionsCanvas.height);
    particles2.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    connectSections();
    requestAnimationFrame(animateSections);
  }

  window.addEventListener("resize", resizeSections);

  // Update canvas height on scroll (debounced)
  let resizeTimeout;
  window.addEventListener("scroll", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (sectionsCanvas.height !== document.body.scrollHeight) {
        resizeSections();
      }
    }, 200);
  });

  resizeSections();
  animateSections();
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
