
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Database } from 'lucide-react';
import { ImportUniversitiesButton } from '@/components/admin/ImportUniversitiesButton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export function ImportUniversitiesSection() {
  const [isCreatingTable, setIsCreatingTable] = useState(false);
  const { toast } = useToast();

  const createUniversitiesTable = async () => {
    setIsCreatingTable(true);
    try {
      const { error } = await supabase.rpc('create_universities_table');
      
      if (error) {
        console.error('Error creating universities table:', error);
        toast({
          title: 'Error',
          description: 'Failed to create universities table. Please check console for details.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Universities table created successfully. You can now import university data.',
        });
      }
    } catch (err) {
      console.error('Exception creating universities table:', err);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please check console for details.',
        variant: 'destructive',
      });
    } finally {
      setIsCreatingTable(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>University Data Import</CardTitle>
        <CardDescription>
          Import university data from Kaggle and manage the universities database
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-md bg-muted/50">
          <h3 className="text-sm font-medium mb-2">Setup Instructions</h3>
          <ol className="text-sm space-y-2 text-muted-foreground list-decimal pl-4">
            <li>First create the universities table using the button below</li>
            <li>Then import university data using the import button</li>
            <li>Wait for confirmation that the import is complete</li>
          </ol>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          className="w-full" 
          onClick={createUniversitiesTable}
          disabled={isCreatingTable}
          variant="outline"
        >
          {isCreatingTable ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Table...
            </>
          ) : (
            <>
              <Database className="mr-2 h-4 w-4" />
              Create Universities Table
            </>
          )}
        </Button>
        <ImportUniversitiesButton />
      </CardFooter>
    </Card>
  );
}
