
import { useState, useEffect } from 'react';
import { University } from '@/types/university';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useUniversitySelection(userId: string | undefined, dialogOpen: boolean) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [universities, setUniversities] = useState<University[]>([]);
  const [favoriteUniversities, setFavoriteUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (dialogOpen && userId) {
      fetchFavoriteUniversities();
    }
  }, [dialogOpen, userId]);

  const fetchFavoriteUniversities = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          university:universities (
            id,
            name,
            country,
            city,
            state_province,
            domains,
            web_pages
          )
        `)
        .eq('user_id', userId);
        
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Properly extract university data
        const extractedUniversities: University[] = [];
        
        for (const item of data) {
          if (item.university) {
            // Ensuring item.university is treated as a single University object
            const universityData = item.university as unknown as University;
            extractedUniversities.push(universityData);
          }
        }
        
        setFavoriteUniversities(extractedUniversities);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your favorite universities.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const searchUniversities = async () => {
    if (!searchTerm.trim()) {
      setUniversities([]);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('*')
        .ilike('name', `%${searchTerm}%`)
        .limit(10);

      if (error) throw error;
      
      console.log('Search results:', data);
      if (data) {
        setUniversities(data as University[]);
      }
    } catch (error) {
      console.error('Error searching universities:', error);
      toast({
        title: 'Error',
        description: 'Failed to search universities.',
        variant: 'destructive',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const addToFavorites = async (university: University) => {
    if (!userId) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to save universities to favorites',
        variant: 'destructive',
      });
      return;
    }
    
    if (favoriteUniversities.some(u => u.id === university.id)) {
      toast({
        title: 'Already in Favorites',
        description: 'This university is already in your favorites',
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: userId,
          university_id: university.id
        });
          
      if (error) throw error;
      
      setFavoriteUniversities(prev => [...prev, university]);
      
      toast({
        title: 'Added to Favorites',
        description: 'This university has been added to your favorites',
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to add university to favorites. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const validateSelection = () => {
    if (favoriteUniversities.length === 0) {
      toast({
        title: 'No Universities Selected',
        description: 'Please select at least one university before completing this step.',
        variant: 'destructive',
      });
      return false;
    }
    return true;
  };

  return {
    searchTerm,
    setSearchTerm,
    universities,
    favoriteUniversities,
    isLoading,
    isSearching,
    searchUniversities,
    addToFavorites,
    validateSelection
  };
}
