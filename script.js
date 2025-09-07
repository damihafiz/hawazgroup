
// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animated counter for stats
const observerOptions = {
    threshold: 0.5,
    triggerOnce: true
};

const animateCounter = (element, target) => {
    const duration = 2000;
    const start = performance.now();
    
    const update = (currentTime) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easeOutQuart * target);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };
    
    requestAnimationFrame(update);
};

// Intersection Observer for animations
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            if (target.classList.contains('stat-number')) {
                const targetValue = parseInt(target.getAttribute('data-target'));
                animateCounter(target, targetValue);
                statsObserver.unobserve(target);
            }
        }
    });
}, observerOptions);

// Observe stat numbers when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init("D5XIsDGLFl1xUYUL4");
    
    document.querySelectorAll('.stat-number').forEach(el => {
        statsObserver.observe(el);
    });
    
    // Mobile navigation toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Enhanced form submission with EmailJS
document.querySelector('.contact-form form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const button = e.target.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    const form = e.target;
    
    // Get form data
    const formData = new FormData(form);
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;
    
    // Create formatted message
    const formattedMessage = `
New Contact Form Submission:

Name: ${name}
Email: ${email}
Message: ${message}
Submitted At: ${new Date().toLocaleString()}
    `;
    
    // Show loading state
    button.textContent = 'Sending...';
    button.disabled = true;
    
    // EmailJS template parameters
    const templateParams = {
        to_email: 'damilolahafix@gmail.com',
        from_name: name,
        from_email: email,
        message: formattedMessage,
        subject: `New Contact Form Submission from ${name}`
    };
    
    // Send email using EmailJS
    emailjs.send('service_z9t9ijm', 'template_mt7gvrd', templateParams)
        .then((response) => {
            console.log('Email sent successfully:', response);
            button.textContent = 'Thank you for choosing The Hawaz Group';
            button.style.background = 'var(--gradient-accent)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = 'var(--gradient-primary)';
                form.reset();
            }, 2000);
        })
        .catch((error) => {
            console.error('Email sending failed:', error);
            button.textContent = 'Failed to send. Try again.';
            button.style.background = '#ef4444';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = 'var(--gradient-primary)';
            }, 3000);
        });
});

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.geometric-shape');
    
    shapes.forEach((shape, index) => {
        const speed = 0.5 + (index * 0.1);
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Random floating elements generation
const createFloatingElement = () => {
    const element = document.createElement('div');
    element.className = 'float-element';
    element.style.left = Math.random() * 100 + '%';
    element.style.animationDelay = Math.random() * 8 + 's';
    element.style.background = `hsl(${Math.random() * 60 + 220}, 70%, 60%)`;
    
    const container = document.querySelector('.floating-elements');
    if (container) {
        container.appendChild(element);
        
        setTimeout(() => {
            element.remove();
        }, 8000);
    }
};

// Generate floating elements periodically
setInterval(createFloatingElement, 2000);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
