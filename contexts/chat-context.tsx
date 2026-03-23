"use client"

import { createContext, useContext, useState, ReactNode, useRef } from "react"

interface ChatContextType {
    prompt: string
    setPrompt: (value: string) => void
    selectedFiles: File[]
    setSelectedFiles: (files: File[] | ((prev: File[]) => File[])) => void
    fileInputRef: React.RefObject<HTMLInputElement | null>
    triggerFileInput: () => void
    resetChat: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
    const [prompt, setPrompt] = useState("")
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement>(null)

    const triggerFileInput = () => fileInputRef.current?.click()

    const resetChat = () => {
        setPrompt("")
        setSelectedFiles([])
    }

    return (
        <ChatContext.Provider value={{
            prompt, setPrompt, selectedFiles, setSelectedFiles,
            fileInputRef, triggerFileInput, resetChat
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