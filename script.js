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

document.querySelectorAll('.timeline-item, .skill-item, .softskill-card, .tool-item, .project-card').forEach(el => {
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

// Message character counter
const messageInput = document.getElementById('message');
const charCounter = document.querySelector('.char-counter');

if (messageInput && charCounter) {
    messageInput.addEventListener('input', () => {
        const currentLength = messageInput.value.length;
        charCounter.textContent = `${currentLength} / 500`;
        
        if (currentLength >= 500) {
            charCounter.style.color = 'hsl(0, 80%, 50%)';
        } else {
            charCounter.style.color = '';
        }
    });
}

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
        const formMessage = document.getElementById('form-message');
        
        btnText.textContent = 'Sent!';
        btnIcon.className = 'fas fa-check btn-icon';
        submitBtn.style.background = 'linear-gradient(135deg, hsl(140, 70%, 50%), hsl(160, 80%, 45%))';
        submitBtn.disabled = true;
        
        if (formMessage) {
            formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            formMessage.className = 'form-message success';
        }

        setTimeout(() => {
            contactForm.reset();
            btnText.textContent = 'Send Message';
            btnIcon.className = 'fas fa-paper-plane btn-icon';
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            
            if (formMessage) {
                formMessage.className = 'form-message';
                formMessage.textContent = '';
            }
        }, 4000);
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