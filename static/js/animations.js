/**
 * ═══════════════════════════════════════════════════════════════
 * ANIMATIONS.JS — portohilm portfolio  (v3 — Advanced & Calm)
 * 
 * System Overview:
 *  1. CINEMATIC INTRO          — 3D Camera Fly-through
 *  2. Hero Section Entrance    — Staggered, smooth reveal
 *  3. Scroll-Triggered Reveals — True fade in AND fade out
 *  4. Magnetic Cursor          — Smooth viscous tracking
 *  5. Card 3D Tilt             — Calm depth effect
 *  6. Scroll Physics           — Gentle skew on scroll
 *  7. Skill Bar Animations     — Smooth fill on scroll
 *  8. Typing Effect            — Smooth character animation
 *  9. SVG Tendril              — Organic cursor trail
 * 10. Scroll Progress Bar      — Smooth width update
 * ═══════════════════════════════════════════════════════════════
 */

/* ─── HELPERS ──────────────────────────────────────────────────
   lerp: Linear interpolation for smooth follow
   clamp: Clamp value between min and max
─────────────────────────────────────────────────────────────── */
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

/* ─── REDUCED MOTION CHECK ─────────────────────────────────── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ══════════════════════════════════════════════════════════════
   GSAP PLUGIN REGISTRATION
══════════════════════════════════════════════════════════════ */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/* ══════════════════════════════════════════════════════════════
   SYSTEM 1: CINEMATIC INTRO SEQUENCE
   Enhanced Tracking Shot, Parallax, and Zoom (Pro Film Style)
══════════════════════════════════════════════════════════════ */
function initCinematicIntro() {
    // Initial state: Hide everything before animation starts
    gsap.set('nav', { opacity: 0, y: -20 });
    gsap.set('.fade-in, .fade-in-up', { opacity: 0, visibility: 'hidden' });
    gsap.set('#home .glass-card', { opacity: 0, scale: 0.8, filter: 'blur(20px)' });

    const checkInterval = setInterval(() => {
        if (window.threeScene && window.threeScene.camera) {
            clearInterval(checkInterval);
            startCinematicSequence();
        }
    }, 100);

    setTimeout(() => {
        if (!window.introState || window.introState.isActive) {
            clearInterval(checkInterval);
            forceReveal();
        }
    }, 4000);
}

