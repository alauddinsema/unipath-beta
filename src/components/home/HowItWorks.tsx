
import React, { useRef, useEffect } from 'react';
import { Search, Briefcase, GraduationCap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export function HowItWorks() {
  const { resolvedTheme } = useTheme();
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('animate-fade-in');
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`py-16 md:py-24 ${
        resolvedTheme === 'dark' 
          ? 'bg-secondary/50' 
          : 'bg-gradient-to-br from-blue-50/70 via-blue-50/30 to-white/80'
      }`}
    >
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto animate-on-scroll opacity-0">
          <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${
            resolvedTheme === 'dark' ? 'text-white text-opacity-90' : 'text-foreground'
          }`}>
            How UniPath Works
          </h2>
          <p className={`text-xl ${
            resolvedTheme === 'dark' ? 'text-white text-opacity-70' : 'text-muted-foreground'
          }`}>
            A simple, guided process to help you achieve your educational goals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center animate-on-scroll opacity-0">
            <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 transform transition-all duration-500 hover:scale-110 ${
              resolvedTheme === 'light' ? 'shadow-md' : ''
            }`}>
              <Search className="h-8 w-8" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              resolvedTheme === 'dark' ? 'text-white text-opacity-90' : 'text-foreground'
            }`}>Discover & Save</h3>
            <p className={`${
              resolvedTheme === 'dark' ? 'text-white text-opacity-70' : 'text-muted-foreground'
            }`}>
              Search our database of 1,000+ universities and save your favorites for later.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center animate-on-scroll opacity-0">
            <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 transform transition-all duration-500 hover:scale-110 ${
              resolvedTheme === 'light' ? 'shadow-md' : ''
            }`}>
              <Briefcase className="h-8 w-8" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              resolvedTheme === 'dark' ? 'text-white text-opacity-90' : 'text-foreground'
            }`}>Prepare & Organize</h3>
            <p className={`${
              resolvedTheme === 'dark' ? 'text-white text-opacity-70' : 'text-muted-foreground'
            }`}>
              Upload and organize your documents in our secure file storage system.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center animate-on-scroll opacity-0">
            <div className={`w-16 h-16 flex items-center justify-center rounded-full bg-primary text-primary-foreground mb-4 transform transition-all duration-500 hover:scale-110 ${
              resolvedTheme === 'light' ? 'shadow-md' : ''
            }`}>
              <GraduationCap className="h-8 w-8" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              resolvedTheme === 'dark' ? 'text-white text-opacity-90' : 'text-foreground'
            }`}>Apply & Succeed</h3>
            <p className={`${
              resolvedTheme === 'dark' ? 'text-white text-opacity-70' : 'text-muted-foreground'
            }`}>
              Apply to universities with guidance and track your applications to completion.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
