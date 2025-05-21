
import React from 'react';
import { FileIcon, GraduationCap, FileText, Send, Lock, Check, Plane } from 'lucide-react';

interface StepIconProps {
  title: string;
  status: 'completed' | 'current' | 'locked' | 'available';
}

export function StepIcon({ title, status }: StepIconProps) {
  const getIconClass = () => {
    if (status === 'locked') return 'text-muted-foreground/50';
    if (status === 'completed') return 'text-green-500';
    if (status === 'current') return 'text-primary';
    return 'text-muted-foreground';
  };
  
  const renderIcon = () => {
    const iconClass = `h-5 w-5 ${getIconClass()}`;
    
    switch (title) {
      case 'University Selection':
        return <GraduationCap className={iconClass} />;
      case 'Personal Statement':
        return <FileText className={iconClass} />;
      case 'Submit Applications':
        return <Send className={iconClass} />;
      case 'Visa Interview':
        return <GraduationCap className={iconClass} />;
      case 'Travel Arrangements':
        return <Plane className={iconClass} />;
      default:
        if (status === 'locked') return <Lock className="h-5 w-5 text-muted-foreground/50" />;
        if (status === 'completed') return <Check className="h-5 w-5 text-green-500" />;
        if (status === 'current') return <FileIcon className="h-5 w-5 text-primary" />;
        return <FileIcon className={iconClass} />;
    }
  };
  
  return renderIcon();
}
