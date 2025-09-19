import { Brain, NotebookTabs } from 'lucide-react'
import React, { useState } from 'react'
import { LoaderThreeDemo } from '../Loadertunder/Loadertunder'
import { useVideoStore } from '@/store/videoStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useUserStore } from '@/store/userStore'

type SummaryType = "quick" | "detailed";

const Summary = () => {
  const [summary, setSummary] = useState('');
  const [currentSummaryType, setCurrentSummaryType] = useState<SummaryType | ''>('');
  const [viewMode, setViewMode] = useState<SummaryType>('quick'); // 'quick' or 'detailed'
  
  const videoId = useVideoStore((state) => state.videoId);
  const userId = useUserStore((state) => state.user?.id);
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
    setViewMode(mode);
    
    if (mode === 'quick' && !cachedQuickSummary && currentSummaryType !== 'quick') {
      summaryMutation.mutate('quick');
    } else if (mode === 'detailed' && !cachedDetailedSummary && currentSummaryType !== 'detailed') {
      summaryMutation.mutate('detailed');
    }
  };

  return (
    // ONLY CHANGE: Replace min-h-screen with h-full
    <div className="flex flex-col justify-center items-center gap-8 h-full p-4 overflow-y-auto">
      
      {/* Initial state */}
      {!hasData && !summaryMutation.isPending && (
        <>
          <div className="relative mt-32 flex items-center justify-center">
            <span className="absolute h-36 w-36 rounded-full bg-gray-600 opacity-30 animate-ping"></span>
            <span className="absolute h-28 w-28 rounded-full bg-gray-800 animate-ping opacity-50"></span>
            <Brain className="relative h-20 w-20 text-white" />
          </div>
          
          <div className="flex flex-col justify-center items-center gap-8">
            <div className="poppins-bold text-xl text-gray-300">
              Generate summary according to your time and need...
            </div>
            <div className="flex flex-row gap-5">
              <button 
                onClick={() => summaryMutation.mutate('quick')}
                disabled={summaryMutation.isPending}
                className="hover:scale-105 duration-200 text-black border border-gray-600 bg-white/95 px-4 py-3 flex items-center gap-2 rounded-2xl"
              >
                <LoaderThreeDemo />
                <h1 className='font-mono'>Quick Summary</h1>
              </button>
              <button
                onClick={() => summaryMutation.mutate('detailed')}
                disabled={summaryMutation.isPending}
                className="hover:scale-105 duration-200 text-black border border-gray-600 bg-white/95 px-4 py-3 flex items-center gap-2 rounded-2xl"
              >
                <NotebookTabs className="animate-bounce text-gray-900" />
                <h1 className='font-mono'>Detailed Summary</h1>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Loader */}
      {summaryMutation.isPending && (
        <div className="flex flex-col justify-center items-center gap-8">
          <div className="relative flex items-center justify-center">
            <span className="absolute h-24 w-24 rounded-full bg-gray-600 opacity-30 animate-ping"></span>
            <span className="absolute h-16 w-16 rounded-full bg-gray-800 animate-ping opacity-50"></span>
            <Brain className="relative h-12 w-12 text-white animate-pulse" />
          </div>
          <div className="poppins-bold text-lg text-gray-300">
            Data is coming...
          </div>
        </div>
      )}

      {/* Data */}
      {hasData && !summaryMutation.isPending && (
        <div className="w-full max-w-4xl">
          {/* Top right buttons */}
          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={() => handleViewModeChange('quick')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 ${
                viewMode === 'quick'
                  ? 'bg-white/95 text-black border border-gray-600'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
              }`}
            >
              Quick
            </button>
            <button
              onClick={() => handleViewModeChange('detailed')}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 ${
                viewMode === 'detailed'
                  ? 'bg-white/95 text-black border border-gray-600'
                  : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'
              }`}
            >
              Detailed
            </button>
          </div>

          {/* Summary content */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              {viewMode === 'quick' ? (
                <LoaderThreeDemo />
              ) : (
                <NotebookTabs className="text-gray-300" />
              )}
              <h2 className="text-xl font-mono text-gray-300 capitalize">
                {viewMode} Summary
              </h2>
            </div>
            
            <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
              {getCurrentSummary() || (
                <div className="text-gray-500 italic">
                  {viewMode === 'quick' && !cachedQuickSummary && "Click 'Quick' to load quick summary"}
                  {viewMode === 'detailed' && !cachedDetailedSummary && "Click 'Detailed' to load detailed summary"}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
