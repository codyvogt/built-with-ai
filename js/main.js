// ===== Built with AI - Main JavaScript =====

// Formspree endpoint shared by every form on the site.
// If this is ever cleared, forms fall back to opening the visitor's email app.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xeebrnaz';

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
        const isOpen = navLinks.classList.contains('active');
        toggle.setAttribute('aria-expanded', String(isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && navLinks.classList.contains('active')) {
            toggle.classList.remove('active');
            navLinks.classList.remove('active');
            toggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            toggle.focus();
        }
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

// ===== Shared Form Submission =====
// Submits to Formspree when configured; otherwise opens the visitor's email
// app with a pre-filled message. buildMailto(formData) returns a mailto: URL.
function wireForm(form, submitBtn, buildMailto) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');

        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        const formData = new FormData(form);

        try {
            if (FORMSPREE_ENDPOINT) {
                const response = await fetch(FORMSPREE_ENDPOINT, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (!response.ok) {
                    throw new Error('Formspree responded with ' + response.status);
                }
                form.reset();
                document.getElementById('successModal').classList.add('active');
            } else {
                window.location.href = buildMailto(formData);
                setTimeout(() => {
                    form.reset();
                    document.getElementById('successModal').classList.add('active');
                }, 500);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            // Fall back to the visitor's email app so the message isn't lost
            window.location.href = buildMailto(formData);
        } finally {
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        }
    });
}

// ===== Contact Form =====
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    wireForm(form, document.getElementById('submitBtn'), (formData) => {
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

        return 'mailto:info@builtwithai.ca?subject=' + subject + '&body=' + body;
    });
}

// ===== Audit Form =====
function initAuditForm() {
    const form = document.getElementById('auditForm');
    if (!form) return;

    wireForm(form, document.getElementById('auditSubmitBtn'), (formData) => {
        const name = formData.get('name');
        const email = formData.get('email');
        const business = formData.get('business');
        const tools = formData.get('current_tools');

        const subject = encodeURIComponent('Free AI Opportunity Audit Request - ' + name + (business ? ' (' + business + ')' : ''));
        const body = encodeURIComponent(
            'AI OPPORTUNITY AUDIT REQUEST\n' +
            '============================\n\n' +
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n' +
            'Business: ' + (business || 'N/A') + '\n\n' +
            'Tools, Workflows, or AI Ideas:\n' + (tools || 'Not specified')
        );

        return 'mailto:info@builtwithai.ca?subject=' + subject + '&body=' + body;
    });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            if (href === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }

            const target = document.querySelector(href);
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
