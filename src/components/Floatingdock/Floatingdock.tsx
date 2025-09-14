import { IconHome, IconNewSection, IconTerminal2 } from "@tabler/icons-react";
import { FloatingDock } from "../ui/floating-dock";

export function FloatingDockDemo() {
  const links = [
    { title: "Summary", icon: <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#" },
    { title: "Chat", icon: <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#" },
    { title: "Quiz", icon: <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#" },
    { title: "Flashcards", icon: <img src="https://assets.aceternity.com/logo-dark.png" width={20} height={20} alt="Logo" />, href: "#" },
  ];

  return (
  
      <div className="flex  items-center justify-center">
        <FloatingDock items={links}  />
      </div>
     
    
  );
}
