
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ProfileInformation } from '@/components/profile/ProfileInformation';
import { SubscriptionDetails } from '@/components/profile/SubscriptionDetails';
import { PricingTiers } from '@/components/profile/PricingTiers';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTheme } from '@/contexts/ThemeContext';

// Update the Subscription interface to match SubscriptionDetails expectation
interface Subscription {
  startDate: string;
  endDate: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const { toast } = useToast();
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (user) {
      fetchSubscriptionDetails();
    }
  }, [user]);

  const fetchSubscriptionDetails = async () => {
    if (user) {
      try {
        setFetchError(null);
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching subscription details:', error);
          setFetchError('Failed to fetch subscription details.');
          toast({
            title: "Error",
            description: "Failed to fetch subscription details.",
            variant: "destructive",
          });
          return;
        }

        // Handle empty array (no subscription)
        if (data && data.length > 0) {
          setSubscription({
            startDate: data[0].start_date,
            endDate: data[0].end_date,
          });
          setIsSubscribed(true);
        } else {
          // User has no subscription yet
          setSubscription(null);
          setIsSubscribed(false);
        }
      } catch (error) {
        console.error('Error fetching subscription details:', error);
        setFetchError('Failed to fetch subscription details.');
        toast({
          title: "Error",
          description: "Failed to fetch subscription details.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Sign out failed:', error);
      toast({
        title: "Error",
        description: "Sign out failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const cardBackgroundClass = resolvedTheme === 'dark' 
    ? 'bg-card/40 backdrop-blur-md' 
    : 'bg-white/80 backdrop-blur-md shadow-sm border-gray-200';

  return (
    <>
      <Navbar />
      <div className="container max-w-4xl mx-auto py-10 pt-24">
        <ProfileInformation 
          user={user} 
        />
        
        <Card className={`mt-6 ${cardBackgroundClass}`}>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Theme Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeToggle className={resolvedTheme === 'dark' ? '' : 'border-gray-200'} />
            <p className="mt-2 text-sm text-muted-foreground">Choose your preferred theme mode</p>
          </CardContent>
        </Card>
        
        {fetchError ? (
          <div className="mt-6 p-4 bg-destructive/20 border border-destructive rounded-lg">
            <p className="text-destructive font-medium">{fetchError}</p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-2"
              onClick={fetchSubscriptionDetails}
            >
              Retry
            </Button>
          </div>
        ) : (
          <SubscriptionDetails 
            user={user}
            isSubscribed={isSubscribed}
            subscription={subscription}
          />
        )}
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Subscription Plans</h2>
          <PricingTiers />
        </div>
        
        <Button onClick={handleSignOut} disabled={loading} className="mt-6 w-full">
          {loading ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Sign Out"
          )}
        </Button>
      </div>
    </>
  );
};

export default Profile;
