import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    userId: { type: String, required: false },
    title: { type: String, default: "Nouvelle discussion" },
    messages: [
      {
        role: { type: String, enum: ["user", "model"], required: true },
        parts: [{ text: { type: String, required: true } }],
        createdAt: { type: Date, default: Date.now },
      },
    ],
    agentId: { type: String, default: "gemini-1.5-flash" },
  },
  { timestamps: true },
);

export const Chat = mongoose.models.Chat || mongoose.model("Chat", ChatSchema);
