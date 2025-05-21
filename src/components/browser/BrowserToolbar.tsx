
import React, { FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, RefreshCw, Home } from 'lucide-react';

export interface BrowserToolbarProps {
  inputUrl: string;
  setInputUrl: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
  goBack: () => void;
  goForward: () => void;
  refresh: () => void;
  goHome: () => void; // Added this missing property
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
}

export const BrowserToolbar: React.FC<BrowserToolbarProps> = ({
  inputUrl,
  setInputUrl,
  handleSubmit,
  goBack,
  goForward,
  refresh,
  goHome, // Added this parameter
  isLoading,
  canGoBack,
  canGoForward,
}) => {
  return (
    <div className="flex items-center gap-2 p-2 border-b">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={goBack}
        disabled={!canGoBack}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={goForward}
        disabled={!canGoForward}
      >
        <ArrowRight className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={refresh}
        className={isLoading ? "animate-spin" : ""}
      >
        <RefreshCw className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={goHome}
      >
        <Home className="h-4 w-4" />
      </Button>
      <form onSubmit={handleSubmit} className="flex-1">
        <Input
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Enter URL..."
          className="w-full"
        />
      </form>
    </div>
  );
};
