// ===== NAVIGATION =====

// Active Navigation link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

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

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
});

// ===== FOOTER YEAR =====
const footerYear = document.getElementById('footer-year');
if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
}

// ===== TYPING EFFECT =====
const typingText = document.getElementById('typing-text');
const phrases = ['Web Developer', 'Frontend Developer', 'UI/UX Designer', 'DevOps', 'Quality Assurance (QA)'];
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
document.querySelectorAll('.section-title, .about-content, .contact-form').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Staggered reveal for timeline items and skill items
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // Find index among siblings
            const siblings = Array.from(entry.target.parentElement.children);
            const index = siblings.indexOf(entry.target);
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 120);
            staggerObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.timeline-item, .skill-item').forEach(el => {
    staggerObserver.observe(el);
});

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

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!fullName || !email || !message) {
            shakeForm();
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            shakeForm();
            return;
        }

        // Success state
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        btnText.textContent = 'Sent!';
        btnIcon.className = 'fas fa-check btn-icon';
        submitBtn.style.background = 'linear-gradient(135deg, hsl(140, 70%, 50%), hsl(160, 80%, 45%))';
        submitBtn.disabled = true;

        setTimeout(() => {
            contactForm.reset();
            btnText.textContent = 'Send';
            btnIcon.className = 'fas fa-paper-plane btn-icon';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

function shakeForm() {
    contactForm.style.animation = 'none';
    contactForm.offsetHeight; // reflow
    contactForm.style.animation = 'shake 0.4s ease';
    setTimeout(() => { contactForm.style.animation = ''; }, 400);
}

// Inject shake keyframe
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(5px); }
}`;
document.head.appendChild(shakeStyle);
