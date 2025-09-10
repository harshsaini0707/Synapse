import { FeaturesSectionDemo } from '@/components/Features/Features'
import { GlobeDemo } from '@/components/Globe/Globe'
import { NavbarDemo } from '@/components/Navbar/Navbar'

import React from 'react'

const LandingPage = () => {
  return (
    <div className='flex flex-col  '>
      <NavbarDemo/>
      <div className='bg-red-600'>
        <p>What Features we have!!</p>
        <FeaturesSectionDemo/>
      </div>
      <GlobeDemo/>
    </div>
  )
}

export default LandingPage