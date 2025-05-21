
import { supabase } from '@/integrations/supabase/client';

interface UpgradeResult {
  success: boolean;
  message: string;
}

export async function upgradeSpecificUser(): Promise<UpgradeResult> {
  try {
    console.log("Starting upgrade process for specific user");
    
    // Get the user ID from the email
    const { data: users, error: userError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', 'alauddin.jamshitbekov@gmail.com')
      .limit(1);
    
    if (userError) {
      console.error("Error fetching user:", userError);
      return { 
        success: false, 
        message: `Error fetching user: ${userError.message}` 
      };
    }
    
    if (!users || users.length === 0) {
      console.error("User not found with email: alauddin.jamshitbekov@gmail.com");
      return { 
        success: false, 
        message: "User not found with this email" 
      };
    }
    
    const userId = users[0].id;
    console.log(`Found user with ID: ${userId}`);
    
    // Calculate the start and end dates (1 year from now)
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
    
    if (checkError) {
      console.error("Error checking existing subscription:", checkError);
      return { 
        success: false, 
        message: `Error checking subscription: ${checkError.message}` 
      };
    }
    
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
        message: `Error updating subscription: ${result.error.message}` 
      };
    }
    
    console.log(`Successfully upgraded alauddin.jamshitbekov@gmail.com to premium for 1 year`);
    
    return { 
      success: true, 
      message: `Successfully upgraded alauddin.jamshitbekov@gmail.com to premium for 1 year` 
    };
  } catch (error) {
    console.error("Error in upgradeSpecificUser:", error);
    return { 
      success: false, 
      message: error.message || "An unexpected error occurred" 
    };
  }
}
