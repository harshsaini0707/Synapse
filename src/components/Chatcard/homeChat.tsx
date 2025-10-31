import { Brain, Send } from 'lucide-react'
import React, { useState } from 'react'
import { CardSpotlightDemo } from './Chatcard'
import { LoaderFiveDemo } from '../Loader/Loader'
import { useUserStore } from '@/store/userStore'

const Homechat = () => {
      const username =  useUserStore((state) => state.user?.name)
   
  return (
   <div className='flex flex-col gap-10 items-center justify-center '>

        {/* logo and option */}
        <div className='flex flex-col mt-24 items-center gap-8 justify-center'>
           
            <div className="relative flex items-center justify-center">
               
                   <span className="absolute h-20 w-20 rounded-full bg-gray-600 opacity-30 animate-ping"></span>
                 
                   <span className="absolute h-16 w-16 rounded-full bg-gray-800 animate-ping opacity-50"></span>
                 
                <Brain className='h-14 w-14 text-white relative'/>
                  
                 </div>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <h1 className='poppins-bold  text-3xl text-green-600'>{`Hello, ${username || " "}`}</h1>
                <h1 className='text-neutral-400 text-md'>Ask me Anything about this video ans clear your all doubts...</h1>
            </div>
        </div>

        </div>
  )
}

export default Homechat