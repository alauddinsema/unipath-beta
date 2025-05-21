import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { University } from '@/types/university';

interface UniversitySelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectionComplete: () => void;
}

export function UniversitySelectionDialog({
  open,
  onOpenChange,
  onSelectionComplete
}: UniversitySelectionDialogProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<University[]>([]);
  const [selectedUniversities, setSelectedUniversities] = useState<University[]>([]);
  const [favoriteUniversities, setFavoriteUniversities] = useState<University[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (open && user) {
      fetchFavoriteUniversities();
    }
  }, [open, user]);

  const fetchFavoriteUniversities = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          university_id,
          university:universities (
            id,
            name,
            country,
            city
          )
        `)
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        const extractedUniversities: University[] = [];
        
        for (const item of data) {
          if (item.university) {
            const universityData = item.university as unknown as University;
            extractedUniversities.push(universityData);
          }
        }
        
        setFavoriteUniversities(extractedUniversities);
        setSelectedUniversities(extractedUniversities.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching favorite universities:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your favorite universities',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('id, name, country, city')
        .ilike('name', `%${searchQuery}%`)
        .limit(10);
      
      if (error) throw error;
      
      if (data) {
        setSearchResults(data as University[]);
      }
    } catch (error) {
      console.error('Error searching universities:', error);
      toast({
        title: 'Error',
        description: 'Failed to search universities',
        variant: 'destructive'
      });
    } finally {
      setIsSearching(false);
    }
  };

  const toggleUniversitySelection = (university: University) => {
    setSelectedUniversities(prev => {
      const isSelected = prev.some(u => u.id === university.id);
      
      if (isSelected) {
        return prev.filter(u => u.id !== university.id);
      } else {
        if (prev.length >= 10) {
          toast({
            title: 'Selection Limit',
            description: 'You can select up to 10 universities',
            variant: 'destructive'
          });
          return prev;
        }
        return [...prev, university];
      }
    });
  };

  const handleComplete = () => {
    if (selectedUniversities.length === 0) {
      toast({
        title: 'Selection Required',
        description: 'Please select at least one university',
        variant: 'destructive'
      });
      return;
    }
    
    onSelectionComplete();
    onOpenChange(false);
    
    toast({
      title: 'Universities Selected',
      description: `You've selected ${selectedUniversities.length} universities for your application path`,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Target Universities</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search universities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch} 
              disabled={isSearching || !searchQuery.trim()}
              variant="outline"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : (
            <>
              {favoriteUniversities.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Your Favorite Universities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {favoriteUniversities.map(university => (
                      <Card 
                        key={university.id}
                        className={`cursor-pointer transition-colors ${
                          selectedUniversities.some(u => u.id === university.id) 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:bg-muted/50'
                        }`}
                        onClick={() => toggleUniversitySelection(university)}
                      >
                        <CardContent className="p-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">{university.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {university.city ? `${university.city}, ` : ''}{university.country}
                            </p>
                          </div>
                          {selectedUniversities.some(u => u.id === university.id) && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {searchResults.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium mb-2">Search Results</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchResults.map(university => (
                      <Card 
                        key={university.id}
                        className={`cursor-pointer transition-colors ${
                          selectedUniversities.some(u => u.id === university.id) 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:bg-muted/50'
                        }`}
                        onClick={() => toggleUniversitySelection(university)}
                      >
                        <CardContent className="p-3 flex justify-between items-center">
                          <div>
                            <p className="font-medium text-sm">{university.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {university.city ? `${university.city}, ` : ''}{university.country}
                            </p>
                          </div>
                          {selectedUniversities.some(u => u.id === university.id) && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-sm font-medium mb-2">Selected Universities ({selectedUniversities.length}/10)</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUniversities.length > 0 ? (
                    selectedUniversities.map(university => (
                      <Badge 
                        key={university.id} 
                        variant="outline" 
                        className="px-3 py-1 cursor-pointer hover:bg-destructive/10"
                        onClick={() => toggleUniversitySelection(university)}
                      >
                        {university.name}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No universities selected yet</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleComplete} disabled={selectedUniversities.length === 0 || isLoading}>
            Complete Selection
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
