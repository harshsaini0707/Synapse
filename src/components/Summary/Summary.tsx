import { Brain, NotebookTabs } from 'lucide-react'
import React from 'react'
import { LoaderThreeDemo } from '../Loadertunder/Loadertunder'

const Summary = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-38 ">
  
      <div className="relative mt-32 flex items-center justify-center">
    
        <span className="absolute h-36 w-36 rounded-full bg-gray-600 opacity-30 animate-ping"></span>
      
        <span className="absolute h-28 w-28 rounded-full bg-gray-800 animate-ping opacity-50"></span>
      
        <Brain className="relative h-20 w-20 text-white" />
      </div>

    
      <div className="flex flex-col justify-center items-center gap-8">
        <div className="poppins-bold text-xl text-gray-300">
          Generate summary according to your time and need...
        </div>

        <div className="flex flex-row gap-5">
          <button className="poppins-semibold hover:scale-105 duration-200 text-black border border-gray-600 bg-white/95 px-4 py-3 flex items-center gap-2 rounded-2xl">
            <LoaderThreeDemo />
            <h1>Quick Summary</h1>
          </button>

          <button className="poppins-semibold hover:scale-105 duration-200 text-black border border-gray-600 bg-white/95 px-4 py-3 flex items-center gap-2 rounded-2xl">
            <NotebookTabs className="animate-bounce text-gray-900" />
            <h1>Detailed Summary</h1>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Summary
