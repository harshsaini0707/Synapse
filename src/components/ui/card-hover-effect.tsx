"use client"
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    id: string;
    title: string;
    image: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10 ",
        className
      )}
    >
      {items.map((item, idx) => (
        <Link
          href={`/learn/${item.id}`} // <-- sends ID to learn page
          key={item.id}
          className="relative group block h-full w-full border-2 shadow-7xl border-gray-900 rounded-md overflow-hidden hover:scale-102 hover:border-gray-800 transition-transform duration-220"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full  block rounded-sm"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>

          {/* Thumbnail */}
          <Image
            src={item.image}
            alt={item.title}
            width={330}
            height={200}
            className="object-cover w-fit h-38 rounded-t-sm"
          />

          {/* Title */}
          <div className="p-4 bg-black text-center">
           <h4 className="text-zinc-100 poppins-medium tracking-wide mt-4 line-clamp-2">
  {item?.title}
</h4>
          </div>
        </Link>
      ))}
    </div>
  );
};
