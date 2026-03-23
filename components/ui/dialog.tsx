"use client"

import { useRef, ReactNode, forwardRef, useImperativeHandle, useState } from "react"
import { X } from "lucide-react"
import { IconButton } from "./icon-button"
import { cn } from "@/lib/utils"

interface DialogProps {
    title?: string
    children: ReactNode
    actions?: ReactNode
    className?: string
    onClose?: () => void
}

export interface DialogHandle {
    open: () => void
    close: () => void
}

export const Dialog = forwardRef<DialogHandle, DialogProps>(({ title, children, actions, className, onClose }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null)
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        open: () => {
            setIsOpen(true)
            dialogRef.current?.showModal()
            document.body.style.overflow = "hidden"
        },
        close: () => handleClose()
    }))

    const handleClose = () => {
        setIsOpen(false)
        dialogRef.current?.close()
        document.body.style.overflow = "unset"
        if (onClose) onClose()
    }

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) handleClose()
    }

    return (
        <dialog
            ref={dialogRef}
            onClick={handleBackdropClick}
            className={cn(
                "fixed inset-0 m-auto outline-none overflow-hidden",
                "bg-surface text-foreground p-0 rounded-[28px] border border-border shadow-2xl",
                "backdrop:bg-black/70 backdrop:backdrop-blur-md",
                "open:animate-in open:fade-in open:zoom-in-95 open:slide-in-from-bottom-4 duration-300",
                "max-w-[90vw] md:max-w-md w-full",
                className
            )}
        >
            <div className="flex flex-col p-8">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-xl font-medium tracking-tight text-foreground">{title}</h2>
                    <IconButton
                        icon={<X size={20} />}
                        onClick={handleClose}
                        className="hover:bg-foreground/10 -mr-2"
                    />
                </div>

                <div className="w-full text-[15px] text-foreground/70 leading-relaxed mb-8">
                    {children}
                </div>

                {actions && (
                    <div className="flex justify-end gap-3 mt-auto">
                        {actions}
                    </div>
                )}
            </div>
        </dialog>
    )
})

Dialog.displayName = "Dialog"