
import React, { useState, useRef, useEffect } from 'react';
import { BrowserToolbar } from './BrowserToolbar';
import { BrowserContent } from './BrowserContent';
import { useBrowserNavigation } from './useBrowserNavigation';

export interface InPlatformBrowserProps {
  initialUrl: string;
  height?: string;
}

export const InPlatformBrowser: React.FC<InPlatformBrowserProps> = ({
  initialUrl = 'https://www.google.com',
  height = '600px',
}) => {
  const [url, setUrl] = useState<string>(initialUrl);
  const [inputUrl, setInputUrl] = useState<string>(initialUrl);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { history, historyIndex, canGoBack, canGoForward, navigate, goBack, goForward } = useBrowserNavigation(initialUrl);

  useEffect(() => {
    setUrl(history[historyIndex]);
    setInputUrl(history[historyIndex]);
  }, [history, historyIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let processedUrl = inputUrl.trim();
    
    // Add https:// if missing and not a local URL
    if (!processedUrl.startsWith('http://') && !processedUrl.startsWith('https://') && !processedUrl.startsWith('/')) {
      // If it looks like a search term rather than a URL, redirect to Google search
      if (!processedUrl.includes('.') || processedUrl.includes(' ')) {
        processedUrl = `https://www.google.com/search?q=${encodeURIComponent(processedUrl)}`;
      } else {
        processedUrl = `https://${processedUrl}`;
      }
    }
    
    navigate(processedUrl);
    setIsLoading(true);
  };

  const refresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  const goHome = () => {
    const homeUrl = 'https://www.google.com';
    navigate(homeUrl);
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col border rounded-md overflow-hidden" style={{ height }}>
      <BrowserToolbar
        inputUrl={inputUrl}
        setInputUrl={setInputUrl}
        handleSubmit={handleSubmit}
        goBack={goBack}
        goForward={goForward}
        refresh={refresh}
        goHome={goHome}
        isLoading={isLoading}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
      />
      <BrowserContent
        url={url}
        isLoading={isLoading}
        onLoad={handleIframeLoad}
        ref={iframeRef}
      />
    </div>
  );
};

export default InPlatformBrowser;
