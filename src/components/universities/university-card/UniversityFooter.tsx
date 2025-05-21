
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { University } from '@/types/university';

interface UniversityFooterProps {
  university: University;
}

export function UniversityFooter({ university }: UniversityFooterProps) {
  // Get website from either website field or first entry in web_pages array
  const websiteUrl = university.website || (university.web_pages && university.web_pages.length > 0 ? university.web_pages[0] : null);
  
  return (
    <div className="flex justify-between pt-0">
      <div className="flex gap-2">
        {university.scholarships_available && (
          <Badge className="bg-green-500 hover:bg-green-600">Scholarships Available</Badge>
        )}
        
        {university.alpha_two_code && (
          <Badge variant="outline">
            {university.alpha_two_code}
          </Badge>
        )}
      </div>
      
      {websiteUrl && (
        <Button variant="outline" size="sm" className="gap-1">
          <ExternalLink className="h-4 w-4" />
          <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </Button>
      )}
    </div>
  );
}
