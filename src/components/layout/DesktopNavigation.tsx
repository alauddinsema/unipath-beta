
import React from 'react';
import { NavLink } from './NavLink';
import { LucideIcon } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface DesktopNavigationProps {
  navigation: NavigationItem[];
}

export const DesktopNavigation = ({ navigation }: DesktopNavigationProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-8 ml-16">
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          icon={item.icon}
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
};
