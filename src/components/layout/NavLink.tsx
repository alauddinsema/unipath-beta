
import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavLinkProps {
  to: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isMobile?: boolean;
}

export const NavLink = ({ 
  to, 
  icon: Icon, 
  children, 
  className,
  onClick,
  isMobile = false
}: NavLinkProps) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center transition-all relative group",
          isMobile 
            ? "text-base font-medium p-2 rounded-md" 
            : "text-sm font-medium",
          "hover:text-primary",
          isActive 
            ? "text-primary" + (isMobile ? " bg-primary/10" : "") 
            : "text-muted-foreground" + (isMobile ? " hover:bg-primary/5" : ""),
          !isMobile && "after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300",
          !isMobile && "hover:after:scale-x-100 hover:after:origin-bottom-left",
          !isMobile && isActive && "after:scale-x-100 after:origin-bottom-left",
          className
        )
      }
      onClick={onClick}
    >
      {Icon && (
        <Icon className={cn(
          isMobile ? "mr-3 h-5 w-5" : "mr-2 h-4 w-4 transition-transform duration-300", 
          "group-hover:animate-pulse-subtle"
        )} />
      )}
      {children}
    </RouterNavLink>
  );
};
