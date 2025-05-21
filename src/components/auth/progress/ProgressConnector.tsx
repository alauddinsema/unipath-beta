
import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ProgressConnectorProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}

export function ProgressConnector({ active = false, className, ...props }: ProgressConnectorProps) {
  return (
    <div 
      className={cn(
        "h-1 w-16 mx-2 transition-all duration-300 ease-in-out",
        active ? "bg-primary" : "bg-gray-300 dark:bg-gray-700",
        className
      )}
      {...props}
    />
  );
}
