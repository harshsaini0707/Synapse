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
      gradient: "from-emerald-600 to-teal-700",
      buttonText: "Start Creating"
    },
    {
      title: "Interactive Quizzes",
      description: "Test your knowledge with AI-generated quizzes from any YouTube video. Track your progress and identify learning gaps.",
      image: quizImage,
      gradient: "from-emerald-500 to-green-600",
      buttonText: "Start Creating"
    },
     {
      title: "AI-Powered Chat",
      description: "Ask questions about the video content and get instant, context-aware answers powered by advanced AI.",
      image: chatImage,
      gradient: "from-green-500 to-teal-600",
      buttonText: "Start Asking"
    },
    {
      title: "Smart Flashcards",
      description: "Automatically generated flashcards help you memorize key concepts effectively with spaced repetition with proper hint and answer.",
      image: flashcardImage,
      gradient: "from-teal-500 to-emerald-600",
      buttonText: "Start Creating"
    },
    {
      title: "Comprehensive Summaries",
      description: "Get detailed and quick summaries of video content in seconds, highlighting key points and main takeaways.",
      image: summaryImage,
      gradient: "from-lime-500 to-green-600",
      buttonText: "Start Creating"
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
              onClick={handleCardClick}
              className={cn(
                "group relative overflow-hidden rounded-3xl bg-white cursor-pointer",
                "border border-gray-200 shadow-lg hover:shadow-2xl",
                "transition-all duration-500 ease-out",
                "hover:-translate-y-2"
              )}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl quicksand-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 quicksand-medium text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>
                
                {/* Button */}
                <div className="flex items-center gap-2 text-green-600 quicksand-semibold text-sm group-hover:gap-3 transition-all duration-300">
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