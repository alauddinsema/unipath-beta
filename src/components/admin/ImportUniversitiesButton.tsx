
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUniversityAdmin } from '@/hooks/university-search/use-university-admin';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ImportUniversitiesButton() {
  const { toast } = useToast();
  const [isImporting, setIsImporting] = useState(false);
  const { importUniversitiesFromKaggle } = useUniversityAdmin();

  const handleImport = async () => {
    setIsImporting(true);
    try {
      // You can provide a custom URL to a JSON file containing university data
      // or leave it empty to use the default world_universities table
      const result = await importUniversitiesFromKaggle('https://raw.githubusercontent.com/Hipo/university-domains-list/master/world_universities_and_domains.json');
      
      if (result.success) {
        toast({
          title: 'Import Successful',
          description: `Successfully imported ${result.data?.count || 0} universities.`,
        });
      } else {
        toast({
          title: 'Import Failed',
          description: result.message || 'Failed to import universities.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error importing universities:', error);
      toast({
        title: 'Import Error',
        description: 'An unexpected error occurred during import.',
        variant: 'destructive',
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <Button 
      onClick={handleImport} 
      disabled={isImporting} 
      className="w-full"
    >
      {isImporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Importing Universities...
        </>
      ) : (
        'Import 6000+ Universities from Kaggle'
      )}
    </Button>
  );
}
