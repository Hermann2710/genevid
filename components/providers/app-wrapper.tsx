"use client"

import { SessionProvider } from "next-auth/react";
import DashboardLayout from "@/components/layouts/dashboard-layout";

export function AppWrapper({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <DashboardLayout>
                {children}
            </DashboardLayout>
        </SessionProvider>
    );
}