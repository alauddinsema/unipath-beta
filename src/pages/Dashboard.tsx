
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { SubscriptionStatusBar } from '@/components/dashboard/SubscriptionStatusBar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useSubscription } from '@/hooks/payments';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { QuickStats } from '@/components/dashboard/QuickStats';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { TasksList } from '@/components/dashboard/TasksList';

export default function Dashboard() {
  const { user } = useAuth();
  const { subscription, loading: subscriptionLoading, error } = useSubscription(user?.id);
  
  const displayName = user?.user_metadata?.name || 
                     user?.email?.split('@')[0] || 
                     'Student';
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container max-w-7xl mx-auto pt-24 pb-12 px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {displayName}</h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your university applications
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-4">
            <Button asChild variant="outline">
              <Link to="/apply">Start Application</Link>
            </Button>
            <Button asChild>
              <Link to="/subscription-plans">Manage Subscription</Link>
            </Button>
          </div>
        </div>
        
        <ErrorBoundary>
          {user && subscription && (
            <SubscriptionStatusBar 
              isPremium={subscription.isPaid && subscription.planType !== 'free'} 
              planType={subscription.planType}
              expiresAt={subscription.endDate}
              loading={subscriptionLoading}
              error={error}
            />
          )}
        </ErrorBoundary>

        <div className="mt-8">
          <QuickStats />
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-8">
          <ActivityFeed />
          <TasksList />
        </div>
      </main>
    </div>
  );
}
