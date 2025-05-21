
import React from 'react';
import { Loader2 } from 'lucide-react';

interface WebhookResponseDisplayProps {
  response: any;
  isError?: boolean;
}

/**
 * Component to display webhook responses in the chat interface
 */
export const WebhookResponseDisplay: React.FC<WebhookResponseDisplayProps> = ({ 
  response, 
  isError = false 
}) => {
  if (!response) return null;
  
  // Handle processing status
  if (response.status === "processing") {
    return (
      <div className="flex items-center space-x-2 text-white/90 bg-indigo-950/50 p-3 my-2 rounded-md">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>{response.message}</span>
      </div>
    );
  }
  
  // Handle error states
  if (isError) {
    return (
      <div className="flex items-center space-x-2 text-red-300 bg-red-950/30 p-3 my-2 rounded-md">
        <span>⚠️</span>
        <span>{typeof response === 'string' ? response : JSON.stringify(response)}</span>
      </div>
    );
  }
  
  // Handle successful responses - extract content from output property if it exists
  const content = response.output || response;
  
  return (
    <div className="text-sm text-white/90 p-3 my-2 bg-black/20 rounded-md">
      {typeof content === 'object' ? (
        <pre className="whitespace-pre-wrap overflow-auto">
          {JSON.stringify(content, null, 2)}
        </pre>
      ) : (
        <p>{String(content)}</p>
      )}
    </div>
  );
};
