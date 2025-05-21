
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface FormActionsProps {
  resetFilters: () => void;
}

export function FormActions({ resetFilters }: FormActionsProps) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={resetFilters}
        className="flex-1"
      >
        <RotateCcw className="mr-2 h-4 w-4" />
        Reset
      </Button>
      <Button type="submit" className="flex-1">
        Search
      </Button>
    </div>
  );
}
