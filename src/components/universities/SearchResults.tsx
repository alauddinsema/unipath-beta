
import React from 'react';
import { UniversityCard } from '@/components/universities/UniversityCard';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle, ThumbsUp } from 'lucide-react';
import { University } from '@/types/university';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SearchResultsProps {
  universities: University[];
  recommendedUniversities?: University[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  searchPerformed?: boolean;
  showRecommendations?: boolean;
}

export function SearchResults({ 
  universities, 
  recommendedUniversities,
  loading, 
  hasMore, 
  loadMore,
  searchPerformed = false,
  showRecommendations = true
}: SearchResultsProps) {
  if (loading && universities.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (universities.length === 0) {
    return (
      <div className="space-y-6">
        {searchPerformed && (
          <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-black">
            <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
            <p className="text-lg text-white">
              No universities found matching your criteria
            </p>
          </div>
        )}
        
        {showRecommendations && recommendedUniversities && recommendedUniversities.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ThumbsUp className="h-5 w-5 mr-2 text-primary" />
                Recommended Universities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 grid-cols-1">
                {recommendedUniversities.map((university) => (
                  <UniversityCard 
                    key={university.id} 
                    university={university} 
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
  
  return (
    <>
      <div className="grid gap-6 grid-cols-1">
        {universities.map((university) => (
          <UniversityCard 
            key={university.id} 
            university={university} 
          />
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            onClick={loadMore}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </>
  );
}
