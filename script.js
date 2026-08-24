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

// Interactive Circuit Canvas (Reactive PCB Grid Effect)
const heroSection = document.querySelector('.hero');
const heroMap = document.querySelector('.hero-map');
const canvas = document.getElementById('circuit-canvas');

if (heroSection && canvas) {
    const ctx = canvas.getContext('2d');
    let mouseX = -1000;
    let mouseY = -1000;
    let nodes = [];
    let traces = [];
    const GRID_SPACING = 80;
    const PROXIMITY_RADIUS = 100;
    const AMBIENT_ALPHA = 0.018;
    const MAX_GLOW_ALPHA = 0.4;
    const ACCENT_R = 0, ACCENT_G = 255, ACCENT_B = 204;

    function resizeCanvas() {
        const rect = heroSection.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        generateCircuit(rect.width, rect.height);
    }

    function generateCircuit(w, h) {
        nodes = [];
        traces = [];
        const cols = Math.ceil(w / GRID_SPACING) + 1;
        const rows = Math.ceil(h / GRID_SPACING) + 1;
        const offsetX = (w - (cols - 1) * GRID_SPACING) / 2;
        const offsetY = (h - (rows - 1) * GRID_SPACING) / 2;

        // Create grid nodes with slight jitter
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const jitterX = (Math.random() - 0.5) * 12;
                const jitterY = (Math.random() - 0.5) * 12;
                nodes.push({
                    x: offsetX + c * GRID_SPACING + jitterX,
                    y: offsetY + r * GRID_SPACING + jitterY,
                    glow: 0,
                    col: c,
                    row: r
                });
            }
        }

        // Create circuit traces (horizontal + vertical connections, PCB-style)
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            // Connect to right neighbor
            if (n.col < cols - 1) {
                const rightIdx = n.row * cols + (n.col + 1);
                if (rightIdx < nodes.length && Math.random() > 0.2) {
                    traces.push({ from: i, to: rightIdx, glow: 0 });
                }
            }
            // Connect to bottom neighbor
            if (n.row < rows - 1) {
                const downIdx = (n.row + 1) * cols + n.col;
                if (downIdx < nodes.length && Math.random() > 0.3) {
                    traces.push({ from: i, to: downIdx, glow: 0 });
                }
            }
        }

        // Add a few random extra traces for visual interest (diagonal/angled)
        for (let k = 0; k < Math.floor(nodes.length * 0.02); k++) {
            const a = Math.floor(Math.random() * nodes.length);
            const b = Math.floor(Math.random() * nodes.length);
            if (a !== b) {
                traces.push({ from: a, to: b, glow: 0 });
            }
        }
    }

    function dist(x1, y1, x2, y2) {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function lerpVal(current, target, factor) {
        return current + (target - current) * factor;
    }

    function drawCircuit() {
        const rect = heroSection.getBoundingClientRect();
        const w = rect.width;
        const h = rect.height;
        ctx.clearRect(0, 0, w, h);

        const relMouseX = mouseX - rect.left;
        const relMouseY = mouseY - rect.top;
        const mouseInHero = relMouseX > -200 && relMouseX < w + 200 &&
                            relMouseY > -200 && relMouseY < h + 200;

        // Update node glow values
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            // Center bias: fade circuits toward edges so the map stands out
            const nx = n.x / w;
            const ny = n.y / h;
            const distFromCenter = Math.sqrt((nx - 0.5) * (nx - 0.5) + (ny - 0.5) * (ny - 0.5));
            const centerFade = 1 - Math.min(distFromCenter * 1.4, 0.7);

            let targetGlow = AMBIENT_ALPHA * centerFade;
            if (mouseInHero) {
                const d = dist(relMouseX, relMouseY, n.x, n.y);
                if (d < PROXIMITY_RADIUS) {
                    const intensity = 1 - (d / PROXIMITY_RADIUS);
                    targetGlow = AMBIENT_ALPHA * centerFade + (MAX_GLOW_ALPHA - AMBIENT_ALPHA) * intensity * centerFade;
                }
            }
            n.glow = lerpVal(n.glow, targetGlow, 0.08);
        }

        // Draw traces
        ctx.lineCap = 'round';
        for (let i = 0; i < traces.length; i++) {
            const t = traces[i];
            const fromNode = nodes[t.from];
            const toNode = nodes[t.to];
            const avgGlow = (fromNode.glow + toNode.glow) / 2;

            // Update trace glow
            t.glow = lerpVal(t.glow, avgGlow, 0.08);

            if (t.glow < 0.01) continue;

            ctx.beginPath();
            ctx.moveTo(fromNode.x, fromNode.y);

            // PCB-style right-angle traces
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            if (Math.abs(dx) > 5 && Math.abs(dy) > 5) {
                // L-shaped trace
                ctx.lineTo(fromNode.x + dx, fromNode.y);
                ctx.lineTo(toNode.x, toNode.y);
            } else {
                ctx.lineTo(toNode.x, toNode.y);
            }

            ctx.strokeStyle = `rgba(${ACCENT_R}, ${ACCENT_G}, ${ACCENT_B}, ${t.glow * 0.35})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Draw nodes
        for (let i = 0; i < nodes.length; i++) {
            const n = nodes[i];
            if (n.glow < 0.01) continue;

            const radius = 1.5 + n.glow * 1.5;
            const blurSize = n.glow * 8;

            // Glow aura
            if (n.glow > 0.1) {
                ctx.beginPath();
                ctx.arc(n.x, n.y, radius + blurSize, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${ACCENT_R}, ${ACCENT_G}, ${ACCENT_B}, ${n.glow * 0.1})`;
                ctx.fill();
            }

            // Core dot
            ctx.beginPath();
            ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${ACCENT_R}, ${ACCENT_G}, ${ACCENT_B}, ${n.glow})`;
            ctx.fill();
        }

        requestAnimationFrame(drawCircuit);
    }

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
    });

    window.addEventListener('resize', debounce(resizeCanvas, 200));

    // Map parallax (lerp-based, synced with circuit)
    let mapCurrentX = 0;
    let mapCurrentY = 0;

    function updateMapParallax() {
        if (heroMap) {
            const rect = heroSection.getBoundingClientRect();
            const relMouseX = mouseX - rect.left;
            const relMouseY = mouseY - rect.top;
            const targetTx = (relMouseX - rect.width / 2) * 0.03;
            const targetTy = (relMouseY - rect.height / 2) * 0.03;
            mapCurrentX = lerpVal(mapCurrentX, targetTx, 0.04);
            mapCurrentY = lerpVal(mapCurrentY, targetTy, 0.04);
            heroMap.style.transform = `translate3d(calc(-50% + ${mapCurrentX}px), calc(-50% + ${mapCurrentY}px), 0)`;
        }
        requestAnimationFrame(updateMapParallax);
    }

    // Init
    resizeCanvas();
    requestAnimationFrame(drawCircuit);
    requestAnimationFrame(updateMapParallax);
}
