"use client";

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface CredentialItemProps {
  label: string;
  value: string;
  delay: number;
}

function CredentialItem({ label, value, delay }: CredentialItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ flex: '1 1 260px', minWidth: 0 }}
    >
      <span
        style={{
          display: 'block',
          fontFamily: 'var(--font-mono, "DM Mono"), monospace',
          fontSize: '11px',
          color: 'var(--accent)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase' as const,
          marginBottom: '10px',
        }}
      >
        {label}
      </span>
      <span
        style={{
          display: 'block',
          fontFamily: 'var(--font-body, "Bricolage Grotesque"), sans-serif',
          fontSize: 'clamp(13px, 1.6vw, 15px)',
          color: 'var(--text)',
          opacity: 0.6,
          fontWeight: 300,
          lineHeight: 1.6,
        }}
      >
        {value}
      </span>
    </motion.div>
  );
}

export default function CredentialsStrip() {
  return (
    <div
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg2)',
        // Extra top clearance (unlike the shared clamp(32,56) every other
        // side uses here): the fixed Navbar (~81px tall) has no opaque
        // background, so when this strip scrolls flush with the viewport
        // top — which happens on every normal scroll-through, not just an
        // edge case — its text was rendering directly under/behind the nav
        // links. Every full section avoids this via its own generous
        // clamp(60,120) padding; this compact strip didn't have enough.
        paddingTop: 'clamp(88px, 11vw, 120px)',
        paddingBottom: 'clamp(32px, 5vw, 56px)',
        paddingLeft: 'clamp(20px, 4vw, 48px)',
        paddingRight: 'clamp(20px, 4vw, 48px)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap' as const,
          gap: 'clamp(24px, 5vw, 64px)',
        }}
      >
        <CredentialItem
          label="Education"
          value="Bachelor of Engineering, Information Technology — University of Calicut, 2007–2011"
          delay={0}
        />
        <CredentialItem
          label="Continuous Learning"
          value="7 courses · LinkedIn Learning · AI Engineering & Agentic Development · 2025"
          delay={0.12}
        />
      </div>
    </div>
  );
}
