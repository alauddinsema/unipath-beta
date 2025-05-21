
import { GraduationCap } from 'lucide-react';
import { University } from '@/types/university';

interface UniversityDetailsProps {
  university: University;
}

export function UniversityDetails({ university }: UniversityDetailsProps) {
  if (!university.acceptance_rate && !university.student_faculty_ratio) return null;
  
  return (
    <div className="flex items-start gap-2">
      <GraduationCap className="h-4 w-4 text-primary shrink-0 mt-0.5" />
      <div>
        <span className="font-medium">Details:</span>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1">
          {university.acceptance_rate && (
            <div>
              <span className="text-xs text-muted-foreground">Acceptance Rate</span>
              <p className="font-medium">{university.acceptance_rate}%</p>
            </div>
          )}
          
          {university.student_faculty_ratio && (
            <div>
              <span className="text-xs text-muted-foreground">Student/Faculty</span>
              <p className="font-medium">{university.student_faculty_ratio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
