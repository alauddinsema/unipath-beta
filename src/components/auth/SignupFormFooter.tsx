
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';

type SignupFormFooterProps = {
  currentStep: number;
  totalSteps: number;
  isSubmitting: boolean;
  onNext: () => void;
  onPrev: () => void;
};

export const SignupFormFooter: React.FC<SignupFormFooterProps> = ({
  currentStep,
  totalSteps,
  isSubmitting,
  onNext,
  onPrev,
}) => {
  const isLastStep = currentStep === totalSteps;
  
  return (
    <div className="flex flex-col space-y-4 w-full">
      {currentStep < totalSteps ? (
        <Button 
          type="submit" 
          className="w-full" 
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      ) : (
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      )}
      
      {currentStep > 1 && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrev}
          className="w-full"
        >
          Back
        </Button>
      )}
      
      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};
