
import React, { forwardRef } from 'react';

export interface BrowserContentProps {
  url: string;
  isLoading: boolean;
  onLoad?: () => void;
}

export const BrowserContent = forwardRef<HTMLIFrameElement, BrowserContentProps>(
  ({ url, isLoading, onLoad }, ref) => {
    return (
      <div className="flex-1 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}
        <iframe
          ref={ref}
          src={url}
          className="w-full h-full border-0"
          onLoad={onLoad}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          title="Browser Content"
        />
      </div>
    );
  }
);

BrowserContent.displayName = 'BrowserContent';
