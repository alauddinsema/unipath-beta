
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/payments';
import { hasAIAccess, hasDocumentStorageAccess } from '@/utils/feature-access';
import { useToast } from '@/hooks/use-toast';

export default function ProtectedPremiumRoute({ 
  requiresAI = false,
  requiresDocuments = false
}: { 
  requiresAI?: boolean,
  requiresDocuments?: boolean 
}) {
  const { session, user } = useAuth();
  const { subscription } = useSubscription(user?.id);
  const location = useLocation();
  const { toast } = useToast();
  
  // If user is not logged in, redirect to login
  if (!session) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />;
  }
  
  // If feature access checks are required
  if (requiresAI && !hasAIAccess(subscription?.planType || 'free')) {
    toast({
      title: "Premium Feature",
      description: "AI Assistant requires a Basic or Premium subscription.",
      variant: "destructive",
    });
    return <Navigate to="/subscription-plans?feature=ai" />;
  }
  
  if (requiresDocuments && !hasDocumentStorageAccess(subscription?.planType || 'free')) {
    toast({
      title: "Premium Feature",
      description: "Document storage requires a Basic or Premium subscription.",
      variant: "destructive",
    });
    return <Navigate to="/subscription-plans?feature=documents" />;
  }
  
  return <Outlet />;
}
