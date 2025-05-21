
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendIcon, Loader2 } from 'lucide-react';
import { useChatActions } from './hooks/useChatActions';
import { ChatMessage } from './ChatMessage';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SimpleChatbot() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // This would normally use a real API
  const getAIResponse = async (message: string, history: any[]) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return a dummy response
    return `This is a simulated response to your message: "${message}". In a real implementation, this would call an AI service API like OpenAI, Claude, or Google Gemini.`;
  };
  
  const {
    messages,
    inputValue,
    isLoading,
    handleSendMessage,
    handleRetry,
  } = useChatActions(getAIResponse);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    // Update the input value in the chat state
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  return (
    <div className="flex flex-col h-[70vh] md:min-h-[600px]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              onRetry={message.role === 'user' ? () => handleRetry(message.content) : undefined}
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-center my-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleFormSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            placeholder="Type your message..."
            onChange={handleInputChange}
            className="flex-1"
            defaultValue={inputValue}
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            <SendIcon className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
        
        <div className="mt-2 text-xs text-white/60 text-center">
          <p>Note: This is a demo. In production, this would connect to an AI service.</p>
        </div>
      </div>
    </div>
  );
}
