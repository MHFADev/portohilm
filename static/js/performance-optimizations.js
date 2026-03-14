// Performance Optimizations for All Devices

// Global observers - created once and reused
let lazyImageObserver = null;
let revealObserver = null;
let animationObserver = null;

// Performance metrics
const performanceMetrics = {
    deviceMemory: navigator.deviceMemory || 4,
    hardwareConcurrency: navigator.hardwareConcurrency || 4,
    connectionType: null,
    fps: 60,
    isLowEnd: false
};

// Measure device performance
function measureDevicePerformance() {
    // Check hardware capabilities
    const memoryLimited = performanceMetrics.deviceMemory < 4;
    const cpuLimited = performanceMetrics.hardwareConcurrency <= 4;
    
    // Check for mobile devices
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Check network connection
    if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            performanceMetrics.connectionType = connection.effectiveType;
        }
    }
    
    // Determine if device is low-end based on multiple factors
    performanceMetrics.isLowEnd = (memoryLimited && cpuLimited) || isMobile;
    
    // Measure actual FPS
    let lastTime = performance.now();
    let frames = 0;
    
    function measureFPS() {
        frames++;
        const currentTime = performance.now();
        if (currentTime >= lastTime + 1000) {
            performanceMetrics.fps = Math.round((frames * 1000) / (currentTime - lastTime));
            frames = 0;
            lastTime = currentTime;
        }
        if (frames < 60) {
            requestAnimationFrame(measureFPS);
        }
    }
    
    requestAnimationFrame(measureFPS);
}

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if (images.length === 0) return;
    
    // Create observer only once
    if (!lazyImageObserver) {
        lazyImageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
    }
    
    images.forEach(img => lazyImageObserver.observe(img));
}

// Optimize animations based on device capabilities and user preferences
function optimizeAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        document.documentElement.style.setProperty('--animation-duration', '0.01s');
        document.body.classList.add('reduced-motion');
        return;
    }
    
    // Only reduce animations if device is actually struggling
    if (performanceMetrics.isLowEnd) {
        // Reduce animation complexity gracefully
        document.body.classList.add('low-performance-mode');
        
        // Disable only the most expensive animations
        const heavyAnimations = document.querySelectorAll('.animate-rotate-3d, .animate-morph');
        heavyAnimations.forEach(el => {
            el.style.animation = 'none';
        });
    }
}

// Debounce function for performance
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll performance
function optimizeScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    const throttleDelay = isMobile ? 100 : 50; // Reduced delay for smoother feel
    
    // Using requestAnimationFrame for scroll-based UI updates
    let ticking = false;
    
    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        // Hide/show navbar on scroll with smooth transitions
        if (currentScroll > lastScroll && currentScroll > 150) {
            navbar.style.transform = 'translateY(-100%)';
            navbar.style.opacity = '0';
        } else {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
    
    // Setup reveal on scroll ONCE - not on every scroll event
    setupRevealOnScroll();
}

// Create reveal observer once and reuse it
function setupRevealOnScroll() {
    const elements = document.querySelectorAll('.animate-fade-in-up, .animate-slide-in, .animate-scale-in');
    
    if (elements.length === 0) return;
    
    // Create observer only once
    if (!revealObserver) {
        revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }
    
    elements.forEach(el => revealObserver.observe(el));
}

// Optimize Three.js canvas based on device performance metrics
function optimizeThreeJS() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;
    
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    // More aggressive optimization for mobile
    if (isMobile) {
        console.log('📱 Mobile device detected - optimizing Three.js aggressively');
        
        window.THREEJS_PERFORMANCE_MODE = {
            reduceParticles: true,
            particleCount: 150,
            reduceShapes: true,
            maxShapes: 3,
            disableComplexAnimations: true,
            lowerPixelRatio: true,
            pixelRatio: 1,
            isMobile: true
        };
        
        window.dispatchEvent(new CustomEvent('threejs-optimize', {
            detail: window.THREEJS_PERFORMANCE_MODE
        }));
    } else {
        const shouldOptimize = performanceMetrics.isLowEnd || performanceMetrics.fps < 30;
        
        if (shouldOptimize) {
            console.log('📊 Optimizing Three.js for device performance');
            
            window.THREEJS_PERFORMANCE_MODE = {
                reduceParticles: true,
                particleCount: 800,
                reduceShapes: performanceMetrics.isLowEnd,
                maxShapes: 6,
                disableComplexAnimations: performanceMetrics.fps < 20,
                lowerPixelRatio: true,
                pixelRatio: 1
            };
            
            window.dispatchEvent(new CustomEvent('threejs-optimize', {
                detail: window.THREEJS_PERFORMANCE_MODE
            }));
        } else {
            console.log('✨ Full quality Three.js rendering enabled');
        }
    }
}

