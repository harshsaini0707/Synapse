"use client";

import { FloatingDockDemo } from "@/components/Floatingdock/Floatingdock";
import { useFetchChapters } from "@/hooks/fetchChapater";
import YouTube, { YouTubeProps } from "react-youtube";
import { Clock } from "lucide-react";
import React, { use, useEffect, useRef } from "react";
import { useVideoStore } from "@/store/videoStore";

type Chapters = {
  created_at: string;
  description: string;
  id: string;
  timestamp: string;
  title: string;
  updated_at: string | null;
  video_id: string;
};

export default function VideoPage({ params }: { params: Promise<{ id: string }> }) {
  // unwrap params
  const { id } = use(params);

  const setVideoId = useVideoStore((state) => state.setVideoId);

  useEffect(() => {
    setVideoId(id);
  }, [id, setVideoId]);

  const { isLoading, isError, data } = useFetchChapters(id);

  if (isLoading) console.log("load ho raha hai!!");

  const playerRef = useRef<any>(null);

  // Convert timestamp string "hh:mm:ss" or "mm:ss" to seconds
  const timeToSeconds = (time: string) => {
    if (!time) return 0;
    const parts = time.split(":").map(Number);
    let seconds = 0;
    if (parts.length === 3) {
      seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else if (parts.length === 2) {
      seconds = parts[0] * 60 + parts[1];
    }
    return seconds;
  };

  // Options for YouTube player
  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "288",
    playerVars: {
      autoplay: 0,
    },
  };

  const onCardClick = (timestamp: string) => {
    if (playerRef.current && timestamp) {
      const seconds = timeToSeconds(timestamp);
      playerRef.current.internalPlayer.seekTo(seconds, true);
      playerRef.current.internalPlayer.playVideo();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full bg-[#09090B] text-white border border-gray-800">
      {/* Left: Video + Transcript */}
      <div className="w-full lg:w-[45%] flex-1 pt-4 px-4 overflow-y-auto">
        {/* YouTube Embed */}
        <YouTube videoId={id} opts={opts} ref={playerRef} />

        {/* Highlights Section */}
        <div className="my-2 border border-gray-800 bg-[#18181A] rounded-md">
          <div className="flex m-0.5 p-0.5 rounded-sm items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_42%,#04170bb5,#000000)]">
            <Clock size={12} />
            <span className="text-sm">
              Highlights {data ? `(${data?.length})` : " "}
            </span>
          </div>
        </div>

        <div className="flex max-h-[42vh] scrollable-container overflow-y-auto flex-col gap-1 border rounded-sm border-gray-800 bg-[radial-gradient(circle_at_0%_0%,#04170b9c,#000000)]">
          {data?.map((item: Chapters, index: number) => (
            <div
              key={item.id}
              onClick={() => onCardClick(item.timestamp)}
              className="flex gap-1 flex-col cursor-pointer border border-gray-900 p-4 m-2 rounded-md"
            >
              <div className="flex gap-2 cursor-pointer items-center">
                <h1 className="border border-gray-800 bg-gray-800 py-1 px-2 font-bold rounded-sm text-sm">
                  {index + 1}.
                </h1>
                {item?.timestamp ? (
                  <h1 className="border border-gray-800 bg-gray-800 py-1 px-2 rounded-sm text-sm">
                    {item?.timestamp}
                  </h1>
                ) : (
                  <h1 className="poppins-bold mt-1 text-md">{item?.title}</h1>
                )}
              </div>
              {item?.timestamp && (
                <div>
                  <h1 className="poppins-bold">{item?.title}</h1>
                </div>
              )}
              <div>
                <h1 className="text-gray-400 poppins-regular text-sm">
                  {item?.description}
                </h1>

                {item?.timestamp && (
                  <h1 className="flex items-center text-gray-400 mt-3">
                    <span className="flex-grow border-t border-gray-700"></span>
                    <span className="px-2 text-sm font-mono bg-transparent">
                      Play this part
                    </span>
                    <span className="flex-grow border-t border-gray-700"></span>
                  </h1>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Features */}
      <div className="w-full lg:w-[55%] h-full flex pt-2 flex-col">
        <FloatingDockDemo />
      </div>
    </div>
  );
}
