
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useCompletedSteps(userId: string | undefined) {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    if (userId) {
      fetchCompletedSteps();
    }
  }, [userId]);

  const fetchCompletedSteps = async () => {
    if (!userId) return;
    
    try {
      // Using the raw client without type checking
      const { data, error } = await supabase
        .from('completed_steps')
        .select('step_id')
        .eq('user_id', userId);
        
      if (error) {
        console.error('Error loading completed steps:', error);
        return;
      }
      
      if (data) {
        // Extract step_id values from the returned data
        const stepIds = data.map(step => step.step_id);
        setCompletedSteps(stepIds);
      }
    } catch (error) {
      console.error('Error loading completed steps:', error);
    }
  };

  const markStepAsCompleted = async (stepId: string) => {
    if (!userId) return;
    
    try {
      if (completedSteps.includes(stepId)) return;
      
      // Using the raw client without type checking
      const { error } = await supabase
        .from('completed_steps')
        .insert({ 
          user_id: userId,
          step_id: stepId
        });
        
      if (error) throw error;
      
      setCompletedSteps(prev => [...prev, stepId]);
      
      toast({
        title: 'Step Completed',
        description: 'You have successfully completed this step',
      });
    } catch (error) {
      console.error('Error marking step as completed:', error);
      toast({
        title: 'Error',
        description: 'Failed to mark step as completed',
        variant: 'destructive',
      });
    }
  };
  
  return {
    completedSteps,
    markStepAsCompleted
  };
}
