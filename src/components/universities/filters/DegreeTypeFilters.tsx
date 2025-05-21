
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEGREE_TYPES } from './search-constants';

interface DegreeTypeFiltersProps {
  degreeType: string;
  onFilterChange: (name: string, value: string) => void;
}

export function DegreeTypeFilters({
  degreeType,
  onFilterChange
}: DegreeTypeFiltersProps) {
  const handleValueChange = (value: string) => {
    // If "_none" is selected, we want to set an empty string in the filters
    onFilterChange('degreeType', value === '_none' ? '' : value);
  };

  return (
    <div>
      <Label htmlFor="degreeType" className="text-sm">Degree Type</Label>
      <Select
        value={degreeType || '_none'}
        onValueChange={handleValueChange}
      >
        <SelectTrigger id="degreeType" className="w-full">
          <SelectValue placeholder="Any Degree Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="_none">Any Degree Type</SelectItem>
          {DEGREE_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
