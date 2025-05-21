
import React from 'react';
import { ChatContainer } from '../chat-components/ChatContainer';
import { useClaudeChat } from '../hooks/useClaudeChat';

export function ClaudeChat() {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    retryMessage,
    handleSendMessage,
    handleRetry
  } = useClaudeChat();

  return (
    <ChatContainer
      messages={messages}
      inputValue={inputValue}
      setInputValue={setInputValue}
      isLoading={isLoading}
      retryMessage={retryMessage}
      handleSendMessage={handleSendMessage}
      handleRetry={handleRetry}
    />
  );
}
