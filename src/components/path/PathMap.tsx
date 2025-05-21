
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserDocument } from '@/types/documents';
import { useAuth } from '@/contexts/AuthContext';
import { PathTabContent } from './pathway/PathTabContent';

interface PathMapProps {
  documentsByCategory: {
    [key: string]: UserDocument[];
  };
  loading: boolean;
  loadDocuments: () => void;
  handleDocumentDeleted: (id: string) => void;
  subscription: { 
    isPaid: boolean;
    planType: 'free' | 'basic' | 'premium';
  } | null;
}

export function PathMap({
  documentsByCategory,
  loading,
  loadDocuments,
  handleDocumentDeleted,
  subscription,
}: PathMapProps) {
  const { user } = useAuth();
  const [currentPathTab, setCurrentPathTab] = useState('application');
  
  return (
    <div className="space-y-8">
      <Tabs defaultValue="application" className="w-full" onValueChange={setCurrentPathTab}>
        <TabsList className="grid w-full grid-cols-2 h-12">
          <TabsTrigger value="application" className="rounded-md h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Application Process
          </TabsTrigger>
          <TabsTrigger value="visa" className="rounded-md h-9 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Visa & Travel
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="application" className="mt-6">
          <Card className="bg-muted/20 border-0 shadow-none overflow-visible">
            <CardContent className="p-6">
              <PathTabContent 
                pathType="application"
                documentsByCategory={documentsByCategory}
                loading={loading}
                loadDocuments={loadDocuments}
                handleDocumentDeleted={handleDocumentDeleted}
                subscription={subscription}
                userId={user?.id}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="visa" className="mt-6">
          <Card className="bg-muted/20 border-0 shadow-none overflow-visible">
            <CardContent className="p-6">
              <PathTabContent 
                pathType="visa"
                documentsByCategory={documentsByCategory}
                loading={loading}
                loadDocuments={loadDocuments}
                handleDocumentDeleted={handleDocumentDeleted}
                subscription={subscription}
                userId={user?.id}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