// Preload critical resources
function preloadCriticalResources() {
    // Preload fonts
    const fontPreloads = [
        'https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;500;600;700&display=swap'
    ];
    
    fontPreloads.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Service Worker for caching (Progressive Web App)
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    }
}

// Optimize images based on viewport
function optimizeImages() {
    const images = document.querySelectorAll('img:not([data-src])');
    
    images.forEach(img => {
        // Add loading="lazy" for native lazy loading
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add decoding="async" for better performance
        if (!img.hasAttribute('decoding')) {
            img.setAttribute('decoding', 'async');
        }
    });
}

// Clean up unused animations - create observer once
function cleanupAnimations() {
    const animatedElements = document.querySelectorAll('[class*="animate-"]');
    
    if (animatedElements.length === 0) return;
    
    // Create observer only once
    if (!animationObserver) {
        animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    // Pause animations when not visible
                    entry.target.style.animationPlayState = 'paused';
                } else {
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, {
            rootMargin: '100px'
        });
    }
    
    animatedElements.forEach(el => animationObserver.observe(el));
}

// Network-aware loading
function networkAwareLoading() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    if ('connection' in navigator) {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection) {
            // More aggressive on mobile with slow connections
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                document.body.classList.add('slow-connection');
                console.log('🐌 Slow connection detected, reducing complexity');
                
                if (isMobile) {
                    const threeCanvas = document.getElementById('three-canvas');
                    if (threeCanvas) {
                        threeCanvas.style.display = 'none';
                    }
                } else {
                    window.THREEJS_PERFORMANCE_MODE = {
                        ...window.THREEJS_PERFORMANCE_MODE,
                        particleCount: 500,
                        maxShapes: 3
                    };
                }
            } else if (connection.effectiveType === '3g' && isMobile) {
                window.THREEJS_PERFORMANCE_MODE = {
                    ...window.THREEJS_PERFORMANCE_MODE,
                    particleCount: 100,
                    maxShapes: 2
                };
            }
        }
    }
}

// Memory management
function optimizeMemory() {
    // Clear unused cached data periodically
    setInterval(() => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(() => {
                // Clean up any unused resources
                const unusedElements = document.querySelectorAll('[data-cleanup="true"]');
                unusedElements.forEach(el => el.remove());
                
                // Trigger garbage collection hints if possible
                if (window.gc) window.gc();
            });
        }
    }, 60000); // Every minute
}

// Global throttle for high-frequency events
const highFreqThrottle = (callback, delay = 16) => {
    let lastCall = 0;
    return (...args) => {
        const now = performance.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            requestAnimationFrame(() => callback(...args));
        }
    };
};

// Request Animation Frame wrapper for smooth animations
function smoothAnimation(callback) {
    let ticking = false;
    
    return function() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                callback.apply(this, arguments);
                ticking = false;
            });
            ticking = true;
        }
    };
}

// Critical CSS loading
function loadCriticalCSS() {
    const criticalStyles = document.querySelectorAll('link[rel="stylesheet"]');
    
    criticalStyles.forEach(link => {
        // Load non-critical CSS asynchronously
        if (!link.hasAttribute('data-critical')) {
            link.setAttribute('media', 'print');
            link.onload = function() {
                this.media = 'all';
            };
        }
    });
}

// Initialize all optimizations
function initPerformanceOptimizations() {
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runOptimizations);
    } else {
        runOptimizations();
    }
}

function runOptimizations() {
    console.log('🚀 Initializing performance optimizations...');
    
    // Measure device performance first
    measureDevicePerformance();
    
    // Wait a bit for FPS measurement before optimizing
    setTimeout(() => {
        console.log('📊 Performance Metrics:', performanceMetrics);
        
        // Core optimizations
        setupLazyLoading();
        optimizeAnimations();
        optimizeImages();
        optimizeScroll();
        optimizeThreeJS();
        
        // Advanced optimizations
        cleanupAnimations();
        networkAwareLoading();
        optimizeMemory();
        
        // PWA features
        // registerServiceWorker(); // Uncomment when you have a service worker
        
        console.log('✅ Performance optimizations loaded!');
    }, 1000); // Wait 1 second for FPS measurement
}

// Initialize
initPerformanceOptimizations();

// Export for use in other scripts
window.performanceUtils = {
    debounce,
    throttle,
    smoothAnimation,
    performanceMetrics
};
