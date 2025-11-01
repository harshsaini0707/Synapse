'use client'

import { cn } from "@/lib/utils";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Import images
import quizImage from "/public/images/Quiz.png";
import flashcardImage from "/public/images/Flashcards.png";
import summaryImage from "/public/images/Summary.png";
import highlightsImage from "/public/images/Highlights.png";
import chatImage from "/public/images/Chat.png";

export function BentoFeatures() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleCardClick = () => {
    if (session) {
      router.push('/home');
    } else {
      router.push('/signin');
    }
  };

  const features = [
     {
      title: "Smart Highlights",
      description: "Key moments and important concepts are automatically highlighted for quick review and easy navigation.",
      image: highlightsImage,
      buttonText: "Start Creating"
    },
    {
      title: "Interactive Quizzes",
      description: "Test your knowledge with AI-generated quizzes from any YouTube video. Track your progress and identify learning gaps.",
      image: quizImage,
      buttonText: "Start Creating"
    },
     {
      title: "AI-Powered Chat",
      description: "Ask questions about the video content and get instant, context-aware answers powered by advanced AI.",
      image: chatImage,
      buttonText: "Start Asking"
    },
    {
      title: "Smart Flashcards",
      description: "Automatically generated flashcards help you memorize key concepts effectively with spaced repetition with proper hint and answer.",
      image: flashcardImage,
      buttonText: "Start Creating"
    },
    {
      title: "Comprehensive Summaries",
      description: "Get detailed and quick summaries of video content in seconds, highlighting key points and main takeaways.",
      image: summaryImage,
      buttonText: "Start Creating"
    },
   
  ];

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-neutral-100 py-12 px-4">
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
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl quicksand-bold text-gray-900">
              Packed with Powerful Features
            </h2>
            <p className="text-md md:text-lg quicksand-medium text-gray-800 max-w-2xl mt-1">
             Learn smarter with Youtube — create quizzes, flashcards, summaries, highlights and chat your way to mastery
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
              onClick={handleCardClick}
              className={cn(
                "group relative overflow-hidden rounded-3xl bg-neutral-100 cursor-pointer",
                "border border-gray-300 shadow-lg hover:shadow-2xl",
                "transition-all duration-500 ease-out",
                "hover:-translate-y-2 hover:border-green-400",
                "flex flex-col"
              )}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl bg-neutral-200 flex items-center justify-center p-4">
                <div className="relative w-full h-full shadow-xl rounded-lg">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 bg-neutral-100 flex-1 flex flex-col">
                <h3 className="text-xl md:text-2xl quicksand-bold text-gray-900 mb-3 group-hover:text-green-500 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-700 quicksand-medium text-sm leading-relaxed mb-4 flex-1">
                  {feature.description}
                </p>
                
                {/* Button */}
                <div className="flex items-center gap-2 text-green-500 quicksand-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  <span>{feature.buttonText}</span>
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
            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-lime-50 to-green-50 rounded-full border border-lime-200/50">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-100" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse animation-delay-200" />
              </div>
              <span className="text-lime-700 quicksand-semibold">
                More features coming soon
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}