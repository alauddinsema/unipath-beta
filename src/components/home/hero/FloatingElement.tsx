
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { LucideIcon } from 'lucide-react';

interface FloatingElementProps {
  position: 'top-right' | 'bottom-left';
  icon: React.ReactNode;
  animationDelay?: string;
}

export function FloatingElement({ position, icon, animationDelay = '0s' }: FloatingElementProps) {
  const { resolvedTheme } = useTheme();
  
  const positionClasses = {
    'top-right': '-top-5 -right-5',
    'bottom-left': '-bottom-3 -left-5'
  };
  
  const animationClass = position === 'top-right' ? 'animate-float' : 'animate-float-delayed';
  
  return (
    <div 
      className={`absolute ${positionClasses[position]} backdrop-blur-md p-3 rounded-lg shadow-md ${animationClass} ${
        resolvedTheme === 'dark' 
          ? 'bg-black/40 border border-white/10' 
          : 'bg-white/90 shadow-lg border border-gray-200/80'
      }`}
      style={{
        animation: position === 'top-right' 
          ? 'float 3s ease-in-out infinite' 
          : 'float 3s ease-in-out 1s infinite'
      }}
    >
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className={`h-2 w-16 rounded ${resolvedTheme === 'dark' ? 'bg-gray-600' : 'bg-gray-300'}`} />
          <div className={`h-1.5 w-10 mt-1 rounded ${resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
        </div>
      </div>
    </div>
  );
}
