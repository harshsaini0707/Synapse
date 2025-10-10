
import { FeaturesSectionDemo } from '@/components/Features/Features'
import { NavbarDemo } from '@/components/Navbar/Navbar'
import { BackgroundBeamsDemo } from '@/components/Reviews/Reviews'
import { UniversityLogos } from '@/components/UniversityLogos/UniversityLogos'
import React from 'react'

const LandingPage = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
     
      <NavbarDemo />

    <div className='flex items-center justify-center flex-col gap-6 md:gap-8 px-4 md:px-6 lg:px-8 max-w-full'>

      <div className='flex flex-col items-center justify-center gap-3 py-6 md:py-8 max-w-4xl mx-auto text-center w-full'>
        <p className='text-2xl md:text-3xl lg:text-4xl quicksand-bold leading-tight'>Trusted by Learners from the World's Top Universities</p>
        <p className='text-base md:text-lg quicksan-medium text-gray-800 max-w-2xl'>AI that helps you study smarter, faster, and deeper.</p>
    
        <div className='w-full mt-4 md:mt-6 overflow-hidden'>
          <UniversityLogos />
        </div>
      </div>
      
     
    </div>
    

    <div className='flex flex-col gap-8  items-center justify-center'>
       {/* Features */}
    </div>


     
    </div>
  )
}

export default LandingPage
