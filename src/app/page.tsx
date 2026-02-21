import Hero from '@/components/sections/Hero';
import MarqueeStrip from '@/components/ui/MarqueeStrip';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import ParallaxText from '@/components/sections/ParallaxText';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import { marqueeItems } from '@/lib/data';

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeStrip items={marqueeItems} />
      <About />
      <Experience />
      <ParallaxText />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
