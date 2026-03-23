"use client"

import { useEffect, useRef, ReactNode } from "react";
import { X } from "lucide-react";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/utils";

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
    className?: string;
}

export function Dialog({ isOpen, onClose, title, children, className }: DialogProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen) {
            dialog.showModal();
            document.body.style.overflow = "hidden";
        } else {
            dialog.close();
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) onClose();
    };

    return (
        <dialog
            ref={dialogRef}
            onClick={handleBackdropClick}
            className={cn(
                "fixed inset-0 m-auto outline-none",
                "bg-[#1e1f20] text-[#e3e3e3] p-0 rounded-[28px] border border-[#333537] shadow-2xl",
                "backdrop:bg-black/70 backdrop:backdrop-blur-md",
                "open:animate-in open:fade-in open:zoom-in-95 open:slide-in-from-bottom-4 duration-300",
                "max-w-[90vw] md:max-w-lg w-full",
                className
            )}
        >
            <div className="flex flex-col p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-medium">{title}</h2>
                    <IconButton
                        icon={<X size={20} />}
                        onClick={onClose}
                        className="hover:bg-[#333537]"
                    />
                </div>
                <div className="w-full text-[15px] text-[#c4c7c5]">
                    {children}
                </div>
            </div>
        </dialog>
    );
}