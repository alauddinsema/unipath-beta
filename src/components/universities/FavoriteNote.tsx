
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Edit, Save, Star } from 'lucide-react';

interface FavoriteNoteProps {
  favoriteId: string;
  initialNotes: string | null;
  initialRating: number | null;
  onUpdateNotes: (favoriteId: string, notes: string | null) => void;
  onUpdateRating: (favoriteId: string, rating: number | null) => void;
}

export function FavoriteNote({ 
  favoriteId, 
  initialNotes, 
  initialRating, 
  onUpdateNotes, 
  onUpdateRating 
}: FavoriteNoteProps) {
  const [notes, setNotes] = useState(initialNotes || '');
  const [rating, setRating] = useState(initialRating || 0);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleSave = () => {
    onUpdateNotes(favoriteId, notes || null);
    setIsEditing(false);
  };
  
  const handleRatingChange = (newRating: number) => {
    // Toggle rating off if clicking the same star
    const updatedRating = rating === newRating ? 0 : newRating;
    setRating(updatedRating);
    onUpdateRating(favoriteId, updatedRating || null);
  };
  
  return (
    <Card className="bg-muted/30">
      <CardContent className="pt-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className="p-1 focus:outline-none"
              >
                <Star
                  className={`h-5 w-5 ${
                    star <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
          
          {isEditing ? (
            <Button size="sm" variant="ghost" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
          ) : (
            <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
        
        {isEditing ? (
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add your notes about this university..."
            className="min-h-[100px]"
          />
        ) : (
          <div className="min-h-[50px] text-sm">
            {notes ? (
              <p>{notes}</p>
            ) : (
              <p className="text-muted-foreground italic">
                No notes yet. Click Edit to add your thoughts about this university.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
