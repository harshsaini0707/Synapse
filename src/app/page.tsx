"use client"
import { BentoFeatures } from '@/components/Features/BentoFeatures'
import { NavbarDemo } from '@/components/Navbar/Navbar'
import { UniversityLogos } from '@/components/UniversityLogos/UniversityLogos'
import { WorldMapDemo } from '@/components/Worldmap/WorldMapDemo'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import Image from 'next/image'
import Logo from "../../public/logos/logo2.png"

const LandingPage = () => {
  const {status} =useSession();
  const router = useRouter();
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
        
        <button
        onClick={
            status === "authenticated" ? ()=> router.push("/home") : ()=> router.push("/signin")
        }
        
        className='bg-lime-400  text-black font-bold px-6 py-2 md:px-8 md:py-4 rounded-full text-lg md:text-xl cursor-pointer shadow-xl hover:bg-transparent border-3 hover:border-3 hover:border-lime-400 quicksand-bold transition-all duration-300 transform '>
          Start Learning!
        </button>
      </div>
    </div>
    
    {/* Footer */}
    <footer className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-4 px-6 md:px-8 lg:px-12'>
      <div className='max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4'>
      
        <div className='flex flex-col items-center lg:items-start'>
          <div className='flex items-center gap-2'>
            <Image 
              src={Logo}
              alt="Synapse Logo" 
              width={36} 
              height={36}
              className='object-contain rounded-md'
            />
            <h2 className='text-2xl md:text-3xl font-bold quicksand-bold text-lime-400 bg-clip-text animate-pulse'>
              Synapse
            </h2>
          </div>
        </div>
        
        <div className='flex flex-col items-center lg:items-end gap-2'>
          <p className='text-base md:text-lg quicksand-medium text-gray-300 text-center lg:text-right'>
            Connect with <span className='text-lime-400 quicksand-medium'>Creator</span> of Synapse
          </p>
          
          <div className='flex items-center gap-3'>
           
            <a
              href="https://x.com/HarshSaini41432"
              target="_blank"
              rel="noopener noreferrer"
              className='group p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-lime-400/30'
              aria-label="Follow on X"
            >
              <svg className='w-5 h-5 text-white group-hover:text-lime-400 transition-colors duration-300' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
              </svg>
            </a>
          
            <a
              href="https://www.linkedin.com/in/harsh-saini-850940288/"
              target="_blank"
              rel="noopener noreferrer"
              className='group p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-cyan-400/30'
              aria-label="Connect on LinkedIn"
            >
              <svg className='w-5 h-5 text-white group-hover:text-cyan-400 transition-colors duration-300' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
              </svg>
            </a>
          </div>
        </div>
        
      </div>
    </footer>


     
    </div>
  )
}

export default LandingPage
