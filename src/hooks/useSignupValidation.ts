
import { useState } from 'react';
import { validateAccountStep, validateAcademicStep } from '@/utils/signupValidation';
import type { SignupFormState } from '@/types/auth';

export function useSignupValidation() {
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateStep = (step: number, formData: SignupFormState) => {
    console.log(`Validating step ${step} with data:`, formData);
    
    if (step === 1) {
      const { valid, errors: validationErrors } = validateAccountStep(formData);
      console.log(`Step 1 validation result: ${valid}`, validationErrors);
      if (!valid) {
        setErrors(validationErrors);
      } else {
        setErrors({});
      }
      return valid;
    } 
    
    if (step === 2) {
      const { valid, errors: validationErrors } = validateAcademicStep(formData);
      console.log(`Step 2 validation result: ${valid}`, validationErrors);
      if (!valid) {
        setErrors(validationErrors);
      } else {
        setErrors({});
      }
      return valid;
    }

    // Plan selection step
    if (step === 3) {
      // No specific validation needed for plan selection
      console.log("Plan selection step - no validation needed");
      setErrors({});
      return true;
    }
    
    return true;
  };

  const clearFieldError = (name: string) => {
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return {
    errors,
    setErrors,
    validateStep,
    clearFieldError
  };
}
