
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { Search, Heart, File, Clock } from 'lucide-react';
import { FloatingElement } from './FloatingElement';

interface AppPreviewProps {
  isVisible: boolean;
}

export function AppPreview({ isVisible }: AppPreviewProps) {
  const { resolvedTheme } = useTheme();
  
  return (
    <div 
      className={cn(
        "col-span-1 md:col-span-6 flex items-center justify-center relative transition-all duration-1000 transform", 
        isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
      )} 
      style={{ transitionDelay: "500ms" }}
    >
      <div className="relative w-full max-w-md mx-auto">
        {/* Main app preview */}
        <div 
          className={`rounded-xl shadow-lg overflow-hidden backdrop-blur-sm border animate-fade-in ${
            resolvedTheme === 'dark' ? 'bg-black/20 border-white/10' : 'bg-white/80 border-black/5'
          }`} 
          style={{ 
            animationDuration: '1s',
            animationDelay: '0.6s',
            animationFillMode: 'backwards',
            transform: 'translateZ(0)',
            transition: 'all 0.3s ease',
            boxShadow: resolvedTheme === 'dark' 
              ? '0 8px 32px rgba(0, 0, 0, 0.3)' 
              : '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className={`p-3 border-b ${resolvedTheme === 'dark' ? 'bg-primary/5 border-white/10' : 'bg-gray-50 border-gray-100'}`}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <div className={`ml-4 h-4 w-1/2 rounded ${resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <div className={`h-6 w-3/4 rounded-md ${resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />
              <div className={`h-3 w-full rounded-md ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`} />
              <div className={`h-3 w-2/3 rounded-md ${resolvedTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className={`h-20 rounded-lg flex flex-col items-center justify-center p-2 transition-all duration-300 ${resolvedTheme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <Search className="h-6 w-6 text-primary mb-2" />
                <div className={`h-2 w-12 rounded ${resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
              </div>
              <div className={`h-20 rounded-lg flex flex-col items-center justify-center p-2 transition-all duration-300 ${resolvedTheme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <Heart className="h-6 w-6 text-primary mb-2" />
                <div className={`h-2 w-12 rounded ${resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
              </div>
              <div className={`h-20 rounded-lg flex flex-col items-center justify-center p-2 transition-all duration-300 ${resolvedTheme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <File className="h-6 w-6 text-primary mb-2" />
                <div className={`h-2 w-12 rounded ${resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
              </div>
              <div className={`h-20 rounded-lg flex flex-col items-center justify-center p-2 transition-all duration-300 ${resolvedTheme === 'dark' ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                <Clock className="h-6 w-6 text-primary mb-2" />
                <div className={`h-2 w-12 rounded ${resolvedTheme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <FloatingElement 
          position="top-right" 
          icon={<Search className="h-3 w-3 text-white" />} 
        />
        
        <FloatingElement 
          position="bottom-left" 
          icon={<Heart className="h-3 w-3 text-white" />} 
          animationDelay="1s"
        />
      </div>
    </div>
  );
}
