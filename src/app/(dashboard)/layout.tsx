import { SidebarDemo } from "@/components/Sidebar/Sidebar";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex md:h-screen">
      <SidebarDemo />

      <div className="flex-1 flex flex-col overflow-hidden  ">
        <div className="hidden bg-[#0C0D12]  md:flex md:items-center md:justify-between md:h-10 md:px-6 md:border-b md:border-neutral-600 md:dark:border-neutral-700  ">
          <h1 className="text-lg quicksand-semibold text-white">Synapse</h1>
          <button className="relative px-3 py-1 rounded-md bg-gradient-to-r from-neutral-100 to-white text-neutral-900 cursor-pointer dark:from-white dark:to-gray-100 dark:text-black 
            overflow-hidden group transition-all duration-300 ease-out
            hover:scale-105 hover:shadow-lg hover:shadow-white/20
            active:scale-95 transform
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-yellow-200 before:to-orange-200 
            before:opacity-0 before:transition-opacity before:duration-300 before:ease-out
            hover:before:opacity-100">
            <span className="relative z-10 font-medium quicksand-semibold group-hover:text-black transition-colors duration-300">
              ✨ Get Premium
            </span>
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
