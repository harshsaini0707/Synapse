import React, { useState } from 'react'
import { Brain, Send } from 'lucide-react';
import { CardSpotlightDemo } from '../Chatcard/Chatcard';
import { LoaderFiveDemo } from '../Loader/Loader';
import { useSession } from 'next-auth/react';
import { useUserStore } from '@/store/userStore';

const Chat = () => {
  const {data : session} =  useSession();
  const username =  useUserStore((state) => state.user?.name)
 
  console.log(session?.user);
  
  const [query , setQuery]  = useState("")
  return (
    <div className='flex flex-col gap-10 items-center justify-center '>

        {/* logo and option */}
        <div className='flex flex-col mt-20 items-center gap-8 justify-center'>
           
            <div className="relative flex items-center justify-center">
               
                   <span className="absolute h-20 w-20 rounded-full bg-gray-600 opacity-30 animate-ping"></span>
                 
                   <span className="absolute h-16 w-16 rounded-full bg-gray-800 animate-ping opacity-50"></span>
                 
                <Brain className='h-14 w-14 text-white relative'/>
                  
                 </div>
            <div className='flex flex-col gap-2 items-center justify-center'>
                <h1 className='poppins-bold  text-3xl text-green-600'>{`Hello, ${username || " "}`}</h1>
                <h1 className='text-gray-300 text-md'>Ask me Anything about this video ans clear your all doubts...</h1>
            </div>
        </div>

        <div className='flex flex-col justify-center items-center gap-4  mt-30'>
           <div className='flex flex-row gap-1  justify-center items-center'>
             <CardSpotlightDemo text='Create a step-by-step action plan from this video'/>
            <CardSpotlightDemo text='Give me tips to apply this knowledge in real life'/>
            <CardSpotlightDemo text='What are the key takeaways from this video?'/>
           </div>

           <div>
            <LoaderFiveDemo/>
           
           </div>

           <div className='flex items-center w-full max-w-4xl p-2 rounded-4xl border border-gray-800 bg-[#121010] shadow-sm'>
          <input
            type="text"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            className='flex-grow bg-transparent outline-none px-3 placeholder-gray-400'
            placeholder='Ask and learn anything...'
          />
          <button 
          
          title='ask question'
          disabled={query.trim() === ''}
          className={`p-2  ${
            query.trim() === '' ? `bg-transparent ` :
            `bg-white text-black rounded-xl `
          } `}>
             <Send className='h-5 w-5' />
          </button>
        </div>
        </div>
        </div>


  )
}

export default Chat