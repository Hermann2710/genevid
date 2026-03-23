"use client"

import { Sparkles, Image as ImageIcon, Code, Search, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { useChatState } from "@/contexts/chat-context"

const SUGGESTIONS = [
  {
    id: "vision",
    title: "Analyser une image",
    desc: "Peux-tu m'expliquer ce que contient cette image ?",
    icon: <ImageIcon size={20} className="text-blue-500" />,
    color: "hover:border-blue-500/50",
    action: "file"
  },
  {
    id: "code",
    title: "Expert en Code",
    desc: "Aide-moi à déboguer ce composant React ou à optimiser cette requête SQL : ",
    icon: <Code size={20} className="text-emerald-500" />,
    color: "hover:border-emerald-500/50"
  },
  {
    id: "summarize",
    title: "Résumé de texte",
    desc: "Voici un texte, peux-tu me faire un résumé concis en 3 points clés ?\n\n[Colle ton texte ici]",
    icon: <FileText size={20} className="text-purple-500" />,
    color: "hover:border-purple-500/50"
  },
  {
    id: "brainstorm",
    title: "Brainstorming",
    desc: "Donne-moi 5 idées de projets SaaS innovants exploitant l'IA pour l'année 2026.",
    icon: <Search size={20} className="text-orange-500" />,
    color: "hover:border-orange-500/50"
  }
]

export default function Home() {
  const { setPrompt, triggerFileInput } = useChatState()

  const handleSuggestionClick = (suggestion: typeof SUGGESTIONS[0]) => {
    setPrompt(suggestion.desc)

    if (suggestion.action === "file") {
      triggerFileInput()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-10">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 bg-linear-to-r from-brand via-purple-500 to-orange-500 bg-clip-text text-transparent">
          Bonjour, comment puis-je vous aider ?
        </h1>
        <p className="text-foreground/50 text-lg font-medium">
          Propulsé par Gemini 1.5 Flash • Gratuit & Illimité
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl px-4">
        {SUGGESTIONS.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSuggestionClick(item)}
            className={cn(
              "flex flex-col p-5 bg-surface border border-border/40 rounded-3xl text-left transition-all duration-300",
              "hover:shadow-xl hover:-translate-y-1 active:scale-95 group outline-none focus-visible:ring-2 focus-visible:ring-brand",
              item.color
            )}
          >
            <div className="p-2 bg-background rounded-xl w-fit mb-4 border border-border/20 group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <h3 className="font-semibold text-foreground mb-1 leading-tight">
              {item.title}
            </h3>
            <p className="text-[11px] text-foreground/40 leading-relaxed line-clamp-2">
              {item.desc}
            </p>
          </button>
        ))}
      </div>

      <div className="mt-16 flex items-center gap-2 text-[10px] font-medium text-foreground/20 uppercase tracking-[0.2em]">
        <Sparkles size={12} />
        <span>Nano Banana 2 Engine Active</span>
      </div>
    </div>
  )
}