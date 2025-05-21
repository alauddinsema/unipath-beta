
import { useState, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useWindowFocus } from '@/hooks/useWindowFocus';

export function useAuthState() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isFocused } = useWindowFocus();

  useEffect(() => {
    setIsLoading(true);
    
    // Track if this is a genuine login/logout or just a tab switch
    let previousSessionState = null;
    
    // Set up the auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log("Auth state changed:", event);
        
        // Update state with new session
        setSession(newSession);
        setUser(newSession?.user ?? null);

        // Only show the toast and navigate on genuine sign-in events (not on tab switches)
        if (event === 'SIGNED_IN') {
          console.log("User signed in:", newSession?.user);
          
          // Check if this is a tab switch or a page reload
          const lastInteraction = parseInt(localStorage.getItem('lastInteraction') || '0');
          const pageLoadTime = parseInt(localStorage.getItem('pageLoadTime') || '0');
          const currentTime = Date.now();
          
          // Consider it a genuine login if:
          // 1. It's not the initial page load
          // 2. The last interaction was recent (within last 30 seconds)
          // 3. We didn't already have a session (wasn't just a tab switch)
          const isGenuineLogin = !isInitialLoad && 
                                (currentTime - lastInteraction < 30000) && 
                                previousSessionState === null;
          
          if (isGenuineLogin) {
            toast({
              title: "Signed in successfully",
              description: "Welcome to UniPath",
            });
            navigate('/dashboard');
          }
          
          // Update our tracking of previous session state
          previousSessionState = newSession;
        }
        
        if (event === 'SIGNED_OUT') {
          // Only show toast if this was an actual sign-out action, not just a refresh
          const wasActualSignout = previousSessionState !== null;
          
          if (wasActualSignout && !isInitialLoad) {
            toast({
              title: "Signed out",
              description: "You have been signed out successfully",
            });
            navigate('/login');
          }
          
          // Update our tracking of previous session state
          previousSessionState = null;
        }

        // Update loading state after processing the event
        setIsLoading(false);
      }
    );

    // Then check for existing session
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error fetching initial session:", error);
          throw error;
        }
        
        if (initialSession) {
          console.log("Initial session found:", initialSession.user);
          setSession(initialSession);
          setUser(initialSession.user);
          previousSessionState = initialSession;
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast({
          title: "Authentication Error",
          description: "There was a problem accessing your session",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        
        // After initial load is complete, update the flag
        setTimeout(() => {
          setIsInitialLoad(false);
        }, 2000);
      }
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast, isInitialLoad]);

  return { session, user, isLoading };
}
