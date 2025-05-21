
import React from 'react';
import { cn } from '@/lib/utils';

interface PathConnectorProps {
  status?: 'completed' | 'current' | 'locked' | 'available';
  direction?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PathConnector({ 
  status = 'available',
  direction = 'vertical',
  size = 'md',
  className
}: PathConnectorProps) {
  // Determine colors based on status
  const getColor = () => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-primary';
      case 'available': return 'bg-muted';
      case 'locked': return 'bg-muted/50';
      default: return 'bg-muted';
    }
  };
  
  // Determine size
  const getSize = () => {
    if (direction === 'vertical') {
      switch (size) {
        case 'sm': return 'h-16 w-0.5';
        case 'md': return 'h-24 w-0.5';
        case 'lg': return 'h-32 w-0.5';
        default: return 'h-24 w-0.5';
      }
    } else {
      switch (size) {
        case 'sm': return 'h-0.5 w-16';
        case 'md': return 'h-0.5 w-24';
        case 'lg': return 'h-0.5 w-32';
        default: return 'h-0.5 w-24';
      }
    }
  };
  
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn(
        getSize(),
        getColor(),
        'rounded-full'
      )} />
    </div>
  );
}
