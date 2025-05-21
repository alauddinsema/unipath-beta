
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Logo } from "@/components/ui/logo";
import { navigation } from './navData';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import { UserMenuSection } from './UserMenuSection';
import { NavbarContainer } from './NavbarContainer';
import { DesktopNavigation } from './DesktopNavigation';
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-background/80 backdrop-blur-lg border-b" 
        : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo size="md" />
          
          <DesktopNavigation navigation={navigation} />
          
          <div className="flex items-center gap-4">
            <ThemeToggle className="hidden sm:block" />
            <UserMenuSection />
            <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
          </div>
        </div>
      </div>
    </nav>
  );
}
