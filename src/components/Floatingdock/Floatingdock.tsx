"use client";

import { IconHome, IconNewSection, IconTerminal2 } from "@tabler/icons-react";
import { FloatingDock } from "../ui/floating-dock";
import { useState } from "react";
import Chat from "../Chat/Chat";
import Summary from "../Summary/Summary";
import Quiz from "../Quiz/Quiz";

export function FloatingDockDemo() {
  const [activeTab, setActiveTab] = useState("Chat");

  const links = [
    {
      title: "Summary",
      icon: <IconHome className={`h-full w-full ${activeTab === "Summary" ? "text-white poppins-extrabold bg-green-500 p-0.5  rounded-sm " : "text-neutral-500 dark:text-neutral-300"}`} />,
      href: "#",
    },
    {
      title: "Chat",
      icon: <IconTerminal2 className={`h-full w-full ${activeTab === "Chat" ? "text-white poppins-extrabold bg-green-500 p-0.5  rounded-sm" : "text-neutral-500 dark:text-neutral-300"}`} />,
      href: "#",
    },
    {
      title: "Quiz",
      icon: <IconNewSection className={`h-full w-full ${activeTab === "Quiz" ? "text-white poppins-extrabold  bg-green-500 p-0.5  rounded-sm" : "text-neutral-500 dark:text-neutral-300"}`} />,
      href: "#",
    },
    {
      title: "Flashcards",
      icon: (
        <img
          src="https://assets.aceternity.com/logo-dark.png"
          width={20}
          height={20}
          alt="Logo"
          className={`${activeTab === "Flashcards" ? "filter brightness-150 poppins-extrabold  bg-green-500 p-0.5  rounded-sm" : ""}`}
        />
      ),
      href: "#",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <FloatingDock
        items={links.map((link) => ({
          ...link,
          onClick: () => setActiveTab(link.title),
        }))}
      />

      {/* ONLY CHANGE: Added h-full to container */}
      <div className="
        w-full bg-[#08090A] h-full
        min-h-[40vh] md:min-h-[85vh]
      ">
        {activeTab === "Summary" && <Summary />}
        {activeTab === "Chat" && <Chat />}
        {activeTab === "Quiz" && <Quiz />}
        {activeTab === "Flashcards" && (
          <div className="text-white p-4">🃏 Flashcards Component here</div>
        )}
      </div>
    </div>
  );
}
