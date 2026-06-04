/**
 * ==========================================================================
 * CYBERPUNK PORFOLIO CUSTOM CORE ARCHITECTURE ENGINE
 * GLITCH Portfolio Core Framework - Vanilla ES6 Execution
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initNavbar();
    initMobileNav();
    initTypewriter();
    initParticles();
    initScrollReveal();
    initCounters();
    init3DTilt();
    initSlider();
    initContactForm();
});

/* ==========================================================================
   1. CYBERPUNK INITIAL LOADING SIMULATOR
   ========================================================================== */
function initLoader() {
    const loader = document.getElementById('loader');
    const progressBar = document.querySelector('.loader-bar');
    const pctDisplay = document.getElementById('load-pct');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 12) + 4;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                // Trigger structural progress fill execution on successful completion
                animateSkillsProgress();
            }, 400);
        }
        progressBar.style.width = `${progress}%`;
        pctDisplay.innerText = `${progress}%`;
    }, 60);
}

/* ==========================================================================
   2. CUSTOM COORD SPACE NEON CURSOR TRAIL MATRIX
   ========================================================================== */
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const trail = document.querySelector('.cursor-trail');
    
    let mouseX = 0, mouseY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Inertial frame sync loop for the tracking trail circle
    function animateTrail() {
        let distX = mouseX - trailX;
        let distY = mouseY - trailY;
        
        trailX += distX * 0.15;
        trailY += distY * 0.15;
        
        trail.style.left = `${trailX}px`;
        trail.style.top = `${trailY}px`;
        
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Attach interaction expansion anchors
    const hoverables = document.querySelectorAll('a, button, .glass-card, input, textarea');
    hoverables.forEach(item => {
        item.addEventListener('mouseenter', () => {
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.style.backgroundColor = 'transparent';
            cursor.style.border = '2px solid var(--neon-cyan)';
        });
        item.addEventListener('mouseleave', () => {
            cursor.style.width = '8px';
            cursor.style.height = '8px';
            cursor.style.backgroundColor = 'var(--neon-cyan)';
            cursor.style.border = 'none';
        });
    });
}

/* ==========================================================================
   3. FIXED NAVBAR MANAGEMENT WITH BACK-TO-TOP TRIGGER
   ========================================================================== */
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Toggle Nav Size
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Toggle Back-to-Top Button
        if (window.scrollY > 600) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Dynamic Active State Menu Intersection Mapping
        let currentSec = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                currentSec = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSec}`) {
                link.classList.add('active');
            }
        });
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================================================
   4. MOBILE HAMBURGER NAVIGATION SYSTEM
   ========================================================================== */
function initMobileNav() {
    const burger = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileNav.classList.toggle('open');
        burger.classList.toggle('toggle');
        
        // Burger Line Rotations
        const l1 = burger.querySelector('.line1');
        const l2 = burger.querySelector('.line2');
        const l3 = burger.querySelector('.line3');
        
        if(burger.classList.contains('toggle')) {
            l1.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            l2.style.opacity = '0';
            l3.style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            l1.style.transform = 'none';
            l2.style.opacity = '1';
            l3.style.transform = 'none';
        }
    }

    burger.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));
}

/* ==========================================================================
   5. TYPEWRITER EFFECT ENGINE FOR CTA SEGMENT
   ========================================================================== */
class TypeWriter {
    constructor(txtElement, words, wait = 300) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
        let typeSpeed = 100;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 400;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

function initTypewriter() {
    const txtElement = document.querySelector('.txt-type');
    if(txtElement) {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        new TypeWriter(txtElement, words, wait);
    }
}

/* ==========================================================================
   6. HIGH-PERFORMANCE BACKGROUND FLOATING PARTICLES
   ========================================================================== */
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    const particleCount = 45;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 3 + 1}px`;
        particle.style.height = particle.style.width;
        
        // Cyberpunk Theme Color Selection Array
        const colors = ['#00F5FF', '#A855F7', '#FF0080'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        
        container.appendChild(particle);
        
        animateParticle(particle);
    }
}

function animateParticle(p) {
    let speedX = (Math.random() - 0.5) * 0.5;
    let speedY = (Math.random() - 0.5) * 0.5;
    let currentX = parseFloat(p.style.left);
    let currentY = parseFloat(p.style.top);

    function frame() {
        currentX += speedX;
        currentY += speedY;

        if (currentX < 0 || currentX > 100) speedX *= -1;
        if (currentY < 0 || currentY > 100) speedY *= -1;

        p.style.left = `${currentX}%`;
        p.style.top = `${currentY}%`;
        requestAnimationFrame(frame);
    }
    frame();
}

