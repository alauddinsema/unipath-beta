
import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface InstitutionFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const InstitutionField: React.FC<InstitutionFieldProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="institutionName">
        Institution Name <span className="text-destructive">*</span>
      </Label>
      <div className="relative">
        <GraduationCap className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          id="institutionName"
          name="institutionName"
          placeholder="Harvard University"
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
