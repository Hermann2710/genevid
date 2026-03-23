import { SidebarProvider } from "@/contexts/main-context";
import { ChatInput } from "../chat-input";
import { Sidebar } from "../ui/sidebar";
import { Header } from "../ui/header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen bg-[#131314] text-[#e3e3e3] overflow-hidden">
                <Sidebar />
                <main className="flex-1 flex flex-col relative overflow-y-auto custom-scrollbar">
                    <Header />
                    <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8">
                        {children}
                    </div>
                    <ChatInput />
                </main>
            </div>
        </SidebarProvider>
    )
}