
import { supabase } from './client';
import { SearchFiltersState, University } from '@/types/university';

export const searchUniversities = async (filters: SearchFiltersState, page = 0, pageSize = 20) => {
  try {
    console.log('Searching with filters:', filters);
    
    let query = supabase
      .from('universities')
      .select('*');
    
    // Apply filters
    if (filters.keyword && filters.keyword.trim() !== '') {
      query = query.ilike('name', `%${filters.keyword.trim()}%`);
    }
    
    if (filters.country && filters.country !== '') {
      query = query.eq('country', filters.country);
    }
    
    if (filters.region && filters.region !== '') {
      query = query.eq('region', filters.region);
    }
    
    if (filters.scholarshipsOnly) {
      query = query.eq('scholarships_available', true);
    }
    
    if (filters.minGpa && parseFloat(filters.minGpa) > 0) {
      query = query.gte('min_gpa', parseFloat(filters.minGpa));
    }
    
    if (filters.minSatScore && parseInt(filters.minSatScore) > 0) {
      query = query.gte('min_sat_score', parseInt(filters.minSatScore));
    }
    
    if (filters.minIeltsScore && parseFloat(filters.minIeltsScore) > 0) {
      query = query.gte('min_ielts_score', parseFloat(filters.minIeltsScore));
    }

    if (filters.minDuolingoScore && parseInt(filters.minDuolingoScore) > 0) {
      query = query.gte('min_duolingo_score', parseInt(filters.minDuolingoScore));
    }
    
    if (filters.degreeType && filters.degreeType !== '' && filters.degreeType !== '_none') {
      query = query.eq('degree_type', filters.degreeType);
    }
    
    // Add pagination
    const from = page * pageSize;
    const to = from + pageSize - 1;
    
    console.log(`Executing search query with range ${from}-${to}`);
    const result = await query.range(from, to);
    console.log('Search results:', result.data?.length || 0, 'universities found');
    
    return result;
  } catch (error) {
    console.error('Error searching universities:', error);
    return { data: [], error };
  }
};

export const updateSearchCredits = async (userId: string) => {
  if (!userId) return null;
  
  try {
    // Get current credits
    const { data: creditsData, error: creditsError } = await supabase
      .from('user_credits')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle(); // Changed from single() to avoid errors when no record exists
      
    if (creditsError && creditsError.code !== 'PGRST116') {
      console.error('Error fetching user credits:', creditsError);
      return null;
    }
    
    if (!creditsData) {
      // Initialize user credits if not found
      console.log('Creating new user credits record');
      const { data: newCredits, error: newCreditsError } = await supabase
        .from('user_credits')
        .insert({
          user_id: userId,
          total_credits: 10,
          used_credits: 1
        })
        .select()
        .single();
        
      if (newCreditsError) {
        console.error('Error creating user credits:', newCreditsError);
        return null;
      }
      
      return {
        totalCredits: newCredits.total_credits,
        usedCredits: newCredits.used_credits
      };
    }
    
    // Increment used credits
    console.log('Updating existing user credits');
    const { data: updatedCredits, error: updateError } = await supabase
      .from('user_credits')
      .update({
        used_credits: creditsData.used_credits + 1,
        last_updated: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();
      
    if (updateError) {
      console.error('Error updating user credits:', updateError);
      return null;
    }
    
    return {
      totalCredits: updatedCredits.total_credits,
      usedCredits: updatedCredits.used_credits
    };
  } catch (error) {
    console.error('Error in updateSearchCredits:', error);
    return null;
  }
};
