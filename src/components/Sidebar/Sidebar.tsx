"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";

import Image from "next/image";
import { useUserStore } from "@/store/userStore";

export function SidebarDemo() {

  const user = useUserStore((state) => state.user)
  const [open, setOpen] = useState(false);

  const links = [
    { label: "Home", href: "/home", icon: <IconBrandTabler className="h-5 w-5 shrink-0" /> },
    { label: "Profile", href: "/history", icon: <IconUserBolt className="h-5 w-5 shrink-0" /> },
    { label: "Settings", href: "/settings", icon: <IconSettings className="h-5 w-5 shrink-0" /> },
    { label: "Logout", href: "/logout", icon: <IconArrowLeft className="h-5 w-5 shrink-0" /> },
  ];

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 rounded-xl">
        {/* Top part */}
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>

        {/* User profile */}
        <div>
          <SidebarLink
            link={{
              label: `${user?.name || " "}`,
              href: "#",
              icon: (
                <Image
                  src={user?.image || "/default-avatar.png"}
                  alt="Avatar"
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

// Logos
export const Logo = () => (
  <a href="#" className="flex items-center space-x-2 py-1 text-sm font-normal">
    <div className="h-5 w-6 shrink-0 rounded bg-black dark:bg-white" />
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="poppins-medium text-black dark:text-white"
    >
      Synapse
    </motion.span>
  </a>
);

export const LogoIcon = () => (
  <a href="#" className="flex items-center space-x-2 py-1 text-sm font-normal">
    <div className="h-5 w-6 shrink-0 rounded bg-black dark:bg-white" />
  </a>
);
