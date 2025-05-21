
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

export function CallToAction() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    if (!ctaRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('translate-y-0');
            entry.target.classList.add('opacity-100');
            entry.target.classList.add('scale-100');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(ctaRef.current);
    
    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div 
          ref={ctaRef}
          className={`
            backdrop-blur-md rounded-3xl p-8 md:p-12 text-center border shadow-lg
            transition-all duration-1000 opacity-0 translate-y-8 scale-95
            ${resolvedTheme === 'dark' 
              ? 'bg-primary/80 text-primary-foreground border-white/20' 
              : 'bg-gradient-to-br from-blue-500/90 to-blue-600 text-white border-blue-400/20'}
          `}
          style={{
            boxShadow: resolvedTheme === 'dark' 
              ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)' 
              : '0 10px 30px -10px rgba(30, 64, 175, 0.25)'
          }}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
              Start Your University Journey Today
            </h2>
            <p className="text-xl text-white/90 mb-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
              Join thousands of students who are simplifying their path to higher education with UniPath.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg" 
                asChild
              >
                <Link to="/discover">
                  <Search className="mr-2 h-5 w-5" />
                  Explore Universities
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className={`
                  font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg
                  ${resolvedTheme === 'dark' 
                    ? 'bg-transparent border-white text-white hover:bg-white/20' 
                    : 'bg-transparent border-white text-white hover:bg-white/20'}
                `} 
                asChild
              >
                <Link to="/signup">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Create Free Account
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
