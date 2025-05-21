
import React from 'react';
import { DiscoverContent } from '@/components/discover/DiscoverContent';
import { SearchFiltersState, University } from '@/types/university';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface SearchTabProps {
  universities: University[];
  recommendedUniversities: University[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  searchPerformed: boolean;
  showRecommendations: boolean;
  searchFilters: SearchFiltersState;
  handleFilterSearch: (filters: SearchFiltersState) => void;
  searchError?: Error | null;
}

export function SearchTab({
  universities,
  recommendedUniversities,
  loading,
  hasMore,
  loadMore,
  searchPerformed,
  showRecommendations,
  searchFilters,
  handleFilterSearch,
  searchError
}: SearchTabProps) {
  const { user } = useAuth();
  
  // Display setup guidance if there's a database issue
  const isDatabaseError = searchError && 
    searchError.message && 
    searchError.message.includes("relation \"public.universities\" does not exist");
  
  return (
    <>
      {isDatabaseError && user && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>University Database Not Set Up</AlertTitle>
          <AlertDescription>
            The university database needs to be initialized. Please visit the Admin page to set up the
            universities table and import university data.
          </AlertDescription>
        </Alert>
      )}
      
      <DiscoverContent
        universities={universities}
        recommendedUniversities={recommendedUniversities}
        loading={loading}
        hasMore={hasMore}
        loadMore={loadMore}
        searchPerformed={searchPerformed}
        showRecommendations={showRecommendations}
        searchFilters={searchFilters}
        handleFilterSearch={handleFilterSearch}
      />
    </>
  );
}
