import { auth } from "@/auth";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Chat } from "@/lib/models/chat";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const session = await auth();

    const { prompt, images, chatId } = await req.json();

    let currentChat;

    if (chatId) {
      currentChat = await Chat.findById(chatId);
    } else {
      currentChat = new Chat({
        userId: session?.user?.id || null,
        title: prompt.substring(0, 50),
        messages: [],
      });
    }

    const history = currentChat.messages.map((m: any) => ({
      role: m.role,
      parts: m.parts.map((p: any) => ({ text: p.text })),
    }));

    const contentParts: any[] = [];

    if (images && images.length > 0) {
      images.forEach((img: { data: string; mimeType: string }) => {
        contentParts.push({
          inlineData: {
            data: img.data,
            mimeType: img.mimeType,
          },
        });
      });
    }

    contentParts.push({ text: prompt });

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, { role: "user", parts: contentParts }],
    });

    const aiText = response.text;

    currentChat.messages.push(
      { role: "user", parts: [{ text: prompt }] },
      { role: "model", parts: [{ text: aiText }] },
    );

    await currentChat.save();

    return NextResponse.json({
      text: aiText,
      chatId: currentChat._id,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
