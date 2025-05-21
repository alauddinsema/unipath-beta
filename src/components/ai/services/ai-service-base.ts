
import { ApiMessage } from '../types/chat-types';

export abstract class BaseAIService {
  // Abstract method to be implemented by specific AI services
  protected abstract getResponseFromService(userMessage: string, messageHistory: ApiMessage[]): Promise<string>;
  
  public async callService(userMessage: string, messageHistory: ApiMessage[] = [], serviceName: string): Promise<string> {
    console.log(`Calling ${serviceName} AI service with message:`, userMessage);
    
    try {
      const response = await this.getResponseFromService(userMessage, messageHistory);
      console.log(`Received response from ${serviceName} successfully`);
      return response;
    } catch (error) {
      console.error(`Error calling ${serviceName} service:`, error);
      throw error;
    }
  }
}
