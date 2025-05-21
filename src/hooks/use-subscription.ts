
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionData {
  isPaid: boolean;
  planType: 'free' | 'basic' | 'premium';
  startDate?: string;
  endDate?: string;
}

export function useSubscription(userId?: string) {
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const loadSubscription = async () => {
    if (!userId) {
      console.log('useSubscription: No userId provided, skipping fetch');
      setSubscription(null);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      console.log('Loading subscription for user:', userId);
      
      // Get active subscription data
      const { data: subscriptionData, error: subError } = await supabase
        .from('subscriptions')
        .select('plan_type, is_active, is_paid, start_date, end_date')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      console.log('Raw subscription data:', subscriptionData);
        
      if (subError) {
        console.error('Subscription query error:', subError);
        throw subError;
      }
      
      if (subscriptionData && subscriptionData.length > 0) {
        // Get the most recent active subscription
        const latestSubscription = subscriptionData[0];
        
        // Check if subscription is expired
        const endDate = latestSubscription.end_date ? new Date(latestSubscription.end_date) : null;
        const isExpired = endDate ? new Date() > endDate : false;
        
        console.log('Subscription validation:', { 
          userId,
          planType: latestSubscription.plan_type,
          isActive: latestSubscription.is_active,
          isPaid: latestSubscription.is_paid,
          endDate: endDate?.toISOString(), 
          now: new Date().toISOString(), 
          isExpired
        });
        
        // A subscription is valid if it's active, flagged as paid, and not expired
        const isPaid = latestSubscription.is_active && 
                       (latestSubscription.is_paid === true) && 
                       !isExpired;
        
        setSubscription({
          isPaid: isPaid,
          planType: latestSubscription.plan_type as 'free' | 'basic' | 'premium',
          startDate: latestSubscription.start_date,
          endDate: latestSubscription.end_date
        });
      } else {
        console.log('No active subscription found for user');
        // Set default free subscription when no subscription record exists
        setSubscription({
          isPaid: false,
          planType: 'free'
        });
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
      setError(error instanceof Error ? error : new Error('Failed to load subscription'));
      toast({
        title: 'Error',
        description: 'Failed to load your subscription information',
        variant: 'destructive',
      });
      
      // Set default state on error
      setSubscription({
        isPaid: false,
        planType: 'free'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      loadSubscription();
    } else {
      setSubscription(null);
      setLoading(false);
    }
  }, [userId]);

  return {
    subscription,
    loading,
    error,
    refreshSubscription: loadSubscription
  };
}
