
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { useSubscription } from '@/hooks/payments';
import { SubscriptionStatusBar } from '@/components/dashboard/SubscriptionStatusBar';
import { PricingTiers } from '@/components/profile/PricingTiers';
import { useToast } from '@/hooks/use-toast';

export default function SubscriptionPlans() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { subscription, loading: subscriptionLoading } = useSubscription(user?.id);

  // Show subscription status if user is logged in - memoized to prevent re-renders
  const showSubscriptionStatus = useMemo(() => 
    user && subscription, [user, subscription]);

  return (
    <div className="min-h-screen bg-dark-purple">
      <Navbar />
      <div className="container max-w-7xl mx-auto pt-20 pb-16 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-white">Choose Your Plan</h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
            Select the perfect plan for your university application journey
          </p>
        </div>

        {showSubscriptionStatus && (
          <div className="mb-8">
            <SubscriptionStatusBar 
              isPremium={subscription?.planType === 'premium'}
              planType={subscription?.planType || 'free'}
              expiresAt={subscription?.endDate}
            />
          </div>
        )}

        <PricingTiers />
      </div>
    </div>
  );
}
