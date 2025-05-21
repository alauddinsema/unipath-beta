
import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { logStep } from '../utils.ts';

export async function updateSubscriptionRecord(
  supabase: SupabaseClient,
  userId: string,
  planType: string,
  startDate: Date,
  endDate: Date,
  existingSubscription: boolean
) {
  const subscriptionData = {
    plan_type: planType,
    is_active: true,
    is_paid: true,
    start_date: startDate.toISOString(),
    end_date: endDate.toISOString(),
    updated_at: startDate.toISOString()
  };

  let updateResult;
  if (existingSubscription) {
    logStep(`Updating subscription for user ${userId} to ${planType}`);
    updateResult = await supabase
      .from('subscriptions')
      .update(subscriptionData)
      .eq('user_id', userId);
  } else {
    logStep(`Creating new subscription for user ${userId} with plan ${planType}`);
    updateResult = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId,
        ...subscriptionData
      });
  }

  if (updateResult.error) {
    logStep('Error updating subscription:', updateResult.error);
    throw updateResult.error;
  }
}
