
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { upgradeSpecificUser } from '@/scripts/upgrade-user';

export function UpgradeSpecificUser() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      console.log("Starting upgrade process from admin panel");
      
      // Call the function to upgrade the specific user
      const result = await upgradeSpecificUser();
      
      console.log("Upgrade process completed with result:", result);
      
      if (result.success) {
        toast({
          title: 'Success',
          description: result.message,
        });
      } else {
        toast({
          title: 'Error',
          description: result.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error in handleUpgrade:', error);
      toast({
        title: 'Error',
        description: 'Failed to upgrade specific user',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upgrade Specific User</CardTitle>
        <CardDescription>
          Upgrade alauddin.jamshitbekov@gmail.com to premium subscription for 1 year
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          This action will immediately upgrade the account to premium status for 1 year.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleUpgrade}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            'Upgrade Specified User to Premium'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
