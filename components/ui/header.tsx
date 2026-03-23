"use client"

import { useSidebar } from "@/contexts/main-context"
import { appConfig } from "@/lib/config"
import { ChevronDown } from "lucide-react"
import { UserButton } from "../user-button"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

export function Header() {
    const { isMobile, toggleSidebar, variant } = useSidebar()

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between w-full h-16 px-4 bg-background/80 backdrop-blur-md border-b border-border/20">
            <div className="flex items-center gap-2">
                {isMobile && (
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-foreground/70 hover:bg-surface rounded-full transition-colors"
                    >
                        <ChevronDown className={cn("transition-transform duration-300", variant === "default" ? "rotate-180" : "-rotate-90")} size={20} />
                    </button>
                )}

                <button className="flex items-center gap-2 px-3 py-1.5 text-foreground rounded-xl transition-all group">
                    <span className="text-lg font-semibold tracking-tight">{appConfig.appName}</span>
                </button>
            </div>

            <div className="flex items-center gap-3">
                <ThemeToggle />
                <UserButton />
            </div>
        </header>
    )
}