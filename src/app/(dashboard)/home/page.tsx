import { HoverBorderGradientDemo } from '@/components/AIButton/Button';
import React from 'react';
import { Link as LinkIcon, Send } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen w-full relative">
      {/* Emerald Void Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "radial-gradient(125% 125% at 70% 90%, #000000 40%, #072607 100%)",
        }}
      />

{/* ----------------MAIN CODE START--------- */}
      {/* Main Content */}
      <div className="flex flex-col h-screen relative z-10 px-8 md:px-16 py-12 gap-12 justify-center items-center">
        {/* Info & Search Section */}
        <div className="flex flex-col mt-10 gap-6 text-center max-w-2xl">
          <HoverBorderGradientDemo />

          <h1 className="text-gray-200 poppins-bold text-3xl md:text-5xl">
            Experience Synapse AI Tutor
          </h1>

          <p className="text-gray-500 poppins-regular text-lg md:text-xl">
            Transform any YouTube video into smart, interactive learning experiences <br />
            that wire knowledge straight to your synapses.
          </p>

          <div className="flex items-center gap-3 bg-black border-1 border-gray-700 rounded-lg py-3 px-4 shadow-md w-full md:w-auto">
            <LinkIcon className="text-gray-400 w-6 h-6" />
            <input
              type="text"
              placeholder="Paste YouTube link here and start learning..."
              className="flex-1 bg-transparent outline-none text-gray-300 px-2"
            />
            <Send className="text-gray-400 w-6 h-6 cursor-pointer" />
          </div>
        </div>

        {/* Placeholder for recent videos or components */}
        <div className="flex-1 w-full mt-12">
          {/* Add recent videos or other components here */}
        </div>
      </div>

      {/* -----------------------MAIN CODE END------------------ */}

    </div>
  );
};

export default Home;
