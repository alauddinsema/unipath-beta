
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DocumentUploader } from '@/components/documents/DocumentUploader';
import { DocumentList } from '@/components/documents/DocumentList';
import { UserDocument } from '@/types/documents';
import { PathStepData } from './PathTrack';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Upload } from 'lucide-react';

interface DialogManageDocumentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  step: PathStepData;
  documents: UserDocument[];
  category: string;
  onDocumentUploaded: () => void;
  onDocumentDeleted: (id: string) => void;
  subscription: { 
    isPaid: boolean;
    planType: 'free' | 'basic' | 'premium';
  };
}

export function DialogManageDocument({
  open,
  onOpenChange,
  step,
  documents,
  category,
  onDocumentUploaded,
  onDocumentDeleted,
  subscription,
}: DialogManageDocumentProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{step.title}</DialogTitle>
          <DialogDescription>
            {step.description}
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="documents" className="w-full">
          <TabsList className="mb-4 grid w-full grid-cols-2 h-12">
            <TabsTrigger value="documents" className="rounded-md h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="mr-2 h-4 w-4" />
              Documents ({documents.length})
            </TabsTrigger>
            <TabsTrigger value="upload" className="rounded-md h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Upload className="mr-2 h-4 w-4" />
              Upload New
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="documents" className="mt-0">
            {documents.length > 0 ? (
              <DocumentList 
                documents={documents}
                onDelete={onDocumentDeleted}
              />
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                No documents uploaded yet. Switch to the Upload tab to add documents.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="upload" className="mt-0">
            <DocumentUploader 
              onUploadComplete={onDocumentUploaded}
              subscription={subscription}
              initialCategory={category}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
