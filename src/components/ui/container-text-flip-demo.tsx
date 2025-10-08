"use client";

import React from "react";
import { ContainerTextFlip } from "./container-text-flip";

export function ContainerTextFlipDemo() {
  return (
    <div className="p-8 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Size Variants</h2>
        <div className="space-y-4">
          <ContainerTextFlip 
            words={["Small", "Text", "Size"]} 
            size="sm"
            interval={2000}
          />
          <ContainerTextFlip 
            words={["Medium", "Text", "Size"]} 
            size="md"
            interval={2000}
          />
          <ContainerTextFlip 
            words={["Large", "Text", "Size"]} 
            size="lg"
            interval={2000}
          />
          <ContainerTextFlip 
            words={["Extra", "Large", "Size"]} 
            size="xl"
            interval={2000}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Color Variants</h2>
        <div className="space-y-4">
          <ContainerTextFlip 
            words={["Default", "Theme"]} 
            variant="default"
            size="md"
            interval={2000}
          />
          <ContainerTextFlip 
            words={["Primary", "Theme"]} 
            variant="primary"
            size="md"
            interval={2000}
          />
          <ContainerTextFlip 
            words={["Secondary", "Theme"]} 
            variant="secondary"
            size="md"
            interval={2000}
          />
          <ContainerTextFlip 
            words={["Accent", "Theme"]} 
            variant="accent"
            size="md"
            interval={2000}
          />
          <ContainerTextFlip 
            words={["Muted", "Theme"]} 
            variant="muted"
            size="md"
            interval={2000}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Legacy Colors (useThemeColors=false)</h2>
        <ContainerTextFlip 
          words={["Legacy", "Style", "Colors"]} 
          useThemeColors={false}
          size="md"
          interval={2000}
        />
      </div>
    </div>
  );
}