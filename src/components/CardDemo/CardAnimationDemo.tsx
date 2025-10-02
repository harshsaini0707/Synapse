"use client";

import React, { useState, useEffect } from 'react';
import { HoverEffect } from '../ui/card-hover-effect';
import { motion } from 'motion/react';
import { RotateCcw, Play, Pause } from 'lucide-react';

// Demo data for showcasing the card animations
const demoData = [
  {
    created_at: "2024-01-15T10:00:00Z",
    duration: "15:30",
    embedding_done: true,
    id: "demo-1",
    thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    title: "Introduction to Machine Learning - Complete Beginner's Guide",
    transcript: "Welcome to machine learning...",
    updated_at: Date.now(),
    user_id: "demo-user",
    video_id: "demo-video-1",
  },
  {
    created_at: "2024-01-14T15:20:00Z",
    duration: "22:45",
    embedding_done: true,
    id: "demo-2",
    thumbnail: "https://i.ytimg.com/vi/LDU_Txk06tM/maxresdefault.jpg",
    title: "Advanced React Patterns and Best Practices for 2024",
    transcript: "In this comprehensive tutorial...",
    updated_at: Date.now(),
    user_id: "demo-user",
    video_id: "demo-video-2",
  },
  {
    created_at: "2024-01-13T09:15:00Z",
    duration: "18:12",
    embedding_done: true,
    id: "demo-3",
    thumbnail: "https://i.ytimg.com/vi/heyNOyuAI4o/maxresdefault.jpg",
    title: "Data Structures and Algorithms: A Visual Approach",
    transcript: "Let's explore data structures...",
    updated_at: Date.now(),
    user_id: "demo-user",
    video_id: "demo-video-3",
  },
  {
    created_at: "2024-01-12T14:30:00Z",
    duration: "25:18",
    embedding_done: true,
    id: "demo-4",
    thumbnail: "https://i.ytimg.com/vi/9bZkp7q19f0/maxresdefault.jpg",
    title: "Building Scalable Web Applications with Next.js",
    transcript: "Next.js is a powerful framework...",
    updated_at: Date.now(),
    user_id: "demo-user",
    video_id: "demo-video-4",
  },
];

type DemoState = 'loading' | 'empty' | 'loaded';

export function CardAnimationDemo() {
  const [currentState, setCurrentState] = useState<DemoState>('loading');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const stateSequence: DemoState[] = ['loading', 'empty', 'loaded'];
    const currentIndex = stateSequence.indexOf(currentState);
    
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % stateSequence.length;
      setCurrentState(stateSequence[nextIndex]);
    }, 3000); // 3 seconds per state

    return () => clearTimeout(timer);
  }, [currentState, isAutoPlaying]);

  const handleStateChange = (state: DemoState) => {
    setCurrentState(state);
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const getStateProps = () => {
    switch (currentState) {
      case 'loading':
        return { items: undefined, isLoading: true };
      case 'empty':
        return { items: [], isLoading: false };
      case 'loaded':
        return { items: demoData, isLoading: false };
      default:
        return { items: undefined, isLoading: true };
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Demo Controls */}
      <div className="mb-8 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">Card Animation Demo</h3>
            <motion.div
              animate={{ rotate: isAutoPlaying ? 360 : 0 }}
              transition={{ duration: 2, repeat: isAutoPlaying ? Infinity : 0, ease: "linear" }}
            >
              <RotateCcw className="w-4 h-4 text-gray-400" />
            </motion.div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* State Buttons */}
            <div className="flex gap-2">
              {(['loading', 'empty', 'loaded'] as const).map((state) => (
                <button
                  key={state}
                  onClick={() => handleStateChange(state)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    currentState === state
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {state.charAt(0).toUpperCase() + state.slice(1)}
                </button>
              ))}
            </div>

            {/* Auto-play Toggle */}
            <button
              onClick={toggleAutoPlay}
              className="flex items-center gap-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded transition-colors"
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
              Auto
            </button>
          </div>
        </div>
        
        {/* State Description */}
        <div className="mt-3 text-sm text-gray-400">
          <strong>Current State:</strong> 
          <span className="ml-2">
            {currentState === 'loading' && 'Loading skeleton cards with shimmer animations'}
            {currentState === 'empty' && 'Empty state with call-to-action animation'}
            {currentState === 'loaded' && 'Data loaded with staggered card entrance animations'}
          </span>
        </div>
      </div>

      {/* Demo Cards */}
      <div className="min-h-[400px]">
        <HoverEffect {...getStateProps()} />
      </div>
    </div>
  );
}