import { SidebarDemo } from "@/components/Sidebar/Sidebar";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex md:h-screen">
      <SidebarDemo />

      <div className="flex-1 flex flex-col overflow-hidden ">
        <div className="hidden md:flex md:items-center md:justify-between md:h-10 md:px-6 md:border-b md:border-neutral-300 md:dark:border-neutral-700 md:bg-white md:dark:bg-neutral-900">
          <h1 className="text-lg font-semibold">Synapse</h1>
          <button className="px-4 py-1 rounded-md bg-black text-white dark:bg-white dark:text-black">
            Get Premium
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
