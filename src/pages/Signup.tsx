
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { SignupLoadingState } from '@/components/auth/signup/SignupLoadingState';
import { SignupHeader } from '@/components/auth/signup/SignupHeader';
import { SignupFormContainer } from '@/components/auth/signup/SignupFormContainer';
import { useSignupForm } from '@/hooks/useSignupForm';
import { SIGNUP_STEPS } from '@/components/auth/progress/SignupSteps';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { useToast } from '@/hooks/use-toast';

export default function Signup() {
  const { session, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  const handleSubmitStarted = () => {
    console.log("Starting signup process...");
  };
  
  const handleSubmitCompleted = () => {
    console.log("Signup process completed!");
  };
  
  const {
    currentStep,
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSelectChange,
    nextStep,
    prevStep,
    handleSubmit
  } = useSignupForm({
    onSubmitStarted: handleSubmitStarted,
    onSubmitCompleted: handleSubmitCompleted
  });

  // Debug logging
  useEffect(() => {
    console.log("Current step:", currentStep);
  }, [currentStep]);

  if (isLoading) {
    return (
      <AuroraBackground 
        className="flex flex-col items-center justify-center p-4" 
        intensity="medium"
        animationSpeed="slow"
        showRadialGradient={true}
        textGlow={true}
        optimizePerformance={true}
      >
        <SignupLoadingState />
      </AuroraBackground>
    );
  }

  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <AuroraBackground 
      className="flex flex-col items-center justify-center p-4"
      intensity="medium"
      animationSpeed="slow"
      showRadialGradient={true}
      textGlow={true}
      optimizePerformance={true}
    >
      <div className="w-full max-w-md">
        <SignupHeader />
        <SignupFormContainer
          currentStep={currentStep}
          steps={SIGNUP_STEPS}
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
          handleSubmit={handleSubmit}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      </div>
    </AuroraBackground>
  );
}
