
import { useState } from 'react';
import type { SignupFormState } from '@/types/auth';

export function useSignupFormState() {
  const [formData, setFormData] = useState<SignupFormState>({});
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const setStep = (step: number) => {
    setCurrentStep(Math.min(Math.max(step, 1), 3));
  };

  return {
    formData,
    currentStep,
    handleChange,
    handleSelectChange,
    nextStep,
    prevStep,
    setStep
  };
}
