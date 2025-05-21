
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { PricingCard } from '@/components/ui/pricing-card';
import { useSubscription } from '@/hooks/use-subscription';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

export function PricingSection() {
  const { user } = useAuth();
  const { subscription, loading } = useSubscription(user?.id);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubscribe = (planType: 'basic' | 'premium') => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to subscribe to a plan.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    navigate('/subscription-plans');
  };
  
  const pricingTiers = [
    {
      id: 'free',
      name: 'Free',
      description: 'Basic access to university search',
      price: { monthly: 0 },
      features: [
        { name: 'University search system', included: true },
        { name: 'AI assistant', included: false },
        { name: 'Document storage', included: false },
        { name: 'Basic profile', included: true },
        { name: 'Email support', included: true }
      ],
      cta: 'Get Started',
      onClick: () => navigate('/signup'),
    },
    {
      id: 'basic',
      name: 'Basic',
      description: 'AI assistance and document storage',
      price: { monthly: 0.5 },
      features: [
        { name: 'University search system', included: true },
        { name: 'AI assistant', included: true },
        { name: 'Document storage', included: true },
        { name: 'Basic profile', included: true },
        { name: 'Email support', included: true }
      ],
      cta: 'Upgrade to Basic',
      onClick: () => handleSubscribe('basic'),
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Full access to all features',
      price: { monthly: 1 },
      features: [
        { name: 'University search system', included: true },
        { name: 'Advanced AI assistant', included: true },
        { name: 'Unlimited document storage', included: true },
        { name: 'Premium profile', included: true },
        { name: 'Priority support', included: true }
      ],
      cta: 'Upgrade to Premium',
      onClick: () => handleSubscribe('premium'),
      highlighted: true,
    },
  ];
  
  if (loading) {
    return (
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="space-y-4">
            <Skeleton className="h-8 w-1/3 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[400px] rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  return (
    <ErrorBoundary>
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-muted-foreground">
            Select the perfect subscription plan for your university application journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {pricingTiers.map((tier) => (
            <PricingCard 
              key={tier.id} 
              tier={tier} 
              paymentFrequency="monthly" 
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            onClick={() => navigate('/subscription-plans')}
            variant="outline"
          >
            View All Plan Details
          </Button>
        </div>
      </section>
    </ErrorBoundary>
  );
}
