
"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useMemo } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  intensity?: "light" | "medium" | "strong";
  textGlow?: boolean;
  optimizePerformance?: boolean;
  animationSpeed?: "slow" | "medium" | "fast";
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  intensity = "medium",
  textGlow = false,
  optimizePerformance = true,
  animationSpeed = "medium",
  ...props
}: AuroraBackgroundProps) => {
  const { resolvedTheme } = useTheme();
  
  // Memoize values that don't change during renders
  const opacityMap = useMemo(() => ({
    light: resolvedTheme === "dark" ? "opacity-10" : "opacity-5",
    medium: resolvedTheme === "dark" ? "opacity-20" : "opacity-10",
    strong: resolvedTheme === "dark" ? "opacity-30" : "opacity-15"
  }), [resolvedTheme]);

  // Reduced animation intensity for better performance
  const animationClass = useMemo(() => {
    return animationSpeed === "slow" 
      ? "animate-aurora-slow" 
      : animationSpeed === "medium" 
        ? "animate-aurora" 
        : "animate-aurora-fast";
  }, [animationSpeed]);

  // Reduced blur intensity for better performance
  const blurIntensity = useMemo(() => {
    return intensity === "light" 
      ? "6px" 
      : intensity === "medium" 
        ? "8px" 
        : "10px";
  }, [intensity]);

  // Memoize the CSS classes
  const containerClasses = useMemo(() => {
    return cn(
      "relative flex flex-col items-center justify-center transition-colors duration-300",
      resolvedTheme === "dark" ? "bg-zinc-950" : "bg-slate-50/95",
      textGlow && "text-glow",
      className
    );
  }, [className, textGlow, resolvedTheme]);

  // Memoize the aurora effect classes for better performance
  const auroraClasses = useMemo(() => {
    return cn(
      `
      [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
      [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
      [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)]
      [background-size:300%,_200%]
      [background-position:50%_50%,50%_50%]
      ${animationClass}
      will-change-transform
      pointer-events-none
      absolute -inset-[10px]`,
      opacityMap[intensity],
      optimizePerformance && "will-change-transform",
      showRadialGradient &&
        `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
      resolvedTheme === "dark" 
        ? "[background-image:var(--dark-gradient),var(--aurora)]" 
        : "[background-image:var(--white-gradient),var(--aurora)]"
    );
  }, [animationClass, intensity, opacityMap, optimizePerformance, showRadialGradient, resolvedTheme]);

  return (
    <div
      className={containerClasses}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={auroraClasses}
          style={{ 
            filter: `blur(${blurIntensity})`,
            WebkitFilter: `blur(${blurIntensity})`,
            transform: 'translateZ(0)', // Promote to GPU layer
          }}
        ></div>
      </div>
      {children}
    </div>
  );
};
