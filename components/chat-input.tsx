"use client"

import { ImageIcon, MicIcon, SendIcon } from "lucide-react";
import { IconButton } from "./ui/icon-button";
import { appConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function ChatInput() {
    return (
        <div className="sticky bottom-0 w-full bg-linear-to-t from-background via-background to-transparent pb-8 px-4">
            <div className="max-w-3xl mx-auto bg-surface rounded-2xl p-2 border border-border/40 focus-within:border-brand transition-all shadow-xl">
                <textarea
                    placeholder={`Demander à ${appConfig.appName}`}
                    className="w-full bg-transparent border-none outline-none p-3 resize-none text-lg min-h-14 max-h-50 text-foreground placeholder:text-foreground/40"
                    rows={1}
                />
                <div className="flex justify-between items-center px-2 pb-1">
                    <div className="flex gap-1">
                        <IconButton
                            icon={<ImageIcon size={20} />}
                            className="text-foreground/60 hover:bg-foreground/10"
                        />
                        <IconButton
                            icon={<MicIcon size={20} />}
                            className="text-foreground/60 hover:bg-foreground/10"
                        />
                    </div>
                    <IconButton
                        icon={<SendIcon size={20} />}
                        primary
                        className="bg-brand text-foreground hover:opacity-90 active:scale-95"
                    />
                </div>
            </div>
            <p className="text-[11px] text-center mt-3 text-foreground/40 px-6">
                {appConfig.appName} peut afficher des informations inexactes, y compris sur des personnes, alors vérifiez ses réponses.
            </p>
        </div>
    )
}