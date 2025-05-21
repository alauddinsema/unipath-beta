
import { loadStripe } from '@stripe/stripe-js';
import { supabase } from '@/integrations/supabase/client';
import { CreateCheckoutSessionParams } from '@/types/payment';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51R5V2GBljPuFvVQ6ZRPADpDTEecC2FVyiQqe8yyMcUaxC8MB4C71w46HXhAuPzVSIL2ROkfrGpi9kYR6qF34Yefy00eRFnJFGM');

export async function createCheckoutSession({
  userId,
  planId,
  planName,
  amount,
  successUrl,
  cancelUrl,
  isSubscription,
  productId
}: CreateCheckoutSessionParams): Promise<string> {
  try {
    // Call our Supabase Edge Function to create a checkout session
    const { data, error } = await supabase.functions.invoke('create-checkout-session', {
      body: {
        userId,
        planId,
        planName,
        amount: Math.round(amount * 100), // Convert to cents for Stripe
        successUrl: successUrl || window.location.origin + '/dashboard?payment=success',
        cancelUrl: cancelUrl || window.location.origin + '/purchase-credits?payment=canceled',
        isSubscription,
        productId
      }
    });

    if (error) {
      console.error('Error creating checkout session:', error);
      throw new Error('Failed to create checkout session');
    }

    return data.sessionId;
  } catch (err) {
    console.error('Error in createCheckoutSession:', err);
    throw err;
  }
}

export async function redirectToCheckout(sessionId: string): Promise<void> {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize');

    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error('Error in redirectToCheckout:', error);
      throw error;
    }
  } catch (err) {
    console.error('Error redirecting to checkout:', err);
    throw err;
  }
}
