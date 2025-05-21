
import { supabase } from '@/integrations/supabase/client';
import { ApiMessage, PLATFORM_KNOWLEDGE } from '../types/chat-types';
import { BaseAIService } from './ai-service-base';

class ClaudeService extends BaseAIService {
  protected async getResponseFromService(userMessage: string, messageHistory: ApiMessage[]): Promise<string> {
    const { data, error } = await supabase.functions.invoke('claude-chat', {
      body: { 
        messages: messageHistory,
        platformInfo: PLATFORM_KNOWLEDGE
      },
    });

    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(error.message || 'Failed to connect to Claude AI service');
    }

    if (!data || !data.content) {
      console.error('Invalid response data:', data);
      throw new Error('Invalid response from Claude AI service');
    }

    return data.content;
  }
}

// Singleton instance
const claudeServiceInstance = new ClaudeService();

// Export the function to call the service
export const getAIResponse = async (userMessage: string, messageHistory: ApiMessage[]): Promise<string> => {
  return claudeServiceInstance.callService(userMessage, messageHistory, 'Claude');
};
