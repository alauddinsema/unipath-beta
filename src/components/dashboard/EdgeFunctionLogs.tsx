
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Code } from 'lucide-react';

export interface EdgeFunctionLogsProps {
  logs: string[];
}

export function EdgeFunctionLogs({ logs }: EdgeFunctionLogsProps) {
  if (!logs || logs.length === 0) {
    return (
      <Card className="bg-muted/20">
        <CardContent className="pt-6 text-center text-muted-foreground">
          <Code className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No logs available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-[400px] rounded-md border">
      <div className="p-4 font-mono text-sm">
        {logs.map((log, index) => (
          <div
            key={index}
            className="mb-2 pb-2 border-b border-border last:border-0"
          >
            <code className="text-xs">{log}</code>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
