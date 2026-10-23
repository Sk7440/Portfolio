'use client';

import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from 'three';

// The hero's "latent space": a breathing particle sphere (shader-displaced with noise), an orbit ring,
// and lime tokens streaming into it like context into a model. Scrolling scatters the sphere apart.
// Loaded lazily through HeroCanvas so three.js never blocks the first paint.

const SPHERE = 5200;
const RING = 1100;
const TOKENS = 70;
const RADIUS = 1.6;
const ACCENT = new Color('#c7f36b');
const GLOW = new Color('#8f86ff');
const NODE = new Color('#e7eadf');

const rand = (a: number, b: number) => a + Math.random() * (b - a);

// Ashima Arts 3D simplex noise (MIT), used to ripple the sphere surface.
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERTEX = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform float uSize;
uniform vec3 uA;
uniform vec3 uB;
uniform vec3 uC;
attribute float aRand;
varying vec3 vColor;
varying float vAlpha;
${NOISE}
void main() {
  vec3 p = position;
  float n = snoise(p * 1.15 + vec3(0.0, uTime * 0.22, uTime * 0.12));
  float n2 = snoise(p * 2.6 - uTime * 0.18);
  p *= 1.0 + n * 0.18 + n2 * 0.05;
  p *= 1.0 + uScroll * (0.35 + aRand * 1.4);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vec3 col = mix(uB, uA, smoothstep(-0.5, 0.8, n));
  vColor = mix(col, uC, smoothstep(0.8, 1.0, aRand) * 0.7);
  vAlpha = (0.42 + 0.58 * smoothstep(-0.4, 0.9, n)) * (1.0 - uScroll * 0.55);
  gl_PointSize = uSize * (0.6 + aRand * 0.8) * (1.0 + n * 0.45) / -mv.z;
}`;

const FRAGMENT = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(vColor, a * a * vAlpha);
}`;

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.5)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

// Evenly spread points on a sphere shell (Fibonacci lattice) with a little depth jitter.
function spherePoints() {
  const pos = new Float32Array(SPHERE * 3);
  const rnd = new Float32Array(SPHERE);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < SPHERE; i++) {
    const y = 1 - ((i + 0.5) / SPHERE) * 2;
    const r = Math.sqrt(1 - y * y);
    const phi = i * golden;
    const k = RADIUS * rand(0.97, 1.03);
    pos.set([Math.cos(phi) * r * k, y * k, Math.sin(phi) * r * k], i * 3);
    rnd[i] = Math.random();
  }
  return { pos, rnd };
}

