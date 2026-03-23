"use client"

import { ReactNode, ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    icon: ReactNode
    primary?: boolean
    tooltip?: string
}

export function IconButton({ icon, primary, tooltip, className, ...props }: IconButtonProps) {
    return (
        <button
            className={cn(
                "p-2.5 rounded-full transition-all duration-200 flex items-center justify-center relative group outline-none active:scale-90",
                primary
                    ? "bg-brand text-white hover:opacity-90 shadow-md"
                    : "text-foreground/70 hover:bg-foreground/10 hover:text-foreground",
                className
            )}
            {...props}
        >
            <span className="w-5 h-5 flex items-center justify-center">
                {icon}
            </span>

            {tooltip && (
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface border border-border text-xs text-foreground px-2 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-all scale-95 group-hover:scale-100 whitespace-nowrap shadow-xl z-50">
                    {tooltip}
                </span>
            )}
        </button>
    )
}