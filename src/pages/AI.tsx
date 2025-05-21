
import React, { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card } from '@/components/ui/card';
import { WebhookChat } from '@/components/ai/chatbots/WebhookChat';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/payments';
import { hasAIAccess } from '@/utils/feature-access';
import { useToast } from '@/hooks/use-toast';

export default function AI() {
  const { user } = useAuth();
  const { subscription } = useSubscription(user?.id);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user has access to AI features
    if (user && subscription && !hasAIAccess(subscription.planType || 'free')) {
      toast({
        title: "Subscription Required",
        description: "AI Assistant requires a Basic or Premium subscription.",
        variant: "destructive",
      });
      navigate('/subscription-plans?feature=ai');
    }
  }, [user, subscription, navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-indigo-950">
      <Navbar />
      <div className="container max-w-5xl mx-auto pt-20 pb-10 px-4">
        <h1 className="text-3xl font-bold mb-2 text-center text-white">AI Assistant</h1>
        <p className="text-center mb-6 text-white/80">
          Get help with university applications and get answers to your questions
        </p>
        
        <Card className="bg-black/30 border border-white/10 rounded-xl shadow-lg p-4 md:p-6">
          <WebhookChat />
        </Card>
      </div>
    </div>
  );
}
