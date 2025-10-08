"use client";
import React from "react";
import Image from "next/image";

// Import all logo images
import chitkaraLogo from "/public/logos/chitkara.png";
import harvardLogo from "/public/logos/harvard.png";
import hydrabadLogo from "/public/logos/hydrabad.jpeg";
import iiscLogo from "/public/logos/iisc.png";
import iitBombayLogo from "/public/logos/iit-bombay.png";
import iitDelhiLogo from "/public/logos/iit-delhi.png";
import iitMadrasLogo from "/public/logos/iit-madras.png";
import mitLogo from "/public/logos/mit.png";
import nitLogo from "/public/logos/nit.png";
import tokyoLogo from "/public/logos/tokyo.png";

interface University {
  name: string;
  logo: any;
  country: string;
}

const universities: University[] = [
  // Indian Universities
  { name: "IIT Bombay", logo: iitBombayLogo, country: "India" },
  { name: "IIT Delhi", logo: iitDelhiLogo, country: "India" },
  { name: "IIT Madras", logo: iitMadrasLogo, country: "India" },
  { name: "IISc Bangalore", logo: iiscLogo, country: "India" },
  { name: "NIT", logo: nitLogo, country: "India" },
  { name: "Chitkara University", logo: chitkaraLogo, country: "India" },
  { name: "University of Hyderabad", logo: hydrabadLogo, country: "India" },
  
  // International Universities
  { name: "Harvard", logo: harvardLogo, country: "USA" },
  { name: "MIT", logo: mitLogo, country: "USA" },
  { name: "University of Tokyo", logo: tokyoLogo, country: "Japan" },
];

export const UniversityLogos = () => {
  return (
    <div className="py-8 max-w-6xl">
      <div className="relative overflow-hidden">
        {/* Scrolling container */}
        <div className="flex">
          {/* First set */}
          <div className="flex space-x-6 animate-marquee items-center">
            {universities.map((university, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-16 h-16 bg-white  transition-all duration-300  p-2 flex-shrink-0"
              >
                <Image
                  src={university.logo}
                  alt={`${university.name} logo`}
                  width={56}
                  height={56}
                  className="object-contain w-full h-full"
                  priority={index < 5}
                />
              </div>
            ))}
          </div>
          
          {/* Duplicate set for seamless loop */}
          <div className="flex space-x-6 animate-marquee items-center">
            {universities.map((university, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex items-center justify-center w-16 h-16 bg-white  hover:scale-110 transition-all duration-300  p-2 flex-shrink-0"
              >
                <Image
                  src={university.logo}
                  alt={`${university.name} logo`}
                  width={56}
                  height={56}
                  className="object-contain w-full h-full"
                  priority={index < 5}
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* Gradient overlays for smooth edges */}
        <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};
