"use client"

import { useIsMobile } from "@/hooks/use-is-mobile"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"

type SidebarVariant = "default" | "collapsed" | "icon"

interface SidebarState {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    toggleSidebar: () => void
    variant: SidebarVariant
    isMobile: boolean
}

const MainContext = createContext<SidebarState | undefined>(undefined)

export function SidebarProvider({ children }: { children?: ReactNode }) {
    const isMobile = useIsMobile()
    const [open, setOpen] = useState<boolean>(true)

    useEffect(() => {
        if (isMobile) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }, [isMobile])

    const toggleSidebar = () => {
        setOpen((prev) => !prev)
    }

    const variant: SidebarVariant = isMobile
        ? (open ? "default" : "collapsed")
        : (open ? "default" : "icon")

    return (
        <MainContext.Provider value={{ open, setOpen, toggleSidebar, variant, isMobile }}>
            {children}
        </MainContext.Provider>
    )
}

export function useSidebar() {
    const ctx = useContext(MainContext)
    if (!ctx) throw new Error("useSidebar must be used within a SidebarProvider")
    return ctx
}
