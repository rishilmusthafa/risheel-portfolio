"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface RevealTextProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function RevealText({ children, delay = 0, className = '' }: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} style={{ overflow: 'hidden' }} className={className}>
      <motion.div
        initial={{ y: "105%" }}
        animate={isInView ? { y: "0%" } : { y: "105%" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
