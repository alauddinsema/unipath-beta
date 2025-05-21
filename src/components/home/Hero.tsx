
import { useState, useEffect } from 'react';
import { HeroBackground } from './hero/HeroBackground';
import { HeroContent } from './hero/HeroContent';
import { Earth3D } from './hero/Earth3D';

export function Hero() {
  const [scrolled, setScrolled] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 500;
      setScrolled(Math.min(scrollPosition / maxScroll, 1));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="relative min-h-[92vh] flex items-center overflow-hidden pt-16">
      <HeroBackground scrolled={scrolled} />

      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <HeroContent isVisible={isVisible} />
          <div className="col-span-1 md:col-span-6 h-[500px] flex items-center justify-center">
            <Earth3D isVisible={isVisible} />
          </div>
        </div>
      </div>
    </div>
  );
}
