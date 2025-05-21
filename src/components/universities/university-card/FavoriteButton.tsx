
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FavoriteButtonProps {
  universityId: string;
}

export function FavoriteButton({ universityId }: FavoriteButtonProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const checkFavorite = async () => {
      if (!user) return;
      
      try {
        // Using the raw client without type checking
        const { data, error } = await supabase
          .from('favorites')
          .select('id')
          .eq('user_id', user.id)
          .eq('university_id', universityId)
          .maybeSingle();
          
        if (error) throw error;
        setIsFavorite(!!data);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    
    checkFavorite();
  }, [user, universityId]);
  
  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please log in to save universities to favorites',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isFavorite) {
        // Using the raw client without type checking
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('university_id', universityId);
          
        if (error) throw error;
        
        toast({
          title: 'Removed from Favorites',
          description: 'This university has been removed from your favorites',
        });
      } else {
        // Using the raw client without type checking
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            university_id: universityId
          });
          
        if (error) throw error;
        
        toast({
          title: 'Added to Favorites',
          description: 'This university has been added to your favorites',
        });
      }
      
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling favorite status:', error);
      toast({
        title: 'Error',
        description: 'Failed to update favorites. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleFavorite}
      disabled={isLoading}
      className={isFavorite ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-red-500"}
    >
      <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
    </Button>
  );
}
