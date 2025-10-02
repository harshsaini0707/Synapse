"use client"

import { HoverBorderGradientDemo } from '@/components/AIButton/Button';
import React, { useState } from 'react';
import { Link as LinkIcon, Send ,History  } from 'lucide-react';
import { CardHoverEffectDemo } from '@/components/HistoryCards/Historycars';
import { useRouter } from 'next/navigation';

const getVideoIdFromUrl = (url : string) : string | null => {
try {
  const parsedUrl = new URL(url);

   // Case 1: Standard link https://www.youtube.com/watch?v=abcd1234
    if (parsedUrl.hostname.includes("youtube.com")) {
      return parsedUrl.searchParams.get("v");
    }
  
     // Case 2: Short link https://youtu.be/abcd1234
    if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1); // remove leading "/"
    }

    return null;
} catch (error) {
  return null;
}
} 

const Home = () => {
  const router = useRouter();
  const [link , setLink ] =  useState("")
 // const [videoId ,  setVideoId] = useState("")


  const handleExtract = () =>{
    const id  = getVideoIdFromUrl(link);
  //  setVideoId(id as string);

    console.log(id);
    if(id) router.push(`/video/${id}`)
   
    
  }
  return (
    <div className="min-h-screen w-full relative">
      {/* Emerald Void Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 70% 90%, #000000 40%, #072607 100%)",
        }}
      />

{/* ----------------MAIN CODE START--------- */}
      {/* Main Content */}
      <div className="flex flex-col min-h-screen relative z-10 px-8 md:px-16 pt-10 pb-12 gap-12 items-center">
        {/* Info & Search Section */}
        <div className="flex flex-col mt-8 gap-6 text-center max-w-2xl">
          <HoverBorderGradientDemo />

          <h1 className="text-gray-200 alan-sans-font text-xl md:text-5xl">
            Experience Synapse AI Tutor
          </h1>

          <p className="text-gray-500 poppins-regular leading-tight text-md md:text-xl">
            Transform any YouTube video into smart, interactive learning experiences <br />
            that wire knowledge straight to your synapses.
          </p>

          <div className={`flex  items-center gap-3  bg-black border border-gray-800 rounded-lg py-2 px-4 text-sm shadow-md w-full md:w-auto transition-all duration-500
            ${link!='' ? "border-b-1 border-b-blue-700 shadow-sm shadow-blue-400 " : ""}
            `}>
  <LinkIcon className="text-gray-400 w-6 h-6" />
  <input
    type="text"
    value={link}
    onChange={(e) => setLink(e.target.value)}
    placeholder="Paste YouTube link here and start learning..."
    className="flex-1 bg-transparent outline-none text-blue-400 px-2 "
  />
  <button
     type='button'
     title='query'
    disabled={link.trim() === ''}
    onClick={handleExtract}
    className={`p-2 rounded-md transition-all duration-400 ${
      link.trim() === ''
        ? 'bg-transparent text-white cursor-not-allowed'
        : 'bg-gray-300 text-black hover:bg-gray-400 hover:cursor-pointer active:scale-95'
    }`}
  >
    <Send className="w-5 h-5" />
  </button>
</div>

        </div>

        {/* Placeholder for recent videos or components */}
        <div className=" flex flex-col w-full mt-2 mx-auto ">
         
        <div className='flex  items-center gap-2 px-8 '> <History className='text-white '/>  <h1 className='text-white poppins-semibold text-xl'> Recent</h1></div>
        <div >
          <CardHoverEffectDemo/>
        </div>
         
        </div>
      </div>

      {/* -----------------------MAIN CODE END------------------ */}

    </div>
  );
};

export default Home;
