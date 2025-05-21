
import { useRef, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

export function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.add('translate-y-0');
            entry.target.classList.remove('translate-y-8');
            entry.target.classList.remove('opacity-0');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  
  return (
    <div
      ref={cardRef}
      className={`
        group
        rounded-xl p-6 transition-all duration-500 ease-in-out
        opacity-0 translate-y-8 transform
        ${resolvedTheme === 'dark' 
          ? 'bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm border border-white/5 hover:border-white/10' 
          : 'bg-white hover:bg-blue-50/50 shadow-sm hover:shadow-md border border-gray-100'}
      `}
      style={{ 
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className={`
        flex items-center justify-center rounded-full w-12 h-12 mb-4 transition-all duration-300 transform group-hover:scale-110
        ${resolvedTheme === 'dark'
          ? 'bg-primary/20 text-primary-foreground'
          : 'bg-primary/10 text-primary'}
      `}>
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      
      <div className={`
        mt-4 h-1 w-12 transition-all duration-500 ease-in-out transform origin-left scale-x-0 group-hover:scale-x-100
        ${resolvedTheme === 'dark' ? 'bg-primary/50' : 'bg-primary/70'}
      `}></div>
    </div>
  );
}
