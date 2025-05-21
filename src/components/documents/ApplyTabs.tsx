
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentList } from '@/components/documents/DocumentList';
import { DocumentUploader } from '@/components/documents/DocumentUploader';
import { DocumentLoadingState } from '@/components/documents/DocumentLoadingState';
import { FileText, Upload } from 'lucide-react';

interface ApplyTabsProps {
  documents: any[];
  loading: boolean;
  onUploadComplete: () => void;
  onDocumentDeleted: (id: string) => void;
  subscription: { 
    isPaid: boolean;
    planType: 'free' | 'basic' | 'premium';
  };
}

export function ApplyTabs({
  documents,
  loading,
  onUploadComplete,
  onDocumentDeleted,
  subscription
}: ApplyTabsProps) {
  return (
    <Tabs defaultValue="documents" className="w-full">
      <TabsList className="mb-6 grid w-full grid-cols-2 h-12 bg-secondary">
        <TabsTrigger value="documents" className="rounded-md h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
          <FileText className="mr-2 h-5 w-5" />
          My Documents
        </TabsTrigger>
        <TabsTrigger 
          value="upload" 
          className="rounded-md h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          <Upload className="mr-2 h-5 w-5" />
          Upload New
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="documents" className="mt-0">
        {loading ? (
          <DocumentLoadingState />
        ) : (
          <DocumentList 
            documents={documents}
            onDelete={onDocumentDeleted}
          />
        )}
      </TabsContent>
      
      <TabsContent value="upload" className="mt-0">
        <DocumentUploader 
          onUploadComplete={onUploadComplete}
          subscription={subscription}
        />
      </TabsContent>
    </Tabs>
  );
}
