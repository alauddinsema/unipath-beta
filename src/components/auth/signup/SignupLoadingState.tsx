
import { Logo } from '@/components/ui/logo';
import { Loader2 } from 'lucide-react';

export function SignupLoadingState() {
  return (
    <div className="text-center animate-pulse">
      <Logo size="lg" />
      <div className="flex items-center justify-center mt-6">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
}
