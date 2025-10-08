
import { FeaturesSectionDemo } from '@/components/Features/Features'
import { NavbarDemo } from '@/components/Navbar/Navbar'
import { BackgroundBeamsDemo } from '@/components/Reviews/Reviews'
import { UniversityLogos } from '@/components/UniversityLogos/UniversityLogos'
import React from 'react'

const LandingPage = () => {
  return (
    <div className="flex flex-col">
     
      <NavbarDemo />

    <div className=' flex items-center justify-center flex-col gap-8 '>

            <div className='flex flex-col items-center justify-center gap-3 py-8'>
        <p className='text-4xl quicksand-bold '>Trusted by Learners from the World's Top Universities</p>
        <p className='text-lg quicksan-medium text-gray-800'>AI that helps you study smarter, faster, and deeper.</p>
    
       <div className='min-w-full'>
         <UniversityLogos />
       </div>
     
      </div>
      
     
    </div>
    


     
    </div>
  )
}

export default LandingPage
