
import React from 'react';
import { cn } from '@/lib/utils';

interface AuthBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthBackground({ children, className }: AuthBackgroundProps) {
  return (
    <div className={cn(
      "relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-gray-900 to-blue-950",
      className
    )}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-3xl" />
        
        {/* Floating circles animation */}
        <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-blue-400 animate-float opacity-70" />
        <div className="absolute top-3/4 right-1/4 h-3 w-3 rounded-full bg-purple-400 animate-float-delay opacity-70" />
        <div className="absolute bottom-1/4 left-1/3 h-2 w-2 rounded-full bg-indigo-400 animate-float-long opacity-70" />
        <div className="absolute top-1/3 right-1/4 h-4 w-4 rounded-full bg-blue-400/50 animate-float-delay-long opacity-70" />
      </div>
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px] opacity-20"
        style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)' 
        }}
      ></div>
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
