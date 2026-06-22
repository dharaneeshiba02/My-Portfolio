// ==================== Navigation Toggle ==================== 
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== Active Navigation Link ==================== 
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

setActiveNavLink();

// ==================== Contact Form Submission ==================== 
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message
        const button = contactForm.querySelector('button');
        const originalText = button.textContent;
        
        button.textContent = 'Message Sent! ✓';
        button.style.background = '#10b981';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    });
}

// ==================== Scroll Animations ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards, project cards, and education cards
document.querySelectorAll('.skill-card, .project-card, .education-card').forEach((element, index) => {
    element.style.setProperty('--index', index);
    observer.observe(element);
});

// ==================== Smooth Scroll for Links ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ==================== Progress Bar Animation ==================== 
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                
                setTimeout(() => {
                    entry.target.style.transition = 'width 1s ease';
                    entry.target.style.width = width;
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

window.addEventListener('load', animateProgressBars);

// ==================== Navbar Background on Scroll ==================== 
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ==================== Typing Animation ==================== 
function typeAnimation(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Apply typing animation to hero title on page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeAnimation(heroTitle, originalText, 30);
    }
});

// ==================== Floating Animation Variation ==================== 
const floatingCard = document.querySelector('.floating-card');
if (floatingCard) {
    let startTime = Date.now();
    
    function updateFloat() {
        const elapsed = (Date.now() - startTime) / 1000;
        const y = Math.sin(elapsed * 2) * 20;
        const x = Math.cos(elapsed * 1.5) * 10;
        
        floatingCard.style.transform = `translate(${x}px, ${y}px)`;
        requestAnimationFrame(updateFloat);
    }
    
    updateFloat();
}

// ==================== Social Links Click Handlers ==================== 
document.querySelectorAll('.social-links a, .footer-social a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== Project Card Hover Effect ==================== 
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-12px) rotateY(2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0)';
    });
});

// ==================== Skill Card Counter Animation ==================== 
function animateCounters() {
    const statCards = document.querySelectorAll('.stat-card h3');
    const counters = new Map();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                const isPercentage = text.includes('%');
                const isNumber = !isNaN(parseFloat(text));
                
                if (isNumber) {
                    const finalValue = parseFloat(text);
                    const startValue = 0;
                    const duration = 2000; // 2 seconds
                    const startTime = Date.now();
                    
                    function count() {
                        const now = Date.now();
                        const progress = Math.min((now - startTime) / duration, 1);
                        const value = startValue + (finalValue - startValue) * progress;
                        
                        if (isPercentage) {
                            element.textContent = Math.floor(value) + '%';
                        } else if (finalValue > 1) {
                            element.textContent = Math.floor(value) + (text.replace(/[0-9.]/g, ''));
                        } else {
                            element.textContent = value.toFixed(1) + (text.replace(/[0-9.]/g, ''));
                        }
                        
                        if (progress < 1) {
                            requestAnimationFrame(count);
                        }
                    }
                    
                    count();
                }
                
                observer.unobserve(entry.target);
            }
        });
    });
    
    statCards.forEach(card => observer.observe(card));
}

window.addEventListener('load', animateCounters);

// ==================== Parallax Effect ==================== 
document.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        
        element.style.backgroundPosition = `${x * speed}% ${y * speed}%`;
    });
});

// ==================== Keyboard Navigation ==================== 
let currentFocusIndex = -1;
const focusableElements = document.querySelectorAll('a, button, input, textarea');

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        currentFocusIndex = Array.from(focusableElements).indexOf(document.activeElement) + 1;
        if (currentFocusIndex >= focusableElements.length) {
            currentFocusIndex = 0;
        }
        e.preventDefault();
        focusableElements[currentFocusIndex].focus();
    }
});

// ==================== Add Page Load Animation ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 10);
});

// ==================== Mobile Touch Interactions ==================== 
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const difference = touchStartY - touchEndY;
    
    if (Math.abs(difference) > 50) {
        // Swiped enough
        if (difference > 0) {
            // Swiped up - could show/hide navbar
        } else {
            // Swiped down
        }
    }
});

// ==================== Scroll to Top Button ==================== 
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #2563eb, #8b5cf6);
    border: none;
    border-radius: 50%;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    display: none;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
`;

document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.justifyContent = 'center';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 6px 25px rgba(37, 99, 235, 0.6)';
});

scrollTopBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.4)';
});

// ==================== Log Page Load ==================== 
console.log('%cDharanesh\'s Portfolio', 'color: #2563eb; font-size: 2rem; font-weight: bold;');
console.log('%cWelcome! Feel free to explore the code.', 'color: #8b5cf6; font-size: 1rem;');
