"use client";

interface MarqueeStripProps {
  items: string[];
}

export default function MarqueeStrip({ items }: MarqueeStripProps) {
  // Quadruple to ensure seamless loop at any viewport width
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(16px, 3vw, 28px) 0',
        background: 'var(--bg2)',
        position: 'relative',
      }}
    >
      {/* Left fade mask */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 'clamp(60px, 8vw, 120px)',
          background: 'linear-gradient(to right, var(--bg2), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      {/* Right fade mask */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: 'clamp(60px, 8vw, 120px)',
          background: 'linear-gradient(to left, var(--bg2), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <div className="marquee-inner">
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono, "DM Mono"), monospace',
                fontSize: 'clamp(14px, 3.5vw, 24px)',
                letterSpacing: '0.25em',
                color: 'var(--muted)',
                whiteSpace: 'nowrap',
                padding: '0 clamp(14px, 2.5vw, 32px)',
                transition: 'color 0.3s',
              }}
            >
              {item}
            </span>
            {/* Accent separator dot — pulses with delay */}
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'inline-block',
                flexShrink: 0,
                opacity: 0.7,
                animation: 'pulse-dot 2s ease-in-out infinite',
                animationDelay: `${(i % 8) * 0.25}s`,
                boxShadow: '0 0 6px rgba(232,255,71,0.5)',
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
