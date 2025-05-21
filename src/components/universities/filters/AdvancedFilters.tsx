
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { GraduationCap, Lock } from 'lucide-react';
import { SearchFiltersState } from '@/types/university';
import { DegreeTypeFilters } from './DegreeTypeFilters';
import { AcademicRequirements } from './AcademicRequirements';
import { ScholarshipFilter } from './ScholarshipFilter';
import { hasAdvancedSearchAccess } from '@/utils/feature-access';

interface AdvancedFiltersProps {
  filters: SearchFiltersState;
  onFilterChange: (name: string, value: any) => void;
  planType?: 'free' | 'basic' | 'premium';
}

export function AdvancedFilters({ 
  filters, 
  onFilterChange,
  planType = 'free'
}: AdvancedFiltersProps) {
  const [showAcademicFilters, setShowAcademicFilters] = useState(false);
  const hasAdvancedAccess = hasAdvancedSearchAccess(planType);

  return (
    <>
      {/* Scholarship Filter - Available to all plans */}
      <ScholarshipFilter 
        isChecked={filters.scholarshipsOnly}
        onCheckedChange={(checked) => onFilterChange('scholarshipsOnly', checked === true)}
      />

      {/* Degree Type Filter - Only for basic/premium plans */}
      {hasAdvancedAccess ? (
        <DegreeTypeFilters
          degreeType={filters.degreeType}
          onFilterChange={onFilterChange}
        />
      ) : (
        <div className="rounded-md border p-4 bg-muted/10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>Degree Type Filters</span>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/purchase-credits">Upgrade</Link>
          </Button>
        </div>
      )}
      
      {/* Toggle Academic Filters */}
      <Button
        type="button"
        variant="ghost"
        className="w-full flex items-center justify-center gap-2"
        onClick={() => setShowAcademicFilters(!showAcademicFilters)}
        disabled={!hasAdvancedAccess}
      >
        {hasAdvancedAccess ? (
          <>
            <GraduationCap className="h-4 w-4" />
            {showAcademicFilters ? 'Hide Academic Requirements' : 'Show Academic Requirements'}
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            <span>Academic Requirements (Premium Feature)</span>
          </>
        )}
      </Button>
      
      {showAcademicFilters && hasAdvancedAccess && (
        <ScrollArea className="h-64 rounded-md border p-4">
          <AcademicRequirements
            minGpa={filters.minGpa}
            minSatScore={filters.minSatScore}
            minIeltsScore={filters.minIeltsScore}
            minDuolingoScore={filters.minDuolingoScore}
            onFilterChange={onFilterChange}
          />
        </ScrollArea>
      )}
    </>
  );
}

// Add this import at the top of the file
import { Link } from 'react-router-dom';
