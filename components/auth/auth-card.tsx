"use client"

import Image from "next/image"
import { signIn } from "next-auth/react"
import { cn } from "@/lib/utils"

export function AuthCard() {
    return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-[#1e1f20] border border-[#333537] rounded-3xl p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-lg font-medium text-white mb-2">
                        Connexion
                    </h1>
                    <p className="text-sm text-[#c4c7c5] leading-relaxed px-4">
                        Accédez à Nano Banana 2 pour vos créations.
                    </p>
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-200 transition-all active:scale-[0.98]"
                    >
                        <Image src="/google-icon.svg" alt="" width={18} height={18} />
                        Continuer avec Google
                    </button>

                    <button
                        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
                        className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-[#2f3337] text-white rounded-full text-sm font-medium hover:bg-[#3f4448] transition-all active:scale-[0.98]"
                    >
                        <Image src="/github-icon.svg" alt="" width={18} height={18} />
                        Continuer avec GitHub
                    </button>
                </div>

                <p className="mt-8 text-center text-[10px] text-gray-500 tracking-wide uppercase">
                    Sécurisé par Genevid
                </p>
            </div>
        </div>
    )
}