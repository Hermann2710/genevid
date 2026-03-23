"use client"

import { useState } from "react";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { NavItem } from "./ui/nav-item";
import { Dialog } from "./ui/dialog";

export function LogoutButton({ collapsed }: { collapsed: boolean }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <NavItem
                icon={<LogOut size={20} />}
                label="Déconnexion"
                collapsed={collapsed}
                onClick={() => setIsOpen(true)}
            />

            <Dialog
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Déconnexion"
            >
                <div className="space-y-6">
                    <p>Êtes-vous sûr de vouloir vous déconnecter de Genevid ?</p>
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-5 py-2.5 rounded-full hover:bg-[#333537] transition-colors text-sm font-medium"
                        >
                            Annuler
                        </button>
                        <button
                            onClick={() => signOut()}
                            className={cn(
                                "px-6 py-2.5 rounded-full text-sm font-medium shadow-md transition-colors",
                                "bg-[#ea4335] text-white hover:bg-[#c53026]"
                            )}
                        >
                            Déconnexion
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
}