function startCinematicSequence() {
    if (prefersReducedMotion) {
        forceReveal();
        return;
    }

    const { camera, sphere, particles } = window.threeScene;
    
    // Cinematic Curve: Heavy momentum and professional ease
    const cinematicEase = "cubic-bezier(0.25, 1, 0.5, 1)"; 

    const masterTl = gsap.timeline({
        onComplete: () => {
            window.introState.isActive = false;
            document.body.classList.remove('overflow-hidden'); 
            initVirtualCamera(); 
        },
        defaults: { force3D: true, ease: "power4.inOut" }
    });

    document.body.classList.add('overflow-hidden');

    // ─── INITIAL CINEMATIC STATE (The "Wide Shot") ───
    gsap.set(camera.position, { x: -8, y: 3, z: 12 }); 
    gsap.set(camera.rotation, { x: -0.2, y: -0.5, z: 0 }); 
    
    gsap.set(sphere.scale, { x: 0.1, y: 0.1, z: 0.1 }); 
    gsap.set(sphere.rotation, { x: Math.PI, y: 0 });
    
    gsap.set(particles.scale, { x: 5, y: 5, z: 5 }); 
    gsap.set(particles.material, { opacity: 0 });

    // ─── MOVE 1: THE TRACKING SHOT (0s - 4.5s) ───
    // Camera slides diagonally while zooming in (Dolly + Pan)
    masterTl.to(camera.position, {
        x: 0,
        y: 0,
        z: 4.5, 
        duration: 4.5,
        ease: "power3.inOut"
    }, 0);

    masterTl.to(camera.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 4.5,
        ease: "power3.inOut"
    }, 0);

    // ─── MOVE 2: SPHERE & PARTICLE AWAKENING (0.5s - 3.5s) ───
    masterTl.to(sphere.scale, {
        x: 1, y: 1, z: 1,
        duration: 3.0,
        ease: "expo.out"
    }, 0.5);

    masterTl.to(sphere.rotation, {
        y: Math.PI * 6, 
        duration: 4.5,
        ease: "power2.inOut"
    }, 0);

    masterTl.to(particles.scale, {
        x: 1, y: 1, z: 1,
        duration: 4.0,
        ease: "power4.out"
    }, 0.2);

    masterTl.to(particles.material, {
        opacity: 0.4,
        duration: 2.5,
        ease: "power2.inOut"
    }, 1.0);

    // ─── MOVE 3: SYNCED UI ENTRANCE (Starts at 2s) ───
    // The UI elements "assemble" as the camera reaches its destination
    masterTl.add(() => {
        revealMainContentCinematic();
    }, 2.0); 

    // ─── MOVE 4: CAMERA BREATHE (Looping after intro) ───
    masterTl.add(() => {
        gsap.to(camera.position, {
            y: "+=0.15",
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
        gsap.to(camera.rotation, {
            z: "+=0.01",
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }, 4.5);
}

function revealMainContentCinematic() {
    if (prefersReducedMotion) {
        forceReveal();
        return;
    }

    document.body.classList.add('page-loaded');

    // Create a master UI timeline for better orchestration
    const uiTl = gsap.timeline({ 
        defaults: { 
            force3D: true, 
            ease: "expo.out" 
        } 
    });

    // 1. Navbar: Slide down with elegant fade
    uiTl.fromTo('nav', 
        { opacity: 0, y: -50, scaleY: 0.9, filter: 'blur(10px)' },
        { opacity: 1, y: 0, scaleY: 1, filter: 'blur(0px)', duration: 1.5 }, 
        0
    );

    // 2. Background Elements (Orbs)
    const backgroundOrbs = document.querySelectorAll('#home .absolute[class*="blur"]');
    uiTl.fromTo(backgroundOrbs,
        { opacity: 0, scale: 0.4, y: 150, filter: 'blur(30px)' },
        { opacity: 0.2, scale: 1, y: 0, filter: 'blur(120px)', duration: 2.5, stagger: 0.3 },
        0.2
    );

    // 3. Hero Card: Ultra-smooth "Bloom"
    uiTl.fromTo('#home .glass-card', 
        { 
            opacity: 0, 
            scale: 0.8, 
            rotationX: -15, 
            y: 100,
            transformPerspective: 2000,
            filter: 'blur(30px)' 
        },
        { 
            opacity: 1, 
            scale: 1, 
            rotationX: 0, 
            y: 0,
            filter: 'blur(0px)',
            duration: 2.2, 
            ease: "expo.out" 
        },
        0.4
    );

    // 4. Badge: Soft pop
    uiTl.fromTo('#home .fade-in:first-child', 
        { opacity: 0, scale: 0.5, y: 30, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: "back.out(1.5)" },
        0.8
    );

    // 5. Main Heading: High-end 3D "Assembly"
    uiTl.fromTo('#home h1.fade-in-up', 
        { 
            opacity: 0, 
            y: 80, 
            rotationX: 60, 
            skewY: 5,
            scale: 0.85,
            filter: 'blur(20px)',
            transformOrigin: "top center"
        },
        { 
            opacity: 1, 
            y: 0, 
            rotationX: 0, 
            skewY: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 2,
            ease: "expo.out"
        },
        0.9
    );

    // 6. Typing Text Container
    uiTl.fromTo('#home div.fade-in-up:nth-of-type(2)', 
        { opacity: 0, x: -60, scaleX: 0.5, filter: 'blur(10px)' },
        { opacity: 1, x: 0, scaleX: 1, filter: 'blur(0px)', duration: 1.5 },
        1.2
    );

    // 7. Description Paragraph
    uiTl.fromTo('#home p.fade-in-up', 
        { opacity: 0, y: 40, filter: 'blur(15px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.8 },
        1.4
    );

    // 8. CTA Buttons: Staggered "Glide"
    const ctaButtons = document.querySelectorAll('#home .fade-in-up:last-child a, #home .flex.gap-6 a');
    uiTl.fromTo(ctaButtons, 
        { opacity: 0, y: 30, scale: 0.9, rotation: -3, filter: 'blur(10px)' },
        { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            rotation: 0, 
            filter: 'blur(0px)',
            duration: 1.2, 
            stagger: 0.2,
            ease: "power4.out" 
        },
        1.6
    );

    // 9. Scroll Indicator
    uiTl.fromTo('.absolute.bottom-10', 
        { opacity: 0, y: -30 },
        { opacity: 0.7, y: 0, duration: 1.5, ease: "bounce.out" },
        2.2
    );

    // Initialize systems
    setTimeout(() => {
        initScrollReveal();
        initSkillBars();
        initTypingEffect();
    }, 2000);
}

function forceReveal() {
    if (window.introState) window.introState.isActive = false;
    document.body.classList.remove('overflow-hidden');
    document.body.classList.add('page-loaded');
    
    if (window.threeScene && window.threeScene.camera) {
        window.threeScene.camera.position.set(0, 0, 4.5);
        window.threeScene.camera.rotation.set(0, 0, 0);
        
        // Add subtle breathe even in forceReveal
        gsap.to(window.threeScene.camera.position, {
            y: "+=0.15",
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
    
    gsap.set('nav', { opacity: 1, y: 0 });
    gsap.set('#home .glass-card', { opacity: 1, scale: 1, filter: 'blur(0px)' });
    gsap.set('.fade-in, .fade-in-up', { opacity: 1, y: 0, scale: 1, visibility: 'visible' });
    
    initScrollReveal();
    initSkillBars();
    initTypingEffect();
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 3: CINEMATIC SCROLL-TRIGGERED REVEALS (FADE IN & OUT)
   Every section element animates in when entering viewport
   and reverses when leaving — true fade out on scroll back.
   Updated with Parallax Layers for depth.
══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    const yOffset = isMobile ? 30 : 55;

    // Optimized ScrollTrigger defaults
    ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true
    });

    // ── Section titles ──────────────────────────────────────
    gsap.utils.toArray('.section-title, [class*="text-center"] h2').forEach(el => {
        gsap.fromTo(el,
            { y: yOffset * 0.8, opacity: 0, filter: 'blur(5px)', scale: 0.98 },
            {
                y: 0, opacity: 1, filter: 'blur(0px)', scale: 1,
                duration: 1.2, ease: 'expo.out',
                clearProps: 'filter',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 92%',
                    end: 'bottom 8%',
                    toggleActions: 'play reverse play reverse',
                    fastScrollEnd: true,
                    scrub: false // Ensure no scrub on entrance for better FPS
                }
            }
        );
    });

    // ── Glass cards (main content cards) - Cinematic Parallax ────────────────────
    gsap.utils.toArray('.glass-card').forEach((card, i) => {
        // Skip hero card — already animated by hero entrance
        if (card.closest('#home')) return;

        // Reveal Animation
        gsap.fromTo(card,
            { y: 60, opacity: 0, scale: 0.98, rotationX: 10 },
            {
                y: 0, opacity: 1, scale: 1, rotationX: 0,
                duration: 1.2,
                ease: 'expo.out',
                force3D: true,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 88%',
                    end: 'bottom 12%',
                    toggleActions: 'play reverse play reverse',
                    fastScrollEnd: true
                }
            }
        );

        // Parallax Scroll Effect - Optimized with lower intensity
        if (!isMobile) {
            gsap.to(card, {
                y: -15, // Reduced from -30 for better performance
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.5 // Smoothed scrub
                }
            });
        }
    });

    // ── Tech icon items (stagger in grid) ─────────────────────
    const techGrids = document.querySelectorAll(
        '#skills .grid.grid-cols-3, #ai-tools .grid'
    );
    techGrids.forEach(grid => {
        const items = grid.querySelectorAll('.group, div[class*="flex flex-col items-center"]');
        if (!items.length) return;

        gsap.fromTo(items,
            { y: 40, opacity: 0, scale: 0.8, rotation: 5 },
            {
                y: 0, opacity: 1, scale: 1, rotation: 0,
                duration: 0.6,
                ease: 'back.out(1.2)',
                stagger: { amount: 0.5, from: 'random' }, // Random stagger for organic feel
                scrollTrigger: {
                    trigger: grid,
                    start: 'top 85%',
                    end: 'bottom 10%',
                    toggleActions: 'play reverse play reverse'
                }
            }
        );
    });

    // ── Timeline items (experience section) ──────────────────
    gsap.utils.toArray('.timeline-container > .relative').forEach((item, i) => {
        gsap.fromTo(item,
            { x: -30, opacity: 0, filter: "blur(4px)" },
            {
                x: 0, opacity: 1, filter: "blur(0px)",
                duration: 0.8,
                ease: 'power3.out',
                delay: i * 0.1,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play reverse play reverse'
                }
            }
        );

        // Timeline dot pulse
        const dot = item.querySelector('.absolute.left-\\[29px\\], .absolute.rounded-full');
        if (dot) {
            gsap.fromTo(dot,
                { scale: 0, opacity: 0 },
                {
                    scale: 1, opacity: 1,
                    duration: 0.4, ease: 'back.out(2)',
                    delay: i * 0.12 + 0.3,
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 88%',
                        toggleActions: 'play reverse play reverse'
                    }
                }
            );
        }
    });

    // ── Stats / info blocks ───────────────────────────────────
    gsap.utils.toArray('[class*="grid grid-cols-2"] > div').forEach((el, i) => {
        if (el.closest('#home')) return;
        gsap.fromTo(el,
            { y: 30, opacity: 0, scale: 0.95 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 0.5, ease: 'back.out(1.2)',
                delay: i * 0.06,
                scrollTrigger: {
                    trigger: el.parentElement,
                    start: 'top 88%',
                    toggleActions: 'play reverse play reverse'
                }
            }
        );
    });

    // ── AI category sections ──────────────────────────────────
    gsap.utils.toArray('.ai-category').forEach((cat, i) => {
        gsap.fromTo(cat,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.7, ease: 'power3.out',
                scrollTrigger: {
                    trigger: cat,
                    start: 'top 88%',
                    end: 'bottom 10%',
                    toggleActions: 'play reverse play reverse'
                }
            }
        );
    });

    // ── Project section description texts ─────────────────────
    gsap.utils.toArray('#about p, #contact p, .space-y-6 p').forEach(el => {
        gsap.fromTo(el,
            { y: 20, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.6, ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play reverse play reverse'
                }
            }
        );
    });
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 4: MAGNETIC CURSOR (Smooth Viscous Tracking)
══════════════════════════════════════════════════════════════ */
function initMagneticCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.cursor-dot');

    if (!cursor || !cursorDot || window.innerWidth <= 768) return;

    let curX = 0, curY = 0;
    let dotX = 0, dotY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', e => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function animateCursor() {
        // Cursor ring — slightly lagged (viscous)
        curX = lerp(curX, targetX, 0.15);
        curY = lerp(curY, targetY, 0.15);

        // Dot — snappy
        dotX = lerp(dotX, targetX, 0.45);
        dotY = lerp(dotY, targetY, 0.45);

        gsap.set(cursor, { x: curX - 10, y: curY - 10, force3D: true });
        gsap.set(cursorDot, { x: dotX - 2, y: dotY - 2, force3D: true });
    }
    gsap.ticker.add(animateCursor);

    // ── Cursor state on hover ────────────────────────────────
    const interactiveEls = document.querySelectorAll('a, button, .glass-card');
    interactiveEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                scale: 2.2,
                backgroundColor: 'rgba(0,243,255,0.15)',
                borderColor: 'rgba(0,243,255,0.8)',
                duration: 0.3, ease: 'power2.out'
            });
            gsap.to(cursorDot, { scale: 0.4, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: 'rgba(0,243,255,0.6)',
                duration: 0.4, ease: 'elastic.out(1, 0.6)'
            });
            gsap.to(cursorDot, { scale: 1, duration: 0.3 });
        });
    });
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 5: MAGNETIC ELEMENT SHIFT (Subtle)
   Elements subtly lean toward cursor when nearby
