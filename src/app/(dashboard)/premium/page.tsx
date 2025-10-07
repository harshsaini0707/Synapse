import React from 'react'

const Premiumplan = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-lime-900 to-slate-900'>  
      <div className='text-center p-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 max-w-4xl mx-4'>
        <h1 className='text-4xl md:text-6xl quicksand-bold text-lime-400 mb-4 [text-shadow:_2px_2px_0_rgb(0_0_0_/_40%)]'>
          🎉 Free Access!
        </h1>
        <p className='text-xl md:text-xl text-gray-300 leading-relaxed quicksand-medium'>
          We are currently in testing phase so you are our valuable user - this is free for you!!
        </p>
      </div>
    </div>
  )
}

export default Premiumplan