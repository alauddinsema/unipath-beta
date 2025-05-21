
import React from 'react';
import { Progress } from '@/components/ui/progress';

export interface ProgressBarProps {
  progressPercentage: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progressPercentage }) => {
  return (
    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full z-0">
      <Progress 
        value={progressPercentage} 
        className="h-1"
      />
    </div>
  );
};
