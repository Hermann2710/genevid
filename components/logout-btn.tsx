"use client"

import { useRef } from "react"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { NavItem } from "./ui/nav-item"
import { Dialog, DialogHandle } from "./ui/dialog"
import { appConfig } from "@/lib/config"

export function LogoutButton({ collapsed }: { collapsed: boolean }) {
    const logoutDialogRef = useRef<DialogHandle>(null)

    return (
        <>
            <NavItem
                icon={<LogOut size={20} />}
                label="Déconnexion"
                collapsed={collapsed}
                onClick={() => logoutDialogRef.current?.open()}
            />

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