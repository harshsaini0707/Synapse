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
 
  { name: "IIT Bombay", logo: iitBombayLogo, country: "India" },
  { name: "IIT Delhi", logo: iitDelhiLogo, country: "India" },
  { name: "IIT Madras", logo: iitMadrasLogo, country: "India" },
  { name: "IISc Bangalore", logo: iiscLogo, country: "India" },
  { name: "NIT", logo: nitLogo, country: "India" },
  { name: "Chitkara University", logo: chitkaraLogo, country: "India" },
  { name: "University of Hyderabad", logo: hydrabadLogo, country: "India" },
  
  { name: "Harvard", logo: harvardLogo, country: "USA" },
  { name: "MIT", logo: mitLogo, country: "USA" },
  { name: "University of Tokyo", logo: tokyoLogo, country: "Japan" },
];

export const UniversityLogos = () => {
  return (
    <div className="w-full py-4 md:py-6 lg:py-8 overflow-hidden">
      <div className="relative w-full">
        {/* Scrolling container - properly contained */}
        <div className="flex w-full overflow-hidden">
          {/* First set */}
          <div className="flex space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 animate-marquee items-center min-w-max">
            {universities.map((university, index) => (
              <div
                key={index}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-lg shadow-sm border border-gray-200 hover:scale-105 md:hover:scale-110 transition-all duration-300 hover:shadow-md p-1 sm:p-1.5 md:p-2 flex-shrink-0"
              >
                <Image
                  src={university.logo}
                  alt={`${university.name} logo`}
                  width={56}
                  height={56}
                  className="object-contain w-full h-full"
                  priority={index < 5}
                  sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, 56px"
                />
              </div>
            ))}
          </div>
          
          {/* Duplicate set for seamless loop */}
          <div className="flex space-x-3 sm:space-x-4 md:space-x-6 lg:space-x-8 animate-marquee items-center min-w-max">
            {universities.map((university, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-lg shadow-sm border border-gray-200 hover:scale-105 md:hover:scale-110 transition-all duration-300 hover:shadow-md p-1 sm:p-1.5 md:p-2 flex-shrink-0"
              >
                <Image
                  src={university.logo}
                  alt={`${university.name} logo`}
                  width={56}
                  height={56}
                  className="object-contain w-full h-full"
                  priority={index < 5}
                  sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, (max-width: 1024px) 48px, 56px"
                />
              </div>
            ))}
          </div>
        </div>
       
        <div className="absolute top-0 left-0 w-6 sm:w-8 md:w-12 lg:w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-6 sm:w-8 md:w-12 lg:w-20 h-full bg-gradient-to-r from-transparent to-white pointer-events-none z-10"></div>
      </div>
    </div>
  );
};
