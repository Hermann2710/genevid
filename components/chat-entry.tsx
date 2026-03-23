import { MessageSquare, Pin } from "lucide-react"
import { NavItem } from "./ui/nav-item"
import { ChatActions } from "./chat-actions"
import { cn } from "@/lib/utils"

export function ChatEntry({ chat, activeId, collapsed, isPinnedView }: { chat: any, activeId: string, collapsed: boolean, isPinnedView?: boolean }) {
    const isActive = activeId === chat._id

    return (
        <div className="group relative flex items-center px-0 py-0.5">
            {isActive && (
                <div
                    className={cn(
                        "absolute inset-y-0 left-0 right-2 rounded-full animate-in fade-in slide-in-from-left-2 duration-300",
                        "bg-foreground/8 dark:bg-foreground/12"
                    )}
                />
            )}

            <NavItem
                icon={
                    isPinnedView ? (
                        <Pin size={16} className={cn(
                            "transition-all duration-300 z-10",
                            isActive ? "text-foreground scale-105" : "text-foreground/40 rotate-45 group-hover:rotate-0"
                        )} />
                    ) : (
                        <MessageSquare size={17} className={cn(
                            "transition-all duration-300 z-10",
                            isActive ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/70"
                        )} />
                    )
                }
                label={chat.title}
                href={`/chat/${chat._id}`}
                collapsed={collapsed}
                className={cn(
                    "flex-1 pr-12 truncate transition-all duration-200 z-10",
                    isActive
                        ? "text-foreground font-semibold"
                        : "hover:bg-foreground/5 text-foreground/70 rounded-full"
                )}
            />

            {!collapsed && (
                <div className={cn(
                    "absolute right-4 z-20 transition-all duration-300",
                    isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                )}>
                    <ChatActions chat={chat} />
                </div>
            )}
        </div>
    )
}