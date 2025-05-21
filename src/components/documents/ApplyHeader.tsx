
import React from 'react';
import { Bot } from 'lucide-react';

export function ApplyHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-1 text-gradient flex items-center">
          <Bot className="mr-2 h-6 w-6" />
          AI Assistant
        </h1>
        <p className="text-muted-foreground">
          Get help with your applications, research universities, and manage documents
        </p>
      </div>
    </div>
  );
}
