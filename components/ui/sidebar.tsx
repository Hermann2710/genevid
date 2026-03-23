"use client"

import { useSidebar } from "@/contexts/main-context"
import { MenuIcon, PlusIcon } from "lucide-react"
import { NavItem } from "./nav-item"

export function Sidebar() {
    const { variant, toggleSidebar } = useSidebar()

    const widthClass = variant === "default" ? "w-[280px]" : variant === "icon" ? "w-[68px]" : "w-0"

    return (
        <aside className={`h-full bg-[#1e1f20] transition-all duration-300 ease-in-out flex flex-col ${widthClass}`}>
            <div className="p-4 mb-8">
                <button onClick={toggleSidebar} className="p-2 hover:bg-[#333537] rounded-full transition-colors">
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex-1 px-3 space-y-2 overflow-y-auto">
                <NavItem icon={<PlusIcon />} label="New Chat" collapsed={variant === "icon"} />
                <div className="pt-4 pb-2 text-xs font-medium px-3 text-gray-400">
                    {variant !== "icon" && "Recent"}
                </div>
            </nav>
        </aside>
    )
}