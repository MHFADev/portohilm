document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    // --- STATE MANAGEMENT ---
    window.introState = {
        isActive: true,
        assetsLoaded: false,
        isFinished: false
    };

    // --- SETUP ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Initial Camera Position (Cinematic Extreme Close-up inside particle cloud)
    camera.position.set(0, 0, 0.5); 
    camera.rotation.z = Math.PI * 0.1; // Slight Dutch angle

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // --- NOISE FUNCTIONS (GLSL) ---
    const noiseGLSL = `
        // Simplex 3D Noise 
        // by Ian McEwan, Ashima Arts
        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

        float snoise(vec3 v){ 
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

            // First corner
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 = v - i + dot(i, C.xxx) ;

            // Other corners
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );

            //  x0 = x0 - 0.0 + 0.0 * C 
            vec3 x1 = x0 - i1 + 1.0 * C.xxx;
            vec3 x2 = x0 - i2 + 2.0 * C.xxx;
            vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

            // Permutations
            i = mod(i, 289.0 ); 
            vec4 p = permute( permute( permute( 
                        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0 )) 
                    + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

            // Gradients
            // ( N=0.1.2.3 )
            float n_ = 1.0/7.0; // N=7
            vec3  ns = n_ * D.wyz - D.xzx;

            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,N*N)

            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)

            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);

            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );

            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));

            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;

            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);

            //Normalise gradients
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;

            // Mix final noise value
            vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), 
                                        dot(p2,x2), dot(p3,x3) ) );
        }

        // Curl Noise for more fluid-like motion
        vec3 snoiseVec3( vec3 x ){
            float s  = snoise(vec3( x ));
            float s1 = snoise(vec3( x.y - 19.1 , x.z + 33.4 , x.x + 47.2 ));
            float s2 = snoise(vec3( x.z + 74.2 , x.x - 124.5 , x.y + 99.4 ));
            return vec3( s , s1 , s2 );
        }

        vec3 curlNoise( vec3 p ){
            const float e = .1;
            vec3 dx = vec3( e   , 0.0 , 0.0 );
            vec3 dy = vec3( 0.0 , e   , 0.0 );
            vec3 dz = vec3( 0.0 , 0.0 , e   );

            vec3 p_x0 = snoiseVec3( p - dx );
            vec3 p_x1 = snoiseVec3( p + dx );
            vec3 p_y0 = snoiseVec3( p - dy );
            vec3 p_y1 = snoiseVec3( p + dy );
            vec3 p_z0 = snoiseVec3( p - dz );
            vec3 p_z1 = snoiseVec3( p + dz );

            float x = p_y1.z - p_y0.z - p_z1.y + p_z0.y;
            float y = p_z1.x - p_z0.x - p_x1.z + p_x0.z;
            float z = p_x1.y - p_x0.y - p_y1.x + p_y0.x;

            const float divisor = 1.0 / ( 2.0 * e );
            return normalize( vec3( x , y , z ) * divisor );
        }
    `;

    // --- LIQUID BALL SHADER ---
    const vertexShader = `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uHover;
        
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;

        ${noiseGLSL}

        void main() {
            vUv = uv;
            vec3 p = position;
            float t = uTime * 0.4;
            vec3 noisePos = p * 1.5 + vec3(t);
            vec3 displacement = curlNoise(noisePos) * 0.4;
            float detail = snoise(p * 4.0 + t * 2.0) * 0.1;
            
            // Mouse Interaction (Projected roughly)
            vec3 mousePoint = vec3(uMouse.x * 5.0, uMouse.y * 5.0, 2.0); 
            float dist = distance(p, mousePoint);
            float attraction = smoothstep(3.0, 0.0, dist) * uHover;
            vec3 dirToMouse = normalize(mousePoint - p);
            
            vec3 newPos = p + (normal * (displacement.x + detail) * 0.5);
            newPos += dirToMouse * attraction * 0.8;
            
            vDisplacement = displacement.x + detail;
            vNormal = normalize(normalMatrix * normal);
            vPosition = (modelViewMatrix * vec4(newPos, 1.0)).xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;

        void main() {
            vec3 viewDir = normalize(-vPosition);
            vec3 normal = normalize(vNormal);
            float fresnel = clamp(1.0 - dot(viewDir, normal), 0.0, 1.0);
            float rim = pow(fresnel, 2.5);

            vec3 deepNavy = vec3(0.01, 0.05, 0.2);
            vec3 neonBlue = vec3(0.0, 0.95, 1.0);
            vec3 neonPurple = vec3(0.74, 0.07, 1.0);
            
            float glow = smoothstep(-0.2, 0.5, vDisplacement);
            vec3 col = mix(deepNavy, neonPurple, glow * 0.5);
            col = mix(col, neonBlue, rim);
            
            float specular = pow(max(0.0, dot(normal, normalize(vec3(1.0, 1.0, 1.0)))), 30.0);
            col += vec3(1.0) * specular * 0.8;

            gl_FragColor = vec4(col, 0.8 + rim * 0.2);
        }
    `;

    // --- MESH CREATION ---
    const geometry = new THREE.IcosahedronGeometry(1.5, 60);
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uHover: { value: 0 }
        },
        transparent: true
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

    // --- FLOATING GEOMETRY (3D Elements) ---
    const floatingGroup = new THREE.Group();
    scene.add(floatingGroup);

    const geometries = [
        new THREE.TetrahedronGeometry(0.5, 0),
        new THREE.BoxGeometry(0.4, 0.4, 0.4),
        new THREE.TorusGeometry(0.3, 0.1, 16, 32),
        new THREE.OctahedronGeometry(0.4, 0)
    ];

    const shapes = [];
    const shapeCount = isMobile ? 4 : 12; // Fewer shapes on mobile
    for (let i = 0; i < shapeCount; i++) {
        const geom = geometries[Math.floor(Math.random() * geometries.length)];
        
        // Use simpler material on mobile
        const mat = isMobile ? new THREE.MeshBasicMaterial({
            color: i % 2 === 0 ? 0x00f3ff : 0xbc13fe,
            transparent: true,
            opacity: 0.4
        }) : new THREE.MeshPhongMaterial({
            color: i % 2 === 0 ? 0x00f3ff : 0xbc13fe,
            transparent: true,
            opacity: 0.6,
            shininess: 100,
            emissive: i % 2 === 0 ? 0x00f3ff : 0xbc13fe,
            emissiveIntensity: 0.2
        });
        
        const mesh = new THREE.Mesh(geom, mat);
        
        // Random position in 3D space
        mesh.position.set(
            (Math.random() - 0.5) * (isMobile ? 8 : 15),
            (Math.random() - 0.5) * (isMobile ? 6 : 10),
            (Math.random() - 0.5) * 8 - 5
        );
        
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        
        // Custom properties for animation
        mesh.userData = {
            rotationSpeed: (Math.random() - 0.5) * (isMobile ? 0.01 : 0.02),
            floatSpeed: (Math.random() - 0.5) * 0.01,
            originalY: mesh.position.y
        };
        
        floatingGroup.add(mesh);
        shapes.push(mesh);
    }

    // Only add lights if not mobile (BasicMaterial doesn't need lights)
    if (!isMobile) {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0x00f3ff, 2, 20);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0xbc13fe, 2, 20);
        pointLight2.position.set(-5, -5, 5);
        scene.add(pointLight2);
    }

    // --- BACKGROUND PARTICLES ---
    const pGeo = new THREE.BufferGeometry();
    const pCount = isMobile ? 80 : 400; // Significantly reduced for mobile
    const pPos = new Float32Array(pCount * 3);
    for(let i=0; i<pCount*3; i++) pPos[i] = (Math.random() - 0.5) * (isMobile ? 15 : 25);
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    
    // Create a circular texture for particles (bokeh effect)
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const pGradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    pGradient.addColorStop(0.2, 'rgba(0, 243, 255, 0.8)');
    pGradient.addColorStop(0.5, 'rgba(0, 243, 255, 0.2)');
    pGradient.addColorStop(1, 'rgba(0, 243, 255, 0)');
    pCtx.fillStyle = pGradient;
    pCtx.fillRect(0, 0, 32, 32);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const pMat = new THREE.PointsMaterial({ 
        size: isMobile ? 0.2 : 0.15, 
        map: pTexture,
        transparent: true, 
        opacity: 0, // Start invisible for cinematic fade
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // --- INTERACTION LOGIC ---
    const mouse = new THREE.Vector2();
    const targetMouse = new THREE.Vector2();
    let hoverStrength = 0;
    let targetHover = 0;

    const onMouseMove = (e) => {
        if (window.introState.isActive) return; // Disable mouse interaction during intro
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        const dist = Math.sqrt(mouse.x*mouse.x + mouse.y*mouse.y);
        targetHover = (dist < 0.5) ? 1.0 - (dist * 2.0) : 0.0;
    };
    
    window.addEventListener('mousemove', onMouseMove);
    
    // --- ANIMATION LOOP ---
    const clock = new THREE.Clock();
    
    const animate = () => {
        const time = clock.getElapsedTime();
        
        targetMouse.x += (mouse.x - targetMouse.x) * 0.05;
        targetMouse.y += (mouse.y - targetMouse.y) * 0.05;
        hoverStrength += (targetHover - hoverStrength) * 0.1;

        material.uniforms.uTime.value = time;
        material.uniforms.uMouse.value.copy(targetMouse);
        material.uniforms.uHover.value = hoverStrength;

        sphere.rotation.y = time * 0.1;
        particles.rotation.y = time * 0.05;

        // Animate floating shapes
        shapes.forEach((mesh, i) => {
            mesh.rotation.x += mesh.userData.rotationSpeed;
            mesh.rotation.y += mesh.userData.rotationSpeed;
            mesh.position.y = mesh.userData.originalY + Math.sin(time + i) * 0.2;
        });

        // Intro Camera Logic is handled by GSAP externally, 
        // but normal interaction happens here:
        if (!window.introState.isActive) {
            camera.position.x += (targetMouse.x * 0.8 - camera.position.x) * 0.05;
            camera.position.y += (targetMouse.y * 0.8 - camera.position.y) * 0.05;
            camera.lookAt(0, 0, 0);
            
            // Subtle tilt for the whole floating group
            floatingGroup.rotation.y += (targetMouse.x * 0.1 - floatingGroup.rotation.y) * 0.05;
            floatingGroup.rotation.x += (-targetMouse.y * 0.1 - floatingGroup.rotation.x) * 0.05;
        }

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // --- EXPOSE FOR CINEMATIC INTRO ---
    window.threeScene = {
        camera: camera,
        sphere: sphere,
        particles: particles
    };
});
