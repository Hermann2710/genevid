"use client"

import { useState, useRef, useEffect } from "react"
import { MoreHorizontal, Pin, Share2, Pencil, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { mutate } from "swr"
import { Dialog, DialogHandle } from "./ui/dialog"

export function ChatActions({ chat }: { chat: any }) {
    const [open, setOpen] = useState(false)
    const [coords, setCoords] = useState({ top: 0, left: 0 })
    const [newTitle, setNewTitle] = useState(chat.title)

    const containerRef = useRef<HTMLDivElement>(null)
    const renameDialogRef = useRef<DialogHandle>(null)
    const deleteDialogRef = useRef<DialogHandle>(null)
    const router = useRouter()

    const toggleMenu = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const rect = e.currentTarget.getBoundingClientRect()
        setCoords({ top: rect.bottom + 8, left: rect.left })
        setOpen(!open)
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside)
            window.addEventListener("scroll", () => setOpen(false), true)
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            window.removeEventListener("scroll", () => setOpen(false))
        }
    }, [open])

    const onAction = async (method: string, body?: any) => {
        const res = await fetch(`/api/chat/${chat._id}`, {
            method,
            headers: { "Content-Type": "application/json" },
            body: body ? JSON.stringify(body) : undefined
        })
        if (res.ok) {
            mutate("/api/chats")
            if (method === "DELETE") router.push("/")
        }
        renameDialogRef.current?.close()
        deleteDialogRef.current?.close()
        setOpen(false)
    }

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={toggleMenu}
                className="p-1 hover:bg-foreground/10 rounded-md text-foreground/40 hover:text-foreground transition-colors"
            >
                <MoreHorizontal size={14} />
            </button>

            {open && (
                <div
                    className="fixed w-44 bg-surface border border-border shadow-2xl rounded-xl p-1 z-9999"
                    style={{ top: `${coords.top}px`, left: `${coords.left}px` }}
                >
                    <button onClick={() => onAction("PATCH", { isPinned: !chat.isPinned })} className="w-full flex items-center gap-2 p-2 hover:bg-foreground/5 rounded-lg text-xs transition-colors">
                        <Pin size={14} className={chat.isPinned ? "fill-brand text-brand" : ""} />
                        {chat.isPinned ? "Désépingler" : "Épingler"}
                    </button>
                    <button onClick={() => { setOpen(false); renameDialogRef.current?.open(); }} className="w-full flex items-center gap-2 p-2 hover:bg-foreground/5 rounded-lg text-xs transition-colors">
                        <Pencil size={14} /> Renommer
                    </button>
                    <button onClick={() => onAction("PATCH", { isShared: !chat.isShared })} className="w-full flex items-center gap-2 p-2 hover:bg-foreground/5 rounded-lg text-xs transition-colors">
                        <Share2 size={14} className={chat.isShared ? "text-blue-500" : ""} />
                        Partager
                    </button>
                    <div className="h-px bg-border/50 my-1" />
                    <button
                        onClick={() => { setOpen(false); deleteDialogRef.current?.open(); }}
                        className="w-full flex items-center gap-2 p-2 hover:bg-red-500/10 text-red-500 rounded-lg text-xs transition-colors"
                    >
                        <Trash2 size={14} /> Supprimer
                    </button>
                </div>
            )}

            <Dialog
                ref={renameDialogRef}
                title="Renommer"
                actions={
                    <>
                        <button onClick={() => renameDialogRef.current?.close()} className="px-4 py-2 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors">Annuler</button>
                        <button onClick={() => onAction("PATCH", { title: newTitle })} className="px-5 py-2.5 bg-brand text-white rounded-full text-sm font-semibold shadow-lg shadow-brand/20 active:scale-95 transition-all">Enregistrer</button>
                    </>
                }
            >
                <input
                    autoFocus
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-background border border-border p-4 rounded-2xl outline-none focus:border-brand/50 transition-colors text-sm"
                    placeholder="Nom de la discussion..."
                />
            </Dialog>

            <Dialog
                ref={deleteDialogRef}
                title="Supprimer ?"
                actions={
                    <>
                        <button onClick={() => deleteDialogRef.current?.close()} className="px-4 py-2 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors">Annuler</button>
                        <button onClick={() => onAction("DELETE")} className="px-5 py-2.5 bg-red-500 text-white rounded-full text-sm font-semibold shadow-lg shadow-red-500/20 active:scale-95 transition-all">Supprimer</button>
                    </>
                }
            >
                <p>Voulez-vous vraiment supprimer cette discussion ? Cette action est irréversible.</p>
            </Dialog>
        </div>
    )
}