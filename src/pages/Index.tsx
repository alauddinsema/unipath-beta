
import React, { useState, useEffect, useRef } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/home/Hero';
import { Navbar } from '@/components/layout/Navbar';
import { HowItWorks } from '@/components/home/HowItWorks';
import { Testimonials } from '@/components/home/Testimonials';
import { PricingSection } from '@/components/home/PricingSection';
import { CallToAction } from '@/components/home/CallToAction';
import { ApplicationJourney } from '@/components/home/ApplicationJourney';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { BrowserCursor } from '@/components/browser/BrowserCursor';
import { useTheme } from '@/contexts/ThemeContext';
import { Features } from '@/components/home/Features'; 

export default function Index() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      if (position > 100 && !showNavbar) {
        setShowNavbar(true);
      } else if (position <= 100 && showNavbar) {
        setShowNavbar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showNavbar]);

  return (
    <div ref={containerRef} className="min-h-screen relative">
      <BrowserCursor containerRef={containerRef} />
      <AuroraBackground 
        className="min-h-screen overflow-hidden" 
        intensity={resolvedTheme === "dark" ? "medium" : "light"}
        animationSpeed="slow"
        optimizePerformance={true}
        showRadialGradient={true}
        textGlow={false}
      >
        <div 
          className={`transition-all duration-500 ease-in-out ${
            showNavbar 
              ? "opacity-100 translate-y-0" 
              : "opacity-0 -translate-y-full"
          }`}
        >
          <Navbar />
        </div>
        <main>
          <Hero />
          <HowItWorks />
          <div className="scroll-reveal-sections">
            <Features />
            <ApplicationJourney />
            <Testimonials />
            <PricingSection />
            <CallToAction />
          </div>
        </main>
        <Footer />
      </AuroraBackground>
    </div>
  );
}
