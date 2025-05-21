
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserDocument } from '@/types/documents';
import { formatDistanceToNow } from 'date-fns';
import { Download, FileIcon, FileText, Trash2, Image, FileArchive } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';

interface DocumentListProps {
  documents: UserDocument[];
  onDelete: (documentId: string) => void;
}

export function DocumentList({ documents, onDelete }: DocumentListProps) {
  // Get the file icon based on file type or category
  const getFileIcon = (document: UserDocument) => {
    const type = document.type || '';
    const name = document.name.toLowerCase();
    
    if (name.endsWith('.pdf')) return <FileText className="h-10 w-10 text-red-500" />;
    if (name.endsWith('.jpg') || name.endsWith('.jpeg') || name.endsWith('.png')) 
      return <Image className="h-10 w-10 text-blue-500" />;
    if (name.endsWith('.zip') || name.endsWith('.rar')) 
      return <FileArchive className="h-10 w-10 text-amber-500" />;
    
    if (document.category === 'identification') return <FileIcon className="h-10 w-10 text-violet-500" />;
    if (document.category === 'academic') return <FileText className="h-10 w-10 text-green-500" />;
    if (document.category === 'test_scores') return <FileText className="h-10 w-10 text-teal-500" />;
    
    return <FileIcon className="h-10 w-10 text-primary" />;
  };
  
  const formatCategoryName = (category: string) => {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 border rounded-lg bg-card/20">
        <FileIcon className="h-16 w-16 text-muted-foreground mb-4 opacity-40" />
        <p className="text-xl font-medium text-muted-foreground">
          No documents found
        </p>
        <p className="text-sm text-muted-foreground mt-2 mb-4">
          Upload new documents to get started
        </p>
        <Button variant="outline">
          Switch to Upload Tab
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <Card key={document.id} className="overflow-hidden hover:shadow-md transition-all border-muted/30">
          <div className="flex p-4">
            <div className="mr-4 flex-shrink-0">
              {getFileIcon(document)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-lg truncate">{document.name}</h3>
                  <div className="flex items-center flex-wrap gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {formatBytes(document.size)}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-secondary/50">
                      {formatCategoryName(document.category)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Uploaded {formatDistanceToNow(new Date(document.created_at), { addSuffix: true })}
                    </span>
                  </div>
                </div>
                
                <div className="flex shrink-0 space-x-2 ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground"
                    asChild
                  >
                    <a href={document.url} download={document.name} target="_blank" rel="noopener noreferrer">
                      <Download className="h-5 w-5" />
                      <span className="sr-only">Download</span>
                    </a>
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Document</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{document.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive hover:bg-destructive/90"
                          onClick={() => onDelete(document.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
