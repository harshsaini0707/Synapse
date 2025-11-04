"use client";

import { FloatingDockDemo } from "@/components/Floatingdock/Floatingdock";
import { useFetchChapters } from "@/hooks/fetchChapater";
import YouTube, { YouTubeProps } from "react-youtube";
import { Clock, ChevronDown, ChevronUp } from "lucide-react";
import React, { use, useEffect, useRef, useState } from "react";
import { useVideoStore } from "@/store/videoStore";
import { useRouter } from "next/navigation";

type Chapters = {
  created_at: string;
  description: string;
  id: string;
  timestamp: string;
  title: string;
  updated_at: string | null;
  video_id: string;
};

export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  // unwrap params
  const { id } = use(params);

  const setVideoId = useVideoStore((state) => state.setVideoId);
  const router = useRouter();
  
  // State for controlling highlight visibility
  const [showHighlights, setShowHighlights] = useState(true);
  
  // State for responsive layout
  const [isDesktopLayout, setIsDesktopLayout] = useState(false);
  
  // State for premium modal
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopLayout(window.innerWidth >= 950);
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setVideoId(id);
  }, [id, setVideoId]);

  const { isLoading, isError, data, error } = useFetchChapters(id);

  // Check if error is a 403 (premium required)
  useEffect(() => {
    if (isError && error) {
      const axiosError = error as any;
      if (axiosError?.response?.status === 403) {
        setShowPremiumModal(true);
      }
    }
  }, [isError, error]);

  //if (isLoading) console.log("load ho raha hai!!");

  const playerRef = useRef<any>(null);

  // Convert timestamp string "hh:mm:ss" or "mm:ss" to seconds
  const timeToSeconds = (time: string) => {
    if (!time) return 0;
    const parts = time.split(":").map(Number);
    let seconds = 0;
    if (parts.length === 3) {
      seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      seconds = parts[0] * 60 + parts[1];
    }
    return seconds;
  };

  // Options for YouTube player
  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "288",
    playerVars: {
      autoplay: 0,
      origin: typeof window !== 'undefined' ? window.location.origin : 'https://synapse-eight-psi.vercel.app',
      enablejsapi: 1,
    },
  };

  const onCardClick = (timestamp: string) => {
    if (playerRef.current && timestamp) {
      const seconds = timeToSeconds(timestamp);
      playerRef.current.internalPlayer.seekTo(seconds, true);
      playerRef.current.internalPlayer.playVideo();
    }
  };

  return (
    <div className={`flex h-full bg-[#09090B] text-white border border-gray-800 ${
      isDesktopLayout ? 'flex-row' : 'flex-col'
    }`}>
      {/* Left: Video + Transcript */}
      <div className={`flex-1 pt-2 px-3${
        isDesktopLayout ? 'w-[45%]' : 'w-full'
      }`}>
        {/* YouTube Embed */}
        <YouTube videoId={id} opts={opts} ref={playerRef} />

        {/* Highlights Section */}
        <div className="my-2 border border-gray-800 bg-[#18181A] rounded-md">
          <div 
            className="flex m-0.5 p-0.5 rounded-sm items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_42%,#04170bb5,#000000)] cursor-pointer relative"
            onClick={() => setShowHighlights(!showHighlights)}
          >
            <Clock size={12} />
            <span className="text-sm">
              {isLoading ? (
                <span className="flex items-center gap-2">
                  Highlights
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce animation-delay-100"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce animation-delay-200"></div>
                  </div>
                </span>
              ) : (
                `Highlights ${data ? `(${data?.length})` : " "}`
              )}
            </span>
            <div className="absolute right-2">
              {showHighlights ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </div>

        {showHighlights && (
           <div className="flex max-h-[42vh] scrollable-container overflow-y-auto flex-col gap-1 border rounded-sm border-gray-800 bg-[radial-gradient(circle_at_0%_0%,#04170b9c,#000000)]">
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="flex gap-1 flex-col border border-gray-900 p-4 m-2 rounded-md animate-pulse"
                >
                  <div className="flex gap-2 items-center">
                    <div className="border border-gray-800 bg-gray-700 py-1 px-2 rounded-sm">
                      <div className="w-4 h-4 bg-gray-600 rounded"></div>
                    </div>
                    <div className="border border-gray-800 bg-gray-700 py-1 px-2 rounded-sm">
                      <div className="w-12 h-4 bg-gray-600 rounded"></div>
                    </div>
                  </div>
                  <div>
                    <div className="w-3/4 h-5 bg-gray-700 rounded mb-2"></div>
                  </div>
                  <div>
                    <div className="w-full h-3 bg-gray-800 rounded mb-1"></div>
                    <div className="w-5/6 h-3 bg-gray-800 rounded mb-1"></div>
                    <div className="w-4/5 h-3 bg-gray-800 rounded"></div>
                    
                    <div className="flex items-center text-gray-400 mt-3">
                      <span className="flex-grow border-t border-gray-700"></span>
                      <span className="px-2 text-sm font-mono bg-transparent">
                        <div className="w-20 h-3 bg-gray-700 rounded"></div>
                      </span>
                      <span className="flex-grow border-t border-gray-700"></span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              data?.map((item: Chapters, index: number) => (
                <div
                  key={item.id}
                  onClick={() => onCardClick(item.timestamp)}
                  className="flex gap-1 flex-col cursor-pointer border border-gray-900 p-4 mx-2 my-1 rounded-md hover:border-gray-700 transition-colors duration-200"
                >
                  <div className="flex gap-2 cursor-pointer items-center">
                    <h1 className="border border-gray-800 bg-gray-800 py-1 px-2 font-bold rounded-sm text-sm">
                      {index + 1}.
                    </h1>
                    {item?.timestamp ? (
                      <h1 className="border border-gray-800 bg-gray-800 py-1 px-2 rounded-sm text-sm">
                        {item?.timestamp}
                      </h1>
                    ) : (
                      <h1 className="poppins-bold mt-1 text-md">{item?.title}</h1>
                    )}
                  </div>
                  {item?.timestamp && (
                    <div>
                      <h1 className="poppins-bold">{item?.title}</h1>
                    </div>
                  )}
                  <div>
                    <h1 className="text-gray-400 poppins-regular text-sm">
                      {item?.description}
                    </h1>

                    {item?.timestamp && (
                      <h1 className="flex items-center text-gray-400 mt-3">
                        <span className="flex-grow border-t border-gray-700"></span>
                        <span className="px-2 text-sm font-mono bg-transparent">
                          Play this part
                        </span>
                        <span className="flex-grow border-t border-gray-700"></span>
                      </h1>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Right: Features */}
      <div className={`h-full flex pt-1 flex-col ${
        isDesktopLayout ? 'w-[55%]' : 'w-full'
      }`}>
        <FloatingDockDemo />
      </div>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
          <div className="relative bg-white/10 backdrop-blur-md border border-lime-400/50 rounded-2xl p-6 max-w-lg mx-4 text-center shadow-2xl ring-2 ring-lime-400/30">
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                PREMIUM REQUIRED
              </div>
            </div>

            <div className="mb-4 mt-3">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-lime-400/25">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-lime-400 mb-3">
                Unlock Premium Power
              </h2>
              
              <p className="text-gray-300 text-base mb-4 leading-relaxed">
                You&apos;ve used your free trial! Upgrade to premium for unlimited access to all features.
              </p>
              
              {/* Premium Benefits */}
              <div className="bg-lime-500/10 border border-lime-500/20 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <h3 className="text-lime-400 font-bold text-base">Premium Features</h3>
                </div>
                <div className="grid grid-cols-1 gap-1 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-lime-400">✓</span>
                    <span>Unlimited Video Summaries</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-lime-400">✓</span>
                    <span>Advanced AI Chat & Analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-lime-400">✓</span>
                    <span>Smart Flashcard Generation</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-lime-400">✓</span>
                    <span>Interactive Quiz Creation</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="text-lime-400">✓</span>
                    <span>Priority Support & Updates</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setShowPremiumModal(false);
                  router.push('/premium');
                }}
                className="w-full bg-lime-400 hover:bg-lime-300 cursor-pointer text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-lime-400/25 transform hover:scale-102"
              >
                Upgrade to Premium
              </button>
              <button
                onClick={() => {
                  setShowPremiumModal(false);
                  router.push('/home');
                }}
                className="w-full bg-white/10 cursor-pointer hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Go Back Home
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
