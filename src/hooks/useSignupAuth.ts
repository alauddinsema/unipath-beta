
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import type { SignupFormState } from '@/types/auth';

interface UseSignupAuthProps {
  onSubmitStarted: () => void;
  onSubmitCompleted: () => void;
}

export function useSignupAuth({ onSubmitStarted, onSubmitCompleted }: UseSignupAuthProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignupSubmit = async (formData: SignupFormState) => {
    if (!formData.email || !formData.password || !formData.fullName) {
      toast({
        title: "Error creating account",
        description: "Missing required account information.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    onSubmitStarted();
    
    try {
      // Ensure fullName is a string and trim it
      const fullName = formData.fullName?.toString().trim() || '';
      
      // Prepare user metadata - ensure all fields are properly formatted
      const userData = {
        fullName: fullName, // Pass the full name as is
        gpa: formData.gpa || '',
        satScore: formData.satScore || '',
        ieltsScore: formData.ieltsScore || '',
        degreeType: formData.degreeType || '',
        fieldOfStudy: formData.fieldOfStudy || '',
      };
      
      console.log("Attempting to sign up with data:", { email: formData.email, userData });
      
      const result = await signUp(
        formData.email.trim(),
        formData.password,
        userData
      );
      
      if (result.error) {
        throw result.error;
      }
      
      // Log successful signup
      console.log("Signup successful, redirecting to login");
      
      // Show success toast
      toast({
        title: "Account created successfully",
        description: "You can now sign in with your credentials.",
      });
      
      // Navigate to login page with email prefilled
      navigate('/login', { 
        state: { 
          email: formData.email,
          accountCreated: true 
        } 
      });
      
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: "Error creating account",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      onSubmitCompleted();
    }
  };

  return {
    isSubmitting,
    handleSignupSubmit
  };
}
