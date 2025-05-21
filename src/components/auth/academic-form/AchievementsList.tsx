
import React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AchievementsListProps {
  achievements: string[];
  onRemove: (index: number) => void;
}

export const AchievementsList: React.FC<AchievementsListProps> = ({
  achievements,
  onRemove,
}) => {
  if (achievements.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {achievements.map((achievement, index) => (
        <Badge key={index} variant="secondary" className="flex items-center gap-1">
          {achievement}
          <button 
            type="button" 
            onClick={() => onRemove(index)}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
};