/* ==========================================================================
   7. INTERSECTION OBSERVER FOR SCROLL REVEAL SCENARIOS
   ========================================================================== */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it is the about grid, trigger numeric counter tracking metrics
                if(entry.target.id === 'about') {
                    startCounters();
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   8. NUMERIC COUNTER TICKER ENGINE
   ========================================================================== */
function initCounters() {
    // Initializer base placeholder function, execution bound directly to scroll reveal pipeline.
}

function startCounters() {
    const counters = document.querySelectorAll('.counter-num');
    counters.forEach(counter => {
        if(counter.classList.contains('counted')) return;
        counter.classList.add('counted');
        
        const target = +counter.getAttribute('data-target');
        const speed = 2000 / target; // Absolute timeline normalization

        const updateCount = () => {
            const current = +counter.innerText;
            const inc = Math.ceil(target / 40);

            if (current < target) {
                counter.innerText = Math.min(current + inc, target);
                setTimeout(updateCount, speed);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

function animateSkillsProgress() {
    const skillsSection = document.getElementById('skills');
    const progressFills = document.querySelectorAll('.progress-bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressFills.forEach(fill => {
                    const card = fill.closest('.skill-card');
                    const pct = card.querySelector('.skill-pct').innerText;
                    fill.style.width = pct;
                });
            }
        });
    }, { threshold: 0.1 });
    
    if(skillsSection) observer.observe(skillsSection);
}

/* ==========================================================================
   9. VANILLA INTERACTIVE 3D MOUSE-TILT VECTOR MATRIX
   ========================================================================== */
function init3DTilt() {
    const elements = document.querySelectorAll('[data-tilt]');
    
    // Process tilt constraints on desktop hardware profiles exclusively
    if (window.innerWidth < 1024) return;

    elements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const midX = rect.width / 2;
            const midY = rect.height / 2;
            
            // Map offsets to lean vectors
            const tiltX = (y - midY) / 10;
            const tiltY = -(x - midX) / 10;
            
            el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        });
    });
}

/* ==========================================================================
   10. INTERACTIVE GLASS TESTIMONIAL SLIDER MATRIX
   ========================================================================== */
function initSlider() {
    const slides = document.querySelectorAll('.testimonial-card');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentIndex = 0;

    if(slides.length === 0) return;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        if(index >= slides.length) currentIndex = 0;
        else if(index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;

        slides[currentIndex].classList.add('active');
    }

    nextBtn.addEventListener('click', () => showSlide(currentIndex + 1));
    prevBtn.addEventListener('click', () => showSlide(currentIndex - 1));

    // Automated internal interval flip
    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 8000);
}

/* ==========================================================================
   11. SECURE VALIDATION & FORM SUBMIT PIPELINE
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('cyber-contact-form');
    const statusMsg = document.getElementById('form-status');

    if(!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('form-name').value.trim();
        const email = document.getElementById('form-email').value.trim();
        const msg = document.getElementById('form-message').value.trim();
        const btn = form.querySelector('.submit-btn');

        if(!name || !email || !msg) {
            showFeedback('CRITICAL_ERR: EMPTY PACKET INGESTION DISALLOWED.', 'var(--neon-pink)');
            return;
        }

        // Processing state visual shift
        btn.disabled = true;
        btn.querySelector('span').innerText = 'TRANSMITTING TELEMETRY...';
        statusMsg.innerText = '';

        // Simulate secure data packet pipeline pipeline routing
        setTimeout(() => {
            showFeedback('TRANSMISSION SUCCESSFUL. GLITCH NETWORK RESPONDING SHORTLY.', 'var(--neon-cyan)');
            form.reset();
            btn.disabled = false;
            btn.querySelector('span').innerText = 'EXECUTE TRANSMISSION';
        }, 1500);
    });

    function showFeedback(text, color) {
        statusMsg.innerText = text;
        statusMsg.style.color = color;
        statusMsg.style.textShadow = `0 0 10px ${color}`;
        
        // Add subtle screen flash styling effect
        statusMsg.style.animation = 'glitchAnim 0.3s ease 2';
    }
}
