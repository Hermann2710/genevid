"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useParams } from "next/navigation"
import { useChatState } from "@/contexts/chat-context"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"

interface Message {
    role: "user" | "model"
    parts: { text: string }[]
}

export default function ChatPage() {
    const params = useParams()
    const id = params?.id as string
    const { isLoading } = useChatState()
    const [messages, setMessages] = useState<Message[]>([])
    const scrollRef = useRef<HTMLDivElement>(null)

    const fetchChat = useCallback(async () => {
        if (!id) return
        try {
            const res = await fetch(`/api/chat/${id}`)
            if (!res.ok) throw new Error("Chat non trouvé")
            const data = await res.json()
            if (data.messages) setMessages(data.messages)
        } catch (err) {
            console.error(err)
        }
    }, [id])

    useEffect(() => {
        fetchChat()
    }, [fetchChat])

    useEffect(() => {
        if (!isLoading) {
            fetchChat()
        }
    }, [isLoading, fetchChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, isLoading])

    return (
        <div className="flex flex-col h-full">
            <div className="max-w-3xl mx-auto w-full space-y-10 pb-10">
                {messages.map((msg, index) => (
                    <div key={index} className={cn(
                        "flex flex-col animate-in fade-in slide-in-from-bottom-2 duration-300",
                        msg.role === "user" ? "items-end" : "items-start"
                    )}>
                        <div className={cn(
                            "max-w-[85%] p-4 rounded-2xl text-sm md:text-base leading-relaxed",
                            msg.role === "user"
                                ? "bg-surface border border-border/40 text-foreground shadow-sm"
                                : "bg-transparent text-foreground/90 prose prose-invert max-w-none"
                        )}>
                            <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex items-center gap-3 text-brand animate-pulse ml-2">
                        <div className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-brand rounded-full animate-bounce" />
                        </div>
                    </div>
                )}
                <div ref={scrollRef} className="h-20" />
            </div>
        </div>
    )
}