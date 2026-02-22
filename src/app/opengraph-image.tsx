import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt   = 'Risheel — Senior Software Engineer';
export const size  = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px 100px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Accent line top */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#e8ff47' }} />
        {/* Label */}
        <div style={{ color: '#555', fontSize: 18, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 28 }}>
          Portfolio · Dubai, UAE
        </div>
        {/* Name */}
        <div style={{ color: '#e8ff47', fontSize: 96, fontWeight: 900, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 24 }}>
          RISHEEL
        </div>
        {/* Title */}
        <div style={{ color: '#f0f0f0', fontSize: 32, fontWeight: 300, opacity: 0.75, marginBottom: 40 }}>
          Senior Software Engineer
        </div>
        {/* Tags row */}
        <div style={{ display: 'flex', gap: 16 }}>
          {['Next.js', 'AI Workflows', 'TypeScript', 'Enterprise Apps'].map((tag) => (
            <div
              key={tag}
              style={{
                color: '#e8ff47',
                border: '1px solid rgba(232,255,71,0.4)',
                background: 'rgba(232,255,71,0.06)',
                padding: '6px 18px',
                fontSize: 16,
                letterSpacing: '0.08em',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        {/* Accent line bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(232,255,71,0.2)' }} />
      </div>
    ),
    { ...size }
  );
}
