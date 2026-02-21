"use client";

import { useRef } from 'react';
import { motion, useInView, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useTilt } from '@/hooks/useTilt';
import SectionLabel from '@/components/ui/SectionLabel';
import { projects } from '@/lib/data';
import type { Project } from '@/types';

/**
 * Each card uses THREE composited animation systems — all inside Framer Motion
 * so they never conflict:
 *
 *  1. SCROLL REVEAL — zoom-in from scale(0.93) + blur(8px) as card enters viewport
 *  2. TILT — useSpring MotionValues for rotateX/Y (zero re-renders, spring physics)
 *  3. DEPTH PARALLAX — content layers shift at different rates relative to the tilt,
 *     simulating genuine Z-depth without preserve-3d (which breaks with overflow:hidden)
 *
 *  The background zooms independently via whileHover variant propagation.
 *  All transforms compose through FM's single internal pipeline.
 */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(5);

  // ── Depth parallax — each layer moves a different amount per degree of tilt ──
  const tagsX   = useTransform(rotateY, [-5, 5], ['-6px',  '6px']);
  const tagsY   = useTransform(rotateX, [-5, 5], [ '6px', '-6px']);
  const titleX  = useTransform(rotateY, [-5, 5], ['-12px', '12px']);
  const titleY  = useTransform(rotateX, [-5, 5], [ '12px', '-12px']);
  const ctaX    = useTransform(rotateY, [-5, 5], ['-18px', '18px']);
  const ctaY    = useTransform(rotateX, [-5, 5], [ '18px', '-18px']);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.93, y: 30, filter: 'blur(8px)' }}
      animate={
        isInView
          ? { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
          : {}
      }
      transition={{
        duration: 0.95,
        delay: index * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover="hovered"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        aspectRatio: project.featured ? '21/9' : '4/3',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        cursor: 'pointer',
        rotateX,
        rotateY,
        transformPerspective: 1200,
      }}
      className={`${project.featured ? 'col-span-2' : 'col-span-1'} max-lg:col-span-1 max-lg:[aspect-ratio:16/9] max-md:[aspect-ratio:4/3]`}
    >
      {/* ── Background gradient — zooms independently via hovered variant ── */}
      <motion.div
        variants={{ hovered: { scale: 1.1 } }}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: project.gradient,
          willChange: 'transform',
        }}
      />

      {/* Featured glow orb — expands on hover */}
      {project.featured && (
        <motion.div
          variants={{ hovered: { scale: 1.5, opacity: 0.9 } }}
          initial={{ opacity: 0.6 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '40%',
            transform: 'translate(-50%, -50%)',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,255,71,0.11) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Bottom overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)',
        }}
      />

      {/* Top edge accent — slides in on hover */}
      <motion.div
        variants={{ hovered: { scaleX: 1 } }}
        initial={{ scaleX: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, var(--accent), transparent)',
          transformOrigin: 'left',
        }}
      />

      {/* Ghost number — pushed to "back" via counter-parallax */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '28px',
          fontFamily: 'var(--font-display, "Bebas Neue"), cursive',
          fontSize: 'clamp(40px, 10vw, 80px)',
          color: 'rgba(255,255,255,0.04)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {project.number}
      </div>

      {/* ── Content — three depth layers ─────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: 'clamp(20px, 3vw, 40px)',
        }}
      >
        {/* LAYER 1 — Tags (closest to bg plane) */}
        <motion.div
          style={{ x: tagsX, y: tagsY, marginBottom: '14px' }}
        >
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' as const }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono, "DM Mono"), monospace',
                  fontSize: '10px',
                  color: 'var(--accent)',
                  border: '1px solid rgba(232,255,71,0.3)',
                  background: 'rgba(232,255,71,0.06)',
                  padding: '3px 10px',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase' as const,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* LAYER 2 — Title (mid plane — largest text) */}
        <motion.div style={{ x: titleX, y: titleY, marginBottom: '10px' }}>
          <div
            style={{
              fontFamily: 'var(--font-display, "Bebas Neue"), cursive',
              fontSize: 'clamp(28px, 4vw, 52px)',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            {project.title}
          </div>
        </motion.div>

        {/* Description — same layer as title */}
        <motion.p
          style={{ x: titleX, y: titleY, marginBottom: '20px' }}
          transition={{ type: 'spring' }}
        >
          <span
            style={{
              fontSize: '13px',
              opacity: 0.5,
              fontWeight: 300,
              maxWidth: '520px',
              lineHeight: 1.65,
              display: 'block',
            }}
          >
            {project.description}
          </span>
        </motion.p>

        {/* LAYER 3 — CTA (foreground — floats furthest forward) */}
        <motion.div style={{ x: ctaX, y: ctaY }}>
          <motion.a
            href={project.href}
            variants={{ hovered: { y: 0, opacity: 1 } }}
            initial={{ y: 14, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-mono, "DM Mono"), monospace',
              fontSize: '12px',
              color: 'var(--accent)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(232,255,71,0.35)',
              letterSpacing: '0.08em',
              paddingBottom: '3px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            View Project ↗
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  // ── Mouse parallax setup ─────────────────────────────────────────────────
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springCfg = { stiffness: 45, damping: 14, mass: 1 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);

  const orb1X = useTransform(smoothX, [0, 1], [-60, 60]);
  const orb1Y = useTransform(smoothY, [0, 1], [-40, 40]);
  const orb2X = useTransform(smoothX, [0, 1], [50, -50]);
  const orb2Y = useTransform(smoothY, [0, 1], [35, -35]);
  const ghostX = useTransform(smoothX, [0, 1], [-40, 40]);
  const ghostY = useTransform(smoothY, [0, 1], [-20, 20]);
  const contentX = useTransform(smoothX, [0, 1], [8, -8]);
  const contentY = useTransform(smoothY, [0, 1], [5, -5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX / rect.width);
    mouseY.set(e.clientY / rect.height);
  };
  const handleMouseLeave = () => { mouseX.set(0.5); mouseY.set(0.5); };

  return (
    <section
      id="projects"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 4vw, 48px)',
        background: 'var(--bg2)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── Atmosphere layer ─────────────────────────────────────────────── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <motion.div style={{ position: 'absolute', top: '-15%', right: '-10%', width: 'clamp(400px,55vw,800px)', height: 'clamp(400px,55vw,800px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,255,71,0.08) 0%, rgba(232,255,71,0.025) 40%, transparent 70%)', filter: 'blur(40px)', x: orb1X, y: orb1Y }} />
        <motion.div style={{ position: 'absolute', bottom: '-10%', left: '-8%', width: 'clamp(250px,35vw,550px)', height: 'clamp(250px,35vw,550px)', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,71,71,0.05) 0%, transparent 70%)', filter: 'blur(60px)', x: orb2X, y: orb2Y }} />
        {/* Dot grid: centered mask for card-grid layout */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '48px 48px', maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 100%)' }} />
      </div>

      {/* ── Ghost text ───────────────────────────────────────────────────── */}
      <div aria-hidden="true" style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}>
        <motion.div style={{ x: ghostX, y: ghostY }}>
          <span style={{ fontFamily: 'var(--font-display,"Bebas Neue"),cursive', fontSize: 'clamp(120px,20vw,320px)', color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.04)', whiteSpace: 'nowrap', letterSpacing: '0.06em', display: 'block' }}>
            004
          </span>
        </motion.div>
      </div>

      {/* ── Content — counter-parallax ───────────────────────────────────── */}
      <motion.div style={{ x: contentX, y: contentY, position: 'relative', zIndex: 1 }}>
        <SectionLabel number="004" text="Projects" />
        <div
          style={{
            display: 'grid',
            gap: '2px',
          }}
          className="grid-cols-2 max-lg:grid-cols-1"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
