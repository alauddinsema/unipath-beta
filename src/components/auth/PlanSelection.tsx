
import React from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Star, Sparkles, Award } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { Plan } from '@/types/auth';

interface PlanSelectionProps {
  selectedPlan: Plan;
  onPlanChange: (plan: Plan) => void;
}

export const PlanSelection: React.FC<PlanSelectionProps> = ({
  selectedPlan,
  onPlanChange,
}) => {
  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: 'Free',
      description: 'Basic features to get you started',
      features: ['Basic university search', 'Save up to 5 favorites', 'Community forum access'],
      icon: <CheckCircle2 className="h-5 w-5 text-blue-400" />
    },
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$0.50/month',
      description: 'Enhanced features for serious students',
      features: [
        'Advanced university search',
        'Save up to 25 favorites',
        'Email support',
        'Download university profiles',
        'Basic application tracking'
      ],
      popular: true,
      icon: <Award className="h-5 w-5 text-blue-500" />
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$1.00/month',
      description: 'Full access to all premium features',
      features: [
        'Unlimited favorites',
        'Priority support 24/7',
        'Access to premium resources',
        'AI-powered university recommendations',
        'Advanced application tracking'
      ],
      icon: <Sparkles className="h-5 w-5 text-amber-500" />
    }
  ];

  return (
    <div className="space-y-4">
      <RadioGroup value={selectedPlan} onValueChange={(value) => onPlanChange(value as Plan)}>
        {plans.map((plan) => (
          <div key={plan.id} className="relative">
            <RadioGroupItem
              value={plan.id as Plan}
              id={plan.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={plan.id}
              className="flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all 
                peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10
                hover:bg-primary/5 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(62,135,255,0.2)]"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  {plan.icon}
                  <div className="ml-2">
                    <div className="font-semibold">{plan.name}</div>
                    <div className="text-sm text-muted-foreground">{plan.description}</div>
                  </div>
                </div>
                <div className="text-lg font-bold text-primary/90">{plan.price}</div>
              </div>
              <div className="space-y-1 mt-2">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
              {plan.popular && (
                <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs py-1 px-2 rounded-full flex items-center">
                  <Star className="h-3 w-3 mr-1" /> POPULAR
                </div>
              )}
              {plan.id === 'premium' && (
                <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs py-1 px-2 rounded-full flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" /> PREMIUM
                </div>
              )}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
