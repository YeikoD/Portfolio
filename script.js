// Performance utility functions
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
    const isActive = navLinks.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    
    // Animate hamburger
    spans[0].style.transform = isActive ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = isActive ? '0' : '1';
    spans[2].style.transform = isActive ? 'rotate(-45deg) translate(7px, -6px)' : 'none';
    
    // Update ARIA attributes
    hamburger.setAttribute('aria-expanded', isActive);
    navLinks.setAttribute('aria-hidden', !isActive);
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
    
    // Keyboard accessibility
    hamburger.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
}

// Close mobile menu when clicking on a link (event delegation)
document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-links a')) {
        navLinks.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        if (spans.length) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Smooth scroll for navigation links
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Header scroll effect (throttled for performance)
const header = document.querySelector('.header');
const handleScroll = throttle(() => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true });

// Intersection Observer for animations (optimized)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        } else {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(20px)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = () => {
    document.querySelectorAll('.project, .contact-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// Delay animation initialization for better performance
setTimeout(animateElements, 100);

// Active navigation highlighting (throttled for performance)
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const updateActiveNav = throttle(() => {
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    // Handle end of page
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 80) {
        const lastSection = sections[sections.length - 1];
        if (lastSection) {
            current = lastSection.getAttribute('id');
        }
    }
    
    navItems.forEach(a => {
        a.style.color = '';
        a.style.textShadow = '';
        a.setAttribute('aria-current', 'false');
        if (a.getAttribute('href').slice(1) === current) {
            a.style.color = 'var(--accent-color)';
            a.style.textShadow = '0 0 8px rgba(0, 255, 204, 0.5)';
            a.setAttribute('aria-current', 'true');
        }
    });
}, 100);

window.addEventListener('scroll', updateActiveNav, { passive: true });

// Typing effect for hero section (alternating loop)
const heroText = document.querySelector('.hero-content h2');
if (heroText) {
    const phrases = [
        "Desarrollador de software enfocado en crear sistemas de gestión livianos y eficientes.",
        "Autodidacta apasionado por resolver problemas reales a través del código.",
        "Dedicado a la automatización de procesos y optimización de rendimiento."
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const delay = 3500; // time fully typed

    heroText.textContent = '';

    function typeHero() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            heroText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            heroText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 20 : 40; // faster typing speed since sentences are longer

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = delay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(typeHero, typingSpeed);
    }

    setTimeout(typeHero, 600);
}

// Loading animation optimized
window.addEventListener('load', () => {
    requestAnimationFrame(() => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });
});

// Console welcome message
console.log('%c¡Bienvenido a mi portafolio!', 'color: #00ffcc; font-size: 20px; font-weight: bold; text-shadow: 0 0 5px rgba(0, 255, 204, 0.3);');
console.log('%cDesarrollador enfocado en rendimiento y sistemas de gestión livianos.', 'color: #94a3b8; font-size: 14px;');
console.log('%cGitHub: https://github.com/YeikoD', 'color: #00ffcc; font-size: 12px;');

// Typing/deleting loop for the header logo
const logoText = document.querySelector('.logo h1');
if (logoText) {
    const words = ["Anderson Correa", "Yeiko"];
    let wordIndex = 0;
    let charIndex = words[wordIndex].length; // start fully written
    let isDeleting = false;
    let delay = 3500; // Time fully typed

    function typeLogo() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            logoText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            logoText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = delay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(typeLogo, typingSpeed);
    }

    // Wait 7 seconds initially so the user focuses on the hero typing animation first
    setTimeout(() => {
        isDeleting = true;
        typeLogo();
    }, 7000);
}

// Interactive Hero Glow (Mouse Tracker with Lerp, Stretch & Breathe)
const heroSection = document.querySelector('.hero');
const heroGlow = document.querySelector('.hero-glow');
const heroMap = document.querySelector('.hero-map');

if (heroSection && heroGlow) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    // Weight/Inertia coefficient
    const lerpFactor = 0.055;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function updateGlowPosition() {
        const rect = heroSection.getBoundingClientRect();
        
        // Only run calculations and updates if hero is visible on screen
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
            const dx = mouseX - currentX;
            const dy = mouseY - currentY;

            // Apply LERP interpolation for smooth inertia
            currentX += dx * lerpFactor;
            currentY += dy * lerpFactor;

            // Calculate speed and angle for the comet trail stretch
            const speed = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            // Organic breathing effect using sine wave over time
            const time = Date.now() / 1000;
            const breathe = 1 + Math.sin(time * 3) * 0.06; // oscillates between 0.94 and 1.06

            // Dynamic elongation (trail stretch) based on movement speed
            const stretch = 1 + Math.min(speed * 0.005, 0.55); // stretches up to 1.55x
            const squeeze = 1 - Math.min(speed * 0.002, 0.25); // squeezes width-wise to maintain shape

            // Coordinates relative to the hero section
            const relX = currentX - rect.left;
            const relY = currentY - rect.top;

            const scaleX = stretch * breathe;
            const scaleY = squeeze * breathe;

            // Map Parallax Effect (Inertia with LERP)
            if (heroMap) {
                const mapTx = (relX - rect.width / 2) * 0.035;
                const mapTy = (relY - rect.height / 2) * 0.035;
                heroMap.style.transform = `translate3d(calc(-50% + ${mapTx}px), calc(-50% + ${mapTy}px), 0)`;
            }

            // hardware accelerated transformations (translation + rotation + stretch scaling)
            heroGlow.style.transform = `translate3d(${relX}px, ${relY}px, 0) rotate(${angle}deg) scale(${scaleX}, ${scaleY})`;
        }

        requestAnimationFrame(updateGlowPosition);
    }

    // Start loop
    requestAnimationFrame(updateGlowPosition);
}
