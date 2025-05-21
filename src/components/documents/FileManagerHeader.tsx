
import React from 'react';

export function FileManagerHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold mb-1 text-gradient">Document Manager</h1>
        <p className="text-muted-foreground">
          Upload and manage your important documents securely
        </p>
      </div>
    </div>
  );
}
