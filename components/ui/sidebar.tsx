"use client"

import { useEffect, useState } from "react"
import { useSidebar } from "@/contexts/main-context"
import { MenuIcon, PlusIcon, Settings } from "lucide-react"
import { NavItem } from "./nav-item"
import { LogoutButton } from "../logout-btn"
import { cn } from "@/lib/utils"

export function Sidebar() {
    const { variant, toggleSidebar } = useSidebar()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const isCollapsed = variant === "icon"

    if (!mounted) {
        return <aside className="h-full bg-[#1e1f20] w-70 border-r border-[#333537]/50" />
    }

    return (
        <aside className={cn(
            "h-full bg-[#1e1f20] transition-all duration-300 ease-in-out flex flex-col border-r border-[#333537]/50",
            variant === "default" ? "w-70" : isCollapsed ? "w-17" : "w-0"
        )}>
            <div className="p-4 mb-4">
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-[#333537] rounded-full transition-colors text-[#c4c7c5]"
                >
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>

            <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar">
                <NavItem
                    icon={<PlusIcon size={20} />}
                    label="Nouveau chat"
                    collapsed={isCollapsed}
                />

                {!isCollapsed && (
                    <div className="pt-4 pb-2 text-xs font-semibold px-4 text-gray-500 uppercase tracking-wider animate-in fade-in duration-500">
                        Récent
                    </div>
                )}
            </nav>

            <div className="p-3 mt-auto border-t border-[#333537]/50 space-y-1">
                <NavItem
                    icon={<Settings size={20} />}
                    label="Paramètres"
                    collapsed={isCollapsed}
                    href="/settings"
                />
                <LogoutButton collapsed={isCollapsed} />
            </div>
        </aside>
    )
}