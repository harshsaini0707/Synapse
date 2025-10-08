"use client"
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ContainerTextFlip } from "../ui/container-text-flip";


const Firstimpression = () => {
  const words = [
    "Flashcards",
    "Study Group",
    "Chatbot",
    "AI Tutor",
    "Interactive Web Learning",
    "Quizzes",
    "AI Agents",
  ];

  const {status} =  useSession()
  const router = useRouter();
  const[autoplay , setAutoplay] = useState(false);

    const videoId = "dQw4w9WgXcQ";
  const baseUrl = `https://www.youtube.com/embed/${videoId}`;
  const videoUrl = autoplay ? `${baseUrl}?autoplay=1&mute=0` : baseUrl;

  return (
    <div className="relative w-full min-h-screen  bg-[radial-gradient(circle_at_48%_200%,#ffffff,#bfe09a)]">
      {/*make background cover ALL content */}
      <div className="absolute inset-0  bg-[radial-gradient(circle,#e5e7eb_1px,transparent_1px)] bg-[size:34px_34px]" />

      <div className="relative container mx-auto px-4 pt-38 text-center">
        <h1 className="poppins-bold text-gray-950 text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
          Learn Beyond the Play Button
        </h1>

        <p className="alan-sans-font text-3xl  text-gray-950 md:text-4xl lg:text-5xl font-semibold mb-6">
          with  <ContainerTextFlip  words={words} />
        </p>

        <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-800 dark:text-gray-200 poppins-medium mb-6">
          Stop watching, start mastering. Transform videos into interactive
          lessons with AI tutors, flashcards, quizzes, and collaborative study
          spaces , web based interactive learning and much more.
        </p>

       


        <div className="flex flex-col md:flex-row justify-center gap-3">
          <button
            onClick={status === 'authenticated' ?()=> router.push("/home") :()=> router.push("/signin")  }
            className="relative h-12 mt-4 cursor-pointer rounded-[30%_/_200%] px-4 py-2 bg-lime-400 text-gray-800 font-semibold transition-all duration-300 ease-out shadow-[0_0_0px_1px_rgba(0,0,0,0.2),0px_1px_1px_rgba(3,7,18,0.02),0px_5px_4px_rgba(3,7,18,0.04),0px_12px_9px_rgba(3,7,18,0.06),0px_20px_15px_rgba(3,7,18,0.08),0px_32px_24px_rgba(3,7,18,0.1)] hover:shadow-[0.1em_0.15em_0.05em_0_inset_rgba(5,5,5,0.75),-0.025em_-0.03em_0.05em_0.025em_inset_rgba(5,5,5,0.5),0.25em_0.25em_0.2em_0_inset_rgba(5,5,5,0.5)] hover:scale-[0.975] active:scale-[0.975] hover:text-neutral-700"
          >
            { status === 'authenticated' ?"Go to App" : "Get Started"}
          </button>

          {/* Animated Button */}
          <div 
            onClick={()=>setAutoplay(true)}
            className="relative group cursor-pointer flex justify-center items-center w-auto h-auto p-4  transition-all duration-300 ease-in-out hover:bg-lime-400/30 select-none"
          >
            {/* Animated Lines */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-0 transform rotate-[5deg] scale-x-0 origin-top-left transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 group-hover:rotate-0 group-hover:delay-[280ms]" style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 2px, #999 2px 4px)'}} />
            <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-gray-500 to-transparent opacity-0 transform rotate-[5deg] scale-y-0 origin-top-right transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-100 group-hover:rotate-0 group-hover:delay-[490ms]" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 2px, #999 2px 4px)'}} />
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-l from-transparent via-gray-500 to-transparent opacity-0 transform rotate-[5deg] scale-x-0 origin-bottom-right transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-x-100 group-hover:rotate-0 group-hover:delay-[700ms]" style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent 0 2px, #999 2px 4px)'}} />
            <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-transparent via-gray-500 to-transparent opacity-0 transform scale-y-0 origin-bottom-left transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-y-100 group-hover:delay-[840ms]" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 2px, #999 2px 4px)'}} />
            
            {/* Animated Dots */}
            <div className="absolute w-[6px] h-[6px] rounded-full bg-gray-600 opacity-0 top-1/2 left-[20%] transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:top-[-3px] group-hover:left-[-3px] group-hover:delay-0" />
            <div className="absolute w-[6px] h-[6px] rounded-full bg-gray-600 opacity-0 top-1/2 right-[20%] transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:top-[-3px] group-hover:right-[-3px] group-hover:delay-[210ms]" />
            <div className="absolute w-[6px] h-[6px] rounded-full bg-gray-600 opacity-0 bottom-1/2 right-[20%] transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:bottom-[-3px] group-hover:right-[-3px] group-hover:delay-[420ms]" />
            <div className="absolute w-[6px] h-[6px] rounded-full bg-gray-600 opacity-0 bottom-1/2 left-[20%] transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:bottom-[-3px] group-hover:left-[-3px] group-hover:delay-[630ms]" />
            
            {/* Main Button */}
            <button className="relative shadow-[0_0_0px_1px_rgba(0,0,0,0.2),0px_1px_1px_rgba(3,7,18,0.02),0px_5px_4px_rgba(3,7,18,0.04),0px_12px_9px_rgba(3,7,18,0.06),0px_20px_15px_rgba(3,7,18,0.08),0px_32px_24px_rgba(3,7,18,0.1)] hover:shadow-[0.1em_0.15em_0.05em_0_inset_rgba(5,5,5,0.75),-0.025em_-0.03em_0.05em_0.025em_inset_rgba(5,5,5,0.5),0.25em_0.25em_0.2em_0_inset_rgba(5,5,5,0.5)]  flex justify-center items-center px-5 py-3 bg-lime-400 border-none text-gray-800 font-semibold text-base capitalize rounded-[30%_/_200%] cursor-pointer  transition-all duration-200 ease-in-out hover:bg-white hover:scale-105 hover:rounded-[10%_/_200%] active:bg-lime-400 active:scale-98 active:rounded-[20%_/_200%]">
              <span className="btn-text">See How it Works</span>
              <svg className="ml-2 h-6 w-6 stroke-1 stroke-gray-700 fill-yellow-400/60 transition-all duration-300 ease-in-out group-hover:stroke-gray-800 group-hover:fill-lime-400 group-active:stroke-gray-900 group-active:fill-lime-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.6744 11.4075L15.7691 17.1233C15.7072 17.309 15.5586 17.4529 15.3709 17.5087L3.69348 20.9803C3.22819 21.1186 2.79978 20.676 2.95328 20.2155L6.74467 8.84131C6.79981 8.67588 6.92419 8.54263 7.08543 8.47624L12.472 6.25822C12.696 6.166 12.9535 6.21749 13.1248 6.38876L17.5294 10.7935C17.6901 10.9542 17.7463 11.1919 17.6744 11.4075Z" />
                <path d="M3.2959 20.6016L9.65986 14.2376" />
                <path d="M17.7917 11.0557L20.6202 8.22724C21.4012 7.44619 21.4012 6.17986 20.6202 5.39881L18.4989 3.27749C17.7178 2.49645 16.4515 2.49645 15.6704 3.27749L12.842 6.10592" />
                <path d="M11.7814 12.1163C11.1956 11.5305 10.2458 11.5305 9.66004 12.1163C9.07426 12.7021 9.07426 13.6519 9.66004 14.2376C10.2458 14.8234 11.1956 14.8234 11.7814 14.2376C12.3671 13.6519 12.3671 12.7021 11.7814 12.1163Z" />
              </svg>
            </button>
          </div>
        </div>

      
        <div className="max-w-4xl mx-auto  px-4  py-10 ">
          <div className="aspect-w-16 aspect-h-9 border-8 border-green-500 rounded-xl overflow-hidden shadow-xl ">
            <iframe
              src={videoUrl}
              title="Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              allowTransparency
              
              className="w-full h-96"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Firstimpression;
