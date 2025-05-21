
import React from 'react';
import { cn } from '@/lib/utils';
import { PathNode } from './PathNode';
import { PathConnector } from './PathConnector';
import { Card } from '@/components/ui/card';
import { UserDocument } from '@/types/documents';

export interface PathStepData {
  id: string;
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'locked' | 'available';
  type: 'document' | 'action';
  documents?: UserDocument[];
}

interface PathTrackProps {
  steps: PathStepData[];
  onStepClick?: (step: PathStepData) => void;
  onUploadClick?: (step: PathStepData) => void;
  className?: string;
}

export function PathTrack({
  steps,
  onStepClick,
  onUploadClick,
  className
}: PathTrackProps) {
  if (!steps || steps.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No steps defined for this learning path.</p>
      </Card>
    );
  }
  
  return (
    <div className={cn("relative", className)}>
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-muted/30 transform -translate-x-1/2 z-0" />
      
      <div className="relative z-10 space-y-2">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const position = isEven ? 'right' : 'left';
          
          return (
            <div key={step.id} className="relative">
              <div className={cn(
                "grid grid-cols-1 md:grid-cols-2 gap-4 items-center",
                position === 'left' ? 'md:text-right' : 'md:text-left'
              )}>
                {position === 'left' && (
                  <div className="hidden md:block" />
                )}
                
                <PathNode
                  title={step.title}
                  description={step.description}
                  status={step.status}
                  type={step.type}
                  documents={step.documents}
                  position={position}
                  onClick={() => onStepClick && onStepClick(step)}
                  onUpload={() => onUploadClick && onUploadClick(step)}
                />
                
                {position === 'right' && (
                  <div className="hidden md:block" />
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex justify-center my-2">
                  <PathConnector 
                    status={step.status === 'completed' ? 'completed' : 
                             steps[index + 1].status === 'current' ? 'current' : 
                             steps[index + 1].status} 
                    direction="vertical"
                    size="md"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
