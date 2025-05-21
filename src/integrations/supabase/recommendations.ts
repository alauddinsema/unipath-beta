
import { supabase } from './client';
import { University } from '@/types/university';

export const getRecommendedUniversities = async (userId: string): Promise<University[]> => {
  if (!userId) return [];
  
  try {
    // Get user's academic profile to provide tailored recommendations
    const { data: academicProfile, error: profileError } = await supabase
      .from('academic_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
      
    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching academic profile:', profileError);
    }
    
    // Query for recommended universities
    let query = supabase
      .from('universities')
      .select('*');
      
    // Apply personalized filters if profile exists
    if (academicProfile) {
      if (academicProfile.gpa) {
        query = query.lte('min_gpa', academicProfile.gpa);
      }
      
      if (academicProfile.sat_score) {
        query = query.lte('min_sat_score', academicProfile.sat_score);
      }
      
      if (academicProfile.ielts_score) {
        query = query.lte('min_ielts_score', academicProfile.ielts_score);
      }
    }
    
    // Get universities with scholarships as a priority
    query = query.eq('scholarships_available', true);
    
    const { data, error } = await query.limit(5);
    
    if (error) {
      console.error('Error fetching recommended universities:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in getRecommendedUniversities:', error);
    return [];
  }
};
