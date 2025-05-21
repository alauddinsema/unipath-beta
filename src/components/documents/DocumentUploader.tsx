
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';
import { FileDropzone } from './FileDropzone';
import { UploadProgress } from './UploadProgress';
import { CloudUpload, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useDocumentUpload } from '@/hooks/use-document-upload';

interface DocumentUploaderProps {
  onUploadComplete: () => void;
  subscription: { 
    isPaid: boolean; 
    planType: 'free' | 'basic' | 'premium';
  };
  initialCategory?: string;
}

export function DocumentUploader({ 
  onUploadComplete,
  subscription,
  initialCategory
}: DocumentUploaderProps) {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = useState<string>(initialCategory || '');
  
  const { uploadDocument, uploading, progress } = useDocumentUpload({
    userId: user?.id,
    subscription,
    onUploadComplete
  });
  
  useEffect(() => {
    if (initialCategory && !category) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);
  
  const handleUpload = async () => {
    if (selectedFile && category) {
      const success = await uploadDocument({
        file: selectedFile,
        category
      });
      
      if (success) {
        setSelectedFile(null);
        setCategory('');
      }
    }
  };
  
  return (
    <Card className="border-t-4 border-t-primary">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl">
          <CloudUpload className="mr-2 h-5 w-5 text-primary" />
          Upload Document
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-3">
        <div className="space-y-6">
          <FileDropzone
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            disabled={uploading}
          />
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-2">
                <Label htmlFor="category" className="text-sm font-medium">Document Category</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                        <HelpCircle className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="max-w-80">
                      <p>Select the appropriate category for your document. This helps organize your files.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" disabled={uploading} className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="identification">Identification (Passport, ID)</SelectItem>
                  <SelectItem value="academic">Academic Records (Diploma, Certificate)</SelectItem>
                  <SelectItem value="test_scores">Test Scores (IELTS, SAT, GRE)</SelectItem>
                  <SelectItem value="other">Other Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <UploadProgress uploading={uploading} progress={progress} />
            
            <Button
              type="button"
              disabled={!selectedFile || !category || uploading}
              onClick={handleUpload}
              className="w-full"
              size="lg"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
