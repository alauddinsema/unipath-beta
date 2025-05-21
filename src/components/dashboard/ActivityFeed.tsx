
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock } from 'lucide-react';

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <p>No activities yet</p>
            <p className="text-sm">Your activities will appear here as you use UniPath</p>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
