
import React from 'react';
import InPlatformBrowser from '@/components/browser/InPlatformBrowser';
import { Card, CardContent } from '@/components/ui/card';

interface WebBrowserTabProps {
  initialUrl?: string;
  showBookmarks?: boolean;
}

export function WebBrowserTab({ initialUrl = 'https://www.google.com', showBookmarks = true }: WebBrowserTabProps) {
  // We're ignoring the showBookmarks prop for now as it's not implemented in the InPlatformBrowser
  return (
    <Card className="border-none bg-transparent">
      <CardContent className="p-0">
        <InPlatformBrowser
          initialUrl={initialUrl}
          height="80vh"
        />
      </CardContent>
    </Card>
  );
}
