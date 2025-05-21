
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface StatusBadgeProps {
  status: 'completed' | 'current' | 'locked' | 'available';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  switch (status) {
    case 'completed':
      return <Badge className="bg-green-500">Completed</Badge>;
    case 'current':
      return <Badge className="bg-primary">Current</Badge>;
    case 'available':
      return <Badge variant="outline">Available</Badge>;
    case 'locked':
      return <Badge variant="outline" className="opacity-50">Locked</Badge>;
    default:
      return null;
  }
}
