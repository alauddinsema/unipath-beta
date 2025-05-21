
import React from 'react';

export interface ProgressStepProps {
  stepNumber: number;
  label: string;
  active: boolean;
  current: boolean;
  icon?: React.ReactNode;
}

export function ProgressStep({ stepNumber, label, active, current, icon }: ProgressStepProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
          current
            ? 'bg-primary text-primary-foreground border-primary'
            : active
            ? 'bg-primary/80 text-primary-foreground border-primary/80'
            : 'bg-secondary text-secondary-foreground border-secondary'
        } border-2`}
      >
        {icon || stepNumber}
      </div>
      <span className={`mt-2 text-xs ${active ? 'text-primary' : 'text-muted-foreground'}`}>
        {label}
      </span>
    </div>
  );
}
