import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { DocumentCategories } from '@/components/documents/DocumentCategories';
import { useDocuments } from '@/hooks/use-documents';
import { useSubscription } from '@/hooks/use-subscription';
import { FullPageLoading } from '@/components/documents/DocumentLoadingState';
import { FileManagerStats } from '@/components/documents/FileManagerStats';
import { FileManagerHeader } from '@/components/documents/FileManagerHeader';
import { FileManagerTabs } from '@/components/documents/FileManagerTabs';

export default function FileManager() {
  const { session, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const { documents, loading, loadDocuments, handleDocumentDeleted } = useDocuments({
    userId: user?.id,
    selectedCategory
  });
  
  const { subscription } = useSubscription(user?.id);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  
  const handleDocumentUploaded = () => {
    loadDocuments();
  };
  
  React.useEffect(() => {
    if (!isLoading && !session) {
      navigate('/login');
    }
  }, [isLoading, session, navigate]);
  
  if (isLoading) {
    return <FullPageLoading />;
  }
  
  // Count documents by category
  const documentCounts = {
    all: documents.length,
    identification: documents.filter(d => d.category === 'identification').length,
    academic: documents.filter(d => d.category === 'academic').length,
    test_scores: documents.filter(d => d.category === 'test_scores').length,
    other: documents.filter(d => !['identification', 'academic', 'test_scores'].includes(d.category)).length,
  };
  
  return (
    <>
      <Navbar />
      <main className="container max-w-7xl pt-20 pb-12 px-4 md:px-6">
        <FileManagerHeader />
        <FileManagerStats documents={documents} />
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-1">
            <DocumentCategories 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              documentCounts={documentCounts}
            />
          </div>
          
          <div className="lg:col-span-4">
            <FileManagerTabs 
              documents={documents}
              loading={loading}
              onUploadComplete={handleDocumentUploaded}
              onDocumentDeleted={handleDocumentDeleted}
              subscription={subscription}
            />
          </div>
        </div>
      </main>
    </>
  );
}
