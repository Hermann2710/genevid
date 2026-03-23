import { AuthCard } from "@/components/signin/auth-card"
import { appConfig } from "@/lib/config"
import Link from "next/link"

export default function AuthPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-0 left-1/4 w-[30%] h-[30%] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="z-10 w-full max-w-100 flex flex-col items-center">
                <div className="mb-10 flex flex-col items-center animate-in fade-in duration-700">
                    <div className="w-12 h-12 bg-surface border border-border rounded-2xl mb-4 flex items-center justify-center shadow-sm">
                        <span className="text-xl font-bold bg-linear-to-br from-brand to-purple-500 bg-clip-text text-transparent">G</span>
                    </div>
                    <Link href="/">
                        <h2 className="text-xl font-medium tracking-tight text-foreground opacity-90">
                            {appConfig.appName}
                        </h2>
                    </Link>
                </div>

                <AuthCard />
            </div>

            <div className="absolute bottom-10 flex gap-6 text-[10px] text-foreground/40 uppercase tracking-[0.2em] font-medium opacity-50">
                <span>{appConfig.appVersion}</span>
                <span>•</span>
                <span>Confidentialité</span>
                <span>•</span>
                <span>Conditions</span>
            </div>
        </main>
    )
}