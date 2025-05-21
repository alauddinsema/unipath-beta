
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface ScholarshipFilterProps {
  isChecked: boolean;
  onCheckedChange: (checked: boolean | "indeterminate") => void;
}

export function ScholarshipFilter({ isChecked, onCheckedChange }: ScholarshipFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="scholarshipsOnly"
        name="scholarshipsOnly"
        checked={isChecked}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor="scholarshipsOnly" className="text-sm cursor-pointer">
        Scholarships Available
      </Label>
    </div>
  );
}
