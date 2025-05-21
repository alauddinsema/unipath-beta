
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { University } from '@/types/university';
import { UniversityLocation } from './UniversityLocation';
import { UniversityDomains } from './UniversityDomains';
import { UniversityDetails } from './UniversityDetails';
import { UniversityFooter } from './UniversityFooter';
import { FavoriteButton } from './FavoriteButton';

interface UniversityCardProps {
  university: University;
}

export function UniversityCard({ university }: UniversityCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl mb-1">{university.name}</CardTitle>
            <UniversityLocation university={university} />
          </div>
          <FavoriteButton universityId={university.id} />
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid gap-2 text-sm">
          <UniversityDomains domains={university.domains} />
          <UniversityDetails university={university} />
        </div>
      </CardContent>
      
      <CardFooter>
        <UniversityFooter university={university} />
      </CardFooter>
    </Card>
  );
}
