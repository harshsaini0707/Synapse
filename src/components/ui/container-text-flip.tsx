"use client";

import React, { useState, useEffect, useId } from "react";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Helper function to get size-based styles
const getSizeStyles = (size: "sm" | "md" | "lg" | "xl") => {
  const sizeMap = {
    sm: "text-lg text-gray-950 md:text-xl lg:text-2xl py-1 px-2",
    md: "text-3xl text-gray-950 md:text-4xl lg:text-5xl py-2 px-3", 
    lg: "text-4xl text-gray-950 md:text-5xl lg:text-6xl py-3 px-4",
    xl: "text-5xl text-gray-950 md:text-6xl lg:text-7xl py-4 px-5"
  };
  return sizeMap[size];
};

// Helper function to get variant-based styles
const getVariantStyles = (variant: "default" | "primary" | "secondary" | "accent" | "muted", useThemeColors: boolean) => {
  if (!useThemeColors) {
    // Fallback to custom green background
    return {
      text: "", // Text color now handled in getSizeStyles
      background: "bg-[#9AE600]",
      shadow: "shadow-[inset_0_-1px_#8AD100,inset_0_0_0_1px_#8AD100,_0_4px_8px_#8AD100]"
    };
  }

  const variantMap = {
    default: {
      text: "", // Text color now handled in getSizeStyles
      background: "bg-[#9AE600]",
      shadow: "shadow-[inset_0_-1px_#8AD100,inset_0_0_0_1px_#8AD100,_0_4px_8px_#8AD100]"
    },
    primary: {
      text: "text-primary-foreground",
      background: "bg-gradient-to-b from-primary/90 to-primary",
      shadow: "shadow-[inset_0_-1px_hsl(var(--primary-foreground)/0.1),inset_0_0_0_1px_hsl(var(--primary-foreground)/0.2),_0_4px_8px_hsl(var(--primary)/0.5)]"
    },
    secondary: {
      text: "text-secondary-foreground",
      background: "bg-gradient-to-b from-secondary/90 to-secondary",
      shadow: "shadow-[inset_0_-1px_hsl(var(--secondary-foreground)/0.1),inset_0_0_0_1px_hsl(var(--secondary-foreground)/0.2),_0_4px_8px_hsl(var(--secondary)/0.5)]"
    },
    accent: {
      text: "text-accent-foreground",
      background: "bg-gradient-to-b from-accent/90 to-accent",
      shadow: "shadow-[inset_0_-1px_hsl(var(--accent-foreground)/0.1),inset_0_0_0_1px_hsl(var(--accent-foreground)/0.2),_0_4px_8px_hsl(var(--accent)/0.5)]"
    },
    muted: {
      text: "text-muted-foreground",
      background: "bg-gradient-to-b from-muted/90 to-muted",
      shadow: "shadow-[inset_0_-1px_hsl(var(--muted-foreground)/0.1),inset_0_0_0_1px_hsl(var(--muted-foreground)/0.2),_0_4px_8px_hsl(var(--muted)/0.5)]"
    }
  };
  
  return variantMap[variant];
};

export interface ContainerTextFlipProps {
  /** Array of words to cycle through in the animation */
  words?: string[];
  /** Time in milliseconds between word transitions */
  interval?: number;
  /** Additional CSS classes to apply to the container */
  className?: string;
  /** Additional CSS classes to apply to the text */
  textClassName?: string;
  /** Duration of the transition animation in milliseconds */
  animationDuration?: number;
  /** Size variant for responsive sizing */
  size?: "sm" | "md" | "lg" | "xl";
  /** Color variant for theme-aware styling */
  variant?: "default" | "primary" | "secondary" | "accent" | "muted";
  /** Whether to use theme-aware colors automatically */
  useThemeColors?: boolean;
}

export function ContainerTextFlip({
  words = ["better", "modern", "beautiful", "awesome"],
  interval = 3000,
  className,
  textClassName,
  animationDuration = 700,
  size = "md",
  variant = "default",
  useThemeColors = true,
}: ContainerTextFlipProps) {
  const id = useId();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const textRef = React.useRef(null);

  const updateWidthForWord = () => {
    if (textRef.current) {
      // Get the actual text width without padding first
      // @ts-ignore
      const actualTextWidth = textRef.current.scrollWidth;
      
      // Add balanced padding to ensure proper spacing on both sides
      const paddingMap = { sm: 16, md: 24, lg: 32, xl: 40 };
      const padding = paddingMap[size];
      
      // Set width to exactly what's needed for the text plus balanced padding
      const textWidth = actualTextWidth + padding;
      setWidth(textWidth);
    }
  };

  useEffect(() => {
    // Update width whenever the word changes with a small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      updateWidthForWord();
    }, 10);
    
    return () => clearTimeout(timer);
  }, [currentWordIndex, size]);

  // Initial width calculation
  useEffect(() => {
    const timer = setTimeout(() => {
      updateWidthForWord();
    }, 50);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Handle screen resize
    const handleResize = () => {
      updateWidthForWord();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      // Width will be updated in the effect that depends on currentWordIndex
    }, interval);

    return () => clearInterval(intervalId);
  }, [words, interval]);

  // Get styles based on props
  const sizeStyles = getSizeStyles(size);
  const variantStyles = getVariantStyles(variant, useThemeColors);

  return (
    <motion.p
      layout
      layoutId={`words-here-${id}`}
      animate={{ width }}
      transition={{ duration: animationDuration / 2000, ease: "easeInOut" }}
      className={cn(
        "relative inline-block  text-center font-bold whitespace-nowrap",
        "rounded-md sm:rounded-lg  transition-all duration-300",
        sizeStyles,
        variantStyles.text,
        variantStyles.background,
        variantStyles.shadow,
        className,
      )}
      key={words[currentWordIndex]}
    >
      <motion.div
        transition={{
          duration: animationDuration / 1000,
          ease: "easeInOut",
        }}
        className={cn("inline-block whitespace-nowrap", textClassName)}
        ref={textRef}
        layoutId={`word-div-${words[currentWordIndex]}-${id}`}
      >
        <motion.div className="inline-block">
          {words[currentWordIndex].split("").map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                filter: "blur(10px)",
              }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
              }}
              transition={{
                delay: index * 0.02,
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.p>
  );
}
