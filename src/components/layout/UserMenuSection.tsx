
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { NavLink } from './NavLink';
import { useAuth } from '@/contexts/AuthContext';

export const UserMenuSection = () => {
  const { user, signOut } = useAuth();
  
  const getAvatarUrl = () => {
    // First check if user has uploaded a custom avatar
    if (user?.user_metadata?.avatar_url) {
      return user.user_metadata.avatar_url;
    }
    
    // Use gender-based cartoon avatars
    const gender = user?.user_metadata?.gender || 'other';
    switch(gender) {
      case 'female':
        return '/avatars/female-cartoon.svg';
      case 'male':
        return '/avatars/male-cartoon.svg';
      default:
        return '/avatars/default-cartoon.svg';
    }
  };
  
  // Get user name from metadata or email
  const getUserName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    } 
    
    // Try to get from Google provider
    if (user?.identities && user.identities.length > 0) {
      const googleIdentity = user.identities.find(identity => identity.provider === 'google');
      if (googleIdentity?.identity_data?.name) {
        return googleIdentity.identity_data.name;
      }
    }
    
    return user?.email?.split('@')[0] || 'User';
  };
  
  // Get user initials for avatar fallback
  const getUserInitials = () => {
    const name = getUserName();
    return name.charAt(0).toUpperCase();
  };
  
  if (!user) {
    return (
      <div className="hidden md:flex items-center space-x-4">
        <NavLink 
          to="/login" 
          className="text-sm font-medium transition-all duration-300 hover:text-primary relative"
        >
          Sign In
        </NavLink>
        <NavLink 
          to="/signup" 
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 hover:shadow-md hover:scale-105"
        >
          Sign Up
        </NavLink>
      </div>
    );
  }
  
  return (
    <div className="hidden md:flex items-center space-x-4">
      <NavLink 
        to="/profile" 
        className="flex items-center text-sm font-medium transition-all relative group hover:text-primary"
      >
        <Avatar className="mr-2 h-8 w-8 transition-transform duration-300 hover:scale-110 border border-primary/20 group-hover:animate-border-glow">
          <AvatarImage src={getAvatarUrl()} alt={getUserName()} />
          <AvatarFallback>{getUserInitials()}</AvatarFallback>
        </Avatar>
        {getUserName()}
      </NavLink>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={signOut}
        className="transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
      >
        Sign Out
      </Button>
    </div>
  );
};
