
import React from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { SignupStepInfo } from '@/components/auth/SignupStepInfo';
import { SignupProgressNav } from '@/components/auth/SignupProgressNav';
import { SignupFormFooter } from '@/components/auth/SignupFormFooter';
import { SignupGoogleButton } from '@/components/auth/SignupGoogleButton';
import { AccountInfoForm } from '@/components/auth/AccountInfoForm';
import { AcademicInfoForm } from '@/components/auth/AcademicInfoForm';
import type { SignupStep } from '@/components/auth/progress/SignupSteps';
import { useTheme } from '@/contexts/ThemeContext';

interface SignupFormContainerProps {
  currentStep: number;
  steps: SignupStep[];
  formData: any;
  errors: any;
  isSubmitting: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export function SignupFormContainer({
  currentStep,
  steps,
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleSelectChange,
  handleSubmit,
  nextStep,
  prevStep
}: SignupFormContainerProps) {
  const { resolvedTheme } = useTheme();
  
  const cardClass = resolvedTheme === 'dark'
    ? "backdrop-blur-md bg-black/40 border border-white/20 shadow-2xl"
    : "backdrop-blur-md bg-white/90 border border-gray-200 shadow-xl";
  
  return (
    <Card className={cardClass}>
      <CardHeader>
        <SignupStepInfo currentStep={currentStep} />
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent>
          <SignupProgressNav 
            currentStep={currentStep} 
            steps={steps} 
          />
          
          {currentStep === 1 ? (
            <>
              <AccountInfoForm 
                formData={formData} 
                errors={errors} 
                handleChange={handleChange}
                handleSelectChange={handleSelectChange} 
              />
              <div className="mt-4">
                <SignupGoogleButton />
              </div>
            </>
          ) : currentStep === 2 ? (
            <AcademicInfoForm 
              formData={formData} 
              errors={errors} 
              handleChange={handleChange} 
              handleSelectChange={handleSelectChange}
            />
          ) : null}
        </CardContent>
        
        <CardFooter className="flex flex-col space-y-4">
          <SignupFormFooter
            currentStep={currentStep}
            totalSteps={2}
            isSubmitting={isSubmitting}
            onNext={nextStep}
            onPrev={prevStep}
          />
        </CardFooter>
      </form>
    </Card>
  );
}
