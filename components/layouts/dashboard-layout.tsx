"use client"

import { SidebarProvider } from "@/contexts/main-context"
import { ChatProvider } from "@/contexts/chat-context"
import { ChatInput } from "../chat-input"
import { Sidebar } from "../ui/sidebar"
import { Header } from "../ui/header"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <ChatProvider>
                <div className="flex h-screen bg-background text-foreground overflow-hidden">
                    <Sidebar />
                    <main className="flex-1 flex flex-col relative overflow-hidden">
                        <Header />
                        <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 overflow-y-auto custom-scrollbar">
                            {children}
                        </div>
                        <ChatInput />
                    </main>
                </div>
            </ChatProvider>
        </SidebarProvider>
    )
}