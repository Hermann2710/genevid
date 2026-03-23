"use client"

import { Sparkles, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useState, useRef, useEffect } from "react"

export type Agent = {
    id: string
    name: string
    description: string
    icon: React.ReactNode
}

const AGENTS: Agent[] = [
    { id: "gemini-1.5-flash", name: "Gemini Flash", description: "Rapide et efficace", icon: <Sparkles size={14} className="text-brand" /> },
    { id: "gemini-1.5-pro", name: "Gemini Pro", description: "Raisonnements complexes", icon: <Sparkles size={14} className="text-purple-500" /> },
]

export function AgentSelect({ value, onChange }: { value: Agent, onChange: (agent: Agent) => void }) {
    const [open, setOpen] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-foreground/5 text-foreground/70 transition-all text-xs font-medium border border-border/40"
            >
                {value.icon}
                <span>{value.name}</span>
                <ChevronDown size={14} className={cn("transition-transform", open && "rotate-180")} />
            </button>

            {open && (
                <div className="absolute bottom-full mb-2 left-0 w-64 bg-surface border border-border rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                    <div className="p-2 space-y-1">
                        {AGENTS.map((agent) => (
                            <button
                                key={agent.id}
                                onClick={() => { onChange(agent); setOpen(false); }}
                                className={cn(
                                    "w-full flex flex-col p-3 rounded-xl transition-colors text-left",
                                    value.id === agent.id ? "bg-brand/10" : "hover:bg-foreground/5"
                                )}
                            >
                                <div className="flex items-center gap-2 mb-0.5">
                                    {agent.icon}
                                    <span className={cn("text-xs font-semibold", value.id === agent.id ? "text-brand" : "text-foreground")}>
                                        {agent.name}
                                    </span>
                                </div>
                                <span className="text-[10px] text-foreground/50 ml-5">{agent.description}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}