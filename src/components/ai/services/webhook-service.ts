
import { formatChatResponse } from '../utils/response-formatter';

const WEBHOOK_URL = "https://intersapater.app.n8n.cloud/webhook/727dbbb5-fe21-4da3-8ddd-d473aed07e68";

export async function sendToWebhook(message: string): Promise<any> {
  try {
    console.log("Sending message to webhook:", { message });
    
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        timestamp: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(15000), // 15 second timeout
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Webhook error: ${response.status} ${response.statusText}. Details: ${errorText}`);
    }
    
    console.log("Webhook response received");
    const data = await response.json();
    console.log("Webhook response data:", data);
    
    // Format the response before returning
    if (data && data.output) {
      data.output = formatChatResponse(data.output);
    }
    
    return data;
  } catch (error) {
    console.error("Webhook error:", error);
    throw error;
  }
}

export const sendMessageToWebhook = sendToWebhook;

export async function sendToWebhookWithRetry(
  message: string, 
  maxRetries = 2,
  retryDelay = 1000
): Promise<any> {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      // Wait before retrying (but not on first attempt)
      if (attempt > 0) {
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        console.log(`Retrying webhook (attempt ${attempt} of ${maxRetries})...`);
      }
      
      return await sendToWebhook(message);
    } catch (error) {
      console.warn(`Webhook attempt ${attempt + 1} failed:`, error);
      lastError = error;
    }
  }
  
  console.error(`All ${maxRetries + 1} webhook attempts failed`);
  throw lastError;
}
