"use client"

import { useEffect, useState } from "react"
import { useSidebar } from "@/contexts/main-context"
import { useChatState } from "@/contexts/chat-context"
import { MenuIcon, PlusIcon, Settings, Pin } from "lucide-react"
import { cn } from "@/lib/utils"
import { SidebarSearch } from "../sidebar-search"
import { NavItem } from "./nav-item"
import { LogoutButton } from "../logout-btn"
import { useRouter, useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import useSWR from "swr"
import { ChatEntry } from "../chat-entry"

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function Sidebar() {
    const { variant, toggleSidebar } = useSidebar()
    const { resetChat } = useChatState()
    const { data: session } = useSession()
    const { id: activeChatId } = useParams()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)

    const { data: chats, isLoading } = useSWR(session ? "/api/chats" : null, fetcher)

    useEffect(() => { setMounted(true) }, [])

    const isCollapsed = variant === "collapsed"
    const pinnedChats = chats?.filter((c: any) => c.isPinned) || []
    const otherChats = chats?.filter((c: any) => !c.isPinned) || []

    if (!mounted) return <aside className="h-full bg-surface w-70 border-r border-border/50" />

    return (
        <aside className={cn(
            "h-full bg-surface transition-all duration-300 ease-in-out flex flex-col border-r border-border/50 overflow-x-hidden",
            variant === "default" ? "w-70" : isCollapsed ? "w-17" : "w-0"
        )}>
            <div className={cn("p-4 mb-2 shrink-0 flex", isCollapsed ? "justify-center" : "justify-start")}>
                <button onClick={toggleSidebar} className="p-2 hover:bg-foreground/10 rounded-full transition-colors text-foreground/70">
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>

            <div className={cn("mb-6 shrink-0 px-3", isCollapsed && "px-2")}>
                <button onClick={() => { resetChat(); router.push("/"); }} className="w-full">
                    <NavItem
                        icon={<PlusIcon size={20} />}
                        label="Nouveau chat"
                        collapsed={isCollapsed}
                        className="bg-background border border-border/30 hover:border-brand/40 hover:bg-brand/5 transition-all"
                    />
                </button>
            </div>

            <SidebarSearch isCollapsed={isCollapsed} />

            <nav className={cn("flex-1 space-y-6 overflow-y-auto custom-scrollbar mt-4", isCollapsed ? "px-0" : "px-3")}>
                {pinnedChats.length > 0 && (
                    <div className="space-y-1">
                        {!isCollapsed && (
                            <div className="px-4 mb-2 text-[10px] font-bold text-brand/60 uppercase tracking-widest flex items-center gap-2">
                                <Pin size={10} className="fill-brand/20" /> Favoris
                            </div>
                        )}
                        {pinnedChats.map((chat: any) => (
                            <ChatEntry
                                key={chat._id}
                                chat={chat}
                                activeId={activeChatId as string}
                                collapsed={isCollapsed}
                                isPinnedView
                            />
                        ))}
                    </div>
                )}

                <div className="space-y-1">
                    {!isCollapsed && (
                        <div className="px-4 mb-2 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                            Récent
                        </div>
                    )}
                    {otherChats.map((chat: any) => (
                        <ChatEntry
                            key={chat._id}
                            chat={chat}
                            activeId={activeChatId as string}
                            collapsed={isCollapsed}
                        />
                    ))}
                </div>

                {isLoading && !chats && !isCollapsed && (
                    <div className="px-4 space-y-3">
                        {[1, 2, 3].map(i => <div key={i} className="h-8 bg-foreground/5 rounded-lg animate-pulse" />)}
                    </div>
                )}
            </nav>

            {session && (
                <div className={cn("mt-auto border-t border-border/30 shrink-0 py-3 flex flex-col gap-1", isCollapsed ? "px-0" : "px-3")}>
                    <NavItem icon={<Settings size={20} />} label="Paramètres" collapsed={isCollapsed} href="/settings" />
                    <LogoutButton collapsed={isCollapsed} />
                </div>
            )}
        </aside>
    )
}
