
import { FeaturesSectionDemo } from '@/components/Features/Features'
import { NavbarDemo } from '@/components/Navbar/Navbar'
import { BackgroundBeamsDemo } from '@/components/Reviews/Reviews'
import React from 'react'

const LandingPage = () => {
  return (
    <div className="flex flex-col">
     
      <NavbarDemo />

      {/* Features */}
      <div className="bg-[radial-gradient(circle_at_50%_65%,#b3e0a8bd,#64da36d1)] py-2 text-center">
    
        <FeaturesSectionDemo />
      </div>



      

      {/* Globe Section */}
      <BackgroundBeamsDemo/>
     
    </div>
  )
}

export default LandingPage
