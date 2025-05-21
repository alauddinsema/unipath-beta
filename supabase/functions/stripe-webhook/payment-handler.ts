
import Stripe from 'https://esm.sh/stripe@12.1.1?target=deno';
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { logStep } from './utils.ts';
import { logCreditActivity } from './handlers/credit-activity-handler.ts';
import { calculateSubscriptionDates } from './handlers/subscription-dates-handler.ts';
import { updateSubscriptionRecord } from './handlers/subscription-record-handler.ts';

export async function handleSuccessfulPayment(
  session: Stripe.Checkout.Session,
  supabase: SupabaseClient
) {
  const userId = session.metadata?.userId;
  const planType = session.metadata?.planType || 'premium';
  
  if (!userId) {
    logStep('Missing user ID in session metadata:', session);
    return;
  }
  
  try {
    logStep(`Processing payment for user ${userId}, plan: ${planType}`);
    
    const { startDate, endDate } = calculateSubscriptionDates(planType);
    
    const { data: existingSubscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (fetchError) {
      logStep('Error fetching existing subscription:', fetchError);
      throw fetchError;
    }
    
    await updateSubscriptionRecord(
      supabase,
      userId,
      planType,
      startDate,
      endDate,
      !!existingSubscription
    );
    
    await logCreditActivity(supabase, userId, planType);
    
    logStep(`Successfully processed payment for user ${userId}`);
  } catch (error) {
    logStep('Error handling payment:', error);
    throw error;
  }
}
