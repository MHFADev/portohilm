// Three.js 3D Background Scene
class ThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.objects = [];
        this.mouse = { x: 0, y: 0 };
        this.animationFrameId = null;
        this.isRunning = false;
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
        try {
            this.setupScene();
            this.setupCamera();
            this.setupRenderer();
            this.setupLights();
            this.createObjects();
            this.setupEventListeners();
            this.isRunning = true;
            this.animate();
        } catch (error) {
            console.warn('Three.js initialization failed, continuing without 3D elements:', error);
            this.cleanup();
        }
    }
    
    destroy() {
        this.isRunning = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        if (this.onResize) {
            window.removeEventListener('resize', this.onResize);
        }
        if (this.onMouseMoveHandler) {
            window.removeEventListener('mousemove', this.onMouseMoveHandler);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }

    cleanup() {
        const canvas = document.getElementById('three-canvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
    }

    setupScene() {
        this.scene = new THREE.Scene();
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.z = 2.5;
    }

    setupRenderer() {
        const canvas = document.getElementById('three-canvas');
        this.renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: !this.isMobile
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        const pixelRatio = this.isMobile ? 1 : Math.min(window.devicePixelRatio, 2);
        this.renderer.setPixelRatio(pixelRatio);
    }

    setupLights() {
        // Ambient light with cyan tint
        const ambientLight = new THREE.AmbientLight(0x06b6d4, 0.6);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0x22d3ee, 0.8);
        directionalLight.position.set(1, 1, 1);
        directionalLight.castShadow = !this.isMobile;
        this.scene.add(directionalLight);
        
        if (!this.isMobile) {
            // Point lights only on desktop - expensive on mobile
            const pointLight1 = new THREE.PointLight(0x06b6d4, 1.5, 100);
            pointLight1.position.set(5, 5, 5);
            this.scene.add(pointLight1);
            this.objects.push(pointLight1);
            
            const pointLight2 = new THREE.PointLight(0x0891b2, 1.2, 100);
            pointLight2.position.set(-5, -5, 5);
            this.scene.add(pointLight2);
            this.objects.push(pointLight2);
            
            const pointLight3 = new THREE.PointLight(0x22d3ee, 1, 100);
            pointLight3.position.set(0, 5, 3);
            this.scene.add(pointLight3);
            this.objects.push(pointLight3);
        }
    }

    createObjects() {
        // Create floating geometric shapes - reduced on mobile
        this.createFloatingShapes();
        this.createParticles();
        // Skip expensive objects on mobile
        if (!this.isMobile) {
            this.createWaveform();
            this.createYinYang3D();
        }
    }

    createFloatingShapes() {
        const allShapes = [
            { geometry: new THREE.BoxGeometry(1.5, 1.5, 1.5), position: [-3, 1.5, 0], color: 0x06b6d4 },
            { geometry: new THREE.SphereGeometry(1, 32, 32), position: [3, -0.5, 0.5], color: 0x0891b2 },
            { geometry: new THREE.ConeGeometry(0.8, 1.6, 8), position: [-2.5, -1.5, 0.2], color: 0x22d3ee },
            { geometry: new THREE.OctahedronGeometry(1.1), position: [2.5, 1, 0], color: 0x38bdf8 },
            { geometry: new THREE.TorusGeometry(0.7, 0.25, 16, 32), position: [0, 2.5, 0.3], color: 0x06b6d4 },
            { geometry: new THREE.TetrahedronGeometry(1), position: [-1.5, 0, 0.5], color: 0x0891b2 },
            { geometry: new THREE.IcosahedronGeometry(0.9), position: [1.5, -2, 0.2], color: 0x22d3ee },
            { geometry: new THREE.DodecahedronGeometry(0.8), position: [0, -0.5, 0.8], color: 0x38bdf8 },
            { geometry: new THREE.TorusKnotGeometry(0.6, 0.2, 64, 8), position: [-3.5, -0.5, 0.3], color: 0x06b6d4 },
            { geometry: new THREE.OctahedronGeometry(0.7), position: [3.5, 2, 0.5], color: 0x0891b2 }
        ];
        
        // Mobile: only use 3 simple shapes, Desktop: use all 10 shapes
        const shapes = this.isMobile ? allShapes.slice(0, 3) : allShapes;

        shapes.forEach((shape, index) => {
            const material = new THREE.MeshStandardMaterial({
                color: shape.color,
                opacity: 0.4,
                transparent: true,
                metalness: 0.6,
                roughness: 0.3,
                wireframe: true,
                emissive: shape.color,
                emissiveIntensity: 0.15
            });

            const mesh = new THREE.Mesh(shape.geometry, material);
            mesh.position.set(...shape.position);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            mesh.userData = { 
                originalPosition: [...shape.position],
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.04,
                    y: (Math.random() - 0.5) * 0.04,
                    z: (Math.random() - 0.5) * 0.04
                },
                floatSpeed: Math.random() * 0.02 + 0.01,
                floatOffset: index * Math.PI / 3,
                scalePhase: index * 0.5,
                baseColor: shape.color
            };
            
            this.scene.add(mesh);
            this.objects.push(mesh);
        });
    }

    createParticles() {
        const particleCount = this.isMobile ? 150 : (this.isLowEndDevice ? 800 : 1500);
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // Position - very close to camera for clarity
            positions[i3] = (Math.random() - 0.5) * 12;
            positions[i3 + 1] = (Math.random() - 0.5) * 12;
            positions[i3 + 2] = (Math.random() - 0.5) * 8 - 1;

            // Cyan gradient colors
            const cyanVariant = Math.random();
            colors[i3] = 0.0 + cyanVariant * 0.3;
            colors[i3 + 1] = 0.6 + cyanVariant * 0.3;
            colors[i3 + 2] = 0.8 + cyanVariant * 0.2;
            
            // Variable sizes
            sizes[i] = Math.random() * 0.12 + 0.06;
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        particles.userData = {
            isParticles: true,
            originalPositions: [...positions]
        };
        this.scene.add(particles);
        this.objects.push(particles);
    }

    createWaveform() {
        const waveGeometry = new THREE.PlaneGeometry(10, 10, 50, 50);
        const positions = waveGeometry.attributes.position.array;
        
        // Store original positions for wave animation
        waveGeometry.userData = { originalPositions: [...positions] };

        const isDark = document.documentElement.classList.contains('dark');
        const waveMaterial = new THREE.MeshLambertMaterial({
            color: isDark ? 0xffffff : 0x000000,
            opacity: 0.05,
            transparent: true,
            wireframe: true
        });

        const wave = new THREE.Mesh(waveGeometry, waveMaterial);
        wave.rotation.x = -Math.PI / 4;
        wave.position.z = -8;
        
        this.scene.add(wave);
        this.objects.push(wave);
    }

    createYinYang3D() {
        // Create main yin-yang circle
        const yinYangGroup = new THREE.Group();
        
        // Yin side (black)
        const yinGeometry = new THREE.CylinderGeometry(2, 2, 0.3, 32, 1, false, 0, Math.PI);
        const yinMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x000000,
            transparent: true,
            opacity: 0.8
        });
        const yinMesh = new THREE.Mesh(yinGeometry, yinMaterial);
        yinMesh.rotation.y = Math.PI;
        yinYangGroup.add(yinMesh);
        
        // Yang side (white)
        const yangGeometry = new THREE.CylinderGeometry(2, 2, 0.3, 32, 1, false, 0, Math.PI);
        const yangMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        const yangMesh = new THREE.Mesh(yangGeometry, yangMaterial);
        yinYangGroup.add(yangMesh);
        
        // Small yin circle (white dot on black side)
        const smallYinGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.31, 32);
        const smallYinMaterial = new THREE.MeshLambertMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.9
        });
        const smallYinMesh = new THREE.Mesh(smallYinGeometry, smallYinMaterial);
        smallYinMesh.position.set(-1, 0, 0);
        yinYangGroup.add(smallYinMesh);
        
        // Small yang circle (black dot on white side)
        const smallYangGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.31, 32);
        const smallYangMaterial = new THREE.MeshLambertMaterial({ 
            color: 0x000000,
            transparent: true,
            opacity: 0.9
        });
        const smallYangMesh = new THREE.Mesh(smallYangGeometry, smallYangMaterial);
        smallYangMesh.position.set(1, 0, 0);
        yinYangGroup.add(smallYangMesh);
        
        // Large yin semicircle (black on white side)
        const largeYinGeometry = new THREE.CylinderGeometry(1, 1, 0.31, 32, 1, false, 0, Math.PI);
        const largeYinMesh = new THREE.Mesh(largeYinGeometry, yinMaterial);
        largeYinMesh.position.set(1, 0, 0);
        largeYinMesh.rotation.y = Math.PI;
        yinYangGroup.add(largeYinMesh);
        
        // Large yang semicircle (white on black side)
        const largeYangGeometry = new THREE.CylinderGeometry(1, 1, 0.31, 32, 1, false, 0, Math.PI);
        const largeYangMesh = new THREE.Mesh(largeYangGeometry, yangMaterial);
        largeYangMesh.position.set(-1, 0, 0);
        yinYangGroup.add(largeYangMesh);
        
        // Position the yin-yang in the background
        yinYangGroup.position.set(0, 0, -10);
        yinYangGroup.rotation.x = Math.PI / 2;
        
        // Store reference for animation
        yinYangGroup.userData = {
            isYinYang: true,
            rotationSpeed: 0.005
        };
        
        this.scene.add(yinYangGroup);
        this.objects.push(yinYangGroup);
        
        // Create multiple smaller yin-yang symbols floating around
        for (let i = 0; i < 3; i++) {
            const smallYinYang = yinYangGroup.clone();
            smallYinYang.scale.setScalar(0.3);
            smallYinYang.position.set(
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                -15 + Math.random() * -5
            );
            smallYinYang.userData = {
                isYinYang: true,
                rotationSpeed: 0.01 + Math.random() * 0.02,
                floatSpeed: 0.002 + Math.random() * 0.005,
                floatOffset: i * Math.PI / 1.5,
                originalPosition: [...smallYinYang.position.toArray()]
            };
            
            this.scene.add(smallYinYang);
            this.objects.push(smallYinYang);
        }
    }

    setupEventListeners() {
        // Mouse movement
        this.onMouseMoveHandler = (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', this.onMouseMoveHandler);

        // Window resize
        this.onResize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', this.onResize);

        // Theme change
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle?.addEventListener('click', () => {
            setTimeout(() => {
                this.updateThemeColors();
            }, 100);
        });
    }

    updateThemeColors() {
        const isDark = document.documentElement.classList.contains('dark');
        
        this.objects.forEach(object => {
            // Skip yin-yang objects as they should maintain their black/white colors
            if (object.userData && object.userData.isYinYang) {
                return;
            }
            
            if (object.material) {
                if (object.material.color) {
                    object.material.color.setHex(isDark ? 0xffffff : 0x000000);
                }
                if (object.material.vertexColors && object.geometry.attributes.color) {
                    const colors = object.geometry.attributes.color.array;
                    const color = isDark ? 1 : 0;
                    
                    for (let i = 0; i < colors.length; i += 3) {
                        colors[i] = color;
                        colors[i + 1] = color;
                        colors[i + 2] = color;
                    }
                    object.geometry.attributes.color.needsUpdate = true;
                }
            }
        });
    }

    animate() {
        if (!this.isRunning) return;
        this.animationFrameId = requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;
        
        if (this.isMobile && this.frameCount % 2 !== 0) {
            this.frameCount = (this.frameCount || 0) + 1;
            this.renderer.render(this.scene, this.camera);
            return;
        }
        this.frameCount = (this.frameCount || 0) + 1;

        // Animate floating shapes
        this.objects.forEach((object, index) => {
            // Skip lights and objects without userData
            if (object.type === 'PointLight' || !object.userData) {
                return;
            }
            
            if (object.userData.rotationSpeed) {
                // Rotation
                object.rotation.x += object.userData.rotationSpeed.x;
                object.rotation.y += object.userData.rotationSpeed.y;
                object.rotation.z += object.userData.rotationSpeed.z;

                // Floating movement
                if (object.userData.originalPosition && Array.isArray(object.userData.originalPosition)) {
                    const floatY = Math.sin(time * object.userData.floatSpeed + object.userData.floatOffset) * 0.8;
                    const floatX = Math.cos(time * object.userData.floatSpeed * 0.5 + object.userData.floatOffset) * 0.3;
                    object.position.y = object.userData.originalPosition[1] + floatY;
                    object.position.x = object.userData.originalPosition[0] + floatX;
                }

                // Scale pulsing effect
                if (object.userData.scalePhase !== undefined) {
                    const scale = 1 + Math.sin(time * 0.5 + object.userData.scalePhase) * 0.15;
                    object.scale.set(scale, scale, scale);
                }

                // Mouse interaction - very responsive following cursor
                if (object.userData.originalPosition && Array.isArray(object.userData.originalPosition)) {
                    const mouseInfluence = 1.2;
                    const targetX = object.userData.originalPosition[0] + this.mouse.x * mouseInfluence;
                    const targetY = object.userData.originalPosition[1] - this.mouse.y * mouseInfluence;
                    object.position.x += (targetX - object.position.x) * 0.2;
                    object.position.y += (targetY - object.position.y) * 0.2;
                }
                object.rotation.y += this.mouse.x * 0.05;
                object.rotation.x += this.mouse.y * 0.05;
            }

            // Animate particles with wave effect
            if (object.type === 'Points' && object.userData && object.userData.isParticles) {
                object.rotation.y += 0.0008;
                object.rotation.x += 0.0004;
                
                const positions = object.geometry.attributes.position.array;
                const originalPositions = object.userData.originalPositions;
                
                for (let i = 0; i < positions.length; i += 3) {
                    const x = originalPositions[i];
                    const y = originalPositions[i + 1];
                    const z = originalPositions[i + 2];
                    
                    // Wave effect on particles
                    positions[i] = x + Math.sin(time * 0.5 + y * 0.3) * 0.2;
                    positions[i + 1] = y + Math.cos(time * 0.3 + x * 0.3) * 0.2;
                    positions[i + 2] = z + Math.sin(time * 0.4 + x * 0.2 + y * 0.2) * 0.1;
                }
                
                object.geometry.attributes.position.needsUpdate = true;
                
                // Mouse interaction on particles
                object.rotation.y += this.mouse.x * 0.005;
                object.rotation.x += this.mouse.y * 0.005;
            }

            // Animate wave
            if (object.geometry && object.geometry.userData && object.geometry.userData.originalPositions) {
                const positions = object.geometry.attributes.position.array;
                const originalPositions = object.geometry.userData.originalPositions;

                for (let i = 0; i < positions.length; i += 3) {
                    const x = originalPositions[i];
                    const y = originalPositions[i + 1];
                    
                    positions[i + 2] = Math.sin((x + time) * 0.5) * Math.cos((y + time) * 0.5) * 0.1;
                }
                
                object.geometry.attributes.position.needsUpdate = true;
            }
            
            // Animate yin-yang symbols
            if (object.userData && object.userData.isYinYang) {
                // Main rotation
                object.rotation.z += object.userData.rotationSpeed;
                
                // Floating movement for smaller yin-yangs
                if (object.userData.floatSpeed && object.userData.originalPosition && Array.isArray(object.userData.originalPosition)) {
                    const floatY = Math.sin(time * object.userData.floatSpeed + object.userData.floatOffset) * 2;
                    const floatX = Math.cos(time * object.userData.floatSpeed * 0.7 + object.userData.floatOffset) * 1;
                    
                    object.position.x = object.userData.originalPosition[0] + floatX;
                    object.position.y = object.userData.originalPosition[1] + floatY;
                    
                    // Additional rotation for smaller ones
                    object.rotation.x += 0.002;
                    object.rotation.y += 0.003;
                }
            }
        });

        // Camera movement based on mouse - disabled on mobile for performance
        if (!this.isMobile) {
            this.camera.position.x += (this.mouse.x * 1.5 - this.camera.position.x) * 0.15;
            this.camera.position.y += (-this.mouse.y * 1.5 - this.camera.position.y) * 0.15;
            this.camera.lookAt(this.scene.position);
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize Three.js scene when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if WebGL is supported
    if (window.THREE && window.WebGLRenderingContext) {
        try {
            new ThreeScene();
        } catch (error) {
            console.warn('Three.js scene could not be initialized:', error);
        }
    }
});
