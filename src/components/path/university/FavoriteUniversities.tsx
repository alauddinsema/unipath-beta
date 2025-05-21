
import React from 'react';
import { University } from '@/types/university';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Loader2 } from 'lucide-react';

interface FavoriteUniversitiesProps {
  favoriteUniversities: University[];
  isLoading: boolean;
}

export function FavoriteUniversities({
  favoriteUniversities,
  isLoading
}: FavoriteUniversitiesProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (favoriteUniversities.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="p-6 text-center text-muted-foreground">
          <Heart className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No universities selected yet. Search and add universities to your favorites.</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="space-y-2">
      {favoriteUniversities.map((university) => (
        <Card key={university.id} className="border-primary/30 bg-primary/5">
          <CardContent className="p-4">
            <h4 className="font-medium">{university.name}</h4>
            <p className="text-sm text-muted-foreground">
              {university.city}, {university.country}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
