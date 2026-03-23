import { AppWrapper } from '@/components/providers/app-wrapper'
import React, { ReactNode } from 'react'

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <AppWrapper>
            {children}
        </AppWrapper>
    )
}
