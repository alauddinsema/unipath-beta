
import { useEffect, useState } from 'react';

/**
 * Hook that tracks whether the window is currently focused or not
 * @returns Object containing the current focus state
 */
export function useWindowFocus() {
  const [isFocused, setIsFocused] = useState(document.hasFocus());
  const [lastFocusTime, setLastFocusTime] = useState(Date.now());

  useEffect(() => {
    const handleFocus = () => {
      // When window gains focus, record the time
      setLastFocusTime(Date.now());
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    // Add event listeners for focus and blur events
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  return { 
    isFocused,
    lastFocusTime
  };
}
