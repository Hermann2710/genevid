import { auth } from "@/auth";
import { Chat } from "@/lib/models/chat";
import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();
    const session = await auth();
    const { id } = await params;

    const chat = await Chat.findById(id);

    if (!chat)
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (chat.userId && chat.userId !== session?.user?.id)
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    return NextResponse.json(chat);
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
