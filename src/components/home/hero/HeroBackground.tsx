
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface HeroBackgroundProps {
  scrolled: number;
}

export function HeroBackground({ scrolled }: HeroBackgroundProps) {
  const { resolvedTheme } = useTheme();
  
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div 
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-50 transform -rotate-12 ${
          resolvedTheme === 'dark' ? 'bg-primary/10' : 'bg-primary/5'
        }`} 
        style={{
          transform: `translate(-50%, -50%) scale(${1 + scrolled * 0.2}) rotate(-${12 + scrolled * 10}deg)`,
          opacity: 0.5 - scrolled * 0.3
        }} 
      />
      <div 
        className={`absolute top-2/3 left-1/4 w-[400px] h-[400px] rounded-full blur-3xl opacity-40 transform rotate-45 ${
          resolvedTheme === 'dark' ? 'bg-blue-300/10' : 'bg-blue-300/5'
        }`} 
        style={{
          transform: `scale(${1 + scrolled * 0.3}) rotate(${45 + scrolled * 15}deg)`,
          opacity: 0.4 - scrolled * 0.2
        }} 
      />
    </div>
  );
}
