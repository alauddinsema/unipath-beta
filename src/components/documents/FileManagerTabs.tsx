
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentList } from '@/components/documents/DocumentList';
import { DocumentUploader } from '@/components/documents/DocumentUploader';
import { DocumentLoadingState } from '@/components/documents/DocumentLoadingState';
import { FileText, Upload, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileManagerTabsProps {
  documents: any[];
  loading: boolean;
  onUploadComplete: () => void;
  onDocumentDeleted: (id: string) => void;
  subscription: { 
    isPaid: boolean;
    planType: 'free' | 'basic' | 'premium';
  };
}

export function FileManagerTabs({
  documents,
  loading,
  onUploadComplete,
  onDocumentDeleted,
  subscription,
}: FileManagerTabsProps) {
  const [activeTab, setActiveTab] = React.useState('documents');
  
  const handleSwitchToUpload = () => {
    setActiveTab('upload');
  };
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
        ) : documents.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-semibold mb-2">No documents yet</h3>
            <p className="text-muted-foreground mb-4">Upload new documents to get started</p>
            <Button 
              onClick={handleSwitchToUpload}
              variant="outline"
              className="inline-flex items-center"
            >
              <Upload className="mr-2 h-4 w-4" />
              Switch to Upload Tab
            </Button>
          </div>
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
