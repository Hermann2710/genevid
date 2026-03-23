"use client"

import { createContext, useContext, useState, ReactNode, useRef } from "react"
import { useRouter } from "next/navigation"

interface ChatContextType {
    prompt: string
    setPrompt: (value: string) => void
    searchQuery: string
    setSearchQuery: (value: string) => void
    selectedFiles: File[]
    setSelectedFiles: (files: File[] | ((prev: File[]) => File[])) => void
    fileInputRef: React.RefObject<HTMLInputElement | null>
    triggerFileInput: () => void
    resetChat: () => void
    sendMessage: (prompt: string, agentId: string, files: File[], chatId?: string) => Promise<void>
    isLoading: boolean
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
    const [prompt, setPrompt] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const router = useRouter()

    const triggerFileInput = () => fileInputRef.current?.click()

    const resetChat = () => {
        setPrompt("")
        setSelectedFiles([])
    }

    const sendMessage = async (prompt: string, agentId: string, files: File[], chatId?: string) => {
        if (isLoading) return
        setIsLoading(true)
        try {
            const imageParts = await Promise.all(
                files.map(async (file) => {
                    const base64 = await new Promise<string>((resolve) => {
                        const reader = new FileReader()
                        reader.onloadend = () => resolve((reader.result as string).split(",")[1])
                        reader.readAsDataURL(file)
                    })
                    return { data: base64, mimeType: file.type }
                })
            )
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt, agentId, images: imageParts, chatId })
            })
            const data = await res.json()
            if (data.chatId && !chatId) router.push(`/chat/${data.chatId}`)
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
            resetChat()
        }
    }

    return (
        <ChatContext.Provider value={{
            prompt, setPrompt, searchQuery, setSearchQuery, selectedFiles, setSelectedFiles,
            fileInputRef, triggerFileInput, resetChat, sendMessage, isLoading
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatState = () => {
    const context = useContext(ChatContext)
    if (!context) throw new Error("useChatState must be used within ChatProvider")
    return context
}