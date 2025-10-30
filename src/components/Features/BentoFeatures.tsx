'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";

// Import images
import quizImage from "/public/images/Quiz.png";
import flashcardImage from "/public/images/Flashcards.png";
import summaryImage from "/public/images/Summary.png";
import highlightsImage from "/public/images/Highlights.png";
import chatImage from "/public/images/Chat.png";

export function BentoFeatures() {
  const features = [
    {
      category: "PROGRESSION",
      title: "Interactive Quizzes",
      description: "Test your knowledge with AI-generated quizzes from any YouTube video. Track your progress and identify learning gaps.",
      image: quizImage,
      gradient: "from-emerald-500 to-green-600",
      statLabel: "Questions Generated",
      statValue: "10,000+",
      statChange: "+25%",
      statChangeType: "increase"
    },
    {
      category: "PROGRESSION",
      title: "Smart Flashcards",
      description: "Automatically generated flashcards help you memorize key concepts effectively with spaced repetition.",
      image: flashcardImage,
      gradient: "from-teal-500 to-emerald-600",
      statLabel: "Cards Created",
      statValue: "15,000+",
      statChange: "+18%",
      statChangeType: "increase"
    },
    {
      category: "MANAGEMENT",
      title: "AI-Powered Chat",
      description: "Ask questions about the video content and get instant, context-aware answers powered by advanced AI.",
      image: chatImage,
      gradient: "from-green-500 to-teal-600",
      statLabel: "Conversations",
      statValue: "8,500+",
      statChange: "+32%",
      statChangeType: "increase"
    },
    {
      category: "PROGRESSION",
      title: "Comprehensive Summaries",
      description: "Get detailed summaries of video content in seconds, highlighting key points and main takeaways.",
      image: summaryImage,
      gradient: "from-lime-500 to-green-600",
      statLabel: "Summaries Generated",
      statValue: "12,000+",
      statChange: "+22%",
      statChangeType: "increase"
    },
    {
      category: "MANAGEMENT",
      title: "Smart Highlights",
      description: "Key moments and important concepts are automatically highlighted for quick review and easy navigation.",
      image: highlightsImage,
      gradient: "from-emerald-600 to-teal-700",
      statLabel: "Highlights Marked",
      statValue: "20,000+",
      statChange: "+28%",
      statChangeType: "increase"
    },
  ];

  return (
    <div className="w-full bg-gradient-to-b from-white to-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-green-600 quicksand-semibold text-sm uppercase tracking-wider">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl quicksand-bold text-gray-900">
              Transform Your Learning
            </h2>
            <p className="text-lg md:text-xl quicksand-medium text-gray-600 max-w-3xl mt-2">
              Discover powerful features designed to enhance your learning experience
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={cn(
                "group relative overflow-hidden rounded-3xl bg-white",
                "border border-gray-200 shadow-lg hover:shadow-2xl",
                "transition-all duration-500 ease-out",
                "hover:-translate-y-2"
              )}
            >
              {/* Category Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className={cn(
                  "inline-block px-4 py-1.5 rounded-full text-xs quicksand-semibold uppercase tracking-wider",
                  "bg-white/90 backdrop-blur-sm",
                  feature.category === "PROGRESSION" 
                    ? "text-emerald-700 border border-emerald-200" 
                    : "text-teal-700 border border-teal-200"
                )}>
                  {feature.category}
                </span>
              </div>

              {/* Image Section with Gradient Overlay */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Gradient overlay */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-t opacity-60",
                  feature.gradient,
                  "mix-blend-multiply"
                )} />
                
                {/* Stats overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white/80 text-sm quicksand-medium mb-1">
                          {feature.statLabel}
                        </p>
                        <p className="text-white text-3xl quicksand-bold">
                          {feature.statValue}
                        </p>
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 px-3 py-1.5 rounded-full",
                        feature.statChangeType === "increase" 
                          ? "bg-green-500/20 border border-green-400/30" 
                          : "bg-red-500/20 border border-red-400/30"
                      )}>
                        <svg 
                          className={cn(
                            "w-4 h-4",
                            feature.statChangeType === "increase" ? "text-green-400" : "text-red-400"
                          )} 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d={feature.statChangeType === "increase" 
                              ? "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
                              : "M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                            } 
                          />
                        </svg>
                        <span className={cn(
                          "text-sm quicksand-semibold",
                          feature.statChangeType === "increase" ? "text-green-400" : "text-red-400"
                        )}>
                          {feature.statChange}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl quicksand-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 quicksand-medium text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Learn More Link */}
                <div className="flex items-center gap-2 text-green-600 quicksand-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  <span>Learn more</span>
                  <svg 
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Decorative gradient border on hover */}
              <div className={cn(
                "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                "bg-gradient-to-br pointer-events-none",
                feature.gradient,
                "p-[2px]"
              )}>
                <div className="w-full h-full bg-white rounded-3xl" />
              </div>
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
          <div className="inline-flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200/50">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse animation-delay-100" />
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse animation-delay-200" />
              </div>
              <span className="text-green-700 quicksand-semibold">
                More features coming soon
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}