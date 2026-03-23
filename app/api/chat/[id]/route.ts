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
    const { id } = await params;
    const session = await auth();

    const chat = await Chat.findById(id);
    if (!chat)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (chat.userId && chat.userId !== session?.user?.id && !chat.isShared) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json(chat);
  } catch (err) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const session = await auth();
    const body = await req.json();

    const chat = await Chat.findOne({ _id: id, userId: session?.user?.id });
    if (!chat)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    if (body.title !== undefined) chat.title = body.title;
    if (body.isPinned !== undefined) chat.isPinned = body.isPinned;
    if (body.isShared !== undefined) {
      chat.isShared = body.isShared;
      if (body.isShared && !chat.shareToken) {
        chat.shareToken = Math.random().toString(36).substring(2, 15);
      }
    }

    await chat.save();
    return NextResponse.json(chat);
  } catch (err) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const session = await auth();

    const result = await Chat.deleteOne({ _id: id, userId: session?.user?.id });
    if (result.deletedCount === 0)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
