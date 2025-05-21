
import { useState } from 'react';

export interface UseBrowserNavigationReturn {
  history: string[];
  historyIndex: number;
  canGoBack: boolean;
  canGoForward: boolean;
  goBack: () => void;
  goForward: () => void;
  navigate: (url: string) => void;
}

export const useBrowserNavigation = (initialUrl: string): UseBrowserNavigationReturn => {
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const goBack = () => {
    if (canGoBack) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const goForward = () => {
    if (canGoForward) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const navigate = (url: string) => {
    // Remove forward history when navigating to a new URL
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(url);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  return {
    history,
    historyIndex,
    canGoBack,
    canGoForward,
    goBack,
    goForward,
    navigate
  };
};
