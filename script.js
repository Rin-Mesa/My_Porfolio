// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    // Save preference
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('portfolio-theme', 'light');
    } else {
        localStorage.setItem('portfolio-theme', 'dark');
    }
});

// ===== SCROLL PROGRESS BAR =====
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== NAVIGATION =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Active Navigation link on scroll
window.addEventListener('scroll', () => {
    // Navbar shadow on scroll
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link tracking
    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= section.offsetTop - 250) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

// Smooth Scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu if open
            navMenu.classList.remove('open');
            hamburger.classList.remove('open');
        }
    });
});

// ===== FOOTER YEAR =====
const footerYear = document.getElementById('footer-year');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

// ===== TYPING EFFECT =====
const typingText = document.getElementById('typing-text');
const phrases = ['Web Development', 'Frontend Developer','Backend Developer','Data Engineering', 'UI/UX Designer', 'DevOps', 'Quality Assurance (QA)'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!typingText) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let delay = isDeleting ? 60 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        delay = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        delay = 400;
    }

    setTimeout(typeEffect, delay);
}

// Start typing effect
setTimeout(typeEffect, 500);

// ===== SKILL BARS ANIMATION =====
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const targetWidth = bar.getAttribute('data-width') + '%';
                bar.style.width = targetWidth;
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ===== STATS COUNTER ANIMATION =====
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = Math.max(1, Math.floor(target / 60));
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                stat.textContent = current;
                requestAnimationFrame(() => setTimeout(updateCounter, 30));
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Observe stats section for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Reveal section titles and large containers
document.querySelectorAll('.section-title, .about-content, .stat-item').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Staggered reveal for various items
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            const siblings = Array.from(entry.target.parentElement.children);
            const index = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.timeline-item, .skill-item, .softskill-card').forEach(el => {
    staggerObserver.observe(el);
});

// ===== AUTO-SCROLL PROJECT CAROUSEL =====
const projectsGrid = document.getElementById('projects-grid');
const carouselDots = document.getElementById('carousel-dots');
const prevArrow = document.querySelector('.carousel-arrow-prev');
const nextArrow = document.querySelector('.carousel-arrow-next');
let autoScrollInterval = null;
let isHovering = false;

function initCarousel() {
    if (!projectsGrid) return;
    
    const cards = projectsGrid.querySelectorAll('.project-card');
    if (cards.length === 0) return;
    
    // Create dots
    carouselDots.innerHTML = '';
    cards.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to project ${i + 1}`);
        dot.addEventListener('click', () => {
            scrollToCard(i);
            resetAutoScroll();
        });
        carouselDots.appendChild(dot);
    });
    
    // Update dots on scroll
    projectsGrid.addEventListener('scroll', updateDots);
    
    // Pause on hover
    projectsGrid.addEventListener('mouseenter', () => { isHovering = true; });
    projectsGrid.addEventListener('mouseleave', () => { isHovering = false; });
    
    // Arrow navigation
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            const activeIndex = getActiveIndex();
            const prev = (activeIndex - 1 + cards.length) % cards.length;
            scrollToCard(prev);
            resetAutoScroll();
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            const activeIndex = getActiveIndex();
            const next = (activeIndex + 1) % cards.length;
            scrollToCard(next);
            resetAutoScroll();
        });
    }
    
    // Start auto-scroll
    startAutoScroll();
}

function getActiveIndex() {
    const cards = projectsGrid.querySelectorAll('.project-card');
    const containerCenter = projectsGrid.scrollLeft + projectsGrid.clientWidth / 2;
    let closestIdx = 0;
    let closestDist = Infinity;
    
    cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(containerCenter - cardCenter);
        if (dist < closestDist) {
            closestDist = dist;
            closestIdx = i;
        }
    });
    
    return closestIdx;
}

function scrollToCard(index) {
    const cards = projectsGrid.querySelectorAll('.project-card');
    if (!cards[index]) return;
    
    projectsGrid.scrollTo({
        left: cards[index].offsetLeft - (projectsGrid.clientWidth - cards[index].offsetWidth) / 2,
        behavior: 'smooth'
    });
}

function updateDots() {
    const dots = carouselDots.querySelectorAll('.carousel-dot');
    const activeIndex = getActiveIndex();
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
    });
}

function startAutoScroll() {
    if (autoScrollInterval) clearInterval(autoScrollInterval);
    
    autoScrollInterval = setInterval(() => {
        if (isHovering) return;
        
        const dots = carouselDots.querySelectorAll('.carousel-dot');
        const activeIndex = getActiveIndex();
        const nextIndex = (activeIndex + 1) % dots.length;
        scrollToCard(nextIndex);
    }, 4000);
}

function resetAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
    startAutoScroll();
}

// Initialize carousel when projects section is visible
const projectsSection = document.querySelector('#project');
if (projectsSection) {
    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                initCarousel();
                carouselObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    carouselObserver.observe(projectsSection);
}

// ===== CURSOR GLOW EFFECT =====
const cursorGlow = document.createElement('div');
cursorGlow.style.cssText = `
    position: fixed;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, hsla(185, 100%, 50%, 0.08), transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: left 0.08s ease, top 0.08s ease, opacity 0.3s ease;
    opacity: 0;
    will-change: left, top;
`;
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// ===== CONTACT FORM STUB =====
// Contact form section can be added here in the future
// For now, the social links and Telegram button serve as contact methods