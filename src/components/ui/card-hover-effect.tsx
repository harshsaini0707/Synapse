"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Video, Sparkles } from "lucide-react";

// Skeleton Card Component
const SkeletonCard = ({ index }: { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group block h-full w-full border-2 border-gray-800 rounded-md overflow-hidden bg-gray-900/40"
    >
      {/* Animated skeleton thumbnail */}
      <div className="relative w-full h-38 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Video className="w-8 h-8 text-gray-600" />
        </div>
      </div>

      {/* Skeleton title */}
      <div className="py-3 px-2 bg-black">
        <div className="space-y-2 mt-4">
          <motion.div 
            className="h-3 bg-gray-700 rounded animate-pulse"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div 
            className="h-3 bg-gray-700 rounded w-3/4 animate-pulse"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// Empty State Card Component
const EmptyStateCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="col-span-full flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      <motion.div
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative mb-6"
      >
        <div className="relative">
          <Video className="w-16 h-16 text-gray-600" />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              delay: 0.5
            }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-6 h-6 text-yellow-400" />
          </motion.div>
        </div>
      </motion.div>

      <motion.h3 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-semibold text-gray-300 mb-2"
      >
        No videos yet
      </motion.h3>
      
      <motion.p 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-500 max-w-md"
      >
        Start your learning journey by uploading your first video. Transform any content into interactive study materials!
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <Link 
          href="/home"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          Get Started
        </Link>
      </motion.div>
    </motion.div>
  );
};

export const HoverEffect = ({
  items,
  isLoading = false,
  className,
}: {
  items?: {
    created_at: string;
    duration: string;
    embedding_done: boolean;
    id: string;
    thumbnail: string;
    title: string;
    transcript: string;
    updated_at: number;
    user_id: string;
    video_id: string;
  }[];
  isLoading?: boolean;
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

  // Loading state - show skeleton cards
  if (isLoading) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10",
          className
        )}
      >
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} index={index} />
        ))}
      </div>
    );
  }

  // Empty state - no data
  if (!items || items.length === 0) {
    return (
      <div className={cn("grid grid-cols-1 gap-6 py-10", className)}>
        <EmptyStateCard />
      </div>
    );
  }

  // Normal state - render cards
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10",
        className
      )}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Link
            href={`/video/${item.video_id}`}
            className="relative group block h-full w-full border-2 border-gray-900 rounded-md overflow-hidden hover:scale-105 hover:border-gray-800 transition-transform duration-200 shadow-md"
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === item.id && (
                <motion.span
                  className="absolute inset-0 h-full w-full block rounded-sm bg-zinc-800/20"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.15 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
                />
              )}
            </AnimatePresence>

            {/* Thumbnail */}
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={330}
              height={200}
              className="object-cover w-full h-38 rounded-t-sm"
            />

            {/* Title */}
            <div className="py-3 px-2 bg-black text-center">
              <h4 className="text-zinc-100 kanit tracking-wide mt-4 line-clamp-2">
                {item.title}
              </h4>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};
