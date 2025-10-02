"use client"
import React, { useState } from "react";
import { FlipWords } from "../ui/flip-words";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    <div className="relative w-full min-h-screen bg-[radial-gradient(circle_at_49%_51%,#48a45b9c_10%,#87cc29f0)]">
      {/* ✅ make background cover ALL content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#ededed_1px,transparent_1px)] bg-[size:33px_33px]" />

      <div className="relative container mx-auto px-4 pt-32 text-center">
        <h1 className="alan-sans-font text-gray-950 text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          Learn Beyond the Play Button
        </h1>

        <p className="alan-sans-font text-2xl  text-gray-950 md:text-3xl lg:text-4xl font-semibold mb-6">
          with <FlipWords words={words} />
        </p>

        <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-800 dark:text-gray-200 italic mb-12">
          Stop watching, start mastering. Transform videos into interactive
          lessons with AI tutors, flashcards, quizzes, and collaborative study
          spaces , web based interactive learning and much more.
        </p>

       


        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button
          onClick={status === 'authenticated' ?()=> router.push("/home") :()=> router.push("/signin")  }
          className="bg-gradient-to-r from-green-600 via-lime-500 to-green-600 bg-[length:200%_auto] hover:bg-right-center text-neutral-50 hover:scale-98 hover:cursor-pointer hover:text-gray-950  font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-200">
            { status === 'authenticated' ?"Go to App" : "Get Started"}
          </button>

          <button
          onClick={()=>setAutoplay(true)}
          className="px-6 hover:cursor-pointer py-3 bg-transparent border-2 border-green-700 text-green-800 hover:border-black rounded-md font-semibold hover:text-black transition-all duration-300">
            See How it Works
          </button>
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
