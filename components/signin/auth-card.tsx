"use client"

import Image from "next/image"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"
import { appConfig } from "@/lib/config"

export function AuthCard() {
    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-surface border border-border rounded-3xl p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-lg font-medium text-foreground mb-2">
                        Connexion
                    </h1>
                    <p className="text-sm text-foreground/60 leading-relaxed px-4">
                        Accédez à {appConfig.appName} pour vos créations.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/" })}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-all active:scale-[0.98]"
                    >
                        <Image src="/google-icon.svg" alt="" width={18} height={18} />
                        Continuer avec Google
                    </button>

                    <button
                        onClick={() => signIn("github", { callbackUrl: "/" })}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#2b3137] text-white rounded-full text-sm font-medium hover:bg-[#24292e] transition-all active:scale-[0.98]"
                    >
                        <Image src="/github-icon.svg" alt="" width={18} height={18} />
                        Continuer avec GitHub
                    </button>
                </div>

                <p className="mt-8 text-center text-[10px] text-foreground/40 tracking-wide uppercase">
                    Sécurisé par {appConfig.appName}
                </p>
            </div>
        </div>
    )
}