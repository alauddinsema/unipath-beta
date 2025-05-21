
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserDocument } from '@/types/documents';

interface UseDocumentsProps {
  userId?: string;
  selectedCategory: string;
}

export function useDocuments({ userId, selectedCategory }: UseDocumentsProps) {
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadDocuments = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from('user_files')
        .select('*')
        .eq('user_id', userId);
      
      if (selectedCategory !== 'all') {
        query = query.eq('file_type', selectedCategory);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data) {
        const transformedData: UserDocument[] = await Promise.all(data.map(async (file) => {
          // Get the file URL for each document
          const { data: urlData } = await supabase.storage
            .from('user_documents')
            .createSignedUrl(`${userId}/${file.file_type}/${file.file_name}`, 3600);
          
          return {
            id: file.id,
            name: file.file_name,
            size: file.file_size,
            type: file.file_type,
            category: file.file_type,
            created_at: file.created_at,
            url: urlData?.signedUrl
          };
        }));
        
        setDocuments(transformedData);
      }
    } catch (error) {
      console.error('Error loading documents:', error);
      toast({
        title: 'Error',
        description: 'Failed to load your documents',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentDeleted = async (documentId: string) => {
    if (!userId) return;
    
    try {
      const documentToDelete = documents.find(doc => doc.id === documentId);
      
      if (!documentToDelete) return;
      
      // Delete the file from storage
      const { error: storageError } = await supabase.storage
        .from('user_documents')
        .remove([`${userId}/${documentToDelete.category}/${documentToDelete.name}`]);
        
      if (storageError) throw storageError;
      
      // Delete the file record from the database
      const { error: dbError } = await supabase
        .from('user_files')
        .delete()
        .eq('id', documentId);
        
      if (dbError) throw dbError;
      
      toast({
        title: 'Success',
        description: 'Document deleted successfully',
      });
      
      // Reload documents
      loadDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete the document',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    if (userId) {
      loadDocuments();
    }
  }, [userId, selectedCategory]);

  return {
    documents,
    loading,
    loadDocuments,
    handleDocumentDeleted
  };
}
