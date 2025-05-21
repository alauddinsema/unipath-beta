import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { University } from '@/types/university';
import { UniversityCard } from '@/components/universities/UniversityCard';
import { FavoriteNote } from '@/components/universities/FavoriteNote';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface Favorite {
  id: string;
  university_id: string;
  notes: string | null;
  rating: number | null;
  university: University;
}

export default function Favorites() {
  const { session, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!isLoading && !session) {
      navigate('/login');
      return;
    }
    
    if (user) {
      loadFavorites();
    }
  }, [user, isLoading]);
  
  const loadFavorites = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          university_id,
          notes,
          rating,
          university:university_id (*)
        `)
        .eq('user_id', user?.id);
        
      if (error) throw error;
      
      if (data) {
        setFavorites(data as unknown as Favorite[]);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your favorites. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const updateNote = async (favoriteId: string, notes: string | null) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .update({ notes })
        .eq('id', favoriteId);
        
      if (error) throw error;
      
      setFavorites(prev => 
        prev.map(fav => 
          fav.id === favoriteId ? { ...fav, notes } : fav
        )
      );
      
      toast({
        title: 'Note Updated',
        description: 'Your note has been saved successfully.',
      });
    } catch (error) {
      console.error('Error updating note:', error);
      toast({
        title: 'Error',
        description: 'Failed to update your note. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  const updateRating = async (favoriteId: string, rating: number | null) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .update({ rating })
        .eq('id', favoriteId);
        
      if (error) throw error;
      
      setFavorites(prev => 
        prev.map(fav => 
          fav.id === favoriteId ? { ...fav, rating } : fav
        )
      );
    } catch (error) {
      console.error('Error updating rating:', error);
      toast({
        title: 'Error',
        description: 'Failed to update your rating. Please try again.',
        variant: 'destructive',
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <>
      <Navbar />
      <main className="container max-w-6xl pt-24 pb-12 px-4 md:px-6">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2">
          <Heart className="h-6 w-6 text-red-500" />
          My Favorite Universities
        </h1>
        <p className="text-muted-foreground mb-8">
          Manage and organize your saved universities
        </p>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : favorites.length > 0 ? (
          <div className="space-y-8">
            {favorites.map(favorite => (
              <div key={favorite.id} className="space-y-4">
                <UniversityCard university={favorite.university} />
                <FavoriteNote
                  favoriteId={favorite.id}
                  initialNotes={favorite.notes}
                  initialRating={favorite.rating}
                  onUpdateNotes={updateNote}
                  onUpdateRating={updateRating}
                />
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-12 flex flex-col items-center justify-center text-center">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Favorites Yet</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              You haven't saved any universities to your favorites yet.
              Discover universities and click the heart icon to save them here.
            </p>
            <button
              onClick={() => navigate('/discover')}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Discover Universities
            </button>
          </Card>
        )}
      </main>
    </>
  );
}
