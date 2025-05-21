
import React from 'react';
import { ScoreSelect } from './ScoreSelect';
import { MIN_GPA_VALUES, MIN_SAT_VALUES, MIN_IELTS_VALUES, MIN_DUOLINGO_VALUES } from './search-constants';

interface AcademicRequirementsProps {
  minGpa: string;
  minSatScore: string;
  minIeltsScore: string;
  minDuolingoScore: string;
  onFilterChange: (name: string, value: string) => void;
}

export function AcademicRequirements({
  minGpa,
  minSatScore,
  minIeltsScore,
  minDuolingoScore,
  onFilterChange
}: AcademicRequirementsProps) {
  return (
    <div className="space-y-4">
      <ScoreSelect
        id="minGpa"
        label="Minimum GPA"
        value={minGpa}
        options={MIN_GPA_VALUES}
        placeholder="Any GPA"
        onValueChange={(value) => onFilterChange('minGpa', value)}
      />

      <ScoreSelect
        id="minSatScore"
        label="Minimum SAT Score"
        value={minSatScore}
        options={MIN_SAT_VALUES}
        placeholder="Any SAT Score"
        onValueChange={(value) => onFilterChange('minSatScore', value)}
      />

      <ScoreSelect
        id="minIeltsScore"
        label="Minimum IELTS Score"
        value={minIeltsScore}
        options={MIN_IELTS_VALUES}
        placeholder="Any IELTS Score"
        onValueChange={(value) => onFilterChange('minIeltsScore', value)}
      />

      <ScoreSelect
        id="minDuolingoScore"
        label="Minimum Duolingo Score"
        value={minDuolingoScore}
        options={MIN_DUOLINGO_VALUES}
        placeholder="Any Duolingo Score"
        onValueChange={(value) => onFilterChange('minDuolingoScore', value)}
      />
    </div>
  );
}
