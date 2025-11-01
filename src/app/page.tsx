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
    

    <div className='flex flex-col gap-8 bg-[#e9e1e1] items-center justify-center' id="features">
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

    {/* Pricing Section */}
    <div className="w-full relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12 md:py-16" id="pricing">
      <div className='max-w-7xl mx-auto px-4'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-5xl quicksand-bold text-neutral-200 mb-4'>
            Simple, Transparent Pricing
          </h2>
          <p className='text-md text-gray-300 leading-snug quicksand-medium mb-6'>
            All features included - Choose the plan that works for you
          </p>
          <div className="inline-flex items-center gap-2 bg-lime-500/20 text-lime-300 px-4 py-2 rounded-full">
            <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">✨ No Feature Restrictions - Full Access Always</span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className='grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10'>
          {/* Monthly Plan */}
          <div className="relative bg-white/15 backdrop-blur-md border border-lime-400 ring-2 ring-lime-400/50 rounded-2xl p-5 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl scale-105">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-lime-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                MOST POPULAR
              </div>
            </div>

            <div className="text-center mb-5 mt-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-6 h-6 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                </svg>
                <h3 className="text-xl font-bold text-white quicksand-bold">Monthly Plan</h3>
              </div>
              <p className="text-gray-300 text-xs mb-3">Perfect for regular learning</p>
              
              <div className="mb-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-neutral-50 quicksand-bold">$10</span>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">/ month</span>
                    <span className="text-gray-300 text-xs">₹899</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="bg-lime-500/20 text-lime-300 px-3 py-2 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M infinity" />
                  </svg>
                  <span className="text-base font-bold">ALL FEATURES INCLUDED</span>
                </div>
                <p className="text-xs">Complete AI learning suite</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/signin')}
              className="w-full bg-lime-400 text-black hover:bg-lime-300 shadow-lg hover:shadow-lime-400/25 py-3 px-4 rounded-lg font-bold text-base transition-all duration-300 cursor-pointer quicksand-bold"
            >
              Sign In to Purchase
            </button>
          </div>

          {/* Yearly Plan */}
          <div className="relative bg-white/10 backdrop-blur-md border border-white/20 hover:border-lime-400/50 rounded-2xl p-5 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                BEST VALUE
              </div>
            </div>

            <div className="absolute -top-3 -right-3">
              <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                Save 30%
              </div>
            </div>

            <div className="text-center mb-5 mt-3">
              <div className="flex items-center justify-center gap-2 mb-2">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M infinity M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                <h3 className="text-xl font-bold text-white quicksand-bold">Yearly Plan</h3>
              </div>
              <p className="text-gray-300 text-xs mb-3">Best value for serious learners</p>
              
              <div className="mb-3">
                <div className="flex items-center justify-center gap-2">
                  <span className="text-3xl font-bold text-neutral-50 quicksand-bold">$84</span>
                  <div className="flex flex-col">
                    <span className="text-gray-400 text-xs">/ year</span>
                    <span className="text-gray-300 text-xs">₹7,499</span>
                  </div>
                </div>
                <div className="text-lime-300 text-xs mt-1 font-semibold">
                  Only $7/month
                </div>
                <div className="text-green-400 text-xs mt-1 font-semibold">
                  🎉 2 months free!
                </div>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="bg-lime-500/20 text-lime-300 px-3 py-2 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <svg className="w-4 h-4 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M infinity" />
                  </svg>
                  <span className="text-base font-bold">ALL FEATURES INCLUDED</span>
                </div>
                <p className="text-xs">Complete AI learning suite for 12 months</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/signin')}
              className="w-full bg-white/20 text-white hover:bg-white/30 border border-white/30 py-3 px-4 rounded-lg font-bold text-base transition-all duration-300 cursor-pointer quicksand-bold"
            >
              Sign In to Purchase
            </button>

            <div className="text-center mt-2 text-gray-300 text-xs">
              Equivalent to $7.00/month (Save 30%)
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 mb-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-lime-400 text-center mb-6 flex items-center justify-center gap-3 quicksand-bold">
            <svg className="w-8 h-8 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            What You Get:
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-lime-400 text-sm mt-1">✓</span>
              <span className="text-sm">Unlimited video learning</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-lime-400 text-sm mt-1">✓</span>
              <span className="text-sm">Advanced AI chatbot</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-lime-400 text-sm mt-1">✓</span>
              <span className="text-sm">Discussion & counter-arguments</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-lime-400 text-sm mt-1">✓</span>
              <span className="text-sm">Unlimited flashcards</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-lime-400 text-sm mt-1">✓</span>
              <span className="text-sm">Quiz system (all types)</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-lime-400 text-sm mt-1">✓</span>
              <span className="text-sm">Video timestamps & highlights</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-lime-400 text-sm mt-1">✓</span>
              <span className="text-sm">Custom quiz creation</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-lime-400 text-sm mt-1">✓</span>
              <span className="text-sm">Unlimited chat with video</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-lime-400 text-sm mt-1">✓</span>
              <span className="text-sm">All type of summaries</span>
            </div>
            <div className="flex items-start gap-2 text-gray-300">
              <span className="text-lime-400 text-sm mt-1">✓</span>
              <span className="text-sm">All new upcoming features</span>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Instant Full Access</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No Feature Limits</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    {/* Footer */}
    <footer className='bg-black text-white py-12 px-6 md:px-8 lg:px-12' id="contact">
      <div className='max-w-6xl mx-auto flex flex-col gap-6'>
        <div className='flex justify-between items-start'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-3xl md:text-4xl font-bold text-white'>
              Built by Harsh Saini
            </h2>
            
            <p className='text-gray-400 text-base'>
              Hey, I'm a developer who built this app
            </p>
            
            <p className='text-gray-400 text-base'>
              I regularly share updates about what I'm building on X/Twitter
            </p>
            
            <p className='text-gray-400 text-base'>
              feel free to follow me @ <a href="https://x.com/HarshSaini41432" target="_blank" rel="noopener noreferrer" className='text-white hover:text-lime-400 transition-colors'>X.com/HarshSaini41432</a>
            </p>
            
            <p className='text-gray-400 text-base'>
              you will enjoy using this app ❣️
            </p>
            
            <button
              onClick={() => router.push(status === "authenticated" ? "/home" : "/signin")}
              className='bg-white text-black font-semibold px-6 py-3 rounded-lg text-base w-fit hover:bg-gray-200 transition-all duration-300 cursor-pointer'
            >
              Get Started
            </button>
          </div>
          
          <div className='flex items-center gap-4'>
            <a
              href="https://x.com/HarshSaini41432"
              target="_blank"
              rel="noopener noreferrer"
              className='text-gray-400 hover:text-white transition-colors duration-300'
              aria-label="Follow on X/Twitter"
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'/>
              </svg>
            </a>
          
            <a
              href="https://www.linkedin.com/in/harsh-saini-850940288/"
              target="_blank"
              rel="noopener noreferrer"
              className='text-gray-400 hover:text-white transition-colors duration-300'
              aria-label="Connect on LinkedIn"
            >
              <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/>
              </svg>
            </a>
          </div>
        </div>
        
        <p className='text-gray-500 text-sm'>
          © 2025 Harsh Saini / synapse - All Rights Reserved
        </p>
      </div>
    </footer>


     
    </div>
  )
}

export default LandingPage
