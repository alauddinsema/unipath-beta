
import React from 'react';
import { ApplyTabs } from '@/components/documents/ApplyTabs';

interface DocumentsTabProps {
  documents: any[];
  loading: boolean;
  loadDocuments: () => void;
  handleDocumentDeleted: (id: string) => void;
  subscription: { 
    isPaid: boolean; 
    planType: 'free' | 'basic' | 'premium';
  };
}

export function DocumentsTab({ 
  documents, 
  loading, 
  loadDocuments, 
  handleDocumentDeleted,
  subscription
}: DocumentsTabProps) {
  
  return (
    <div className="space-y-6">
      <ApplyTabs
        documents={documents}
        loading={loading}
        onUploadComplete={loadDocuments}
        onDocumentDeleted={handleDocumentDeleted}
        subscription={subscription}
      />
    </div>
  );
}
