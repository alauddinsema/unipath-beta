
import Stripe from 'https://esm.sh/stripe@12.1.1?target=deno';
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { logStep } from './utils.ts';

export async function handleSubscriptionUpdate(
  subscription: Stripe.Subscription,
  stripe: Stripe,
  supabase: SupabaseClient
) {
  const customerId = subscription.customer as string;
  
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
      expand: ['data.customer']
    });
    
    const matchingSession = sessions.data.find(s => 
      s.customer === customerId || 
      s.metadata?.userId
    );
    
    if (!matchingSession || !matchingSession.metadata?.userId) {
      logStep('No matching session found with userId for customer:', customerId);
      return;
    }
    
    const userId = matchingSession.metadata.userId;
    const planType = matchingSession.metadata.planType || 'premium';
    
    const { error } = await supabase
      .from('subscriptions')
      .update({
        plan_type: planType,
        is_active: subscription.status === 'active',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
      
    if (error) {
      logStep('Error updating subscription status:', error);
      throw error;
    }
    
    logStep(`Updated subscription for user ${userId} to ${planType} (${subscription.status})`);
  } catch (error) {
    logStep('Error handling subscription update:', error);
    throw error;
  }
}

export async function handleSubscriptionCancellation(
  subscription: Stripe.Subscription,
  stripe: Stripe,
  supabase: SupabaseClient
) {
  const customerId = subscription.customer as string;
  
  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 10,
      expand: ['data.customer']
    });
    
    const matchingSession = sessions.data.find(s => 
      s.customer === customerId || 
      s.metadata?.userId
    );
    
    if (!matchingSession || !matchingSession.metadata?.userId) {
      logStep('No matching session found with userId for customer:', customerId);
      return;
    }
    
    const userId = matchingSession.metadata.userId;
    
    const { error } = await supabase
      .from('subscriptions')
      .update({
        plan_type: 'free',
        is_active: false,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);
      
    if (error) {
      logStep('Error cancelling subscription:', error);
      throw error;
    }
    
    logStep(`Cancelled subscription for user ${userId}`);
  } catch (error) {
    logStep('Error handling subscription cancellation:', error);
    throw error;
  }
}
