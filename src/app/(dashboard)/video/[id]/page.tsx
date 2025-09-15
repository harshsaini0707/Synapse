"use client";

import { FloatingDockDemo } from "@/components/Floatingdock/Floatingdock";
import { Clock } from "lucide-react";
import React, { use } from "react";

export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  // unwrap params using React.use()
  const { id } = use(params);
const transcript = [
  {
    id: 1,
    time: "00:00",
    title: "Introduction",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius reprehenderit dignissimos nisi deserunt hic id accusantium laudantium. Voluptate, placeat sapiente?",
  },
  {
    id: 2,
    time: "03:00",
    title: "What is AGI?",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius reprehenderit dignissimos nisi deserunt hic id accusantium laudantium. Voluptate, placeat sapiente?",
  },
  {
    id: 3,
    time: "06:15",
    title: "History of AI",
    description: "This section covers the history of artificial intelligence, from its origins in the 1950s to modern developments in machine learning and deep learning.",
  },
  {
    id: 4,
    time: "09:40",
    title: "Current AI Capabilities",
    description: "An overview of what AI can do today, including natural language processing, computer vision, robotics, and other key areas of AI applications.",
  },
  {
    id: 5,
    time: "13:20",
    title: "Challenges in AI",
    description: "Discussing the main challenges AI faces, such as ethical concerns, bias in algorithms, energy consumption, and limitations of current AI models.",
  },
  {
    id: 6,
    time: "17:05",
    title: "Future of AGI",
    description: "Speculation and predictions about artificial general intelligence, its potential impact on society, economy, and how we can prepare for it.",
  },
  {
    id: 7,
    time: "21:30",
    title: "Conclusion",
    description: "Summary of key points discussed, reinforcing the main takeaways about AI, AGI, and their implications for the future.",
  }
];


  const ytlink = `https://www.youtube.com/embed/${id}`;

  return (
    <div className="flex min-h-screen fixed bg-[#09090B] text-white border border-gray-800">
      {/* Left: Video + Transcript */}
      <div className="w-[45%] flex-1 pt-4 px-4 ">
        {/* YouTube Embed */}
        <div className="w-full">
          <iframe
            src={ytlink}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            frameBorder={0}
            className="w-full h-72 rounded-lg shadow-lg"
          ></iframe>
        </div>
    

        {/* Highlights Section */}
        <div className=" my-2 border-1 border-gray-800 bg-[#18181A] rounded-md">
          <div className="flex m-0.5 p-0.5 rounded-sm items-center  justify-center gap-2 max-fit-full  bg-[radial-gradient(circle_at_50%_42%,#04170bb5,#000000)]  ">
            <Clock size={12} /> <span className="text-sm">{`Highlights (${transcript.length})`} </span>
          </div>
        </div>
        <div className="flex max-h-[42vh] overflow-y-scroll flex-col gap-1 border-1 rounded-sm border-gray-800 bg-[radial-gradient(circle_at_0%_0%,#04170b9c,#000000)] " 
             style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>

          {
            transcript?.map((item)=>(
              <div key={item.id} className="flex gap-1 flex-col border-1 border-gray-900 p-4 m-2 rounded-md">
                <div className="flex gap-2 cursor-pointer">
                  <h1 className="border-1 border-gray-800  bg-gray-800  p-1 rounded-sm text-sm ">{item.id}.</h1>
                  <h1 className="border-1 border-gray-800  bg-gray-800  p-1 rounded-sm text-sm">{item.time}</h1>
                </div>
                  <div>
                  
                  <h1 className="poppins-bold">{item.title}</h1>
                </div>
                <div>
                  <h1 className="text-gray-400">{item.description}</h1>
                </div>


              </div>
            ))
          }

        </div>
      </div>

      {/* Right: Features */}
     <div className="w-[55%] flex pt-2 flex-col ">
  <FloatingDockDemo />  {/* occupies top 20% */}
  <div>
    
  </div>
</div>

    </div>
  );
}
