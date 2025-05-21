
import { useState, useCallback } from 'react';
import { searchUniversities } from '@/integrations/supabase/universities';
import { SearchFiltersState, University } from '@/types/university';
import { useToast } from '@/hooks/use-toast';
import { useSearchHistory } from './use-search-history';
import { useRecommendedUniversities } from './use-recommended-universities';

export const useUniversitySearch = (userId?: string) => {
  const { toast } = useToast();
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const [searchError, setSearchError] = useState<Error | null>(null);
  const pageSize = 20;
  
  const [searchFilters, setSearchFilters] = useState<SearchFiltersState>({
    keyword: '',
    country: '',
    region: '',
    scholarshipsOnly: false,
    minGpa: '',
    minSatScore: '',
    minIeltsScore: '',
    minDuolingoScore: '',
    degreeType: ''
  });

  const { updateSearchHistory } = useSearchHistory(userId);
  const { recommendedUniversities } = useRecommendedUniversities();

  const handleSearch = useCallback(async (filters: SearchFiltersState) => {
    setLoading(true);
    setSearchFilters(filters);
    setCurrentPage(0);
    setUniversities([]);
    setSearchError(null);
    
    try {
      if (userId) {
        await updateSearchHistory(filters);
      }
      
      const { data, error } = await searchUniversities(filters, 0, pageSize);
      
      if (error) {
        throw error;
      }
      
      setUniversities(data || []);
      setHasMore((data?.length || 0) >= pageSize);
      setShowRecommendations(data?.length === 0);
      
    } catch (error) {
      console.error('Search error:', error);
      setSearchError(error as Error);
      toast({
        title: 'Search Error',
        description: 'An error occurred while searching. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [userId, updateSearchHistory, toast, pageSize]);

  const loadMore = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    const nextPage = currentPage + 1;
    
    try {
      const { data, error } = await searchUniversities(searchFilters, nextPage, pageSize);
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        setUniversities(prev => [...prev, ...data]);
        setHasMore(data.length >= pageSize);
        setCurrentPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more universities:', error);
      setSearchError(error as Error);
      toast({
        title: 'Error',
        description: 'Failed to load more universities. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [loading, currentPage, searchFilters, toast, pageSize]);

  return {
    universities,
    recommendedUniversities,
    loading,
    searchFilters,
    hasMore,
    handleSearch,
    loadMore,
    showRecommendations,
    searchError
  };
};
