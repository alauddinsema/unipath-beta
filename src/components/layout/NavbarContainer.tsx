
import React from 'react';
import { cn } from '@/lib/utils';

interface NavbarContainerProps {
  children: React.ReactNode;
  scrolled: boolean;
}

export const NavbarContainer = ({ children, scrolled }: NavbarContainerProps) => {
  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 ease-in-out",
      scrolled 
        ? "backdrop-blur-md bg-background/80 shadow-md" 
        : "backdrop-blur-sm bg-background/20"
    )}>
      {children}
    </header>
  );
};
