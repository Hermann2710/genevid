import { AppWrapper } from '@/components/providers/app-wrapper'
import { ChatProvider } from '@/contexts/chat-context'
import React, { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <ChatProvider>
            <AppWrapper>
                {children}
            </AppWrapper>
        </ChatProvider>
    )
}
