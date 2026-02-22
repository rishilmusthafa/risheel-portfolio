import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Bricolage_Grotesque, DM_Mono } from 'next/font/google';
import './globals.css';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import { MusicPlayerProvider } from '@/context/MusicPlayerContext';
import PageLoader from '@/components/PageLoader';
import CustomCursor from '@/components/ui/CustomCursor';
import NoiseOverlay from '@/components/ui/NoiseOverlay';
import MusicPlayer from '@/components/ui/MusicPlayer';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://risheel.dev';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Risheel — Senior Software Engineer',
  description:
    'Senior Software Engineer based in Dubai. Specialising in Next.js, AI-powered workflows, and enterprise-scale applications.',
  keywords: ['Senior Software Engineer', 'Next.js', 'React', 'TypeScript', 'AI', 'Dubai', 'Portfolio'],
  authors: [{ name: 'Risheel', url: SITE_URL }],
  creator: 'Risheel',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Risheel Portfolio',
    title: 'Risheel — Senior Software Engineer',
    description: 'Senior Software Engineer based in Dubai. Next.js · AI · Enterprise Apps.',
    locale: 'en_US',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Risheel — Senior Software Engineer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Risheel — Senior Software Engineer',
    description: 'Senior Software Engineer based in Dubai. Next.js · AI · Enterprise Apps.',
    creator: '@risheel',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${bricolage.variable} ${dmMono.variable}`}>
      <body>
        <SmoothScrollProvider>
          <MusicPlayerProvider>
            <PageLoader />
            <CustomCursor />
            <NoiseOverlay />
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'Person',
                  name: 'Risheel',
                  jobTitle: 'Senior Software Engineer',
                  url: SITE_URL,
                  worksFor: { '@type': 'Organization', name: 'e& enterprise' },
                  address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
                  knowsAbout: ['Next.js', 'React', 'TypeScript', 'AI Automation', 'n8n', 'Claude AI'],
                }),
              }}
            />
            <MusicPlayer />
            <Navbar />
            <main>{children}</main>
            <Footer />
          </MusicPlayerProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
