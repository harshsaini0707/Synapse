'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

// Import images
import quizImage from "/public/images/Screenshot 2025-10-11 095838.png";
import flashcardImage from "/public/images/Screenshot 2025-10-11 100019.png";
import summaryImage from "/public/images/Screenshot 2025-10-11 100114.png";
import highlightsImage from "/public/images/Screenshot 2025-10-11 100143.png";
import chatImage from "/public/images/Screenshot 2025-10-11 100206.png";

export function BentoFeatures() {
  const features = [
    {
      title: "Interactive Quizzes",
      description: "Test your knowledge with AI-generated quizzes from any YouTube video. Track your progress and identify learning gaps.",
      image: quizImage, // Quiz screenshot
      className: "md:col-span-2 md:row-span-2",
      gradient: "from-green-50 to-emerald-100",
      accentColor: "text-green-600",
      borderColor: "border-green-200/50 hover:border-green-400/80"
    },
    {
      title: "Smart Flashcards",
      description: "Automatically generated flashcards help you memorize key concepts effectively.",
      image: flashcardImage, // Flashcard screenshot
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-emerald-50 to-green-100",
      accentColor: "text-emerald-600",
      borderColor: "border-emerald-200/50 hover:border-emerald-400/80"
    },
    {
      title: "AI Summaries",
      description: "Get comprehensive summaries of video content in seconds.",
      image: summaryImage, // Summary screenshot
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-lime-50 to-green-100",
      accentColor: "text-lime-600",
      borderColor: "border-lime-200/50 hover:border-lime-400/80"
    },
    {
      title: "Smart Highlights",
      description: "Key moments and important concepts are automatically highlighted for quick review.",
      image: highlightsImage, // Highlights screenshot
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-teal-50 to-emerald-100",
      accentColor: "text-teal-600",
      borderColor: "border-teal-200/50 hover:border-teal-400/80"
    },
    {
      title: "Chat with Content",
      description: "Ask questions about the video content and get instant, context-aware answers.",
      image: chatImage, // Chat screenshot
      className: "md:col-span-1 md:row-span-1",
      gradient: "from-cyan-50 to-teal-100",
      accentColor: "text-cyan-600",
      borderColor: "border-cyan-200/50 hover:border-cyan-400/80"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-4"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl quicksand-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Packed with powerful features
          </h2>
          <p className="text-lg md:text-xl quicksand-medium text-gray-600 max-w-3xl">
            Learn smarter with YouTube — create quizzes, flashcards, summaries, highlights, and chat your way to mastery
          </p>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px] md:auto-rows-[250px]">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={cn(
              "group relative overflow-hidden rounded-2xl cursor-pointer",
              "bg-white/90 backdrop-blur-sm border shadow-lg",
              "hover:shadow-xl transition-all duration-500 ease-out",
              "transform hover:scale-[1.02] hover:-translate-y-1",
              feature.className,
              feature.borderColor
            )}
          >
            {/* Background Gradient */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-br opacity-30 group-hover:opacity-50 transition-opacity duration-500",
              feature.gradient
            )} />
            
            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-0 rounded-2xl border-2 border-green-400 opacity-75 animate-pulse" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Image Section - Takes up most of the card */}
              <div className="relative overflow-hidden rounded-t-2xl h-4/5">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover object-center w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating icon indicator */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                  <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                </div>
              </div>

              {/* Text Content - Compact bottom section */}
              <div className="p-4 bg-white/95 backdrop-blur-sm h-1/5 flex flex-col justify-center">
                <h3 className={cn(
                  "text-lg md:text-xl quicksand-bold mb-1 transition-colors duration-300",
                  "group-hover:" + feature.accentColor,
                  "text-gray-800"
                )}>
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs md:text-sm quicksand-medium leading-relaxed line-clamp-2">
                  {feature.description}
                </p>
                
                {/* Animated arrow */}
                <div className="mt-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2">
                  <span className={cn("text-xs quicksand-semibold", feature.accentColor)}>
                    Explore
                  </span>
                  <svg className={cn("w-3 h-3", feature.accentColor)} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Hover particles */}
            <div className="absolute top-4 left-4 w-2 h-2 bg-green-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 animation-delay-100" />
            <div className="absolute bottom-20 right-8 w-1.5 h-1.5 bg-emerald-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 animation-delay-200" />
            <div className="absolute top-1/3 left-8 w-1 h-1 bg-lime-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-300 animation-delay-500" />
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border border-green-200/50">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-green-700 quicksand-semibold">
            And many more features coming soon!
          </span>
        </div>
      </motion.div>
    </div>
  );
}