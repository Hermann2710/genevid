"use client"

import { useEffect, useState } from "react"
import { useSidebar } from "@/contexts/main-context"
import { MenuIcon, PlusIcon, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { SidebarSearch } from "../sidebar-search"
import { NavItem } from "./nav-item"
import { LogoutButton } from "../logout-btn"

export function Sidebar() {
    const { variant, toggleSidebar } = useSidebar()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const isCollapsed = variant === "icon"

    if (!mounted) return <aside className="h-full bg-surface w-70 border-r border-border/50" />

    return (
        <aside className={cn(
            "h-full bg-surface transition-all duration-300 ease-in-out flex flex-col border-r border-border/50 overflow-x-hidden",
            variant === "default" ? "w-70" : isCollapsed ? "w-17" : "w-0"
        )}>
            <div className={cn("p-4 mb-2 shrink-0 flex", isCollapsed ? "justify-center" : "justify-start")}>
                <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-foreground/10 rounded-full transition-colors text-foreground/70"
                >
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>

            <div className={cn("mb-6 shrink-0", isCollapsed ? "px-0" : "px-3")}>
                <NavItem
                    icon={<PlusIcon size={20} />}
                    label="Nouveau chat"
                    collapsed={isCollapsed}
                    className="bg-background border border-border/30"
                />
            </div>

            <SidebarSearch isCollapsed={isCollapsed} />

            <nav className={cn(
                "flex-1 space-y-1 overflow-y-auto overflow-x-hidden custom-scrollbar",
                isCollapsed ? "px-0" : "px-3"
            )}>
                {!isCollapsed && (
                    <div className="pt-2 pb-2 text-[11px] font-bold px-4 text-foreground/40 uppercase tracking-widest animate-in fade-in">
                        Récent
                    </div>
                )}
            </nav>

            <div className={cn("mt-auto border-t border-border/30 shrink-0 py-3 flex flex-col gap-1", isCollapsed ? "px-0" : "px-3")}>
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