'use client';

import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  Group,
  LineBasicMaterial,
  LineSegments,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Scene,
  WebGLRenderer,
} from 'three';

// A layered "neural network" of nodes with signals travelling forward along the edges.
// Loaded lazily through HeroCanvas so three.js never blocks the first paint.

const LAYERS = [6, 10, 13, 13, 10, 6];
const PULSES = 34;
const ACCENT = new Color('#c7f36b');
const GLOW = new Color('#8f86ff');
const NODE = new Color('#e7eadf');

const rand = (a: number, b: number) => a + Math.random() * (b - a);

function dotTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.55)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return new CanvasTexture(c);
}

function buildNetwork() {
  const nodes: { p: [number, number, number]; layer: number }[] = [];
  const byLayer: number[][] = [];
  LAYERS.forEach((n, li) => {
    byLayer[li] = [];
    for (let j = 0; j < n; j++) {
      const x = (li - (LAYERS.length - 1) / 2) * 1.35 + rand(-0.12, 0.12);
      const y = (j - (n - 1) / 2) * 0.44 + rand(-0.1, 0.1);
      const z = rand(-0.7, 0.7) - Math.abs(y) * 0.25;
      byLayer[li].push(nodes.length);
      nodes.push({ p: [x, y, z], layer: li });
    }
  });

  // Each node links to 2-3 nodes in the next layer; `next` lets pulses keep travelling.
  const edges: [number, number][] = [];
  const next: number[][] = nodes.map(() => []);
  for (let li = 0; li < LAYERS.length - 1; li++) {
    byLayer[li].forEach(a => {
      const targets = [...byLayer[li + 1]].sort(() => Math.random() - 0.5).slice(0, 2 + (Math.random() < 0.5 ? 1 : 0));
      targets.forEach(b => {
        next[a].push(edges.length);
        edges.push([a, b]);
      });
    });
  }
  return { nodes, edges, next, firstLayer: byLayer[0] };
}

const NeuralField = ({ className = '' }: { className?: string }) => {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Thin lines and soft dots don't need MSAA on high-DPI screens; capping DPR keeps fill cost low.
    const dpr = Math.min(window.devicePixelRatio, 1.25);
    const renderer = new WebGLRenderer({ alpha: true, antialias: dpr < 1.25, powerPreference: 'low-power' });
    renderer.setPixelRatio(dpr);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = 'display:block;width:100%;height:100%';

    const scene = new Scene();
    const camera = new PerspectiveCamera(40, 1, 0.1, 50);
    const group = new Group();
    scene.add(group);

    const { nodes, edges, next, firstLayer } = buildNetwork();
    const tex = dotTexture();

    // Nodes
    const nodePos = new Float32Array(nodes.length * 3);
    const nodeCol = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      nodePos.set(n.p, i * 3);
      const c = Math.random() < 0.22 ? ACCENT : NODE;
      nodeCol.set([c.r, c.g, c.b], i * 3);
    });
    const nodeGeo = new BufferGeometry();
    nodeGeo.setAttribute('position', new BufferAttribute(nodePos, 3));
    nodeGeo.setAttribute('color', new BufferAttribute(nodeCol, 3));
    const nodeMat = new PointsMaterial({ size: 0.17, map: tex, vertexColors: true, transparent: true, depthWrite: false });
    group.add(new Points(nodeGeo, nodeMat));

    // Edges
    const edgePos = new Float32Array(edges.length * 6);
    edges.forEach(([a, b], i) => {
      edgePos.set(nodes[a].p, i * 6);
      edgePos.set(nodes[b].p, i * 6 + 3);
    });
    const edgeGeo = new BufferGeometry();
    edgeGeo.setAttribute('position', new BufferAttribute(edgePos, 3));
    const edgeMat = new LineBasicMaterial({ color: '#9aa38a', transparent: true, opacity: 0.2, depthWrite: false });
    group.add(new LineSegments(edgeGeo, edgeMat));

    // Pulses (signals moving along edges)
    const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
    const startEdge = () => pick(next[pick(firstLayer)]);
    const pulses = Array.from({ length: PULSES }, () => ({
      edge: pick(edges.map((_, i) => i)),
      t: Math.random(),
      speed: rand(0.35, 0.8),
    }));
    const pulsePos = new Float32Array(PULSES * 3);
    const pulseCol = new Float32Array(PULSES * 3);
    pulses.forEach((_, i) => {
      const c = i % 3 === 0 ? ACCENT : GLOW;
      pulseCol.set([c.r, c.g, c.b], i * 3);
    });
    const pulseGeo = new BufferGeometry();
    pulseGeo.setAttribute('position', new BufferAttribute(pulsePos, 3));
    pulseGeo.setAttribute('color', new BufferAttribute(pulseCol, 3));
    const pulseMat = new PointsMaterial({
      size: 0.28,
      map: tex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    group.add(new Points(pulseGeo, pulseMat));

    const placePulses = (dt: number) => {
      pulses.forEach((p, i) => {
        p.t += dt * p.speed;
        if (p.t >= 1) {
          const end = edges[p.edge][1];
          p.edge = next[end].length ? pick(next[end]) : startEdge();
          p.t = 0;
        }
        const [a, b] = edges[p.edge];
        const A = nodes[a].p;
        const B = nodes[b].p;
        pulsePos[i * 3] = A[0] + (B[0] - A[0]) * p.t;
        pulsePos[i * 3 + 1] = A[1] + (B[1] - A[1]) * p.t;
        pulsePos[i * 3 + 2] = A[2] + (B[2] - A[2]) * p.t;
      });
      pulseGeo.attributes.position.needsUpdate = true;
    };

    const draw = () => renderer.render(scene, camera);
    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Pull the camera back on narrow screens so the whole network stays in view.
      camera.position.z = camera.aspect < 1 ? 8 / camera.aspect : 8.2;
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
      const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);

      group.rotation.y = Math.sin(time * 0.18) * 0.32 + pointer.x * 0.45 + scroll * 0.6;
      group.rotation.x = Math.sin(time * 0.13) * 0.08 + pointer.y * 0.25;
      group.position.y = scroll * 0.9;
      placePulses(dt);
      draw();
      if (visible) raf = requestAnimationFrame(frame);
    };

    let io: IntersectionObserver | undefined;
    if (reduced) {
      placePulses(0);
      group.rotation.set(0.05, -0.25, 0);
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
      [nodeGeo, edgeGeo, pulseGeo, nodeMat, edgeMat, pulseMat, tex].forEach(x => x.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className={className} aria-hidden="true" />;
};

export default NeuralField;
