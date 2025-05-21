
import { University, SearchFiltersState } from '@/types/university';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useSearchUniversities() {
  const { toast } = useToast();

  // Search universities
  const searchUniversities = async (
    searchFilters: SearchFiltersState,
    page = 1
  ): Promise<{ universities: University[], hasMore: boolean, recommendedUniversities?: University[] }> => {
    try {
      let query = supabase
        .from('universities')
        .select('*');
      
      // Apply filters
      if (searchFilters.keyword) {
        query = query.ilike('name', `%${searchFilters.keyword}%`);
      }
      
      if (searchFilters.country) {
        query = query.eq('country', searchFilters.country);
      }
      
      if (searchFilters.region) {
        query = query.eq('region', searchFilters.region);
      }
      
      if (searchFilters.scholarshipsOnly) {
        query = query.eq('scholarships_available', true);
      }
      
      if (searchFilters.minGpa && parseFloat(searchFilters.minGpa) > 0) {
        query = query.or(`min_gpa.lte.${parseFloat(searchFilters.minGpa)},min_gpa.is.null`);
      }
      
      if (searchFilters.minSatScore && parseInt(searchFilters.minSatScore) > 0) {
        query = query.or(`min_sat_score.lte.${parseInt(searchFilters.minSatScore)},min_sat_score.is.null`);
      }
      
      if (searchFilters.minIeltsScore && parseFloat(searchFilters.minIeltsScore) > 0) {
        query = query.or(`min_ielts_score.lte.${parseFloat(searchFilters.minIeltsScore)},min_ielts_score.is.null`);
      }

      if (searchFilters.minDuolingoScore && parseInt(searchFilters.minDuolingoScore) > 0) {
        query = query.or(`min_duolingo_score.lte.${parseInt(searchFilters.minDuolingoScore)},min_duolingo_score.is.null`);
      }
      
      if (searchFilters.degreeType) {
        query = query.eq('degree_type', searchFilters.degreeType);
      }
      
      // Pagination
      const pageSize = 10;
      const start = (page - 1) * pageSize;
      const end = start + pageSize - 1;
      
      query = query.range(start, end);
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Transform the data to match our University interface
      const transformedData: University[] = data ? data.map(item => ({
        id: item.id,
        name: item.name,
        country: item.country,
        state_province: item.state_province,
        city: item.city,
        website: item.website,
        founded_year: item.founded_year,
        alpha_two_code: item.alpha_two_code,
        domains: Array.isArray(item.domains) ? item.domains : [],
        web_pages: Array.isArray(item.web_pages) ? item.web_pages : [],
        latitude: item.latitude,
        longitude: item.longitude,
        logo_url: item.logo_url,
        region: item.region,
        scholarships_available: !!item.scholarships_available,
        acceptance_rate: item.acceptance_rate,
        student_faculty_ratio: item.student_faculty_ratio,
        min_gpa: item.min_gpa,
        min_sat_score: item.min_sat_score,
        min_ielts_score: item.min_ielts_score,
        min_duolingo_score: item.min_duolingo_score,
        degree_type: item.degree_type
      })) : [];
      
      // If no results are found with the keyword, fetch recommended universities
      let recommendedUniversities: University[] | undefined;
      
      if (transformedData.length === 0) {
        // Get popular or top-rated universities as recommendations
        const { data: recommendedData, error: recommendedError } = await supabase
          .from('universities')
          .select('*')
          .order('acceptance_rate', { ascending: true })
          .limit(5);
          
        if (!recommendedError && recommendedData) {
          recommendedUniversities = recommendedData.map(item => ({
            id: item.id,
            name: item.name,
            country: item.country,
            state_province: item.state_province,
            city: item.city,
            website: item.website,
            founded_year: item.founded_year,
            alpha_two_code: item.alpha_two_code,
            domains: Array.isArray(item.domains) ? item.domains : [],
            web_pages: Array.isArray(item.web_pages) ? item.web_pages : [],
            latitude: item.latitude,
            longitude: item.longitude,
            logo_url: item.logo_url,
            region: item.region,
            scholarships_available: !!item.scholarships_available,
            acceptance_rate: item.acceptance_rate,
            student_faculty_ratio: item.student_faculty_ratio,
            min_gpa: item.min_gpa,
            min_sat_score: item.min_sat_score,
            min_ielts_score: item.min_ielts_score,
            min_duolingo_score: item.min_duolingo_score,
            degree_type: item.degree_type
          }));
        }
      }
      
      return {
        universities: transformedData,
        hasMore: data ? data.length === pageSize : false,
        recommendedUniversities
      };
    } catch (error) {
      console.error('Error searching universities:', error);
      toast({
        title: 'Error',
        description: 'Failed to load universities. Please try again.',
        variant: 'destructive',
      });
      return { universities: [], hasMore: false };
    }
  };

  return {
    searchUniversities
  };
}
