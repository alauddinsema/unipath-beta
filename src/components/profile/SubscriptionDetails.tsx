
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface SubscriptionDetailsProps {
  user: any;
  isSubscribed: boolean;
  subscription: {
    startDate?: string;
    endDate?: string;
  } | null;
}

export function SubscriptionDetails({ user, isSubscribed, subscription }: SubscriptionDetailsProps) {
  const navigate = useNavigate();
  
  return (
    <ErrorBoundary>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Subscription Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Status</p>
                <p className="text-sm text-muted-foreground">
                  {isSubscribed ? 'Active' : 'No active subscription'}
                </p>
              </div>
              {subscription?.endDate && (
                <div>
                  <p className="font-medium">Expires</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(subscription.endDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            
            <Button 
              onClick={() => navigate('/subscription-plans')} 
              className="w-full"
            >
              {isSubscribed ? 'Manage Subscription' : 'Get Premium'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
}
