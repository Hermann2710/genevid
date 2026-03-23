"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="p-2.5 w-10 h-10" />
    }

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className={cn(
                "relative p-2.5 rounded-full transition-all duration-300",
                "hover:bg-surface text-foreground",
                "active:scale-90"
            )}
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-2.5 left-2.5" />
            <span className="sr-only">Changer le thème</span>
        </button>
    )
}