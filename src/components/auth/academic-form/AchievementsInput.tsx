
import React, { useState } from 'react';
import { Award, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AchievementsList } from './AchievementsList';

interface AchievementsInputProps {
  achievements: string[];
  onAddAchievement: (achievement: string) => void;
  onRemoveAchievement: (index: number) => void;
}

export const AchievementsInput: React.FC<AchievementsInputProps> = ({
  achievements,
  onAddAchievement,
  onRemoveAchievement,
}) => {
  const [newAchievement, setNewAchievement] = useState('');

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      onAddAchievement(newAchievement.trim());
      setNewAchievement('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddAchievement();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="achievements">Academic Achievements</Label>
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Award className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="newAchievement"
            placeholder="Dean's List, Scholarship, etc."
            className="pl-10"
            value={newAchievement}
            onChange={(e) => setNewAchievement(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button 
          type="button" 
          variant="outline" 
          size="icon"
          onClick={handleAddAchievement}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <AchievementsList 
        achievements={achievements} 
        onRemove={onRemoveAchievement} 
      />
    </div>
  );
};
