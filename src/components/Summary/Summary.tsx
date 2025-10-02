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
                      prose-headings:text-white prose-headings:font-semibold prose-headings:mb-4
                      prose-h1:text-2xl prose-h1:mb-6 prose-h2:text-xl prose-h2:mb-5 prose-h3:text-lg prose-h3:mb-4
                      prose-p:text-gray-200 prose-p:leading-relaxed prose-p:mb-4
                      prose-strong:text-white prose-strong:font-semibold
                      prose-em:text-gray-300 prose-em:italic
                      prose-ul:text-gray-200 prose-ul:mb-4 prose-ol:text-gray-200 prose-ol:mb-4
                      prose-li:text-gray-200 prose-li:marker:text-gray-400 prose-li:mb-2
                      prose-blockquote:border-l-gray-600 prose-blockquote:text-gray-300 prose-blockquote:mb-4
                      prose-code:text-green-400 prose-code:bg-gray-800 prose-code:px-1 prose-code:rounded
                      prose-pre:bg-gray-800 prose-pre:border prose-pre:border-gray-700 prose-pre:mb-4
                      prose-a:text-blue-400 prose-a:hover:text-blue-300">
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
