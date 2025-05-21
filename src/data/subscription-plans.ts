
import { PricingPlan } from '@/types/payment';

export const SUBSCRIPTION_PLANS: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Basic access to university search',
    features: [
      'University search system',
      'Basic profile',
      'Email support',
      'Access to public resources'
    ]
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 0.50,
    description: 'Enhanced search and AI features',
    features: [
      'Everything in Free',
      'AI assistant access',
      'Document storage system',
      'Email and chat support',
      'Application tracking'
    ],
    isPopular: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1.00,
    description: 'Complete application toolkit',
    features: [
      'Everything in Basic',
      'Priority AI assistance',
      'Unlimited document storage',
      'Advanced application tracking',
      'Document review services',
      'Personalized recommendations'
    ]
  }
];
