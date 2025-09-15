import React from 'react'
import { Brain, Send } from 'lucide-react';
import { CardSpotlightDemo } from '../Chatcard/Chatcard';
import { LoaderFiveDemo } from '../Loader/Loader';

const Chat = () => {
  return (
    <div className='flex flex-col gap-10 items-center justify-center '>

        {/* logo and option */}
        <div className='flex flex-col mt-20 items-center gap-8 justify-center'>
           
                <Brain className='h-14 w-14'/>
           
            <div className='flex flex-col gap-1 items-center justify-center'>
                <h1 className='poppins-bold text-3xl'>Hello , Rohit</h1>
                <h1>Ask me Anything about this video ans clear your all doubts...</h1>
            </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-4  mt-30'>
           <div className='flex flex-row gap-1  justify-center items-center'>
             <CardSpotlightDemo text='What is your mind?'/>
            <CardSpotlightDemo text='Ask me summarize'/>
            <CardSpotlightDemo text='Ask to get the key takeaways from video'/>
           </div>

           <div>
            <LoaderFiveDemo/>
           
           </div>

           <div className='flex items-center w-full max-w-4xl p-2 rounded-4xl border border-gray-800 bg-[#121010] shadow-sm'>
          <input
            type="text"
            className='flex-grow bg-transparent outline-none px-3 placeholder-gray-400'
            placeholder='Ask and learn anything...'
          />
          <button  className='p-2 rounded-full hover:bg-gray-200'>
             <Send className='h-5 w-5 text-white' />
          </button>
        </div>
        </div>
        </div>


  )
}

export default Chat