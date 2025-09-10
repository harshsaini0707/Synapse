"use client";
import React from "react";

interface University {
  name: string;
  logo: string;
  country: string;
}

const universities: University[] = [
  // Indian Universities
  { name: "IIT Bombay", logo: "/logos/iit-bombay.png", country: "India" },
  { name: "IIT Delhi", logo: "/logos/iit-delhi.png", country: "India" },
  { name: "IISc Bangalore", logo: "/logos/iisc.png", country: "India" },
  { name: "BITS Pilani", logo: "/logos/bits.png", country: "India" },
  { name: "IIT Madras", logo: "/logos/iit-madras.png", country: "India" },
  
  // International Universities
  { name: "MIT", logo: "/logos/mit.png", country: "USA" },
  { name: "Stanford", logo: "/logos/stanford.png", country: "USA" },
  { name: "Harvard", logo: "/logos/harvard.png", country: "USA" },
  { name: "Oxford", logo: "/logos/oxford.png", country: "UK" },
  { name: "Cambridge", logo: "/logos/cambridge.png", country: "UK" },
  { name: "ETH Zurich", logo: "/logos/eth.png", country: "Switzerland" },
  { name: "NUS", logo: "/logos/nus.png", country: "Singapore" },
  { name: "University of Tokyo", logo: "/logos/tokyo.png", country: "Japan" },
];

export const UniversityLogos = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Scrolling container */}
      <div className="flex animate-scroll">
        {/* First set */}
        <div className="flex space-x-4 animate-marquee">
          {universities.map((university, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center min-w-[120px] group hover:scale-110 transition-transform duration-300"
            >
              {/* Logo placeholder with gradient background */}
              <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-gray-300/10 rounded-full flex items-center justify-center mb-2 border border-white/10 group-hover:border-white/30 transition-all duration-300">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  {/* You can replace this with actual logos */}
                  <span className="text-gray-800 font-bold text-xs">
                    {university.name.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
              </div>
              <span className="text-xs text-center font-medium text-gray-300 group-hover:text-white transition-colors">
                {university.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Duplicate set for seamless loop */}
        <div className="flex space-x-4 animate-marquee">
          {universities.map((university, index) => (
            <div
              key={`duplicate-${index}`}
              className="flex flex-col items-center justify-center min-w-[120px] group hover:scale-110 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-white/20 to-gray-300/10 rounded-full flex items-center justify-center mb-2 border border-white/10 group-hover:border-white/30 transition-all duration-300">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                  <span className="text-gray-800 font-bold text-xs">
                    {university.name.split(' ').map(word => word[0]).join('')}
                  </span>
                </div>
              </div>
              <span className="text-xs text-center font-medium text-gray-300 group-hover:text-white transition-colors">
                {university.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Gradient overlays for smooth edges */}
      <div className="absolute top-0 left-0 w-6 h-full [mask-image:linear-gradient(to_right,transparent,white_1%,white_14%,transparent)] pointer-events-none z-10"></div>
     
    </div>
  );
};
