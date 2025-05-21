
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UseDocumentUploadProps {
  userId: string | undefined;
  subscription: { 
    isPaid: boolean;
    planType: 'free' | 'basic' | 'premium';
  };
  onUploadComplete?: () => void;
}

interface UploadDocumentParams {
  file: File;
  category: string;
}

export const useDocumentUpload = ({ 
  userId, 
  subscription, 
  onUploadComplete 
}: UseDocumentUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const uploadDocument = useCallback(async ({ file, category }: UploadDocumentParams) => {
    if (!file || !category || !userId) {
      toast({
        title: 'Error',
        description: 'Missing required information for upload',
        variant: 'destructive',
      });
      return false;
    }
    
    setUploading(true);
    setProgress(0);
    
    try {
      const folderPath = `${userId}/${category}`;
      const filePath = `${folderPath}/${file.name}`;
      
      // Upload file to storage bucket
      const { data: storageData, error: storageError } = await supabase.storage
        .from('user_documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (storageError) throw storageError;

      // Add file record to database
      const { error: dbError } = await supabase
        .from('user_files')
        .insert({
          user_id: userId,
          file_name: file.name,
          file_path: filePath,
          file_size: file.size,
          file_type: category
        });
        
      if (dbError) throw dbError;
      
      setProgress(100);
      
      toast({
        title: 'Success',
        description: 'Document uploaded successfully',
      });
      
      if (onUploadComplete) {
        onUploadComplete();
      }
      
      return true;
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: 'Upload Failed',
        description: error.message || 'Failed to upload document',
        variant: 'destructive',
      });
      return false;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }, [userId, toast, onUploadComplete]);

  return {
    uploading,
    progress,
    uploadDocument
  };
};
