"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion"; // ✅ correct import
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
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
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null); // ✅ fixed type
console.log(items);

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10",
        className
      )}
    >
      {items?.map((item) => (
        <Link
          href={`/video/${item.video_id}`} // ✅ sends ID to learn page
          key={item.id}
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
          <div className="py-3 px-2  bg-black text-center">
            <h4 className="text-zinc-100 kanit tracking-wide mt-4 line-clamp-2">
              {item.title}
            </h4>
          </div>
        </Link>
      ))}
    </div>
  );
};
