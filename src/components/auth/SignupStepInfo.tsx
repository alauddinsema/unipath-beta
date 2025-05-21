
import React from 'react';

interface SignupStepInfoProps {
  currentStep: number;
}

export const SignupStepInfo: React.FC<SignupStepInfoProps> = ({ currentStep }) => {
  const steps = [
    { title: "Account Information", description: "Create your login credentials" },
    { title: "Academic Profile", description: "Tell us about your education background" }
  ];
  
  const currentStepInfo = steps[currentStep - 1];
  
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold tracking-tight mb-1">
        {currentStepInfo.title}
      </h1>
      <p className="text-sm text-muted-foreground">
        {currentStepInfo.description}
      </p>
    </div>
  );
};
