import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Risheel — Senior Software Engineer',
  description:
    'Senior Software Engineer based in Dubai. Specialising in Next.js, AI-powered workflows, and enterprise-scale applications.',
  openGraph: {
    title: 'Risheel — Senior Software Engineer',
    description: 'Senior Software Engineer based in Dubai.',
    type: 'website',
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
