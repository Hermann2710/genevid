"use client"

import { useSidebar } from "@/contexts/main-context";
import { appConfig } from "@/lib/config";
import { ChevronDown, Sparkles, UserCircle } from "lucide-react";

export function Header() {
    const { isMobile, toggleSidebar, variant } = useSidebar();

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 bg-[#131314]/80 backdrop-blur-md">
            <div className="flex items-center gap-2">
                {isMobile && (
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-[#c4c7c5] hover:bg-[#333537] rounded-full transition-colors"
                    >
                        <ChevronDown className={variant === "default" ? "rotate-180" : "rotate-270"} size={20} />
                    </button>
                )}

                <button className="flex items-center gap-2 px-3 py-1.5 text-[#e3e3e3] hover:bg-[#1e1f20] rounded-lg transition-all group">
                    <span className="text-lg font-medium">{appConfig.appName}</span>
                    <span className="text-gray-500 font-normal">{appConfig.appVersion}</span>
                    <ChevronDown size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                </button>
            </div>

            <div className="flex items-center gap-2">
                {!isMobile && (
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#1e1f20] border border-[#333537] rounded-full hover:bg-[#2d2f31] transition-colors">
                        <Sparkles size={16} className="text-[#4285f4]" />
                        <span className="text-sm font-medium text-white">Essayer Advanced</span>
                    </button>
                )}

                <button className="p-1 rounded-full hover:ring-4 hover:ring-[#333537] transition-all">
                    <UserCircle size={32} className="text-[#c4c7c5]" />
                </button>
            </div>
        </header>
    );
}