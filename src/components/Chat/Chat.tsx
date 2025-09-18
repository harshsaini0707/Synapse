import React, { useState } from 'react'
import { Brain, Send } from 'lucide-react';
import { CardSpotlightDemo } from '../Chatcard/Chatcard';
import { LoaderFiveDemo } from '../Loader/Loader';
import { useUserStore } from '@/store/userStore';
import Homechat from '../Chatcard/homeChat';
import { useChatHistory } from '@/hooks/chatHistory';
import { useQueryClient } from '@tanstack/react-query';


type Chat = {
  
answer :  string,
created_at : string,
id: string,
question : string
}
const Chat = () => {


  const {isLoading , isError , data}  =  useChatHistory();

  const [query , setQuery]  = useState("")
  return (
   <div>
  {(!data || data.length == 0) &&   <Homechat/>}

  <div>
      {data?.map((ele : Chat)=>(
        <div>
          <h1>You =----- {ele?.question}</h1>
          <h2>AI: {ele?.answer}</h2>
        </div>
      ))}
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

  )
}

export default Chat