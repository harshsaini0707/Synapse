import { FeaturesSectionDemo } from '@/components/Features/Features'
import { GlobeDemo } from '@/components/Globe/Globe'
import { InfiniteMovingCardsDemo } from '@/components/InfiniteCard/Infinitecards'
import { NavbarDemo } from '@/components/Navbar/Navbar'
import { BackgroundBeamsDemo } from '@/components/Reviews/Reviews'
import { UniversityLogos } from '@/components/UniversityLogos/UniversityLogos'
import React from 'react'

const LandingPage = () => {
  return (
    <div className="flex flex-col">
     
      <NavbarDemo />

      {/* Features */}
      <div className="bg-red-600 py-10 text-center">
        <p className="text-xl font-semibold text-white">What Features we have!!</p>
        <FeaturesSectionDemo />
      </div>

      {/* Globe Section */}
      
     <BackgroundBeamsDemo/>
     
    </div>
  )
}

export default LandingPage
