"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink, useSidebar } from "../ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconCreditCard 
} from "@tabler/icons-react";

import { motion } from "motion/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useUserStore } from "@/store/userStore";
import LogoImage from "../../../public/logos/logo2.png"

export function SidebarDemo() {

  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
  
    clearUser();
    
    await signOut({ 
      callbackUrl: "/",
      redirect: true 
    });
  };

  const links = [
    { label: "Home", href: "/home", icon: <IconBrandTabler className="h-5 w-5 shrink-0 text-white quicksand-mdeium " /> },
    { label: "Premium", href: "/premium", icon: <IconCreditCard className="h-5 w-5 shrink-0 text-white quicksand-medium" /> }
  ];

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10 ">
        {/* Top part */}
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          
            <div 
              onClick={handleLogout}
              className="flex items-center justify-start gap-2 group/sidebar py-2 cursor-pointer  rounded transition-colors"
            >
              <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-100 quicksand-medium" />
              <motion.span
                animate={{
                  display: open ? "inline-block" : "none",
                  opacity: open ? 1 : 0,
                }}
                className="text-white group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
              >
                Logout
              </motion.span>
            </div>
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
export const Logo = () => {
  const { open, animate } = useSidebar();
  return (
    <a href="/home" className="flex items-center space-x-2 py-1 text-sm font-normal" title="Synapse Home">
      <Image
        src={LogoImage}
        alt="Synapse Logo"
        width={32}
        height={24}
        className="h-5 w-6 shrink-0 rounded"
      />
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="quicksand-bold text-white whitespace-nowrap"
      >
        Synapse
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => (
  <a href="/home" className="flex items-center space-x-2 py-1 text-sm font-normal" title="Synapse Home">
    <Image
      src={LogoImage}
      alt="Synapse Logo"
      width={32}
      height={24}
      className="h-5 w-6 shrink-0 rounded"
    />
  </a>
);
