
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { logStep } from '../utils.ts';

export async function logCreditActivity(
  supabase: SupabaseClient,
  userId: string,
  planType: string
) {
  const { error: activityError } = await supabase
    .from('credit_activities')
    .insert({
      user_id: userId,
      action: 'purchased',
      amount: planType === 'premium' ? 1 : 0.5,
      description: `Purchased ${planType} plan`
    });
    
  if (activityError) {
    logStep('Error logging credit activity:', activityError);
  }
}
