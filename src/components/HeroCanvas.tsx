'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// three.js is ~120 KB gzip, so the scene loads in its own chunk on the client only.
const NeuralField = dynamic(() => import('./NeuralField'), { ssr: false });

export default function HeroCanvas() {
  const [ready, setReady] = useState(false);

  // Wait until the browser is idle after hydration: creating the WebGL context and compiling shaders
  // is a ~100 ms main-thread task, and it shouldn't compete with the first paint or the intro animation.
  useEffect(() => {
    const start = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 1200 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 300);
    return () => clearTimeout(id);
  }, []);

  return ready ? <NeuralField className="size-full" /> : null;
}
