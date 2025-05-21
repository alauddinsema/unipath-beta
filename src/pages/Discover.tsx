
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { Loader2, Globe, Heart, FileText } from 'lucide-react';
import { useUniversitySearch } from '@/hooks/university-search';
import { DiscoverHeader } from '@/components/discover/DiscoverHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDocuments } from '@/hooks/use-documents';
import { useSubscription } from '@/hooks/use-subscription';
import { FavoritesTab } from '@/components/discover/tabs/FavoritesTab';
import { DocumentsTab } from '@/components/discover/tabs/DocumentsTab';
import { WebBrowserTab } from '@/components/discover/tabs/WebBrowserTab';
import { SearchTab } from '@/components/discover/tabs/SearchTab';

export default function Discover() {
  const { session, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [activeTab, setActiveTab] = useState('search');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const {
    universities,
    loading: universitiesLoading,
    searchFilters,
    hasMore,
    handleSearch,
    loadMore,
    recommendedUniversities,
    showRecommendations,
    searchError
  } = useUniversitySearch(user?.id);
  
  const { 
    documents, 
    loading: documentsLoading, 
    loadDocuments, 
    handleDocumentDeleted 
  } = useDocuments({
    userId: user?.id,
    selectedCategory
  });
  
  const { subscription } = useSubscription(user?.id);
  
  useEffect(() => {
    if (!isLoading && !session) {
      navigate('/login');
    }
    
    if (user && activeTab === 'documents') {
      loadDocuments();
    }
  }, [session, isLoading, navigate, activeTab, user, loadDocuments]);
  
  const handleFilterSearch = (filters) => {
    setSearchPerformed(true);
    handleSearch(filters);
  };
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
  return (
    <>
      <Navbar />
      <main className="container max-w-6xl pt-24 pb-12 px-4 md:px-6">
        <DiscoverHeader />
        
        <Tabs defaultValue="search" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-4 h-12 bg-secondary">
            <TabsTrigger value="search" className="rounded-md h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Search Universities
            </TabsTrigger>
            <TabsTrigger value="browse" className="rounded-md h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Globe className="mr-2 h-4 w-4" />
              Web Browser
            </TabsTrigger>
            <TabsTrigger value="favorites" className="rounded-md h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </TabsTrigger>
            <TabsTrigger value="documents" className="rounded-md h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="mr-2 h-4 w-4" />
              Documents
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="mt-0">
            <SearchTab
              universities={universities}
              recommendedUniversities={recommendedUniversities}
              loading={universitiesLoading}
              hasMore={hasMore}
              loadMore={loadMore}
              searchPerformed={searchPerformed}
              showRecommendations={showRecommendations}
              searchFilters={searchFilters}
              handleFilterSearch={handleFilterSearch}
              searchError={searchError}
            />
          </TabsContent>
          
          <TabsContent value="browse" className="mt-0">
            <WebBrowserTab />
          </TabsContent>
          
          <TabsContent value="favorites" className="mt-0">
            <FavoritesTab userId={user?.id} setActiveTab={setActiveTab} />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <DocumentsTab
              documents={documents}
              loading={documentsLoading}
              loadDocuments={loadDocuments}
              handleDocumentDeleted={handleDocumentDeleted}
              subscription={subscription}
            />
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
