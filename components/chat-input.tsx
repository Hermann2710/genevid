import { ImageIcon, MicIcon, SendIcon } from "lucide-react";
import { IconButton } from "./ui/icon-button";
import { appConfig } from "@/lib/config";

export function ChatInput() {
    return (
        <div className="sticky bottom-0 w-full bg-linear-to-t from-[#131314] via-[#131314] to-transparent pb-8 px-4">
            <div className="max-w-3xl mx-auto bg-[#1e1f20] rounded-2xl p-2 border border-transparent focus-within:border-[#4285f4] transition-all shadow-xl">
                <textarea
                    placeholder="Ask Gemini"
                    className="w-full bg-transparent border-none outline-none p-3 resize-none text-lg min-h-14 max-h-50"
                    rows={1}
                />
                <div className="flex justify-between items-center px-2 pb-1">
                    <div className="flex gap-1">
                        <IconButton icon={<ImageIcon />} />
                        <IconButton icon={<MicIcon />} />
                    </div>
                    <IconButton icon={<SendIcon />} primary />
                </div>
            </div>
            <p className="text-[11px] text-center mt-3 text-gray-500">
                {appConfig.appName} may display inaccurate info, including about people, so double-check its responses.
            </p>
        </div>
    )
}