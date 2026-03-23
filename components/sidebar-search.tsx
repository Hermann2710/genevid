"use client"

import { useState } from "react"
import { Search, Plus, ArrowLeft, Send } from "lucide-react"
import { cn } from "@/lib/utils"

export function SidebarSearch({ isCollapsed }: { isCollapsed: boolean }) {
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [query, setQuery] = useState("")

    if (isCollapsed) return null

    return (
        <div className="px-3 mb-4 animate-in fade-in duration-500">
            {isFormOpen ? (
                <div className="p-3 bg-surface border border-border/50 rounded-2xl animate-in slide-in-from-right-2 duration-300">
                    <div className="flex items-center justify-between mb-3">
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="p-1 hover:bg-foreground/10 rounded-full text-foreground/50 transition-colors"
                        >
                            <ArrowLeft size={14} />
                        </button>
                        <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Nouveau Dossier</span>
                    </div>

                    <form className="space-y-2" onSubmit={(e) => e.preventDefault()}>
                        <input
                            autoFocus
                            type="text"
                            placeholder="Nom du dossier..."
                            className="w-full bg-background border border-border rounded-xl py-2 px-3 text-xs text-foreground outline-none focus:border-brand/50"
                        />
                        <button className="w-full py-2 bg-brand text-foreground rounded-xl text-xs font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95">
                            Créer <Send size={12} />
                        </button>
                    </form>
                </div>
            ) : (
                <div className="flex items-center gap-1 group animate-in slide-in-from-left-2 duration-300">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={14} />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full bg-background border border-border rounded-full py-2 pl-9 pr-4 text-xs text-foreground outline-none focus:border-brand/30 transition-all"
                        />
                    </div>
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="p-2 text-foreground/50 hover:text-foreground hover:bg-surface rounded-full transition-all"
                    >
                        <Plus size={18} />
                    </button>
                </div>
            )}
        </div>
    )
}