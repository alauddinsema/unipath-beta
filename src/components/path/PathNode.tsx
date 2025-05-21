
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { UserDocument } from '@/types/documents';
import { Button } from '@/components/ui/button';
import { Download, Plus, Check, GraduationCap } from 'lucide-react';
import { StatusBadge } from './pathway/StatusBadge';
import { StepIcon } from './pathway/StepIcon';

interface PathNodeProps {
  title: string;
  description?: string;
  status: 'completed' | 'current' | 'locked' | 'available';
  type: 'document' | 'action';
  documents?: UserDocument[];
  color?: string;
  onClick?: () => void;
  onUpload?: () => void;
  position?: 'left' | 'right';
}

export function PathNode({
  title,
  description,
  status,
  type,
  documents = [],
  color = 'primary',
  onClick,
  onUpload,
  position = 'right'
}: PathNodeProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine the border and background colors based on status
  const getBorderColor = () => {
    switch (status) {
      case 'completed': return 'border-green-500 hover:border-green-400 dark:border-green-500 dark:hover:border-green-400';
      case 'current': return 'border-primary hover:border-primary/90 dark:border-primary dark:hover:border-primary/90';
      case 'available': return 'border-muted hover:border-muted/90 dark:border-muted dark:hover:border-muted/90';
      case 'locked': return 'border-muted/50 hover:border-muted/40 dark:border-muted/50 dark:hover:border-muted/40';
      default: return 'border-muted';
    }
  };
  
  const getBackgroundColor = () => {
    switch (status) {
      case 'completed': return 'bg-green-500/5';
      case 'current': return 'bg-primary/5';
      case 'available': return 'bg-muted/20';
      case 'locked': return 'bg-muted/10';
      default: return 'bg-muted/10';
    }
  };

  const isClickable = status !== 'locked';
  
  return (
    <div 
      className={cn(
        "relative transition-all duration-300",
        isHovered && isClickable ? "scale-[1.02]" : "scale-100",
        position === 'left' ? "ml-6 md:mr-6" : "mr-6 md:ml-6"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card 
        className={cn(
          "border-2 transition-colors duration-300",
          getBorderColor(),
          getBackgroundColor(),
          status === 'locked' ? "opacity-60" : "opacity-100",
          isClickable ? "cursor-pointer hover:shadow-lg" : "cursor-not-allowed",
        )}
        onClick={isClickable ? onClick : undefined}
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <StepIcon title={title} status={status} />
            <span className="ml-2">{title}</span>
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2">
          {renderDocumentList()}
        </CardContent>
        
        <CardFooter className="pt-0 justify-between">
          <StatusBadge status={status} />
          {renderActionButton()}
        </CardFooter>
      </Card>
    </div>
  );
  
  function renderDocumentList() {
    if (type === 'document' && documents && documents.length > 0) {
      return (
        <div className="space-y-2">
          {documents.slice(0, 2).map((doc) => (
            <div key={doc.id} className="flex items-center justify-between">
              <span className="text-sm truncate max-w-[200px]">{doc.name}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {documents.length > 2 && (
            <div className="text-xs text-muted-foreground mt-1">
              +{documents.length - 2} more documents
            </div>
          )}
        </div>
      );
    }
    
    if (type === 'document' && (!documents || documents.length === 0) && status !== 'locked') {
      return (
        <div className="text-sm text-muted-foreground">
          No documents uploaded yet
        </div>
      );
    }
    
    if (type === 'action' && status !== 'locked') {
      return (
        <div className="text-sm text-muted-foreground">
          Click to proceed with this step
        </div>
      );
    }
    
    return null;
  }
  
  function renderActionButton() {
    if (type === 'document' && status !== 'locked') {
      return (
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-auto"
          onClick={(e) => {
            e.stopPropagation();
            if (onUpload) onUpload();
          }}
        >
          <Plus className="h-4 w-4 mr-1" />
          Upload
        </Button>
      );
    }
    
    if (type === 'action' && status !== 'locked') {
      return (
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-auto"
        >
          {status === 'completed' ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Completed
            </>
          ) : (
            <>
              <GraduationCap className="h-4 w-4 mr-1" />
              Proceed
            </>
          )}
        </Button>
      );
    }
    
    return null;
  }
}
