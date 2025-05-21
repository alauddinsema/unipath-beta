
import React from 'react';
import { Separator } from '@/components/ui/separator';

export const SignupGoogleButton: React.FC = () => {
  return (
    <>
      <div className="relative mt-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full border-white/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-black/50 px-2 text-white/70">Note</span>
        </div>
      </div>
      
      <p className="mt-4 text-center text-sm text-white/70">
        Currently only email and password sign up is supported.
      </p>
    </>
  );
}
