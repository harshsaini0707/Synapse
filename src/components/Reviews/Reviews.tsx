"use client";
import React from "react";
import { BackgroundBeams } from "../ui/background-beams";
import { UniversityLogos } from "../UniversityLogos/UniversityLogos";
import { InfiniteMovingCardsDemo } from "../InfiniteCard/Infinitecards";
import { GlobeDemo } from "../Globe/Globe";

export function BackgroundBeamsDemo() {
  return (
 <div className="min-h-screen w-full bg-white relative">
  {/* Emerald Glow Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        radial-gradient(125% 125% at 50% 90%, #ffffff 40%, #10b981 100%)
      `,
      backgroundSize: "100% 100%",
    }}
  />
  {/* Your Content/Components */}
   <div className="h-[40rem] w-full   relative flex flex-col items-center justify-center antialiased">
         
             <div className="  text-white">
        <h1 className="text-3xl md:text-4xl font-bold text-center my-8">
          The world is learning, why not you?
        </h1>

        {/* Grid layout */}
        <div className="grid grid-cols-1   md:grid-cols-2 gap-4 max-w-7xl mx-auto">
          <div>
            <GlobeDemo /> 
          </div>
  

          {/* RIGHT - Bottom box */}
          <div className="p-2 shadow-lg">
            
            <h2 className="text-xl font-semibold ">Global Reviews</h2>
          <InfiniteMovingCardsDemo/>
            <h2 className="text-xl font-semibold py-4">Trusted by Learners from</h2>
           <UniversityLogos/>
          </div>
  
          </div>
          </div>
      <BackgroundBeams />
    </div>
</div>
   
  );
}
