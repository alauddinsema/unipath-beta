
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface GpaFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const GpaField: React.FC<GpaFieldProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="gpa">
        GPA (0.0 - 4.0) <span className="text-destructive">*</span>
      </Label>
      <div className="relative">
        <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="gpa"
          name="gpa"
          type="number"
          step="0.01"
          min="0"
          max="4.0"
          placeholder="3.5"
          className="pl-10"
          value={value || ''}
          onChange={onChange}
          required
        />
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};
