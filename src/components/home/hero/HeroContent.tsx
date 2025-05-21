
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroContentProps {
  isVisible: boolean;
}

export function HeroContent({ isVisible }: HeroContentProps) {
  return (
    <div className={cn("col-span-1 md:col-span-6 space-y-6 transition-all duration-1000 transform", 
      isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0")}>
      <div 
        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none bg-primary/10 text-primary border-primary/20" 
        style={{
          transitionDelay: "100ms",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 500ms ease, transform 500ms ease'
        }}
      >
        <span>New Platform</span>
      </div>
      
      <h1 
        style={{
          transitionDelay: "200ms",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 500ms ease, transform 500ms ease'
        }} 
        className="text-4xl md:text-5xl font-display font-bold tracking-tight text-balance lg:text-6xl text-foreground"
      >
        Your Guided Path to University Admissions
      </h1>
      
      <p 
        className="text-xl text-muted-foreground max-w-md" 
        style={{
          transitionDelay: "300ms",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 500ms ease, transform 500ms ease'
        }}
      >
        Simplify your university application journey with our comprehensive platform. Search, organize, and apply all in one place.
      </p>
      
      <div 
        className="flex flex-col sm:flex-row gap-3 pt-4" 
        style={{
          transitionDelay: "400ms",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 500ms ease, transform 500ms ease'
        }}
      >
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]" size="lg" asChild>
          <Link to="/signup">
            Get Started <ArrowRight className="ml-2 h-4 w-4 animate-pulse-subtle" />
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="backdrop-blur-sm border-2 hover:bg-secondary/30 transition-all duration-300" asChild>
          <Link to="/discover">
            Explore Universities
          </Link>
        </Button>
      </div>
    </div>
  );
}
