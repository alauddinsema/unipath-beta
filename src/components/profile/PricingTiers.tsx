
import React, { memo, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/payments';
import { useNavigate } from 'react-router-dom';
import { SUBSCRIPTION_PLANS } from '@/data/subscription-plans';
import { useToast } from '@/hooks/use-toast';
import { Check, CreditCard, Sparkles } from 'lucide-react';

// Memoize the plan features to prevent unnecessary re-renders
const PlanFeatures = memo(({ features }: { features: string[] }) => (
  <ul className="space-y-3 mb-6">
    {features.map((feature, index) => (
      <li key={index} className="flex items-center gap-3 text-sm">
        <Check className="h-5 w-5 text-emerald-500 shrink-0" />
        <span className="text-white/80">{feature}</span>
      </li>
    ))}
  </ul>
));

PlanFeatures.displayName = 'PlanFeatures';

// Memoize individual pricing cards for better performance
const PricingCard = memo(({ 
  plan, 
  isCurrentPlan,
  onSubscribe,
  processingPlan 
}: { 
  plan: typeof SUBSCRIPTION_PLANS[0],
  isCurrentPlan: boolean,
  onSubscribe: (planId: string) => void,
  processingPlan: string | null
}) => {
  // Memoize button render to avoid re-renders
  const renderButton = useCallback(() => {
    if (isCurrentPlan) {
      return (
        <Button disabled variant="outline" className="w-full bg-primary/10 hover:bg-primary/10 border-primary/20">
          Current Plan
        </Button>
      );
    }

    if (plan.id === 'free') {
      return (
        <Button disabled className="w-full opacity-50">
          Default Plan
        </Button>
      );
    }

    return (
      <Button
        onClick={() => onSubscribe(plan.id)}
        className="w-full"
        disabled={!!processingPlan}
      >
        {processingPlan === plan.id ? 'Processing...' : `Get ${plan.name}`}
      </Button>
    );
  }, [isCurrentPlan, plan.id, plan.name, onSubscribe, processingPlan]);

  // Simplified class conditionals using CSS variables for better performance
  const cardBaseClass = useMemo(() => `
    group relative overflow-hidden rounded-2xl will-change-transform
    ${isCurrentPlan 
      ? 'bg-primary/5 border-2 border-primary/30' 
      : 'bg-black/30 hover:bg-black/40 border border-white/10 hover:border-white/20'} 
    ${plan.isPopular ? 'translate-y-0 lg:-translate-y-4' : ''}
  `, [isCurrentPlan, plan.isPopular]);

  return (
    <div className={cardBaseClass}>
      {plan.isPopular && (
        <div className="absolute -right-20 top-7 rotate-45 bg-primary/80 px-24 py-1 text-white/90 text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            {plan.name}
            {plan.isPopular && <Sparkles className="h-5 w-5 text-yellow-500" />}
          </h3>
          <div className="text-white/90">
            ${plan.price}/mo
          </div>
          <p className="text-sm text-white/70">{plan.description}</p>
        </div>
        
        <div className="h-px bg-white/10" />
        
        <PlanFeatures features={plan.features} />
        
        <div className="space-y-3">
          {renderButton()}
          
          <div className="flex items-center justify-center gap-2 text-xs text-white/50">
            <CreditCard className="h-3 w-3" />
            <span>Secure payment</span>
          </div>
        </div>
        
        {isCurrentPlan && (
          <div className="text-center text-primary/80 text-xs mt-2 font-medium">
            Your Active Plan
          </div>
        )}
      </div>
    </div>
  );
});

PricingCard.displayName = 'PricingCard';

// Memo-ize the entire PricingTiers component
const PricingTiersComponent = () => {
  const { user, session } = useAuth();
  const { subscription } = useSubscription(user?.id);
  const [processingPlan, setProcessingPlan] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubscribe = useCallback(async (planId: string) => {
    if (!session) {
      navigate(`/login?redirect=${encodeURIComponent('/subscription-plans')}`);
      return;
    }

    try {
      setProcessingPlan(planId);
      
      if (planId === 'free') {
        toast({
          title: 'Free Plan',
          description: 'You are already on the free plan!',
        });
        return;
      }

      // Using the provided Stripe payment links
      if (planId === 'premium') {
        window.location.href = 'https://buy.stripe.com/test_8wMeYf1zVc8LbfO4gh';
      } else {
        window.location.href = 'https://buy.stripe.com/test_6oEaHZemHgp183C4gg';
      }
      
    } catch (error) {
      console.error('Subscription error:', error);
      toast({
        title: 'Error',
        description: 'There was a problem with the subscription process. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setProcessingPlan(null);
    }
  }, [session, navigate, toast]);

  const isCurrentPlan = useCallback((planId: string) => {
    return subscription?.planType === planId;
  }, [subscription?.planType]);

  // Use a lazy loaded grid for better performance
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 will-change-transform">
      {SUBSCRIPTION_PLANS.map((plan) => (
        <PricingCard
          key={plan.id}
          plan={plan}
          isCurrentPlan={isCurrentPlan(plan.id)}
          onSubscribe={handleSubscribe}
          processingPlan={processingPlan}
        />
      ))}
    </div>
  );
};

export const PricingTiers = memo(PricingTiersComponent);
