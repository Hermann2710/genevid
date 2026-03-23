"use client"

import { useState, useRef, useEffect } from "react"
import { ImageIcon, SendIcon, X } from "lucide-react"
import { IconButton } from "./ui/icon-button"
import { appConfig } from "@/lib/config"
import { AgentSelect, Agent } from "./agent-select"
import { useChatState } from "@/contexts/chat-context"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ChatInputProps {
    onSendMessage?: (prompt: string, agent: string, files: File[]) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
    const {
        prompt, setPrompt,
        selectedFiles, setSelectedFiles,
        fileInputRef, triggerFileInput, resetChat
    } = useChatState()

    const [previews, setPreviews] = useState<string[]>([])
    const [agent, setAgent] = useState<Agent>({
        id: "gemini-1.5-flash",
        name: "Gemini Flash",
        description: "Rapide et efficace",
        icon: <span className="text-brand">✦</span>
    })

    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const newPreviews = selectedFiles.map(file => URL.createObjectURL(file))
        setPreviews(newPreviews)

        return () => newPreviews.forEach(url => URL.revokeObjectURL(url))
    }, [selectedFiles])

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
        }
    }, [prompt])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length > 0) {
            setSelectedFiles(prev => [...prev, ...files])
        }
        e.target.value = ""
    }

    const removeFile = (index: number) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index))
    }

    const handleSend = () => {
        if (!prompt.trim() && selectedFiles.length === 0) return
        onSendMessage?.(prompt, agent.id, selectedFiles)
        resetChat()
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <div className="sticky bottom-0 w-full bg-linear-to-t from-background via-background/90 to-transparent pb-6 px-4">
            <div className="max-w-3xl mx-auto bg-surface rounded-[28px] p-2 border border-border/50 focus-within:border-brand/50 transition-all shadow-2xl">

                {previews.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 pb-0 animate-in fade-in slide-in-from-bottom-2">
                        {previews.map((url, index) => (
                            <div key={url} className="relative w-16 h-16 group">
                                <Image src={url} alt="Upload" fill className="object-cover rounded-xl border border-border" />
                                <button
                                    onClick={() => removeFile(index)}
                                    className="absolute -top-1.5 -right-1.5 bg-background border border-border text-foreground rounded-full p-0.5 shadow-lg"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`Demander à ${appConfig.appName}`}
                    className="w-full bg-transparent border-none outline-none p-4 resize-none text-base md:text-lg min-h-14 text-foreground placeholder:text-foreground/30 custom-scrollbar"
                />

                <div className="flex justify-between items-center px-2 pb-1">
                    <div className="flex items-center gap-1">
                        <AgentSelect value={agent} onChange={setAgent} />
                        <div className="w-px h-4 bg-border/40 mx-1" />

                        <input type="file" hidden ref={fileInputRef} accept="image/*" multiple onChange={handleFileChange} />
                        <IconButton
                            icon={<ImageIcon size={19} />}
                            onClick={triggerFileInput}
                            className="text-foreground/50 hover:text-brand"
                        />
                    </div>

                    <IconButton
                        onClick={handleSend}
                        disabled={!prompt.trim() && selectedFiles.length === 0}
                        icon={<SendIcon size={18} className={cn(prompt.trim() || selectedFiles.length > 0 ? "text-foreground" : "text-foreground/20")} />}
                        className={cn(
                            "transition-all",
                            prompt.trim() || selectedFiles.length > 0 ? "bg-brand shadow-lg" : "bg-foreground/5 cursor-not-allowed"
                        )}
                    />
                </div>
            </div>
            <p className="text-[10px] text-center mt-3 text-foreground/30 px-6 font-medium">
                {appConfig.appName} peut analyser vos images via Gemini.
            </p>
        </div>
    )
}