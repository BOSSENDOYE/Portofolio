/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ===== MOBILE BURGER MENU ===== */
const burger = document.getElementById('burger');
const navOverlay = document.getElementById('navOverlay');

function openMenu() {
  navOverlay.classList.add('open');
  burger.classList.add('open');
  burger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navOverlay.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

burger.addEventListener('click', () => {
  navOverlay.classList.contains('open') ? closeMenu() : openMenu();
});

// Close when clicking a link
navOverlay.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navOverlay.classList.contains('open')) closeMenu();
});

/* ===== ACTIVE NAV LINK ===== */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

/* ===== SCROLL REVEAL ===== */
const isMobile = window.innerWidth <= 768;

// Seuil plus bas sur mobile pour déclencher plus tôt
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: isMobile ? 0.05 : 0.1,
  rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -60px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBtn.textContent = 'Message envoyé ✓';
    submitBtn.style.background = '#22c55e';
    submitBtn.disabled = true;
    setTimeout(() => {
      submitBtn.textContent = 'Envoyer le message →';
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      form.reset();
    }, 3500);
  });
}

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const navH = document.getElementById('navbar').offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
