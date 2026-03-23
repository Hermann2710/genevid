"use client"

import { useState, useRef, useEffect, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface DropdownProps {
    trigger: ReactNode
    children: ReactNode
    align?: "left" | "right"
    className?: string
}

export function Dropdown({ trigger, children, align = "right", className }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                {trigger}
            </div>

            {isOpen && (
                <div className={cn(
                    "absolute z-50 mt-2 min-w-50 overflow-hidden",
                    "bg-surface border border-border rounded-[20px] shadow-2xl",
                    "animate-in fade-in zoom-in-95 duration-200",
                    align === "right" ? "right-0" : "left-0",
                    className
                )}>
                    <div className="py-2" onClick={() => setIsOpen(false)}>
                        {children}
                    </div>
                </div>
            )}
        </div>
    )
}

interface DropdownItemProps {
    children: ReactNode
    onClick?: () => void
    icon?: ReactNode
    danger?: boolean
    className?: string
}

export function DropdownItem({ children, onClick, icon, danger, className }: DropdownItemProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors outline-none",
                "hover:bg-foreground/10 text-foreground",
                danger && "text-[#ed665b] hover:bg-[#ed665b]/10",
                className
            )}
        >
            {icon && <span className="opacity-70">{icon}</span>}
            <span className="flex-1 text-left font-medium">{children}</span>
        </button>
    )
}