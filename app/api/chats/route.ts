import { auth } from "@/auth";
import { Chat } from "@/lib/models/chat";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDatabase();
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json([]);
    }

    const chats = await Chat.find({ userId: session.user.id })
      .sort({ updatedAt: -1 })
      .select("title isPinned _id")
      .limit(20);

    return NextResponse.json(chats);
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
