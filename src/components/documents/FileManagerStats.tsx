
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { UserDocument } from '@/types/documents';
import { FileIcon, FileText, Clock, ArrowUpCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { formatBytes } from '@/lib/utils';

interface FileManagerStatsProps {
  documents: UserDocument[];
}

export function FileManagerStats({ documents }: FileManagerStatsProps) {
  // Calculate total size of all documents
  const totalSize = documents.reduce((total, doc) => total + doc.size, 0);
  
  // Get the most recent document
  const mostRecentDocument = documents.length > 0 
    ? documents.reduce((latest, doc) => 
        new Date(doc.created_at) > new Date(latest.created_at) ? doc : latest
      )
    : null;
  
  // Statistics to display
  const stats = [
    {
      title: 'Total Documents',
      value: documents.length,
      icon: <FileIcon className="h-5 w-5 text-primary" />,
      description: 'Documents uploaded',
    },
    {
      title: 'Storage Used',
      value: formatBytes(totalSize),
      icon: <FileText className="h-5 w-5 text-violet-500" />,
      description: 'Total storage space',
    },
    {
      title: 'Latest Upload',
      value: mostRecentDocument 
        ? formatDistanceToNow(new Date(mostRecentDocument.created_at), { addSuffix: true })
        : 'Never',
      icon: <Clock className="h-5 w-5 text-teal-500" />,
      description: mostRecentDocument ? mostRecentDocument.name : 'No uploads yet',
    },
    {
      title: 'Upload Activity',
      value: `${documents.length} files`,
      icon: <ArrowUpCircle className="h-5 w-5 text-amber-500" />,
      description: 'Throughout your account',
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="overflow-hidden border-t-4" style={{ borderTopColor: `hsl(var(--${index === 0 ? 'primary' : index === 1 ? 'accent' : index === 2 ? 'ring' : 'destructive'}))` }}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1 truncate max-w-[180px]">{stat.description}</p>
              </div>
              <div className="rounded-full p-2 bg-background/50">
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
