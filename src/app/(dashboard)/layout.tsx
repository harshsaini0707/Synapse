import { SidebarDemo } from "@/components/Sidebar/Sidebar";
import { Crown } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex md:h-screen">
      <SidebarDemo />

      <div className="flex-1 flex flex-col overflow-hidden  ">
        <div className="hidden bg-[#0C0D12]  md:flex md:items-center md:justify-between md:h-10 md:px-6 md:border-b md:border-neutral-600 md:dark:border-neutral-700  ">
          <h1 className="text-lg quicksand-semibold text-white">Synapse</h1>
          
          <Link href="/premium">
            <button className="bg-lime-400 hover:bg-lime-300 cursor-pointer text-black font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2">
              <Crown className="w-4 h-4" />
              <span className="text-sm quicksand-semibold">Get Premium</span>
            </button>
          </Link>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
