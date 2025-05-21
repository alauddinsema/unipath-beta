
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Loader2 } from 'lucide-react';

interface UploadProgressProps {
  uploading: boolean;
  progress: number;
}

export function UploadProgress({ uploading, progress }: UploadProgressProps) {
  if (!uploading) return null;
  
  return (
    <div className="space-y-3 py-2">
      <div className="flex items-center gap-2 text-sm text-primary">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Uploading document...</span>
      </div>
      <Progress value={progress} className="h-2 w-full" />
      <p className="text-xs text-right text-muted-foreground">
        {progress}% complete
      </p>
    </div>
  );
}
