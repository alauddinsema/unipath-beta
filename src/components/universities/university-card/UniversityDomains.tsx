
import { Building } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { University } from '@/types/university';

interface UniversityDomainsProps {
  domains: string[] | null;
}

export function UniversityDomains({ domains }: UniversityDomainsProps) {
  if (!domains || domains.length === 0) return null;
  
  return (
    <div className="flex items-start gap-2">
      <Building className="h-4 w-4 text-primary shrink-0 mt-0.5" />
      <div>
        <span className="font-medium">Domains:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {domains.map(domain => (
            <Badge key={domain} variant="secondary" className="text-xs">
              {domain}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
