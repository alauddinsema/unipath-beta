
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { useDocuments } from '@/hooks/use-documents';
import { useSubscription } from '@/hooks/use-subscription';
import { FullPageLoading } from '@/components/documents/DocumentLoadingState';
import { PathMap } from '@/components/path/PathMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserDocument } from '@/types/documents';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Path() {
  const { session, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const { documents, loading, loadDocuments, handleDocumentDeleted } = useDocuments({
    userId: user?.id,
    selectedCategory: 'all'
  });
  
  const { subscription } = useSubscription(user?.id);
  
  // Remove the useUserCredits hook reference
  
  React.useEffect(() => {
    if (!isLoading && !session) {
      navigate('/login');
    }
  }, [isLoading, session, navigate]);
  
  const [dbChecked, setDbChecked] = useState(false);
  const [missingTable, setMissingTable] = useState(false);
  
  useEffect(() => {
    const checkDatabase = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await fetch('/api/check-completed-steps-table', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(res => res.json());
        
        if (error) {
          console.error('Error checking database:', error);
          setMissingTable(true);
        }
        
        setDbChecked(true);
      } catch (error) {
        console.error('Error checking database:', error);
        setDbChecked(true);
      }
    };
    
    if (user && !dbChecked) {
      checkDatabase();
    }
  }, [user, dbChecked]);
  
  if (isLoading || loading) {
    return <FullPageLoading />;
  }
  
  const documentsByCategory = documents.reduce((acc, doc) => {
    const category = doc.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(doc);
    return acc;
  }, {} as Record<string, UserDocument[]>);
  
  return (
    <>
      <Navbar />
      <main className="container max-w-6xl pt-20 pb-12 px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent animate-gradient-x">
            Your University Path
          </h1>
          <p className="text-muted-foreground">
            Track your progress and manage all documents in your university application journey
          </p>
        </div>

        {missingTable && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Database Setup Required</AlertTitle>
            <AlertDescription>
              The system detected that the completed_steps table might be missing. 
              Please contact your administrator to run the database migration script.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 gap-8">
          <Card className="bg-muted/5 border overflow-hidden">
            <CardHeader className="pb-3 border-b">
              <CardTitle>Application Path</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <PathMap
                documentsByCategory={documentsByCategory}
                loading={loading}
                loadDocuments={loadDocuments}
                handleDocumentDeleted={handleDocumentDeleted}
                subscription={subscription}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
