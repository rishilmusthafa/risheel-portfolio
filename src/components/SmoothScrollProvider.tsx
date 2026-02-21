"use client";

import { useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  // FIX: Store the latest rAF id in a ref so the cleanup always cancels
  // the most recent pending frame, not just the first one.
  const rafIdRef = useRef<number>(0);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });

    function raf(time: number) {
      lenis.raf(time);
      rafIdRef.current = requestAnimationFrame(raf);
    }

    rafIdRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafIdRef.current);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
