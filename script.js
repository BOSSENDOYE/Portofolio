// Navigation mobile
function initNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // Marquer le lien actif dans la navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksList = document.querySelectorAll('.nav-links a');
    navLinksList.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Animation de pluie d'étincelles
function initSparks() {
    const sparksContainer = document.getElementById('sparks');
    if (!sparksContainer) return;

    function createSpark() {
        const spark = document.createElement('div');
        spark.className = 'spark';
        
        const x = Math.random() * window.innerWidth;
        const animationDuration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        spark.style.left = x + 'px';
        spark.style.animationDuration = animationDuration + 's';
        spark.style.animationDelay = delay + 's';
        
        const size = Math.random() * 4 + 2;
        spark.style.width = size + 'px';
        spark.style.height = size + 'px';
        
        sparksContainer.appendChild(spark);
        
        setTimeout(() => {
            if (spark.parentNode) {
                spark.parentNode.removeChild(spark);
            }
        }, (animationDuration + delay) * 1000);
    }

    setInterval(createSpark, 150);

    // Créer des flammes bleues
    function createFlame() {
        const flame = document.createElement('div');
        flame.className = 'flame';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        flame.style.left = x + 'px';
        flame.style.top = y + 'px';
        flame.style.animationDelay = Math.random() * 3 + 's';
        
        sparksContainer.appendChild(flame);
        
        setTimeout(() => {
            if (flame.parentNode) {
                flame.parentNode.removeChild(flame);
            }
        }, 6000);
    }

    for (let i = 0; i < 5; i++) {
        setTimeout(createFlame, i * 1000);
    }
    setInterval(createFlame, 3000);
}

// Animation d'apparition des éléments
function initCardAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Animation des lettres du nom
function animateName() {
    const nameElement = document.getElementById('animated-name');
    if (!nameElement) return;
    
    const name = nameElement.textContent;
    nameElement.innerHTML = '';
    
    name.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'letter';
        span.style.animationDelay = `${index * 0.08}s`;
        span.style.setProperty('--float-delay', `${index * 0.1}s`);
        nameElement.appendChild(span);
    });
    
    nameElement.addEventListener('mouseenter', () => {
        const letters = nameElement.querySelectorAll('.letter');
        letters.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.transform = 'translateY(-8px) scale(1.15)';
                setTimeout(() => {
                    letter.style.transform = '';
                }, 300);
            }, index * 50);
        });
    });
}

// Créer des particules autour du profil
function createProfileParticles() {
    const particlesContainer = document.getElementById('profile-particles');
    if (!particlesContainer) return;
    
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.animationDelay = `${i * 0.5}s`;
        particle.style.animationDuration = `${8 + Math.random() * 4}s`;
        particlesContainer.appendChild(particle);
    }
}

// Initialiser toutes les fonctionnalités
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSparks();
    initCardAnimations();
    animateName();
    createProfileParticles();
});

