
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';

export function SignupHeader() {
  return (
    <div className="text-center mb-8 animate-fade-in">
      <div className="inline-block">
        <Logo size="lg" />
      </div>
      <h1 className="mt-6 text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        Join UniPath
      </h1>
      <p className="mt-2 text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
        Create an account to find your perfect university match
      </p>
    </div>
  );
}
