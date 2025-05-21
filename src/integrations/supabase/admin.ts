
import { supabase } from "./client";

/**
 * Set a user's subscription to premium
 * @param email Email of the user to upgrade
 * @returns Success status
 */
export async function setPremiumStatus(email: string): Promise<{ success: boolean; message: string }> {
  try {
    console.log(`Starting premium upgrade process for: ${email}`);
    
    // First, get the user ID from the email
    const { data: users, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .limit(1);
    
    if (userError) {
      console.error("Error fetching user:", userError);
      return { 
        success: false, 
        message: userError.message 
      };
    }
    
    if (!users || users.length === 0) {
      console.error("User not found with email:", email);
      return { 
        success: false, 
        message: "User not found" 
      };
    }
    
    const userId = users[0].id;
    console.log(`Found user with ID: ${userId}`);
    
    // Calculate the start and end dates
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1); // Set to 1 year from now
    
    console.log(`Setting premium subscription: Start=${startDate.toISOString()}, End=${endDate.toISOString()}`);
    
    // First, check if the user already has a subscription
    const { data: existingSub, error: checkError } = await supabase
      .from('subscriptions')
      .select('id')
      .eq('user_id', userId)
      .maybeSingle();
    
    let result;
    
    if (existingSub) {
      // Update existing subscription
      console.log(`Updating existing subscription for user ${userId}`);
      result = await supabase
        .from('subscriptions')
        .update({
          plan_type: 'premium',
          is_active: true,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          updated_at: startDate.toISOString()
        })
        .eq('user_id', userId);
    } else {
      // Create new subscription
      console.log(`Creating new subscription for user ${userId}`);
      result = await supabase
        .from('subscriptions')
        .insert({
          user_id: userId,
          plan_type: 'premium',
          is_active: true,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString()
        });
    }
    
    if (result.error) {
      console.error("Error updating subscription:", result.error);
      return { 
        success: false, 
        message: result.error.message 
      };
    }
    
    console.log(`Successfully upgraded ${email} to premium`);
    
    return { 
      success: true, 
      message: `Successfully upgraded ${email} to premium plan for 1 year` 
    };
  } catch (error) {
    console.error("Error in setPremiumStatus:", error);
    return { 
      success: false, 
      message: error.message || "An unexpected error occurred" 
    };
  }
}
