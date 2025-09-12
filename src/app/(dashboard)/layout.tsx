import { SidebarDemo } from "@/components/Sidebar/Sidebar";
import React from "react";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
    
      <SidebarDemo />


      <div className="flex-1 flex flex-col overflow-hidden">
   
        <div className="flex items-center justify-between h-10  px-6 border-b border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900">
          <h1 className="text-lg font-semibold">Synapse</h1>
          <button className="px-4 py-1 rounded-md bg-black text-white dark:bg-white dark:text-black">
            Get Premium
          </button>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto ">
          {children}
        </div>
      </div>
    </div>
  );
}
