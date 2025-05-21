
import React from 'react';
import { ProgressStep } from './progress/ProgressStep';
import { ProgressConnector } from './progress/ProgressConnector';
import { SignupStep } from './progress/SignupSteps';
import { User, GraduationCap, Award, CreditCard } from 'lucide-react';

interface SignupProgressNavProps {
  currentStep: number;
  steps: SignupStep[];
}

export function SignupProgressNav({ currentStep, steps }: SignupProgressNavProps) {
  // Function to map string icon names to Lucide icon components
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'user':
        return <User className="h-4 w-4" />;
      case 'school':
        return <GraduationCap className="h-4 w-4" />;
      case 'award':
        return <Award className="h-4 w-4" />;
      case 'creditCard':
        return <CreditCard className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center justify-center mb-8 relative">
      {steps.map((step, index) => {
        // Create elements separately to avoid Fragment key warning
        const stepElement = (
          <ProgressStep
            key={`step-${index}`}
            stepNumber={index + 1}
            label={step.label}
            active={currentStep >= index + 1}
            current={currentStep === index + 1}
            icon={step.icon ? <step.icon className="h-4 w-4" /> : null}
          />
        );
        
        // Only create connector if not the last item
        const connectorElement = index < steps.length - 1 ? (
          <ProgressConnector 
            key={`connector-${index}`}
            active={currentStep > index + 1} 
          />
        ) : null;
        
        // Return an array of elements instead of using a Fragment
        return [stepElement, connectorElement];
      }).flat().filter(Boolean)}
    </div>
  );
}
