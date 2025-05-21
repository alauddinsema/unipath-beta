
import { useRef, useState, useCallback } from 'react';

export const useScrollToBottom = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  
  const handleScroll = useCallback(() => {
    if (!scrollAreaRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    
    setShowScrollButton(!isNearBottom);
  }, []);
  
  return {
    messagesEndRef,
    scrollAreaRef,
    showScrollButton,
    scrollToBottom,
    handleScroll,
  };
};
