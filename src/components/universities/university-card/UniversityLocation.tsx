
import { Globe, MapPin } from 'lucide-react';
import { University } from '@/types/university';

interface UniversityLocationProps {
  university: University;
}

export function UniversityLocation({ university }: UniversityLocationProps) {
  return (
    <>
      <div className="flex items-center text-muted-foreground text-sm">
        <Globe className="h-3.5 w-3.5 mr-1" />
        {university.city && university.state_province ? (
          `${university.city}, ${university.state_province}, ${university.country}`
        ) : university.city ? (
          `${university.city}, ${university.country}`
        ) : (
          university.country
        )}
      </div>
      {university.region && (
        <div className="text-sm text-muted-foreground mt-1">
          <MapPin className="h-3.5 w-3.5 inline mr-1" />
          Region: {university.region}
        </div>
      )}
    </>
  );
}
