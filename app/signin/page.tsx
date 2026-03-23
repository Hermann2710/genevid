import { AuthCard } from "@/components/auth/auth-card"
import { appConfig } from "@/lib/config"
import Link from "next/link"

export default function AuthPage() {
    return (
        <main className="min-h-screen bg-[#131314] flex flex-col items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-[30%] h-[30%] bg-[#4285f4]/3 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[30%] h-[30%] bg-[#9b51e0]/3 rounded-full blur-[120px] pointer-events-none" />

            <div className="z-10 w-full max-w-100 flex flex-col items-center">
                <div className="mb-10 flex flex-col items-center animate-in fade-in duration-700">
                    <div className="w-12 h-12 bg-[#1e1f20] border border-[#333537] rounded-2xl mb-4 flex items-center justify-center shadow-sm">
                        <span className="text-xl font-bold bg-linear-to-br from-[#4285f4] to-[#9b51e0] bg-clip-text text-transparent">G</span>
                    </div>
                    <Link href="/"><h2 className="text-xl font-medium tracking-tight text-[#e3e3e3] opacity-90">
                        {appConfig.appName}
                    </h2></Link>
                </div>

                <AuthCard />
            </div>

            <div className="absolute bottom-10 flex gap-6 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-medium opacity-50">
                <span>{appConfig.appVersion}</span>
                <span>•</span>
                <span>Confidentialité</span>
                <span>•</span>
                <span>Conditions</span>
            </div>
        </main>
    )
}