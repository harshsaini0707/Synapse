
import { BentoFeatures } from '@/components/Features/BentoFeatures'
import { NavbarDemo } from '@/components/Navbar/Navbar'
import { UniversityLogos } from '@/components/UniversityLogos/UniversityLogos'
import { WorldMapDemo } from '@/components/Worldmap/WorldMapDemo'
import React from 'react'

const LandingPage = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
     
      <NavbarDemo />

    <div className='flex items-center bg-neutral-100 justify-center flex-col gap-6 md:gap-8 px-4  md:px-6 lg:px-8 pb-16 max-w-full'>

      <div className='flex flex-col items-center justify-center gap-3 pt-6 md:pt-8 max-w-4xl mx-auto text-center w-full'>
        <p className='text-2xl md:text-3xl lg:text-4xl quicksand-bold leading-tight'>Trusted by Learners from the World's Top Universities</p>
        <p className='text-base md:text-lg quicksan-medium text-gray-700 max-w-2xl'>AI that helps you study smarter, faster, and deeper.</p>
    
        <div className='w-full mt-2 md:mt-6 overflow-hidden'>
          <UniversityLogos />
        </div>
      </div>
      
     
    </div>
    

    <div className='flex flex-col gap-8 bg-[#e9e1e1] items-center justify-center'>
       {/* Features */}
       <BentoFeatures />
    </div>

    <div>
      <WorldMapDemo/>
    </div>
  
    <div className='flex flex-col items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 py-14 md:py-18'>
      <div className='flex flex-col items-center justify-center gap-10 px-6 md:px-6 lg:px-8 max-w-8xl mx-auto text-center'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <h1 className='text-3xl md:text-5xl lg:text-6xl xl:text-7xl quicksand-bold text-gray-900 leading-tight'>
            Ready to evolve your mind and transform your world?
          </h1>
          <p className='text-gray-700 quicksand-medium text-base md:text-lg leading-relaxed max-w-3xl'>
            Discover the platform built for modern learners who are ready to go beyond limits.
          </p>
        </div>
        
        <button className='bg-lime-400  text-black font-bold px-6 py-2 md:px-8 md:py-4 rounded-full text-lg md:text-xl cursor-pointer shadow-xl hover:bg-transparent border-transparent hover:border-3 hover:border-lime-400 quicksand-bold transition-all duration-300 transform '>
          Start Learning!
        </button>
      </div>
    </div>


     
    </div>
  )
}

export default LandingPage
