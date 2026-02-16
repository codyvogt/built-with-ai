// ===== Built with AI - Main JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initContactForm();
    initAuditForm();
    initSmoothScroll();
});

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const toggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');

    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        elements.forEach(el => el.classList.add('visible'));
    }
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('submitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        try {
            const formData = new FormData(form);
            
            // Send via mailto as primary method (works without Formspree setup)
            const name = formData.get('name');
            const email = formData.get('email');
            const business = formData.get('business');
            const message = formData.get('message');
            
            const subject = encodeURIComponent('New Inquiry from ' + name + (business ? ' - ' + business : ''));
            const body = encodeURIComponent(
                'Name: ' + name + '\n' +
                'Email: ' + email + '\n' +
                'Business: ' + (business || 'N/A') + '\n\n' +
                'Message:\n' + message
            );
            
            window.location.href = 'mailto:info@builtwithai.ca?subject=' + subject + '&body=' + body;
            
            // Show success after a brief delay
            setTimeout(() => {
                form.reset();
                document.getElementById('successModal').classList.add('active');
            }, 500);

        } catch (error) {
            console.error('Form submission error:', error);
            alert('Something went wrong. Please email us directly at info@builtwithai.ca');
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

// ===== Audit Form =====
function initAuditForm() {
    const form = document.getElementById('auditForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('auditSubmitBtn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        try {
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const business = formData.get('business');
            const tools = formData.get('current_tools');

            const subject = encodeURIComponent('Free Software Audit Request - ' + name + (business ? ' (' + business + ')' : ''));
            const body = encodeURIComponent(
                'SOFTWARE AUDIT REQUEST\n' +
                '=====================\n\n' +
                'Name: ' + name + '\n' +
                'Email: ' + email + '\n' +
                'Business: ' + (business || 'N/A') + '\n\n' +
                'Current Software Tools:\n' + (tools || 'Not specified')
            );

            window.location.href = 'mailto:info@builtwithai.ca?subject=' + subject + '&body=' + body;

            setTimeout(() => {
                form.reset();
                document.getElementById('successModal').classList.add('active');
            }, 500);

        } catch (error) {
            console.error('Audit form submission error:', error);
            alert('Something went wrong. Please email us directly at info@builtwithai.ca');
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Close modal on overlay click =====
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
    }
});

// ===== Close modal on Escape =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});
