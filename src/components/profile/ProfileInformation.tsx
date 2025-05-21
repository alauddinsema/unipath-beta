
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { User } from '@supabase/supabase-js';
import { useProfile } from '@/hooks/useProfile';
import { useTheme } from '@/contexts/ThemeContext';

interface ProfileInformationProps {
  user: User | null;
}

export function ProfileInformation({ user }: ProfileInformationProps) {
  const { profile, isLoading, updateProfile } = useProfile(user?.id);
  const { resolvedTheme } = useTheme();
  const [name, setName] = useState(profile?.full_name || '');
  const [email] = useState(user?.email || '');

  const handleUpdateProfile = async () => {
    updateProfile.mutate({ full_name: name });
  };

  const cardBackgroundClass = resolvedTheme === 'dark' 
    ? 'bg-secondary/50 border-white/20 backdrop-blur-sm' 
    : 'bg-white/80 shadow-sm border-gray-200 backdrop-blur-sm';

  const inputClass = resolvedTheme === 'dark'
    ? 'bg-background/50'
    : 'bg-white border-gray-300';

  if (isLoading) {
    return (
      <Card className={cardBackgroundClass}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <ReloadIcon className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cardBackgroundClass}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className={inputClass}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              value={email}
              placeholder="Your Email"
              disabled
              className={`${inputClass} cursor-not-allowed opacity-70`}
            />
            <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
          </div>
        </div>
        <Button 
          onClick={handleUpdateProfile} 
          disabled={updateProfile.isPending}
          className="w-full"
        >
          {updateProfile.isPending ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            "Update Profile"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
