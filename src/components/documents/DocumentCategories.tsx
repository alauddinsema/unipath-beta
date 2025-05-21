
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileArchive, FileText, Fingerprint, GraduationCap, LineChart } from 'lucide-react';

interface DocumentCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  documentCounts: {
    all: number;
    identification: number;
    academic: number;
    test_scores: number;
    other: number;
  };
}

export function DocumentCategories({ 
  selectedCategory, 
  onCategoryChange,
  documentCounts
}: DocumentCategoriesProps) {
  const categories = [
    {
      id: 'all',
      name: 'All Documents',
      icon: <FileArchive className="h-5 w-5" />,
      count: documentCounts.all,
      color: 'bg-blue-500/10 text-blue-500'
    },
    {
      id: 'identification',
      name: 'Identification',
      icon: <Fingerprint className="h-5 w-5" />,
      count: documentCounts.identification,
      color: 'bg-violet-500/10 text-violet-500'
    },
    {
      id: 'academic',
      name: 'Academic Records',
      icon: <GraduationCap className="h-5 w-5" />,
      count: documentCounts.academic,
      color: 'bg-amber-500/10 text-amber-500'
    },
    {
      id: 'test_scores',
      name: 'Test Scores',
      icon: <LineChart className="h-5 w-5" />,
      count: documentCounts.test_scores,
      color: 'bg-teal-500/10 text-teal-500'
    },
    {
      id: 'other',
      name: 'Other Documents',
      icon: <FileText className="h-5 w-5" />,
      count: documentCounts.other,
      color: 'bg-rose-500/10 text-rose-500'
    },
  ];
  
  return (
    <Card className="h-full bg-black/40 border-white/20 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center text-white">
          <FileArchive className="mr-2 h-5 w-5" />
          Categories
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3 p-3">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className={`w-full justify-start rounded-lg px-4 py-2 h-auto transition-all duration-200 ${
              selectedCategory === category.id 
                ? 'bg-primary/20 hover:bg-primary/30' 
                : 'hover:bg-white/5'
            }`}
            onClick={() => onCategoryChange(category.id)}
          >
            <div className={`p-1.5 rounded-md mr-3 ${category.color}`}>
              {category.icon}
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-white">{category.name}</span>
              <span className="text-xs text-gray-400">{category.count} items</span>
            </div>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
