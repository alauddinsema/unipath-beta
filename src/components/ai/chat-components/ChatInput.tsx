
import React, { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface ChatInputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isLoading: boolean;
  onSend?: () => void;
  handleSendMessage?: () => void;
  disabled?: boolean;
  
  // Alternative props for compatibility
  inputValue?: string;
  setInputValue?: (value: string) => void;
  
  // Add retryMessage prop to fix TypeScript error
  retryMessage?: string | null;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder = "Ask about university applications, documents, or the platform...",
  isLoading,
  onSend,
  handleSendMessage,
  disabled,
  
  // Support for alternative props
  inputValue,
  setInputValue,
  retryMessage,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Determine which value to use (supporting both input methods)
  const inputVal = inputValue !== undefined ? inputValue : value;
  
  // Handle changes for both patterns
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else if (setInputValue) {
      setInputValue(e.target.value);
    }
  };
  
  // Default key down handler if using the alternative props pattern
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (onKeyDown) {
      onKeyDown(e);
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleClick();
    }
  };

  // Handle send button click
  const handleClick = () => {
    if (onSend) {
      onSend();
    } else if (handleSendMessage) {
      handleSendMessage();
    }
  };
  
  // Determine if the button should be disabled
  const isButtonDisabled = disabled !== undefined ? 
    disabled : 
    (!inputVal || inputVal.trim() === '') || isLoading;
  
  return (
    <div className="flex items-center w-full gap-2">
      <Input
        ref={inputRef}
        value={inputVal || ''}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="bg-secondary/80 flex-grow"
        disabled={isLoading}
      />
      <Button 
        onClick={handleClick} 
        disabled={isButtonDisabled}
        className="shrink-0"
        type="button"
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};
