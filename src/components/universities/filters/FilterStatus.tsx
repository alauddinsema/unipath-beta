
import React from 'react';

export function FilterStatus() {
  return (
    <div className="flex items-center py-1 px-2 bg-muted rounded text-xs">
      <div className="h-3 w-3 mr-1.5 text-primary animate-bounce">👍</div>
      <span>Filters applied</span>
    </div>
  );
}
