
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  blurDataUrl?: string;
  glassFuzzy?: boolean;
  optimizePerformance?: boolean;
}

export function BlurImage({ 
  src, 
  alt, 
  className, 
  blurDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 
  glassFuzzy = false,
  optimizePerformance = true,
  ...props 
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (src) {
      const img = new Image();
      img.src = src as string;
      img.onload = () => setIsLoaded(true);
    }
  }, [src]);

  return (
    <div className={cn(
      "relative overflow-hidden",
      glassFuzzy && "backdrop-blur-sm bg-black/30 border border-white/10 rounded-2xl",
      optimizePerformance && "will-change-transform"
    )}>
      <img 
        src={blurDataUrl} 
        alt={alt} 
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-0" : "opacity-100",
          className
        )} 
        {...props} 
      />
      <img 
        src={src} 
        alt={alt} 
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-all duration-500",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105",
          className
        )} 
        onLoad={() => setIsLoaded(true)}
        {...props} 
      />
      {glassFuzzy && (
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 mix-blend-overlay pointer-events-none" />
      )}
    </div>
  );
}