const NeuralField = ({ className = '' }: { className?: string }) => {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Soft dots don't need MSAA on high-DPI screens; capping DPR keeps fill cost low.
    const dpr = Math.min(window.devicePixelRatio, 1.25);
    const renderer = new WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power' });
    renderer.setPixelRatio(dpr);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';

    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 60);
    const group = new Group();
    scene.add(group);
    const tex = dotTexture();

    // Sphere: positions are static, the vertex shader does all the motion.
    const { pos, rnd } = spherePoints();
    const sphereGeo = new BufferGeometry();
    sphereGeo.setAttribute('position', new BufferAttribute(pos, 3));
    sphereGeo.setAttribute('aRand', new BufferAttribute(rnd, 1));
    const sphereMat = new ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uSize: { value: 36 * dpr },
        uA: { value: ACCENT },
        uB: { value: GLOW },
        uC: { value: NODE },
      },
    });
    group.add(new Points(sphereGeo, sphereMat));

    // Orbit ring, tilted.
    const ringPos = new Float32Array(RING * 3);
    for (let i = 0; i < RING; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.55 + rand(-0.14, 0.14) * Math.random();
      ringPos.set([Math.cos(a) * r, rand(-0.025, 0.025), Math.sin(a) * r], i * 3);
    }
    const ringGeo = new BufferGeometry();
    ringGeo.setAttribute('position', new BufferAttribute(ringPos, 3));
    const ringMat = new PointsMaterial({
      size: 0.045,
      map: tex,
      color: GLOW,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const ring = new Points(ringGeo, ringMat);
    const ringTilt = new Group();
    ringTilt.rotation.set(1.18, 0, 0.32);
    ringTilt.add(ring);
    group.add(ringTilt);

    // Tokens spiral in from the edge to the sphere surface, then respawn.
    const tokens = Array.from({ length: TOKENS }, () => ({
      theta: Math.random() * Math.PI * 2,
      y: rand(-0.9, 0.9),
      t: Math.random(),
      speed: rand(0.12, 0.3),
    }));
    const tokenPos = new Float32Array(TOKENS * 3);
    const tokenCol = new Float32Array(TOKENS * 3);
    const tokenGeo = new BufferGeometry();
    tokenGeo.setAttribute('position', new BufferAttribute(tokenPos, 3));
    tokenGeo.setAttribute('color', new BufferAttribute(tokenCol, 3));
    const tokenMat = new PointsMaterial({
      size: 0.1,
      map: tex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    group.add(new Points(tokenGeo, tokenMat));

    const placeTokens = (dt: number) => {
      tokens.forEach((k, i) => {
        k.t += dt * k.speed;
        if (k.t >= 1) {
          k.t = 0;
          k.theta = Math.random() * Math.PI * 2;
          k.y = rand(-0.9, 0.9);
        }
        const r = 4.4 - k.t * (4.4 - RADIUS * 1.05);
        const a = k.theta + k.t * 1.6;
        const flat = Math.sqrt(1 - k.y * k.y);
        tokenPos.set([Math.cos(a) * flat * r, k.y * r, Math.sin(a) * flat * r], i * 3);
        // Additive blending: darker colour = fainter, so this fades each token in and out.
        const fade = Math.sin(k.t * Math.PI);
        tokenCol.set([ACCENT.r * fade, ACCENT.g * fade, ACCENT.b * fade], i * 3);
      });
      tokenGeo.attributes.position.needsUpdate = true;
      tokenGeo.attributes.color.needsUpdate = true;
    };

    const draw = () => renderer.render(scene, camera);
    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      if (camera.aspect >= 1.15) {
        // Wide: the sphere sits to the right of the headline.
        camera.position.z = 9;
        group.position.set(2.1, 0.1, 0);
      } else {
        // Narrow: pull back until the sphere fits the width, and nudge it up and right behind the headline.
        camera.position.z = Math.max(9, 7.2 / (camera.aspect * 0.728));
        group.position.set(0.8, 0.9, 0);
      }
      camera.updateProjectionMatrix();
      // Resizing clears the canvas; repaint now when no render loop will do it (reduced motion, off screen).
      if (reduced || !visible) draw();
    };
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e: PointerEvent) => {
      pointer.tx = e.clientX / window.innerWidth - 0.5;
      pointer.ty = e.clientY / window.innerHeight - 0.5;
    };

    let raf = 0;
    let last = performance.now();
    let visible = false;
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(el);

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const time = now / 1000;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const scroll = Math.min(window.scrollY / window.innerHeight, 1);

      sphereMat.uniforms.uTime.value = time;
      sphereMat.uniforms.uScroll.value = scroll;
      group.rotation.y = time * 0.08 + pointer.x * 0.5;
      group.rotation.x = Math.sin(time * 0.15) * 0.08 + pointer.y * 0.3;
      ring.rotation.y -= dt * 0.12;
      placeTokens(dt);
      draw();
      if (visible) raf = requestAnimationFrame(frame);
    };

    let io: IntersectionObserver | undefined;
    if (reduced) {
      sphereMat.uniforms.uTime.value = 4;
      placeTokens(0);
      group.rotation.set(0.1, -0.4, 0);
      draw();
    } else {
      window.addEventListener('pointermove', onPointer, { passive: true });
      // Only run the render loop while the canvas is on screen.
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) {
          last = performance.now();
          raf = requestAnimationFrame(frame);
        }
      });
      io.observe(el);
    }

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onPointer);
      [sphereGeo, ringGeo, tokenGeo, sphereMat, ringMat, tokenMat, tex].forEach(x => x.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className={className} aria-hidden="true" />;
};

export default NeuralField;
