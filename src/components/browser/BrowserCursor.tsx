
import React, { useState, useEffect } from 'react';
import './BrowserCursor.css';

interface BrowserCursorProps {
  containerRef: React.RefObject<HTMLElement>;
}

export function BrowserCursor({ containerRef }: BrowserCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState('cursor-normal');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Just use client coordinates directly
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
      setIsVisible(true);
      
      // Determine cursor type based on element under cursor
      const element = document.elementFromPoint(e.clientX, e.clientY);
      if (element) {
        if (element.tagName === 'A' || element.closest('a')) {
          setCursorType('cursor-link');
        } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          setCursorType('cursor-text');
        } else if (element.getAttribute('role') === 'button' || element.tagName === 'BUTTON') {
          setCursorType('cursor-pointer');
        } else {
          setCursorType('cursor-normal');
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [containerRef]);

  if (!isVisible) return null;

  return (
    <div 
      className="cursor-container"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      <div className={`cursor-icon ${cursorType}`} />
    </div>
  );
}
