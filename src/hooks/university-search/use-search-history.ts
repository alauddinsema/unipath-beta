
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SearchFiltersState } from '@/types/university';

export const useSearchHistory = (userId?: string) => {
  const updateSearchHistory = useCallback(async (filters: SearchFiltersState) => {
    if (!userId) return;
    
    try {
      // Convert filters to a compatible JSON string format
      const queryData = {
        keyword: filters.keyword,
        filters: {
          keyword: filters.keyword,
          country: filters.country,
          region: filters.region,
          scholarshipsOnly: filters.scholarshipsOnly,
          minGpa: filters.minGpa,
          minSatScore: filters.minSatScore,
          minIeltsScore: filters.minIeltsScore,
          minDuolingoScore: filters.minDuolingoScore,
          degreeType: filters.degreeType
        }
      };
      
      await supabase
        .from('search_history')
        .insert({
          user_id: userId,
          query: queryData
        });
    } catch (error) {
      console.error('Error updating search history:', error);
    }
  }, [userId]);

  return { updateSearchHistory };
};
