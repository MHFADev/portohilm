// Register GSAP plugins
if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }
    if (typeof ScrollToPlugin !== 'undefined') {
        gsap.registerPlugin(ScrollToPlugin);
    }
}

// Enhanced Animation Controller with GSAP
class AnimationController {
    constructor() {
        this.isMobile = this.detectMobile();
        this.isLowEndDevice = this.detectLowEndDevice();
        this.init();
    }

    detectMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
               window.innerWidth < 768;
    }

    detectLowEndDevice() {
        const memory = navigator.deviceMemory || 4;
        const cores = navigator.hardwareConcurrency || 4;
        return memory < 4 || cores <= 2;
    }

    init() {
        console.log('🎬 Initializing Enhanced Animations...');
        
        // Core animations
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        
        // Enhanced GSAP animations
        this.setupGSAPScrollAnimations();
        this.setupPageLoadAnimations();
        this.setupHoverAnimations();
        this.setupSkillBars();
        
        if (!this.isMobile && typeof gsap !== 'undefined') {
            this.setupParallaxEffects();
            this.setupAdvancedGSAPAnimations();
            this.setupMagneticButtons();
        }
        
        // Floating particles (lightweight)
        if (!this.isLowEndDevice) {
            this.setupFloatingParticles();
        }
        
        console.log('✅ Enhanced Animations initialized!');
    }

    // Page Load Animations with GSAP
    setupPageLoadAnimations() {
        if (typeof gsap === 'undefined') return;
        
        // Fade in hero section
        gsap.from('.hero-card', {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2
        });
        
        // Stagger navigation items
        gsap.from('.nav-link', {
            opacity: 0,
            y: -20,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out'
        });
        
        // Fade in hero badge
        gsap.from('.hero-badge', {
            opacity: 0,
            scale: 0.8,
            duration: 0.8,
            ease: 'back.out(1.7)',
            delay: 0.4
        });
        
        // Fade in buttons with stagger
        gsap.from('.interactive-btn', {
            opacity: 0,
            y: 30,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.6
        });
    }

    // Enhanced Scroll Animations with GSAP ScrollTrigger
    setupGSAPScrollAnimations() {
        if (typeof gsap === 'undefined') return;
        
        // Animate all cards
        gsap.utils.toArray('.skills-card, .info-card, .ai-tool-card, .project-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'top 65%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 60,
                duration: 0.8,
                ease: 'power3.out',
                delay: index * 0.1
            });
        });
        
        // Animate tech icons
        gsap.utils.toArray('.tech-icon-item').forEach((icon, index) => {
            gsap.from(icon, {
                scrollTrigger: {
                    trigger: icon,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                scale: 0.5,
                rotation: 45,
                duration: 0.6,
                ease: 'back.out(2)',
                delay: index * 0.05
            });
        });
        
        // Animate timeline items
        gsap.utils.toArray('.timeline-item').forEach((item, index) => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                x: index % 2 === 0 ? -50 : 50,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
        
        // Animate headings
        gsap.utils.toArray('h2, h3').forEach(heading => {
            gsap.from(heading, {
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }

    // Hover Animations with GSAP
    setupHoverAnimations() {
        if (typeof gsap === 'undefined') return;
        
        // Interactive buttons
        document.querySelectorAll('.interactive-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                gsap.to(btn, {
                    scale: 1.05,
                    y: -4,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
        
        // Cards hover
        document.querySelectorAll('.skills-card, .info-card, .ai-tool-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)',
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });
        
        // Tech icons
        document.querySelectorAll('.tech-icon-item').forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                gsap.to(icon, {
                    scale: 1.15,
                    rotation: 5,
                    duration: 0.4,
                    ease: 'back.out(2)'
                });
                
                // Sparkle effect
                if (!this.isLowEndDevice) {
                    this.createSparkles(icon);
                }
            });
            
            icon.addEventListener('mouseleave', () => {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Theme Toggle Animation
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;

        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.classList.toggle('dark', savedTheme === 'dark');

        themeToggle?.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // GSAP animation for theme toggle
            if (typeof gsap !== 'undefined') {
                gsap.to(themeToggle, {
                    rotation: 360,
                    scale: 0.8,
                    duration: 0.4,
                    ease: 'back.out(2)',
                    onComplete: () => {
                        gsap.to(themeToggle, {
                            rotation: 0,
                            scale: 1,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                });
            }
        });
    }

    // Mobile Menu Animation
    setupMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton?.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                
                if (typeof gsap !== 'undefined') {
                    gsap.fromTo(mobileMenu, 
                        { 
                            opacity: 0, 
                            height: 0 
                        },
                        { 
                            opacity: 1, 
                            height: 'auto', 
                            duration: 0.4, 
                            ease: 'power2.out' 
                        }
                    );
                } else {
                    mobileMenu.style.opacity = '1';
                }
            } else {
                if (typeof gsap !== 'undefined') {
                    gsap.to(mobileMenu, {
                        opacity: 0,
                        height: 0,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            mobileMenu.classList.add('hidden');
                        }
                    });
                } else {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    }

    // Skill Bars Animation with GSAP
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            const skillValue = bar.getAttribute('data-skill');
            
            if (typeof gsap !== 'undefined') {
                gsap.from(bar, {
                    scrollTrigger: {
                        trigger: bar,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    width: '0%',
                    duration: 1.5,
                    ease: 'power3.out',
                    onComplete: () => {
                        gsap.to(bar, {
                            width: skillValue + '%',
                            duration: 0.1
                        });
                    }
                });
            } else {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                bar.style.width = skillValue + '%';
                            }, 200);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(bar);
            }
        });
    }

    // Smooth Scrolling
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    if (typeof gsap !== 'undefined') {
                        gsap.to(window, {
                            scrollTo: target,
                            duration: 1,
                            ease: 'power3.inOut'
                        });
                    } else {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    // Parallax Effects with GSAP
    setupParallaxEffects() {
        if (typeof gsap === 'undefined') return;
        
        // Parallax for floating elements
        gsap.utils.toArray('.floating-cube, .floating-sphere, .floating-pyramid').forEach((element, index) => {
            gsap.to(element, {
                y: 100,
                rotation: 360,
                scrollTrigger: {
                    trigger: 'body',
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: 1 + (index * 0.5)
                }
            });
        });
        
        // Parallax text effect
        const heroText = document.querySelector('.hero-gradient-text');
        if (heroText) {
            gsap.to(heroText, {
                y: 50,
                scrollTrigger: {
                    trigger: heroText,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }
    }

    // Advanced GSAP Animations
    setupAdvancedGSAPAnimations() {
        if (typeof gsap === 'undefined') return;
        
        // Continuous floating animation for 3D elements
        gsap.utils.toArray('.floating-cube, .floating-sphere, .floating-pyramid').forEach((element, index) => {
            gsap.to(element, {
                y: '+=20',
                rotation: '+=10',
                duration: 3 + index,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        });
        
        // Pulse animation for badges
        gsap.to('.hero-badge', {
            scale: 1.05,
            duration: 2,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
    }

    // Magnetic Buttons Effect
    setupMagneticButtons() {
        if (this.isMobile || typeof gsap === 'undefined') return;
        
        document.querySelectorAll('.interactive-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.5,
                    ease: 'power2.out'
                });
            });
            
            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }

    // Floating Particles
    setupFloatingParticles() {
        const particlesContainer = document.querySelector('.floating-particles');
        if (!particlesContainer) return;
        
        const particleCount = this.isLowEndDevice ? 8 : 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${document.documentElement.classList.contains('dark') ? 'rgba(6, 182, 212, 0.3)' : 'rgba(6, 182, 212, 0.2)'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
            `;
            
            particlesContainer.appendChild(particle);
            
            if (typeof gsap !== 'undefined') {
                gsap.to(particle, {
                    y: -window.innerHeight,
                    duration: Math.random() * 10 + 10,
                    repeat: -1,
                    ease: 'none',
                    delay: Math.random() * 5
                });
                
                gsap.to(particle, {
                    x: Math.random() * 100 - 50,
                    duration: Math.random() * 5 + 3,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        }
    }

    // Sparkle Effect
    createSparkles(element) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: linear-gradient(45deg, #06b6d4, #22d3ee);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                box-shadow: 0 0 10px #06b6d4;
            `;
            
            const rect = element.getBoundingClientRect();
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            
            document.body.appendChild(sparkle);
            
            if (typeof gsap !== 'undefined') {
                gsap.to(sparkle, {
                    y: -50,
                    x: (Math.random() - 0.5) * 50,
                    opacity: 0,
                    scale: 0,
                    duration: 1,
                    ease: 'power2.out',
                    onComplete: () => sparkle.remove()
                });
            } else {
                setTimeout(() => sparkle.remove(), 1000);
            }
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnimationController;
}
