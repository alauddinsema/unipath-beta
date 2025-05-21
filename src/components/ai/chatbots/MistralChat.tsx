
import React from 'react';
import { ChatContainer } from '../chat-components/ChatContainer';
import { useMistralChat } from '../hooks/useMistralChat';

export function MistralChat() {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    retryMessage,
    handleSendMessage,
    handleRetry
  } = useMistralChat();

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
