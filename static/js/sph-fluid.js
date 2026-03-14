/**
 * SPH Fluid Simulation — WebGL2 Metaball Renderer (Non-Newtonian Ambient)
 * Physics: Lagrangian SPH / Navier-Stokes (pressure + viscosity + surface tension)
 * Rendering: Implicit Metaball field (2-pass GPU), Fresnel (Schlick), SSS approx.
 * Optimizer: Spatial hashing O(n) neighbor search, half-res FBO, instanced draw
 */
(function () {
    'use strict';

    // ─── Physics Constants (Refined for Non-Newtonian Ambient) ────────────────
    const NUM_P = 300;          
    const H = 65;               
    const H2 = H * H;
    const REST_RHO = 0.00008;   
    const STIFFNESS = 1200.0;   
    const VISCOSITY = 0.12;     
    const GRAVITY_Y = 0;        // Zero gravity for ambient float
    const DT = 0.016;           
    const EPSILON2 = 100;       
    
    // Interaction
    const MOUSE_GRAVITY = 12000; // Increased gravity for strong pull
    const MOUSE_RADIUS = 350;   
    const SHEAR_STRENGTH = 0.2; 

    // Ambient Noise
    const NOISE_SCALE = 0.002;
    const NOISE_SPEED = 0.0005;
    const NOISE_STRENGTH = 0.05;

    // WebGL
    const FBO_SCALE = 0.2;

    // ─── SPH Kernels ─────────────────────────────────────────────────────────
    function poly6(r2) {
        if (r2 > H2) return 0;
        const term = H2 - r2;
        return (315 / (64 * Math.PI * Math.pow(H, 9))) * term * term * term;
    }

    function spikyGrad(r, dist) {
        if (dist > H) return 0;
        const term = H - dist;
        return -45 / (Math.PI * Math.pow(H, 6)) * term * term;
    }

    function viscLap(dist) {
        if (dist > H) return 0;
        const term = H - dist;
        return 45 / (Math.PI * Math.pow(H, 6)) * term;
    }

    // ─── Utils ───────────────────────────────────────────────────────────────
    // Simple pseudo-random noise for ambient motion
    function noise(x, y, z) {
        return Math.sin(x) * Math.cos(y) * Math.sin(z);
    }

    // ─── Particle System ─────────────────────────────────────────────────────
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = (Math.random() - 0.5) * 2;
            this.fx = 0;
            this.fy = 0;
            this.rho = 0;
            this.pressure = 0;
        }
    }

    // ─── Spatial Hash ────────────────────────────────────────────────────────
    class SpatialHash {
        constructor(cellSize) {
            this.cellSize = cellSize;
            this.grid = new Map();
        }

        key(x, y) {
            return `${Math.floor(x / this.cellSize)},${Math.floor(y / this.cellSize)}`;
        }

        clear() {
            this.grid.clear();
        }

        insert(p) {
            const k = this.key(p.x, p.y);
            if (!this.grid.has(k)) this.grid.set(k, []);
            this.grid.get(k).push(p);
        }

        query(p, radius, callback) {
            const cx = Math.floor(p.x / this.cellSize);
            const cy = Math.floor(p.y / this.cellSize);
            const range = Math.ceil(radius / this.cellSize);

            for (let i = -range; i <= range; i++) {
                for (let j = -range; j <= range; j++) {
                    const k = `${cx + i},${cy + j}`;
                    const cell = this.grid.get(k);
                    if (cell) {
                        for (let neighbor of cell) {
                            if (neighbor !== p) callback(neighbor);
                        }
                    }
                }
            }
        }
    }

    // ─── Renderer (WebGL2) ───────────────────────────────────────────────────
    class Renderer {
        constructor(canvas) {
            this.canvas = canvas;
            this.gl = canvas.getContext('webgl2', { alpha: true, antialias: false });
            if (!this.gl) throw new Error("WebGL2 not supported");
            
            this.resize();
            this.initShaders();
            this.initBuffers();
        }

        resize() {
            this.width = this.canvas.width = window.innerWidth;
            this.height = this.canvas.height = window.innerHeight;
            this.gl.viewport(0, 0, this.width, this.height);
            this.initFBO();
        }

        initFBO() {
            const gl = this.gl;
            this.fboW = Math.floor(this.width * FBO_SCALE);
            this.fboH = Math.floor(this.height * FBO_SCALE);

            this.fbo = gl.createFramebuffer();
            this.fboTex = gl.createTexture();
            
            gl.bindTexture(gl.TEXTURE_2D, this.fboTex);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.R16F, this.fboW, this.fboH, 0, gl.RED, gl.FLOAT, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

            gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.fboTex, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }

        initShaders() {
            const gl = this.gl;
            
            const vsSplat = `#version 300 es
                in vec2 a_pos;
                in vec2 a_center;
                uniform vec2 u_res;
                uniform float u_radius;
                out vec2 v_uv;
                void main() {
                    v_uv = a_pos;
                    vec2 size = vec2(u_radius) / u_res * 2.0;
                    size.y *= u_res.x / u_res.y; 
                    vec2 pos = (a_center / u_res) * 2.0 - 1.0;
                    pos.y *= -1.0;
                    gl_Position = vec4(pos + a_pos * size, 0.0, 1.0);
                }
            `;
            
            const fsSplat = `#version 300 es
                precision mediump float;
                in vec2 v_uv;
                out vec4 color;
                void main() {
                    float dist = length(v_uv);
                    if (dist > 1.0) discard;
                    float alpha = exp(-dist * dist * 4.0);
                    color = vec4(alpha, 0.0, 0.0, 1.0);
                }
            `;

            const vsComp = `#version 300 es
                in vec2 a_pos;
                out vec2 v_uv;
                void main() {
                    v_uv = a_pos * 0.5 + 0.5;
                    gl_Position = vec4(a_pos, 0.0, 1.0);
                }
            `;

            const fsComp = `#version 300 es
                precision highp float;
                uniform sampler2D u_tex;
                uniform vec2 u_res;
                in vec2 v_uv;
                out vec4 color;

                void main() {
                    float val = texture(u_tex, v_uv).r;
                    float threshold = 0.4;
                    if (val < threshold) discard;

                    vec2 eps = vec2(1.0 / u_res.x, 1.0 / u_res.y);
                    float v1 = texture(u_tex, v_uv + vec2(eps.x, 0.0)).r;
                    float v2 = texture(u_tex, v_uv - vec2(eps.x, 0.0)).r;
                    float v3 = texture(u_tex, v_uv + vec2(0.0, eps.y)).r;
                    float v4 = texture(u_tex, v_uv - vec2(0.0, eps.y)).r;
                    
                    vec3 N = normalize(vec3(v2 - v1, v4 - v3, 0.05)); 
                    vec3 lightDir = normalize(vec3(0.5, 0.8, 1.0));
                    vec3 viewDir = vec3(0.0, 0.0, 1.0);
                    
                    float fresnel = pow(1.0 - max(dot(N, viewDir), 0.0), 4.0);
                    vec3 H = normalize(lightDir + viewDir);
                    float spec = pow(max(dot(N, H), 0.0), 64.0);
                    
                    float thickness = smoothstep(threshold, 1.0, val);
                    vec3 deepColor = vec3(0.01, 0.01, 0.1); 
                    vec3 surfColor = vec3(0.0, 0.8, 1.0);   
                    vec3 glowColor = vec3(0.8, 0.0, 1.0);   

                    vec3 albedo = mix(surfColor, deepColor, thickness * 0.7);
                    albedo += glowColor * fresnel * 0.8;
                    
                    color = vec4(albedo + vec3(spec), 0.85);
                }
            `;

            this.progSplat = this.createProgram(vsSplat, fsSplat);
            this.progComp = this.createProgram(vsComp, fsComp);
        }

        createProgram(vsSrc, fsSrc) {
            const gl = this.gl;
            const vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSrc);
            gl.compileShader(vs);
            const fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSrc);
            gl.compileShader(fs);
            const prog = gl.createProgram();
            gl.attachShader(prog, vs);
            gl.attachShader(prog, fs);
            gl.linkProgram(prog);
            return prog;
        }

        initBuffers() {
            const gl = this.gl;
            this.quadBuf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1
            ]), gl.STATIC_DRAW);
            this.instBuf = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.instBuf);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(NUM_P * 2), gl.DYNAMIC_DRAW);
        }

        render(particles) {
            const gl = this.gl;
            const posData = new Float32Array(NUM_P * 2);
            for (let i = 0; i < NUM_P; i++) {
                posData[i * 2] = particles[i].x;
                posData[i * 2 + 1] = particles[i].y;
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, this.instBuf);
            gl.bufferSubData(gl.ARRAY_BUFFER, 0, posData);

            gl.bindFramebuffer(gl.FRAMEBUFFER, this.fbo);
            gl.viewport(0, 0, this.fboW, this.fboH);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE);

            gl.useProgram(this.progSplat);
            
            const aPos = gl.getAttribLocation(this.progSplat, "a_pos");
            gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuf);
            gl.enableVertexAttribArray(aPos);
            gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
            gl.vertexAttribDivisor(aPos, 0);

            const aCenter = gl.getAttribLocation(this.progSplat, "a_center");
            gl.bindBuffer(gl.ARRAY_BUFFER, this.instBuf);
            gl.enableVertexAttribArray(aCenter);
            gl.vertexAttribPointer(aCenter, 2, gl.FLOAT, false, 0, 0);
            gl.vertexAttribDivisor(aCenter, 1);

            gl.uniform2f(gl.getUniformLocation(this.progSplat, "u_res"), this.fboW, this.fboH);
            gl.uniform1f(gl.getUniformLocation(this.progSplat, "u_radius"), H * 1.5);

            gl.drawArraysInstanced(gl.TRIANGLES, 0, 6, NUM_P);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, this.width, this.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.disable(gl.BLEND);

            gl.useProgram(this.progComp);
            gl.bindTexture(gl.TEXTURE_2D, this.fboTex);
            gl.uniform1i(gl.getUniformLocation(this.progComp, "u_tex"), 0);
            gl.uniform2f(gl.getUniformLocation(this.progComp, "u_res"), this.fboW, this.fboH);
            gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuf);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
            gl.vertexAttribDivisor(0, 0);
            gl.enableVertexAttribArray(0);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
    }

    // ─── Main Simulation Loop ──────────────────────────────────────────────
    const canvas = document.getElementById('sph-canvas');
    if (!canvas) return;

    const renderer = new Renderer(canvas);
    const hash = new SpatialHash(H);
    const particles = [];

    // Init Particles (Distributed)
    for (let i = 0; i < NUM_P; i++) {
        particles.push(new Particle(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
        ));
    }

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let mouseVx = 0, mouseVy = 0;
    let prevMouseX = mouseX, prevMouseY = mouseY;
    let time = 0;

    window.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
        renderer.resize();
    });

    function physics() {
        hash.clear();
        for (let p of particles) hash.insert(p);

        // Density & Pressure
        for (let p of particles) {
            p.rho = 0;
            hash.query(p, H, (neighbor) => {
                const dx = p.x - neighbor.x;
                const dy = p.y - neighbor.y;
                const r2 = dx * dx + dy * dy;
                if (r2 < H2) p.rho += poly6(r2);
            });
            p.pressure = STIFFNESS * (Math.max(p.rho, REST_RHO) - REST_RHO);
        }

        // Forces
        for (let p of particles) {
            let fPressX = 0, fPressY = 0;
            let fViscX = 0, fViscY = 0;

            hash.query(p, H, (neighbor) => {
                const dx = p.x - neighbor.x;
                const dy = p.y - neighbor.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < H && dist > 0) {
                    const force = (p.pressure + neighbor.pressure) / (2 * neighbor.rho) * spikyGrad(dist, dist);
                    fPressX += (dx / dist) * force;
                    fPressY += (dy / dist) * force;
                    const visc = VISCOSITY * viscLap(dist) / neighbor.rho;
                    fViscX += (neighbor.vx - p.vx) * visc;
                    fViscY += (neighbor.vy - p.vy) * visc;
                }
            });

            // Ambient Noise Force (Ocean currents)
            const nVal = noise(p.x * NOISE_SCALE, p.y * NOISE_SCALE, time * NOISE_SPEED);
            let fAmbX = Math.cos(nVal * Math.PI * 2) * NOISE_STRENGTH;
            let fAmbY = Math.sin(nVal * Math.PI * 2) * NOISE_STRENGTH;

            // Cursor Interaction (Gravity + Shear)
            let fGravX = 0, fGravY = 0;
            const mdx = mouseX - p.x;
            const mdy = mouseY - p.y;
            const mDist2 = mdx * mdx + mdy * mdy;
            
            if (mDist2 < MOUSE_RADIUS * MOUSE_RADIUS) {
                const mDist = Math.sqrt(mDist2);
                const pull = MOUSE_GRAVITY / (mDist2 + EPSILON2);
                fGravX += (mdx / mDist) * pull * p.rho;
                fGravY += (mdy / mDist) * pull * p.rho;
                
                const relVx = mouseVx - p.vx;
                const relVy = mouseVy - p.vy;
                fViscX += relVx * SHEAR_STRENGTH;
                fViscY += relVy * SHEAR_STRENGTH;
            }

            p.fx = fPressX + fViscX + fGravX + fAmbX;
            p.fy = fPressY + fViscY + fGravY + fAmbY;
        }

        // Integration
        for (let p of particles) {
            p.vx += (p.fx / p.rho) * DT;
            p.vy += (p.fy / p.rho) * DT;
            p.x += p.vx;
            p.y += p.vy;

            // Soft Boundaries
            const margin = H;
            if (p.x < margin) p.vx += 0.5;
            if (p.x > window.innerWidth - margin) p.vx -= 0.5;
            if (p.y < margin) p.vy += 0.5;
            if (p.y > window.innerHeight - margin) p.vy -= 0.5;
            
            // Dampen velocity
            p.vx *= 0.99;
            p.vy *= 0.99;
        }
    }

    function loop() {
        time += 1;
        mouseVx = mouseX - prevMouseX;
        mouseVy = mouseY - prevMouseY;
        prevMouseX = mouseX;
        prevMouseY = mouseY;

        physics();
        renderer.render(particles);
        requestAnimationFrame(loop);
    }

    loop();
})();
