
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/layout/Navbar';
import { InPlatformBrowser } from '@/components/browser/InPlatformBrowser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function BrowserPage() {
  const { session, user } = useAuth();
  const [url, setUrl] = useState('https://www.google.com/search?q=universities');
  const [urlInput, setUrlInput] = useState(url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUrl(urlInput);
  };

  const quickLinks = [
    { name: 'Google', url: 'https://www.google.com' },
    { name: 'University Rankings', url: 'https://www.topuniversities.com/university-rankings' },
    { name: 'Scholarships', url: 'https://www.scholars4dev.com/' },
    { name: 'College Board', url: 'https://www.collegeboard.org/' },
  ];

  return (
    <>
      <Navbar />
      <main className="container max-w-7xl pt-24 pb-12 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-6">Web Browser</h1>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Quick Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Enter URL or search term..."
                  className="pl-9"
                />
              </div>
              <Button type="submit">Go</Button>
            </form>
            
            <div className="flex flex-wrap gap-2">
              {quickLinks.map((link) => (
                <Button 
                  key={link.name} 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setUrlInput(link.url);
                    setUrl(link.url);
                  }}
                >
                  {link.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <InPlatformBrowser initialUrl={url} height="70vh" />
      </main>
    </>
  );
}
