
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ScoreSelectProps {
  id: string;
  label: string;
  value: string;
  options: string[];
  placeholder: string;
  onValueChange: (value: string) => void;
}

export function ScoreSelect({
  id,
  label,
  value,
  options,
  placeholder,
  onValueChange
}: ScoreSelectProps) {
  const handleValueChange = (selectedValue: string) => {
    if (selectedValue === '_none') {
      onValueChange('');
    } else {
      onValueChange(selectedValue);
    }
  };

  return (
    <div>
      <Label htmlFor={id} className="text-sm">{label}</Label>
      <Select
        value={value || '_none'}
        onValueChange={handleValueChange}
      >
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_none">{placeholder}</SelectItem>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}+
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
