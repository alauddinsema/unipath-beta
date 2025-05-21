
import { useState, useEffect } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Lock, Loader2 } from 'lucide-react';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { signIn, session } = useAuth();
  const location = useLocation();
  
  // Check if user came from signup page
  const verificationEmail = location.state?.email;
  const accountCreated = location.state?.accountCreated;
  
  // Auto-fill email if provided from signup
  useEffect(() => {
    if (verificationEmail) {
      setEmail(verificationEmail);
    }
  }, [verificationEmail]);

  // Redirect if user is already logged in
  if (session) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await signIn(email, password);
      if (error) throw error;
    } catch (error: any) {
      // Login errors are already handled by the signIn function
      console.error("Login error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuroraBackground 
      className="flex flex-col min-h-screen items-center justify-center p-4"
      intensity="medium"
      animationSpeed="slow"
      showRadialGradient={true}
      textGlow={true}
      optimizePerformance={true}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <Logo size="lg" />
          <h1 className="mt-6 text-3xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Welcome back
          </h1>
          <p className="mt-2 text-white/80 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]">
            Sign in to continue your journey
          </p>
        </div>

        {accountCreated && (
          <Alert className="mb-6 bg-green-500/20 border-green-500/50 text-white backdrop-blur-sm">
            <InfoIcon className="h-4 w-4 text-green-300" />
            <AlertTitle>Account created successfully!</AlertTitle>
            <AlertDescription>
              Your account has been created. Please sign in with your credentials.
            </AlertDescription>
          </Alert>
        )}

        <Card className="backdrop-blur-md bg-black/40 border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white">Sign In</CardTitle>
            <CardDescription className="text-white/90">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-white/50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-blue-300 hover:text-blue-200 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-300" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10 bg-black/30 border-white/20 text-white placeholder:text-white/50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/80" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <p className="text-center text-sm text-white drop-shadow-md">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-300 hover:text-blue-200 hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AuroraBackground>
  );
}
