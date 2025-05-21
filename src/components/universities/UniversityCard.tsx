
import { University } from '@/types/university';
import { UniversityCard as RefactoredUniversityCard } from './university-card';

interface UniversityCardProps {
  university: University;
}

// This is a wrapper component that maintains backwards compatibility
export function UniversityCard({ university }: UniversityCardProps) {
  return <RefactoredUniversityCard university={university} />;
}
