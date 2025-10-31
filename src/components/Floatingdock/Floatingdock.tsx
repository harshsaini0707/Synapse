"use client";

import { IconHome, IconNewSection, IconTerminal2 } from "@tabler/icons-react";
import { FloatingDock } from "../ui/floating-dock";
import { useState } from "react";
import Chat from "../Chat/Chat";
import Summary from "../Summary/Summary";
import Quiz from "../Quiz/Quiz";
import Flashcard from "../Flashcard/Flashcard";
import { IdCardLanyard } from "lucide-react";

export function FloatingDockDemo() {
  const [activeTab, setActiveTab] = useState("Chat");

  const links = [
    {
      title: "Summary",
      icon: <IconHome className={`h-full w-full quicksand-medium  ${activeTab === "Summary" ? "text-black text-bold poppins-extrabold bg-lime-400 p-0.5  rounded-sm " : "text-neutral-400 dark:text-neutral-300"}`} />,
      href: "#",
    },
    {
      title: "Chat",
      icon: <IconTerminal2 className={`h-full w-full quicksand-medium ${activeTab === "Chat" ? "text-black text-bold poppins-extrabold bg-lime-400 p-0.5  rounded-sm" : "text-neutral-400 dark:text-neutral-300"}`} />,
      href: "#",
    },
    {
      title: "Quiz",
      icon: <IconNewSection className={`h-full w-full quicksand-medium ${activeTab === "Quiz" ? "text-black text-bold poppins-extrabold  bg-lime-400 p-0.5  rounded-sm" : "text-neutral-400 dark:text-neutral-300"}`} />,
      href: "#",
    },
    {
      title: "Flashcards",
      icon:<IdCardLanyard className={`h-full w-full quicksand-medium ${activeTab === "Flashcards" ? "text-black text-boldpoppins-extrabold  bg-lime-400 p-0.5  rounded-sm" : "text-neutral-400 dark:text-neutral-300"}`} />,
      href: "#",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Floating Dock - Fixed at top */}
      <div className="flex-shrink-0 px-4">
        <FloatingDock
          items={links.map((link) => ({
            ...link,
            onClick: () => setActiveTab(link.title),
          }))}
        />
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-[#08090A]">
        {activeTab === "Summary" && <Summary />}
        {activeTab === "Chat" && <Chat />}
        {activeTab === "Quiz" && <Quiz />}
        {activeTab === "Flashcards" && <Flashcard/>}
      </div>
    </div>
  );
}
