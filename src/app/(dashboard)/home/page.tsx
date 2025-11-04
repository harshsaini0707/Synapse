"use client"

import { HoverBorderGradientDemo } from '@/components/AIButton/Button';
import React, { useState } from 'react';
import { Link as LinkIcon, Send ,History  } from 'lucide-react';
import { CardHoverEffectDemo } from '@/components/HistoryCards/Historycars';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import axios from 'axios';

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
  //console.log(error);
  return null;
}
} 

const Home = () => {
  const router = useRouter();
  const [link , setLink ] =  useState("")
 // const [videoId ,  setVideoId] = useState("")

   const [loading, setLoading] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const user = useUserStore((state) => state.user);

  const checkUserAccess = async () => {
    try {
      if (!user?.id) {
        alert("Please login to continue");
        return false;
      }

      const response = await axios.get('/api/user/access-status', {
        headers: {
          'x-user-id': user.id,
        },
      });

      const accessData = response.data;
      
      // If user CAN create video, allow them to proceed
      if (accessData.canCreateVideo) {
        return true;
      }
      
      // If user CANNOT create video, show premium modal
      setShowPremiumModal(true);
      return false;
      
    } catch (error) {
      console.error('Error checking user access:', error);
      alert('Error checking access. Please try again.');
      return false;
    }
  };

  const handleExtract = async () => {
    const id = getVideoIdFromUrl(link);
    
    if (!id) {
      alert("Please enter a valid YouTube URL");
      return;
    }

    setLoading(true);
    
    // Check user access before proceeding
    const canProceed = await checkUserAccess();

    if (canProceed) {
    //  console.log(id);
      router.push(`/video/${id}`);
    }
    
    setLoading(false);
  };
  return (
    <div className="min-h-screen w-full relative">
      {/* Emerald Void Background */}
      <div className="absolute inset-0 z-0 emerald-void-bg" />

{/* ----------------MAIN CODE START--------- */}
      {/* Main Content */}
      <div className="flex flex-col min-h-screen relative z-10 px-8 md:px-16 pt-10 pb-12 gap-12 items-center">
        {/* Info & Search Section */}
        <div className="flex flex-col mt-8 gap-6 text-center max-w-2xl">
          <HoverBorderGradientDemo />

          <h1 className="text-gray-200 alan-sans-font text-xl md:text-5xl">
           Learn Smarter with Synapse
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
    onKeyDown={(e) => {
      if (e.key === 'Enter' && link.trim() !== '' && !loading) {
        handleExtract();
      }
    }}
    placeholder="Paste YouTube link here and start learning..."
    className="flex-1 bg-transparent outline-none text-blue-400 px-2 "
  />
  <button
     type='button'
     title='query'
    disabled={link.trim() === '' || loading}
    onClick={handleExtract}
    className={`p-2 rounded-md transition-all duration-400 ${
      link.trim() === '' || loading
        ? 'bg-transparent text-white cursor-not-allowed'
        : 'bg-gray-300 text-black hover:bg-gray-400 hover:cursor-pointer active:scale-95'
    }`}
  >
    {loading ? (
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
    ) : (
      <Send className="w-5 h-5" />
    )}
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

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-sm">
          <div className="relative bg-white/10 backdrop-blur-md border border-lime-400/50 rounded-2xl p-6 max-w-lg mx-4 text-center shadow-2xl ring-2 ring-lime-400/30">
            {/* Badge */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                PREMIUM ONLY
              </div>
            </div>

            <div className="mb-4 mt-3">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-lime-400 to-lime-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-lime-400/25">
                <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-lime-400 mb-3 poppins-bold">
                Unlock Premium Power
              </h2>
              
              <p className="text-gray-300 text-base mb-4 leading-relaxed poppins-regular">
                Get premium access to unlock all features and start transforming YouTube videos into interactive learning experiences.
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

              {/* Special Offer */}
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="animate-pulse">🔥</span>
                  <span className="text-red-400 font-bold text-sm">Limited Time Offer</span>
                  <span className="animate-pulse">🔥</span>
                </div>
                <p className="text-gray-300 text-xs">
                  Get yearly plan and save 30% - Only $7/month!
                </p>
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
                onClick={() => setShowPremiumModal(false)}
                className="w-full bg-white/10 cursor-pointer hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40"
              >
                Maybe Later
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex justify-center items-center gap-4 text-gray-400 text-xs mt-3">
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Money Back</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-lime-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* -----------------------MAIN CODE END------------------ */}

    </div>
  );
};

export default Home;