══════════════════════════════════════════════════════════════ */
function initMagneticElements() {
    if (window.innerWidth <= 768 || prefersReducedMotion) return;

    const elements = document.querySelectorAll('.btn-neon, .btn-primary, nav a');

    elements.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;

            gsap.to(el, {
                x: dx * 0.35,
                y: dy * 0.35,
                duration: 0.6,
                ease: 'power3.out',
                force3D: true
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0, y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 6: CARD 3D TILT (Calm & Smooth)
══════════════════════════════════════════════════════════════ */
function initCardTilt() {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                z: 20,
                transformPerspective: 1000,
                duration: 0.3, ease: 'power2.out'
            });
        });

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -15; // -7.5° to 7.5°
            const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 15;

            gsap.to(card, {
                rotationX: rx,
                rotationY: ry,
                transformPerspective: 1200,
                duration: 0.5,
                ease: 'power3.out',
                force3D: true
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                z: 0,
                duration: 0.65,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 6: SCROLL PHYSICS (Gentle Skew)
   Adds subtle momentum-based skew effect during scroll.
   Optimized to reduce glitch/jank on heavy pages.
══════════════════════════════════════════════════════════════ */
function initScrollPhysics() {
    if (prefersReducedMotion || window.innerWidth < 768) return;

    let velocity = 0;
    let lastScrollY = window.scrollY;

    gsap.ticker.add(() => {
        const currentScrollY = window.scrollY;
        const delta = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;

        // Smooth velocity with damping
        velocity += (delta - velocity) * 0.15;

        // Clamp velocity to prevent extreme distortion
        const skew = clamp(velocity * 0.1, -2, 2);
        const scale = clamp(1 + Math.abs(velocity) * 0.001, 1, 1.02);

        // Apply to section containers only, not body (improves perf)
        // Using force3D: true for GPU acceleration
        gsap.set('main section', {
            skewY: skew,
            scaleY: scale,
            force3D: true,
            overwrite: 'auto'
        });
    });
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 15: VIRTUAL CAMERA MOVEMENT (CINEMATIC SCROLL)
   Moves the Three.js camera based on scroll position to create
   a continuous 3D journey through the website.
══════════════════════════════════════════════════════════════ */
function initVirtualCamera() {
    if (!window.threeScene || !window.threeScene.camera || prefersReducedMotion) return;

    const { camera, sphere, particles } = window.threeScene;

    // ScrollTrigger to drive camera Z-position and rotation
    // This creates the effect of "flying through" the content
    gsap.to(camera.position, {
        z: 8.0, // Move further back as we scroll down
        y: -2.0, // Slight dip
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5 // Smooth catch-up
        }
    });

    // Rotate sphere based on scroll
    gsap.to(sphere.rotation, {
        x: Math.PI * 0.5,
        y: Math.PI * 4, // Multiple spins
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });

    // Parallax particles (move faster than camera for depth)
    gsap.to(particles.rotation, {
        y: Math.PI * 2,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 2
        }
    });
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 8: SKILL BAR ANIMATIONS
══════════════════════════════════════════════════════════════ */
function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar[data-skill]');

    bars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-skill') + '%';
        bar.style.width = '0%';

        ScrollTrigger.create({
            trigger: bar,
            start: 'top 88%',
            once: true,
            onEnter: () => {
                gsap.to(bar, {
                    width: targetWidth,
                    duration: 1.6,
                    ease: 'power2.out',
                    delay: 0.1
                });
            }
        });
    });
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 9: TYPING EFFECT
══════════════════════════════════════════════════════════════ */
function initTypingEffect() {
    const el = document.getElementById('typing-text');
    if (!el) return;

    const phrases = [
        'Network Engineer',
        'Full Stack Developer',
        'Creative Developer',
        'Creative Problem Solver'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const phrase = phrases[phraseIndex];

        if (isDeleting) {
            el.textContent = phrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = phrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 45 : 95;

        if (!isDeleting && charIndex === phrase.length) {
            isDeleting = true;
            speed = 2200;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    setTimeout(type, 1400); // Start after hero entrance completes
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 10: SVG TENDRIL (Organic cursor trail)
══════════════════════════════════════════════════════════════ */
function initTendril() {
    if (window.innerWidth <= 768 || prefersReducedMotion) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;mix-blend-mode:screen;';
    document.body.appendChild(svg);

    // Glow filter
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    defs.innerHTML = `
        <filter id="tendril-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>`;
    svg.appendChild(defs);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('stroke', '#00f3ff');
    path.setAttribute('fill', 'none');
    path.setAttribute('filter', 'url(#tendril-glow)');
    path.style.opacity = '0';
    svg.appendChild(path);

    let activeTarget = null;

    document.querySelectorAll('a, button, .glass-card').forEach(el => {
        el.addEventListener('mouseenter', () => activeTarget = el);
        el.addEventListener('mouseleave', () => {
            activeTarget = null;
            gsap.to(path, { opacity: 0, duration: 0.25 });
        });
    });

    document.addEventListener('mousemove', e => {
        if (!activeTarget) return;

        const rect = activeTarget.getBoundingClientRect();
        const sx = rect.left + rect.width / 2;
        const sy = rect.top + rect.height / 2;
        const ex = e.clientX;
        const ey = e.clientY;
        const dist = Math.hypot(ex - sx, ey - sy);

        if (dist < 140) {
            const cp1x = sx + (ex - sx) * 0.2;
            const cp1y = sy + (ey - sy) * 0.8;
            path.setAttribute('d', `M${sx},${sy} Q${cp1x},${cp1y} ${ex},${ey}`);
            path.setAttribute('stroke-width', Math.max(0.5, (1 - dist / 140) * 6));
            gsap.to(path, { opacity: 0.6, duration: 0.08 });
        } else {
            gsap.to(path, { opacity: 0, duration: 0.2 });
        }
    });
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 11: SCROLL PROGRESS BAR (UI)
══════════════════════════════════════════════════════════════ */
function initScrollProgressBar() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const pct = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
        bar.style.width = pct + '%';
    }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 12: MOBILE MENU (Smooth toggle)
══════════════════════════════════════════════════════════════ */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    let open = false;

    btn.addEventListener('click', () => {
        open = !open;
        if (open) {
            menu.classList.remove('hidden');
            gsap.fromTo(menu,
                { opacity: 0, y: -12, height: 0 },
                { opacity: 1, y: 0, height: 'auto', duration: 0.35, ease: 'power2.out' }
            );
            btn.querySelector('i')?.classList.replace('fa-bars', 'fa-times');
        } else {
            gsap.to(menu, {
                opacity: 0, y: -8, height: 0,
                duration: 0.25, ease: 'power2.in',
                onComplete: () => menu.classList.add('hidden')
            });
            btn.querySelector('i')?.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close on nav link click
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            open = false;
            gsap.to(menu, {
                opacity: 0, y: -8, height: 0,
                duration: 0.2, ease: 'power2.in',
                onComplete: () => menu.classList.add('hidden')
            });
            btn.querySelector('i')?.classList.replace('fa-times', 'fa-bars');
        });
    });
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 13: NAVBAR SCROLL BEHAVIOR
   Shrink + shadow when user scrolls down
══════════════════════════════════════════════════════════════ */
function initNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const current = window.scrollY;
        const scrolled = current > 60;

        nav.style.boxShadow = scrolled
            ? '0 4px 30px rgba(0,0,0,0.4), 0 0 1px rgba(0,243,255,0.1)'
            : '';

        // Subtle hide on scroll down, reappear on scroll up
        if (current > lastScroll + 8 && current > 200) {
            gsap.to(nav, { y: -100, duration: 0.35, ease: 'power3.in' });
        } else if (current < lastScroll - 4) {
            gsap.to(nav, { y: 0, duration: 0.45, ease: 'power3.out' });
        }

        lastScroll = current;
    }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   SYSTEM 14: PARALLAX (Hero background orbs)
══════════════════════════════════════════════════════════════ */
function initParallax() {
    if (prefersReducedMotion) return;

    const orbs = document.querySelectorAll('#home .absolute[class*="blur"]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        orbs.forEach((orb, i) => {
            const speed = 0.15 + i * 0.08;
            gsap.set(orb, { y: scrollY * speed });
        });
    }, { passive: true });
}

/* ══════════════════════════════════════════════════════════════
   BOOT: Initialize everything
══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states
    gsap.set('nav', { opacity: 0, y: -10 });

    // Start CINEMATIC INTRO (replaces skeleton load)
    initCinematicIntro();
    initVirtualCamera(); // Bind camera to scroll

    // Cursor (doesn't need to wait)
    initMagneticCursor();
    initTendril();

    // UI
    initScrollProgressBar();
    initMobileMenu();
    initNavbar();
    initMagneticElements();
    initCardTilt();
    initScrollPhysics();
    initParallax();
});
