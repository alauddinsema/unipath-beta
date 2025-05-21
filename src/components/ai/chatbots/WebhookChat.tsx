
import React from 'react';
import { useWebhookChat } from '../hooks/useWebhookChat';
import { ChatContainer } from '../chat-components/ChatContainer';

/**
 * Component that implements a chat interface connected to a webhook
 */
export function WebhookChat() {
  const {
    messages,
    inputValue,
    setInputValue,
    isLoading,
    handleSendMessage,
    webhookResponse,
    webhookError
  } = useWebhookChat();

  return (
    <ChatContainer
      messages={messages}
      inputValue={inputValue}
      setInputValue={setInputValue}
      isLoading={isLoading}
      handleSendMessage={handleSendMessage}
      webhookResponse={webhookResponse}
      webhookError={webhookError}
      retryMessage={null}
    />
  );
}
