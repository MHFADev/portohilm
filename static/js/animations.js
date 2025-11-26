// Animation Controller
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
        return memory < 4 || cores <= 2 || this.isMobile;
    }

    init() {
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupScrollAnimations();
        this.setupSkillBars();
        this.setupSmoothScrolling();
        
        if (!this.isMobile) {
            this.setupParallaxEffects();
            this.setupFloatingParticles();
            this.setupTechIconAnimations();
            this.setupAdvancedAnimations();
            this.startAnimationLoop();
        } else {
            this.setupInteractiveElements();
        }
    }

    // Theme Toggle Animation
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;

        // Check for saved theme preference or default to 'dark'
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.classList.toggle('dark', savedTheme === 'dark');

        themeToggle?.addEventListener('click', () => {
            html.classList.toggle('dark');
            const isDark = html.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Add animation to theme toggle button
            themeToggle.style.transform = 'scale(0.8) rotate(180deg)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
        });
    }

    // 3. Mobile Menu Animation
    setupMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton?.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.style.maxHeight = '0px';
                mobileMenu.style.opacity = '0';
                
                // Animate in
                requestAnimationFrame(() => {
                    mobileMenu.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
                    mobileMenu.style.maxHeight = '300px';
                    mobileMenu.style.opacity = '1';
                });
            } else {
                // Animate out
                mobileMenu.style.maxHeight = '0px';
                mobileMenu.style.opacity = '0';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
        });
    }

    // 4. Scroll-triggered Animations
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        document.querySelectorAll('.animate-section, .info-card, .project-card, .timeline-item, .gallery-item').forEach(el => {
            observer.observe(el);
        });
    }

    // 5. Skill Bars Animation
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const skillValue = skillBar.getAttribute('data-skill');
                    
                    setTimeout(() => {
                        skillBar.style.width = skillValue + '%';
                    }, 200);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    // 6. Smooth Scrolling
    setupSmoothScrolling() {
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
    }

    // 8. Parallax Effects - Desktop only
    setupParallaxEffects() {
        if (this.isMobile) return;
        
        const throttledParallax = this.throttle(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-3d-elements > *');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px) rotateZ(${scrolled * 0.1}deg)`;
            });
        }, 100);
        
        window.addEventListener('scroll', throttledParallax, { passive: true });
    }
    
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // 9. Interactive Elements
    setupInteractiveElements() {
        // Add hover effects to interactive buttons
        document.querySelectorAll('.interactive-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px) scale(1.02)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click ripple effect
        document.querySelectorAll('.interactive-btn, .project-card, .info-card').forEach(element => {
            element.addEventListener('click', (e) => {
                this.createRipple(e, element);
            });
        });
    }

    // 10. Floating Particles - Desktop only
    setupFloatingParticles() {
        if (this.isMobile) return;
        
        const particlesContainer = document.querySelector('.floating-particles');
        const particleCount = this.isLowEndDevice ? 10 : 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: ${document.documentElement.classList.contains('dark') ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 5}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            particlesContainer?.appendChild(particle);
        }
    }

    // 11. Ripple Effect
    createRipple(event, element) {
        const circle = document.createElement('span');
        const diameter = Math.max(element.clientWidth, element.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - element.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - element.offsetTop - radius}px`;
        circle.style.cssText += `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(circle);
        
        setTimeout(() => {
            circle.remove();
        }, 600);
    }

    // 12. Animation Loop for Continuous Effects - Desktop only
    startAnimationLoop() {
        if (this.isMobile) return;
        
        let frameCount = 0;
        const skipFrames = this.isLowEndDevice ? 2 : 0;
        
        const animate = () => {
            frameCount++;
            
            if (skipFrames > 0 && frameCount % skipFrames !== 0) {
                requestAnimationFrame(animate);
                return;
            }
            
            // Update floating elements
            const floatingElements = document.querySelectorAll('.floating-cube, .floating-sphere, .floating-pyramid');
            floatingElements.forEach((element, index) => {
                const time = Date.now() * 0.001;
                const offset = index * 2;
                
                const x = Math.sin(time + offset) * 10;
                const y = Math.cos(time + offset) * 5;
                const rotation = time * 20 + offset * 30;
                
                element.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
            });
            
            // Update particle positions
            document.querySelectorAll('.particle').forEach((particle, index) => {
                const time = Date.now() * 0.0005;
                const speed = 0.5 + (index % 3) * 0.3;
                
                let currentTop = parseFloat(particle.style.top) || 0;
                currentTop -= speed;
                
                if (currentTop < -10) {
                    currentTop = 110;
                    particle.style.left = Math.random() * 100 + '%';
                }
                
                particle.style.top = currentTop + '%';
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // 13. Technology Icons Interactive Animations - Simplified on mobile
    setupTechIconAnimations() {
        if (this.isMobile) return;
        
        const techIcons = document.querySelectorAll('.tech-icon-item');
        
        techIcons.forEach((icon, index) => {
            // Mouse enter animation
            icon.addEventListener('mouseenter', () => {
                const iconElement = icon.querySelector('i');
                iconElement.style.transform = 'scale(1.2) rotate(10deg)';
                iconElement.style.transition = 'transform 0.3s ease';
                
                if (!this.isLowEndDevice) {
                    this.createSparkles(icon);
                }
            });
            
            // Mouse leave animation
            icon.addEventListener('mouseleave', () => {
                const iconElement = icon.querySelector('i');
                iconElement.style.transform = 'scale(1) rotate(0deg)';
            });
            
            // Click animation
            icon.addEventListener('click', () => {
                icon.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 150);
                
                if (!this.isLowEndDevice) {
                    this.createTechRipple(icon);
                }
            });
            
            if (!this.isLowEndDevice) {
                this.addFloatingAnimation(icon, index);
            }
        });
    }

    // 14. Advanced Animation Effects - Desktop only
    setupAdvancedAnimations() {
        if (this.isMobile) return;
        
        // Parallax text effect - throttled
        const throttledTextParallax = this.throttle(() => {
            const scrolled = window.pageYOffset;
            const heroText = document.querySelector('.hero-gradient-text');
            if (heroText) {
                heroText.style.transform = `translateY(${scrolled * 0.1}px)`;
            }
        }, 100);
        
        window.addEventListener('scroll', throttledTextParallax, { passive: true });
        
        // Magnetic button effect - only on desktop
        document.querySelectorAll('.interactive-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
        
        // Skill bars glow effect
        if (!this.isLowEndDevice) {
            document.querySelectorAll('.skill-item').forEach(item => {
                item.addEventListener('mouseenter', () => {
                    const skillBar = item.querySelector('.skill-bar');
                    if (skillBar) {
                        skillBar.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.3)';
                        if (document.documentElement.classList.contains('dark')) {
                            skillBar.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.3)';
                        }
                    }
                });
                
                item.addEventListener('mouseleave', () => {
                    const skillBar = item.querySelector('.skill-bar');
                    if (skillBar) {
                        skillBar.style.boxShadow = '';
                    }
                });
            });
        }
    }

    // Create sparkle effect for tech icons
    createSparkles(element) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: gold;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: sparkle 1s ease-out forwards;
            `;
            
            const rect = element.getBoundingClientRect();
            sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
            sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // Create tech ripple effect
    createTechRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 215, 0, 0.6);
            transform: scale(0);
            animation: techRipple 0.8s ease-out;
            pointer-events: none;
            width: 100px;
            height: 100px;
            left: 50%;
            top: 50%;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 800);
    }

    // Add floating animation to tech icons
    addFloatingAnimation(element, index) {
        const animationDelay = index * 200;
        const duration = 3000 + Math.random() * 2000;
        
        setInterval(() => {
            const randomX = (Math.random() - 0.5) * 10;
            const randomY = (Math.random() - 0.5) * 10;
            const randomRotation = (Math.random() - 0.5) * 20;
            
            element.style.transition = 'transform 1s ease-in-out';
            element.style.transform += ` translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg)`;
            
            setTimeout(() => {
                element.style.transform = element.style.transform.replace(/translate\([^)]*\)/, '').replace(/rotate\([^)]*\)/, '');
            }, 1000);
        }, duration);
    }
}

// CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes techRipple {
        to {
            transform: scale(3);
            opacity: 0;
        }
    }
    
    @keyframes sparkle {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes techFloat {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        25% {
            transform: translateY(-5px) rotate(2deg);
        }
        50% {
            transform: translateY(-10px) rotate(-1deg);
        }
        75% {
            transform: translateY(-3px) rotate(1deg);
        }
    }
`;
document.head.appendChild(animationStyles);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnimationController();
});

// Additional utility functions
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

// Performance optimization for scroll events
const optimizedScrollHandler = debounce(() => {
    // Scroll-based animations go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);
