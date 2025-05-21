
import { useState } from 'react';
import { useSignupAuth } from './useSignupAuth';
import { SignupFormState } from '@/types/auth';
import { validateAccountStep, validateAcademicStep } from '@/utils/signupValidation';

interface UseSignupFormProps {
  onSubmitStarted: () => void;
  onSubmitCompleted: () => void;
}

export function useSignupForm({ onSubmitStarted, onSubmitCompleted }: UseSignupFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<SignupFormState>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { isSubmitting, handleSignupSubmit } = useSignupAuth({
    onSubmitStarted,
    onSubmitCompleted,
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };
  
  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      const result = validateAccountStep(formData);
      if (!result.valid) {
        setErrors(result.errors);
      } else {
        nextStep();
      }
    } else if (currentStep === 2) {
      const result = validateAcademicStep(formData);
      if (!result.valid) {
        setErrors(result.errors);
      } else {
        // Add some default values if not provided
        const completeFormData = {
          ...formData,
          degreeType: formData.degreeType || 'Bachelor',
          fieldOfStudy: formData.fieldOfStudy || 'General',
        };
        
        console.log("Form submission with data:", completeFormData);
        handleSignupSubmit(completeFormData as SignupFormState);
      }
    }
  };
  
  return {
    currentStep,
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSelectChange,
    nextStep,
    prevStep,
    handleSubmit
  };
}
