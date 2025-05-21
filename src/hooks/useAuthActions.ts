import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export function useAuthActions() {
  const { toast } = useToast();

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      if (!userData || !userData.fullName) {
        throw new Error("Full name is required");
      }

      const fullNameString = userData.fullName.toString().trim();
      const nameParts = fullNameString.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

      const userMetadata = {
        full_name: fullNameString,
        first_name: firstName,
        last_name: lastName,
        gender: userData.gender || 'other',
        gpa: userData.gpa ? parseFloat(userData.gpa) : null,
        sat_score: userData.satScore ? parseInt(userData.satScore) : null,
        ielts_score: userData.ieltsScore ? parseFloat(userData.ieltsScore) : null,
        degree_type: userData.degreeType || null,
        field_of_study: userData.fieldOfStudy || null,
      };

      console.log("Signing up with metadata:", userMetadata);

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userMetadata,
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) {
        console.error("Signup error:", error.message);
        throw error;
      }

      return { error: null, data };
    } catch (error: any) {
      console.error("Caught signup error:", error);
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Sign in error:", error.message);
        toast({
          title: "Sign in failed",
          description: error.message.includes("Invalid login credentials") 
            ? "Invalid email or password. Please check your credentials and try again."
            : error.message,
          variant: "destructive",
        });
        throw error;
      }

      return { error: null, data };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error: any) {
      console.error("Sign out error:", error.message);
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateUserProfile = async (userData: { name: string }) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: userData
      });

      if (error) throw error;

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated",
      });
    } catch (error: any) {
      console.error("Profile update error:", error.message);
      toast({
        title: "Profile update failed",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    signUp,
    signIn,
    signOut,
    updateUserProfile
  };
}
