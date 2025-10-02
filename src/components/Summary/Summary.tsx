import { Brain, NotebookTabs } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { LoaderThreeDemo } from '../Loadertunder/Loadertunder'
import { useVideoStore } from '@/store/videoStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useUserStore } from '@/store/userStore'


type SummaryType = "quick" | "detailed";

const Summary = () => {
  const [summary, setSummary] = useState('');
  const [currentSummaryType, setCurrentSummaryType] = useState<SummaryType | ''>('');
  const [viewMode, setViewMode] = useState<SummaryType>(); 
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isToggling, setIsToggling] = useState(false);
  
  const videoId = useVideoStore((state) => state.videoId);
  const userId = useUserStore((state) => state.user?.id);
  const userName = useUserStore((state)=>state.user?.name)
  const queryClient = useQueryClient();
  
  const cachedQuickSummary = queryClient.getQueryData<{ summary: string }>(["summary", videoId, "quick"]);
  const cachedDetailedSummary = queryClient.getQueryData<{ summary: string }>(["summary", videoId, "detailed"]);
  
  const summaryMutation = useMutation({
    mutationFn: async (summaryType: SummaryType) => {
      const response = await axios.post(`/api/summary`, {
        videoId,
        summaryType
      }, {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
        },
      });
      setSummary(response.data.summary);
      setCurrentSummaryType(summaryType);
      return response.data as { summary: string };
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["summary", videoId, variables], data);
    }
  });

  const rotatingMessages = [
    `${userName?.split(" ")?.[0] || "Learner"}, analyzing your video content…`,
    `${userName?.split(" ")?.[0] || "Learner"}, extracting key insights…`,
    `${userName?.split(" ")?.[0] || "Learner"}, processing educational content…`,
    `${userName?.split(" ")?.[0] || "Learner"}, generating personalized summary…`,
    `${userName?.split(" ")?.[0] || "Learner"}, finalizing your learning material…`,
    `${userName?.split(" ")?.[0] || "Learner"}, almost ready! 🚀`,
  ];

  // Rotating messages effect
  useEffect(() => {
    if (summaryMutation.isPending) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prevIndex) => 
          (prevIndex + 1) % rotatingMessages.length
        );
      }, 5000); 
      return () => clearInterval(interval);
    }
  }, [summaryMutation.isPending, rotatingMessages.length]);

  // Reset message index when loading starts
  useEffect(() => {
    if (summaryMutation.isPending) {
      setCurrentMessageIndex(0);
    }
  }, [summaryMutation.isPending]);

  // Check if we have any data to show
  const hasData = summary || cachedQuickSummary || cachedDetailedSummary;
  
  // Get the current summary to display based on view mode
  const getCurrentSummary = () => {
    if (viewMode === 'quick') {
      return cachedQuickSummary?.summary || (currentSummaryType === 'quick' ? summary : '');
    } else {
      return cachedDetailedSummary?.summary || (currentSummaryType === 'detailed' ? summary : '');
    }
  };

  // Handle view mode change
  const handleViewModeChange = (mode: SummaryType) => {
    setIsToggling(true);
    
    // Add delay for smooth transition
    setTimeout(() => {
      setViewMode(mode);
      
      if (mode === 'quick' && !cachedQuickSummary && currentSummaryType !== 'quick') {
        summaryMutation.mutate('quick');
      } else if (mode === 'detailed' && !cachedDetailedSummary && currentSummaryType !== 'detailed') {
        summaryMutation.mutate('detailed');
      }
      
      // Reset toggling state
      setTimeout(() => setIsToggling(false), 300);
    }, 150);
  };

  return (
    <div className="relative h-full flex flex-col bg-[#09090B]">
      {/* Scrollable Content Container */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden chat-scrollable">
        <div className="p-4 space-y-6">
          
          {/* Initial state */}
          {!hasData && !summaryMutation.isPending && (
            <div className="flex flex-col justify-center mt-4 items-center gap-20 min-h-[60vh]">
              <div className="relative flex items-center justify-center">
                <span className="absolute h-36 w-36 rounded-full bg-gray-600 opacity-30 animate-ping"></span>
                <span className="absolute h-28 w-28 rounded-full bg-gray-800 animate-ping opacity-50"></span>
                <Brain className="relative h-20 w-20 text-white" />
              </div>
              
              <div className="flex flex-col justify-center items-center gap-6 text-center">
                <div className="font-serif text-xl text-gray-300">
                  Generate summary according to your time and need...
                </div>
                
                {/* Enhanced Generate Buttons */}
                <div className="flex flex-row gap-6">
                  <button 
                    onClick={() => {
                      summaryMutation.mutate('quick');
                    setCurrentSummaryType("quick")
                    }}
                    disabled={summaryMutation.isPending}
                    className="group hover:scale-105 duration-300 text-black border border-gray-600 bg-white/95 px-4 py-2 flex items-center gap-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:shadow-xl transition-all"
                  >
                    <div className="">
                      <LoaderThreeDemo />
                    </div>
                    <h1 className='font-mono font-semibold'>Quick Summary</h1>
                  </button>
                  <button
                    onClick={() =>{
                       summaryMutation.mutate('detailed');
                       setCurrentSummaryType("detailed")
                    }}
                    disabled={summaryMutation.isPending}
                    className="group hover:scale-105 duration-300 text-black border border-gray-600 bg-white/95 px-4 py-2 flex items-center gap-3 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:shadow-xl transition-all"
                  >
                    <NotebookTabs className="group-hover:animate-bounce text-gray-900" />
                    <h1 className='font-mono font-semibold'>Detailed Summary</h1>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loader */}
          {summaryMutation.isPending && (
            <div className="flex flex-col justify-center items-center gap-24 min-h-[60vh]">
              <div className="relative flex items-center justify-center">
                <span className="absolute h-32 w-32 rounded-full bg-green-600/20 animate-ping"></span>
                <span className="absolute h-24 w-24 rounded-full bg-green-500/30 animate-ping animation-delay-500"></span>
                <span className="absolute h-16 w-16 rounded-full bg-green-400/40 animate-ping animation-delay-1000"></span>
                <Brain className="relative h-12 w-12 text-green-400 animate-pulse" />
              </div>
              
              <div className="text-center space-y-4">
                <div className="poppins-bold text-lg text-gray-300 animate-fade-in">
                  Generating {summaryMutation.variables} summary...
                </div>
                
                {/* Rotating Messages */}
                <div className="h-8 flex items-center justify-center">
                  <div 
                    key={currentMessageIndex}
                    className="text-md font-mono text-green-400 animate-pulse transition-all duration-500"
                  >
                    {rotatingMessages[currentMessageIndex]}
                  </div>
                </div>
                
                {/* Progress Dots */}
                <div className="flex justify-center space-x-2 mt-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        i === currentMessageIndex % 6 
                          ? 'bg-green-400 scale-125' 
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Summary Content */}
          {hasData && (
            <div className={`w-full max-w-4xl mx-auto transition-all duration-300 ${
              isToggling ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
            }`}>
              <div className="bg-transparent border border-gray-700 rounded-2xl p-6 transition-all duration-300 hover:border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`transition-all duration-300 ${isToggling ? 'rotate-12' : 'rotate-0'}`}>
                      {viewMode === 'quick' ? (
                        <LoaderThreeDemo />
                      ) : (
                        <NotebookTabs className="text-gray-300" />
                      )}
                    </div>
                    <h2 className="text-xl font-mono text-gray-300 capitalize">
                      {viewMode} Summary
                    </h2>
                  </div>
                  
                  {/* Toggle Buttons with Animation */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewModeChange('quick')}
                      disabled={isToggling}
                      className={`px-3 py-2 rounded-lg text-sm font-mono transition-all duration-300 transform hover:scale-105 ${
                        viewMode === 'quick'
                          ? 'bg-white/95 text-black border border-gray-600 shadow-lg'
                          : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                      } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Quick
                    </button>
                    <button
                      onClick={() => handleViewModeChange('detailed')}
                      disabled={isToggling}
                      className={`px-3 py-2 rounded-lg text-sm font-mono transition-all duration-300 transform hover:scale-105 ${
                        viewMode === 'detailed'
                          ? 'bg-white/95 text-black border border-gray-600 shadow-lg'
                          : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
                      } ${isToggling ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Detailed
                    </button>
                  </div>
                </div>
                
                <div className={`text-gray-200 leading-relaxed transition-all duration-500 ${
                  isToggling ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
                }`}>
                  <div className="prose prose-invert prose-gray max-w-none
                      prose-headings:text-white prose-headings:font-bold prose-headings:mb-4 prose-headings:quicksand-bold
                      prose-h1:text-3xl prose-h1:mb-6 prose-h1:font-bold prose-h1:text-white prose-h1:border-b prose-h1:border-gray-600 prose-h1:pb-2
                      prose-h2:text-2xl prose-h2:mb-5 prose-h2:font-bold prose-h2:text-white
                      prose-h3:text-xl prose-h3:mb-4 prose-h3:font-bold prose-h3:text-white
                      prose-h4:text-lg prose-h4:mb-3 prose-h4:font-bold prose-h4:text-white
                      prose-h5:text-base prose-h5:mb-3 prose-h5:font-semibold prose-h5:text-white
                      prose-h6:text-sm prose-h6:mb-2 prose-h6:font-semibold prose-h6:text-gray-200
                      prose-p:text-neutral-200 prose-p:leading-relaxed prose-p:mb-4 prose-p:quicksand-regular
                      prose-strong:text-white prose-strong:font-bold prose-strong:quicksand-bold
                      prose-em:text-gray-300 prose-em:italic prose-em:quicksand-medium
                      prose-ul:text-neutral-200 prose-ul:mb-4 prose-ol:text-neutral-200 prose-ol:mb-4
                      prose-li:text-neutral-200 prose-li:marker:text-gray-400 prose-li:mb-2 prose-li:quicksand-regular
                      prose-blockquote:border-l-4 prose-blockquote:border-gray-500 prose-blockquote:text-gray-300 prose-blockquote:mb-4 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-gray-800/30 prose-blockquote:py-3 prose-blockquote:rounded-r-lg
                      prose-code:text-green-400 prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:border prose-code:border-gray-700
                      prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-700 prose-pre:mb-4 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                      prose-a:text-blue-400 prose-a:hover:text-blue-300 prose-a:underline prose-a:underline-offset-4 prose-a:decoration-2
                      prose-hr:border-gray-600 prose-hr:my-6 prose-hr:border-2
                      prose-table:text-neutral-200 prose-table:border prose-table:border-gray-600 prose-table:rounded-lg prose-table:overflow-hidden
                      prose-thead:bg-gray-800 prose-thead:border-gray-500 prose-th:text-white prose-th:font-bold prose-th:p-3 prose-th:border-gray-600
                      prose-tbody:bg-gray-900/30 prose-td:border-gray-600 prose-td:text-neutral-200 prose-td:p-3
                      prose-img:rounded-xl prose-img:shadow-lg prose-img:border prose-img:border-gray-700 prose-img:my-4
                      prose-video:rounded-xl prose-video:shadow-lg prose-video:border prose-video:border-gray-700 prose-video:my-4
                      prose-figure:text-center prose-figure:my-6 prose-figcaption:text-gray-400 prose-figcaption:text-sm prose-figcaption:mt-3 prose-figcaption:italic
                      prose-kbd:bg-gray-800 prose-kbd:text-gray-200 prose-kbd:px-2 prose-kbd:py-1 prose-kbd:rounded prose-kbd:text-xs prose-kbd:font-mono prose-kbd:border prose-kbd:border-gray-600
                      prose-mark:bg-yellow-500/20 prose-mark:text-yellow-200 prose-mark:px-1 prose-mark:rounded
                      prose-del:text-red-400 prose-del:line-through prose-ins:text-green-400 prose-ins:underline prose-ins:decoration-green-400">
                    <ReactMarkdown>
                      {getCurrentSummary()}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summary;
