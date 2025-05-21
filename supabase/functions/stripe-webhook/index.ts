
import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@12.1.1?target=deno';
import { corsHeaders, logStep, createSupabaseClient } from './utils.ts';
import { handleSuccessfulPayment } from './payment-handler.ts';
import { handleSubscriptionUpdate, handleSubscriptionCancellation } from './subscription-handler.ts';

const endpointSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  const signature = req.headers.get('stripe-signature');
  if (!signature && endpointSecret) {
    return new Response('Webhook Error: No signature provided', { 
      status: 400,
      headers: corsHeaders
    });
  }

  try {
    const body = await req.text();
    let event;

    if (endpointSecret && signature) {
      const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
        apiVersion: '2022-11-15',
      });
      
      try {
        logStep(`Verifying webhook signature: ${signature.substring(0, 20)}...`);
        event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
        logStep(`Webhook signature verified successfully`);
      } catch (err) {
        console.error(`Webhook signature verification failed:`, err);
        return new Response(`Webhook Error: ${err.message}`, { 
          status: 400,
          headers: corsHeaders
        });
      }
    } else {
      logStep('No signature or secret found, parsing body without verification');
      event = JSON.parse(body);
    }

    logStep(`Event received: ${event.type}`);
    
    const supabase = createSupabaseClient();
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2022-11-15',
    });

    switch(event.type) {
      case 'checkout.session.completed':
        await handleSuccessfulPayment(event.data.object, supabase);
        break;
        
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdate(event.data.object, stripe, supabase);
        break;
        
      case 'customer.subscription.deleted':
        await handleSubscriptionCancellation(event.data.object, stripe, supabase);
        break;
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response(`Webhook Error: ${error.message}`, { 
      status: 400,
      headers: corsHeaders
    });
  }
});
