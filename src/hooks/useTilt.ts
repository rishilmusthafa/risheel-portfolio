"use client";

import { useRef } from 'react';
import { useMotionValue, useSpring, type MotionValue } from 'framer-motion';

interface TiltResult {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

/**
 * REBUILT: Now returns Framer Motion MotionValues (via useSpring) instead of
 * plain numbers updated via useState.
 *
 * Why this matters:
 *  - useMotionValue + useSpring operate OUTSIDE React's render cycle.
 *    Zero re-renders on every mouse move — pure rAF-driven DOM mutation.
 *  - Spring physics provide natural acceleration on move-in and smooth
 *    deceleration on leave — no CSS transition needed, no isTransitioning flag.
 *  - MotionValues compose with Framer Motion's own transform system, so
 *    rotateX/Y blends correctly with scale, y, opacity from animate/whileHover.
 *    Previously the inline `transform: perspective()...` string shadowed FM's
 *    internal transform and caused visual conflicts.
 *
 * Usage:
 *   const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(10);
 *   <motion.div style={{ rotateX, rotateY, transformPerspective: 900 }} ... />
 */
export function useTilt(maxDeg: number = 10): TiltResult {
  const isTouchRef = useRef<boolean | null>(null);

  // Raw target values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring-smoothed output — stiffness/damping tuned for a premium "magnetic" feel
  const rotateX = useSpring(rawX, { stiffness: 280, damping: 28, mass: 0.6 });
  const rotateY = useSpring(rawY, { stiffness: 280, damping: 28, mass: 0.6 });

  const getIsTouch = (): boolean => {
    if (typeof window === 'undefined') return false;
    if (isTouchRef.current === null) {
      isTouchRef.current = window.matchMedia('(pointer: coarse)').matches;
    }
    return isTouchRef.current;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (getIsTouch()) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    rawX.set((-y / rect.height) * maxDeg);
    rawY.set((x / rect.width) * maxDeg);
  };

  // Setting raw to 0 lets the spring animate back — no explicit transition needed
  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
}
