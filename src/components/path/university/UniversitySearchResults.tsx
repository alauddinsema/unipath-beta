
import React from 'react';
import { University } from '@/types/university';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Heart, Loader2 } from 'lucide-react';

interface UniversitySearchResultsProps {
  searchTerm: string;
  universities: University[];
  isSearching: boolean;
  favoriteUniversities: University[];
  onAddToFavorites: (university: University) => void;
}

export function UniversitySearchResults({
  searchTerm,
  universities,
  isSearching,
  favoriteUniversities,
  onAddToFavorites
}: UniversitySearchResultsProps) {
  if (isSearching) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (universities.length === 0) {
    return searchTerm ? (
      <p className="text-center text-muted-foreground py-2">No universities found</p>
    ) : null;
  }
  
  const isUniversityInFavorites = (university: University) => {
    return favoriteUniversities.some(u => u.id === university.id);
  };
  
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Search Results</h3>
      {universities.map((university) => (
        <Card key={university.id} className="overflow-hidden hover:border-primary/50 transition-colors">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h4 className="font-medium">{university.name}</h4>
              <p className="text-sm text-muted-foreground">
                {university.city}, {university.country}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onAddToFavorites(university)}
              disabled={isUniversityInFavorites(university)}
              className="hover:bg-primary/10"
            >
              {isUniversityInFavorites(university) ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Heart className="h-4 w-4" />
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
