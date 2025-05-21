
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Crown, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface SubscriptionStatusBarProps {
  isPremium: boolean;
  planType: 'free' | 'basic' | 'premium';
  expiresAt?: string | null;
  loading?: boolean;
  error?: Error | null;
}

export function SubscriptionStatusBar({ 
  isPremium, 
  planType, 
  expiresAt,
  loading,
  error 
}: SubscriptionStatusBarProps) {
  if (loading) {
    return (
      <Card className="overflow-hidden border-0 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 animate-pulse">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-32" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error loading subscription</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  const formattedExpiry = expiresAt ? new Date(expiresAt).toLocaleDateString() : null;
  
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 text-white">
          <div className="flex items-center gap-3">
            {isPremium ? (
              <Crown className="h-8 w-8 text-yellow-300" />
            ) : (
              <div className="h-8 w-8 rounded-full bg-white/30 flex items-center justify-center">
                <Crown className="h-5 w-5 text-white" />
              </div>
            )}
            
            <div>
              <h3 className="text-lg font-semibold">
                {isPremium ? 'Premium Subscription' : 'Free Plan'}
              </h3>
              <p className="text-sm text-white/80">
                {isPremium 
                  ? `You have access to all premium features${formattedExpiry ? ` until ${formattedExpiry}` : ''}`
                  : 'Upgrade to unlock all features'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-white/20 text-white border-white/20">
              {planType.charAt(0).toUpperCase() + planType.slice(1)} Plan
            </Badge>
            
            {!isPremium && (
              <Button asChild size="sm" variant="secondary" className="font-medium">
                <Link to="/subscription-plans">
                  Upgrade to Premium
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
