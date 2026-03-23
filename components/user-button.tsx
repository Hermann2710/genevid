"use client"

import { useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Settings, LogOut } from "lucide-react"
import { Dropdown, DropdownItem } from "./ui/dropdown"
import { Dialog, DialogHandle } from "./ui/dialog"
import { appConfig } from "@/lib/config"

export function UserButton() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const logoutDialogRef = useRef<DialogHandle>(null)

    if (status === "loading") {
        return <div className="w-9 h-9 rounded-full bg-surface animate-pulse" />
    }

    if (status === "unauthenticated" || !session) {
        return (
            <button
                onClick={() => router.push("/signin")}
                className="px-5 py-2 bg-[#4285f4] text-white rounded-full text-sm font-medium hover:bg-[#1a73e8] transition-all active:scale-95"
            >
                Connexion
            </button>
        )
    }

    const user = session.user

    return (
        <>
            <Dropdown
                trigger={
                    <button className="relative w-9 h-9 rounded-full overflow-hidden hover:ring-4 hover:ring-surface transition-all ring-offset-2 ring-offset-background shrink-0">
                        {user?.image ? (
                            <Image src={user.image} alt="" fill className="object-cover" />
                        ) : (
                            <div className="w-full h-full bg-[#4285f4] flex items-center justify-center text-white text-xs font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </button>
                }
            >
                <div className="px-4 py-3 border-b border-border/50 mb-1 max-w-60">
                    <p className="text-sm font-medium text-foreground truncate">{user?.name}</p>
                    <p className="text-xs text-foreground/60 truncate">{user?.email}</p>
                </div>

                <DropdownItem icon={<Settings size={16} />} onClick={() => router.push("/settings")}>
                    Paramètres
                </DropdownItem>

                <div className="my-1 border-t border-border/50" />

                <DropdownItem icon={<LogOut size={16} />} danger onClick={() => logoutDialogRef.current?.open()}>
                    Déconnexion
                </DropdownItem>
            </Dropdown>

            <Dialog
                ref={logoutDialogRef}
                title="Déconnexion"
                actions={
                    <>
                        <button
                            onClick={() => logoutDialogRef.current?.close()}
                            className="px-6 py-2.5 rounded-full hover:bg-surface text-sm font-medium text-foreground transition-colors"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={() => signOut({ callbackUrl: "/signin" })}
                            className="px-8 py-2.5 rounded-full bg-[#ea4335] text-white text-sm font-medium hover:bg-[#c53026] transition-all active:scale-95 shadow-lg"
                        >
                            Confirmer
                        </button>
                    </>
                }
            >
                Souhaitez-vous vraiment fermer votre session sur {appConfig.appName} ?
            </Dialog>
        </>
    )
}