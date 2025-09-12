"use client";
import React from "react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { Sparkles } from 'lucide-react';

export function HoverBorderGradientDemo() {
  return (
    <div className=" flex justify-center text-center">
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-transparent text-white dark:text-transparent flex items-center space-x-2"
      >
        
        
        <span className="flex gap-1 justify-center items-center poppins-semibold text-xs"><Sparkles size={14}/>  AI-Powered Learning Buddy</span>
      </HoverBorderGradient>
    </div>
  );
}

