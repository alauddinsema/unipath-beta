
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface ToggleAdvancedFiltersProps {
  showAllFilters: boolean;
  toggleFilters: () => void;
}

export function ToggleAdvancedFilters({ showAllFilters, toggleFilters }: ToggleAdvancedFiltersProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full flex items-center justify-center gap-2 group transition-all duration-300 hover:bg-primary/10"
      onClick={toggleFilters}
    >
      <Filter className="h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
      <span className="group-hover:tracking-wide transition-all duration-300">
        {showAllFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
      </span>
    </Button>
  );
}
