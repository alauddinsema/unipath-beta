
import { useState, useEffect } from 'react';
import { University } from '@/types/university';
import { supabase } from '@/integrations/supabase/client';

export const useRecommendedUniversities = () => {
  const [recommendedUniversities, setRecommendedUniversities] = useState<University[]>([]);

  // Load initial recommended universities
  useEffect(() => {
    const loadRecommendedUniversities = async () => {
      try {
        const { data, error } = await supabase
          .from('universities')
          .select('*')
          .limit(5)
          .order('acceptance_rate', { ascending: false });
          
        if (error) throw error;
        
        if (data) {
          setRecommendedUniversities(data);
        }
      } catch (error) {
        console.error('Error loading recommended universities:', error);
      }
    };
    
    loadRecommendedUniversities();
  }, []);

  return { recommendedUniversities };
};
