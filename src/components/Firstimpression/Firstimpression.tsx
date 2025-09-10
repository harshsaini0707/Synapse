import React from "react";
import { FlipWords } from "../ui/flip-words";
import { AnimatedTooltip } from "../ui/animated-tooltip";

const Firstimpression = () => {
  const words = [
    "Flashcards",
    "Study Group",
    "Chatbot",
    "AI Tutor",
    "Interactive Web Learning",
    "Quizzes",
    "AI Agents",
  ];

  const people = [
    {
      id: 1,
      name: "John Doe",
      designation: "Software Engineer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=3387&q=80",
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 5,
      name: "99",
      designation: "",
      image: "",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[radial-gradient(circle_at_49%_51%,#48a45b9c_10%,#87cc29f0)]">
      {/* ✅ make background cover ALL content */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,#ededed_1px,transparent_1px)] bg-[size:33px_33px]" />

      <div className="relative container mx-auto px-4 pt-32 text-center">
        <h1 className="kanit text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Learn Beyond the Play Button
        </h1>

        <p className="kanit text-2xl md:text-3xl lg:text-4xl font-semibold mb-6">
          with <FlipWords words={words} />
        </p>

        <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-800 dark:text-gray-200 italic mb-12">
          Stop watching, start mastering. Transform videos into interactive
          lessons with AI tutors, flashcards, quizzes, and collaborative study
          spaces , web based interactive learning and much more.
        </p>

       


        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button className="bg-gradient-to-r from-green-600 via-lime-500 to-green-600 bg-[length:200%_auto] hover:bg-right-center text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all duration-500">
            Go to App
          </button>

          <button className="px-6 py-3 bg-transparent border-2 border-green-700 text-green-800 rounded-md font-semibold hover:text-black transition">
            See How it Works
          </button>
        </div>

      
        <div className="max-w-4xl mx-auto  px-4  py-10 ">
          <div className="aspect-w-16 aspect-h-9 border-8 border-green-500 rounded-xl overflow-hidden shadow-xl ">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              allowTransparency
              
              className="w-full h-96"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Firstimpression;
