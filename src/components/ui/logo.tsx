
import { cn } from '@/lib/utils';
import { GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'inverted';
}

export function Logo({ 
  className, 
  iconClassName,
  textClassName,
  size = 'md', 
  variant = 'default' 
}: LogoProps) {
  const sizes = {
    sm: {
      text: 'text-lg',
      icon: 'w-5 h-5'
    },
    md: {
      text: 'text-xl',
      icon: 'w-6 h-6'
    },
    lg: {
      text: 'text-2xl',
      icon: 'w-7 h-7'
    }
  };

  const variants = {
    default: {
      container: 'text-foreground',
      icon: 'text-primary'
    },
    inverted: {
      container: 'text-primary-foreground',
      icon: 'text-primary-foreground'
    }
  };

  return (
    <Link to="/" className={cn(
      'flex items-center gap-2 transition-transform duration-300 hover:scale-105',
      variants[variant].container, 
      className
    )}>
      <div className={cn('rounded-lg bg-primary flex items-center justify-center p-1', iconClassName)}>
        <GraduationCap className={cn('text-primary-foreground', sizes[size].icon)} />
      </div>
      <span className={cn('font-display font-semibold tracking-tight', sizes[size].text, textClassName)}>
        UniPath
      </span>
    </Link>
  );
}
