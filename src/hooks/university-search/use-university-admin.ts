
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useUniversityAdmin() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const importUniversitiesFromKaggle = async (dataSourceUrl?: string) => {
    setLoading(true);
    setSuccess(false);
    
    try {
      const response = await supabase.functions.invoke('fetch-kaggle-universities', {
        body: { dataSourceUrl, action: 'import' }
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      toast({
        title: 'Import Successful',
        description: `${response.data.count} universities have been imported from ${dataSourceUrl ? 'the provided URL' : 'world_universities table'}`,
      });
      
      setSuccess(true);
      return { success: true, message: 'Universities imported successfully', data: response.data };
    } catch (error) {
      console.error('Error importing universities:', error);
      toast({
        title: 'Import Failed',
        description: 'There was an error importing universities. Please try again.',
        variant: 'destructive',
      });
      
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getFunctionLogs = async () => {
    setLoading(true);
    
    try {
      const response = await supabase.functions.invoke('fetch-kaggle-universities', {
        body: { action: 'get-logs' }
      });
      
      if (response.error) {
        throw new Error(response.error.message);
      }
      
      return { success: true, logs: response.data.logs };
    } catch (error) {
      console.error('Error fetching function logs:', error);
      return { success: false, message: error.message, logs: [] };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    success,
    importUniversitiesFromKaggle,
    getFunctionLogs
  };
}
