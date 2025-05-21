
import React from 'react';
import { SearchFilters } from '@/components/universities/SearchFilters';
import { SearchResults } from '@/components/universities/SearchResults';
import { SearchFiltersState } from '@/types/university';

interface DiscoverContentProps {
  universities: any[];
  recommendedUniversities: any[];
  loading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  searchPerformed: boolean;
  showRecommendations: boolean;
  searchFilters: SearchFiltersState;
  handleFilterSearch: (filters: SearchFiltersState) => void;
}

export function DiscoverContent({
  universities,
  recommendedUniversities,
  loading,
  hasMore,
  loadMore,
  searchPerformed,
  showRecommendations,
  searchFilters,
  handleFilterSearch
}: DiscoverContentProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/3 relative">
        <SearchFilters 
          onSearch={handleFilterSearch} 
          initialFilters={searchFilters}
        />
      </div>
      
      <div className="w-full lg:w-2/3">
        <div className="animate-fade-in">
          <SearchResults
            universities={universities}
            recommendedUniversities={recommendedUniversities}
            loading={loading}
            hasMore={hasMore}
            loadMore={loadMore}
            searchPerformed={searchPerformed}
            showRecommendations={showRecommendations}
          />
        </div>
      </div>
    </div>
  );
}
