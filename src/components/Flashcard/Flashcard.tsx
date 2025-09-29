import { useFlashcard } from '@/hooks/fetchFlashcards';
import { useVideoStore } from '@/store/videoStore'
import React, { useState } from 'react'
import { SendToBack } from 'lucide-react';

const Flashcard = () => {

  const {videoId :  video_id}  =  useVideoStore();
  if(!video_id) console.log("Unable to get videoId");
  const [generate ,  setGenerate  ] = useState(false)

   const {data , isPending ,  isError} =  useFlashcard(video_id , generate);


  console.log(data);
  
  
  return (
    !data ? (
      <div className='flex justify-center px-2 sm:px-4 mt-12'>
        <div className='flex flex-col items-center text-center w-full max-w-md space-y-2 py-4 border border-neutral-700 rounded-lg bg-transparent'>
          <h1 className='font-bold text-md sm:text-lg text-neutral-100'>
            Ready to boost your learning?
          </h1>
          <h2 className='poppins-medium text-sm text-neutral-300'>
            Transform your video content into interactive study materials
          </h2>
          <button 
          onClick={()=>setGenerate(true)}
          className='flex items-center mt-2 gap-2 px-4 py-2 bg-neutral-200 text-gray-900 shadow hover:scale-102  hover:cursor-pointer border-1 border-gray-700 font-semibold rounded-lg transition-all duration-200'>
            <SendToBack className='w-4 h-4 font-extrabold' />
            <span className='text-sm'>Generate FlashCard</span>
          </button>
        </div>
      </div>
    ) : (
      <div className='flex justify-center px-2'>
        <div className='text-center py-2'>
          <p className='text-neutral-400 text-sm'>Loading flashcard data...</p>
        </div>
      </div>
    )
  )
}

export default Flashcard