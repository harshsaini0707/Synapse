import { create } from "zustand";
import { persist } from "zustand/middleware";

type VideoStore = {
  videoId: string | null;
  setVideoId: (id: string) => void;
  clearVideoId: () => void;
};

export const useVideoStore = create<VideoStore>()(
  persist(
    (set) => ({
      videoId: null,

      setVideoId: (id) => set({ videoId: id }),

      clearVideoId: () => set({ videoId: null }),
    }),
    {
      name: "video-storage", 
    }
  )
);
