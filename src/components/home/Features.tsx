
import React, { useRef } from 'react';
import { Search, GraduationCap, FileText, HeartHandshake, BookOpen, MessageSquare } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

export function Features() {
  const { resolvedTheme } = useTheme();
  
  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: 'University Search',
      description: 'Explore our comprehensive database of universities with advanced filtering options.'
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: 'Profile Matching',
      description: 'Get personalized university recommendations based on your academic profile.'
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Document Management',
      description: 'Securely store and organize all your application documents in one place.'
    },
    {
      icon: <HeartHandshake className="h-6 w-6" />,
      title: 'AI Assistance',
      description: 'Get intelligent guidance throughout your application process.'
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: 'Application Tracking',
      description: 'Track your application progress with our intuitive dashboard.'
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Interactive Chat',
      description: 'Chat with our AI assistant for immediate help and guidance.'
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground animate-fade-in">
            Features that Empower Your Journey
          </h2>
          <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '200ms' }}>
            Everything you need to make your university application process smooth and successful
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
