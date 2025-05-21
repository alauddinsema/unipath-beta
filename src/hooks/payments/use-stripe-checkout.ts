
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseStripeCheckoutProps {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export function useStripeCheckout({ onSuccess, onError }: UseStripeCheckoutProps = {}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const createCheckoutSession = async (planType: 'basic' | 'premium') => {
    setLoading(true);
    try {
      console.log(`Initiating checkout for plan: ${planType}`);
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { planType }
      });

      if (error) {
        console.error('Checkout function error:', error);
        throw error;
      }
      
      if (!data?.url) {
        console.error('No checkout URL received:', data);
        throw new Error('No checkout URL received');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
      onSuccess?.();
    } catch (err) {
      console.error('Checkout error:', err);
      const error = err instanceof Error ? err : new Error('Failed to start checkout process');
      toast({
        title: 'Checkout Error',
        description: error.message,
        variant: 'destructive',
      });
      onError?.(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckoutSession,
    loading
  };
}
