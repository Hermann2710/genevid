"use client"

import { Search, X } from "lucide-react"
import { useChatState } from "@/contexts/chat-context"

export function SidebarSearch({ isCollapsed }: { isCollapsed: boolean }) {
    const { searchQuery, setSearchQuery } = useChatState()

    if (isCollapsed) return null

    return (
        <div className="px-3 mb-4 animate-in fade-in duration-500">
            <div className="flex items-center gap-1 group animate-in slide-in-from-left-2 duration-300">
                <div className="relative flex-1">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40"
                        size={14}
                    />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-background border border-border rounded-full py-2 pl-9 pr-9 text-xs text-foreground outline-none focus:border-brand/30 transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 hover:bg-foreground/10 rounded-full text-foreground/40 hover:text-foreground transition-all"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}