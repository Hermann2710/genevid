"use client"

import Link from "next/link"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface NavItemProps {
    icon: ReactNode
    label: string
    collapsed: boolean
    href?: string
    onClick?: () => void
    className?: string
}

export function NavItem({ icon, label, collapsed, href, onClick, className }: NavItemProps) {
    const content = (
        <div className={cn(
            "flex items-center rounded-full transition-all duration-200 text-foreground hover:bg-foreground/10 group",
            collapsed ? "w-10 h-10 justify-center mx-auto" : "px-4 py-2.5 gap-3 w-full",
            className
        )}>
            <div className={cn(
                "flex items-center justify-center shrink-0",
                collapsed ? "text-foreground/70 group-hover:text-foreground" : ""
            )}>
                {icon}
            </div>

            {!collapsed && (
                <span className="text-sm font-medium truncate animate-in fade-in slide-in-from-left-2 duration-300">
                    {label}
                </span>
            )}
        </div>
    )

    if (onClick) {
        return <button onClick={onClick} className="w-full block outline-none">{content}</button>
    }

    return (
        <Link href={href || "#"} className="w-full block outline-none">
            {content}
        </Link>
    )
}