
import React from 'react';
import { useAIChat } from './hooks/useAIChat';
import { ChatContainer } from './chat-components/ChatContainer';

export function AIChat() {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    retryMessage,
    handleSendMessage,
    handleRetry,
    webhookResponse,
    webhookError
  } = useAIChat();

  return (
    <ChatContainer
      messages={messages}
      inputValue={inputValue}
      setInputValue={setInputValue}
      isLoading={isLoading}
      retryMessage={retryMessage}
      handleSendMessage={handleSendMessage}
      handleRetry={handleRetry}
      webhookResponse={webhookResponse}
      webhookError={webhookError}
    />
  );
}
