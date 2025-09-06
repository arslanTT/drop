import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// Helper: recursively delete a folder subtree (DB only)
async function deleteSubtree(userId: string, itemId: string) {
  const [item] = await db
    .select()
    .from(files)
    .where(and(eq(files.id, itemId), eq(files.userId, userId)));
  if (item.isFolder) {
    const children = await db
      .select()
      .from(files)
      .where(and(eq(files.parentId, item.id), eq(files.userId, item.userId)));

    for (const child of children) {
      await deleteSubtree(userId, child.id);
    }
  }
  await db
    .delete(files)
    .where(and(eq(files.id, item.id), eq(files.userId, userId)));
}

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ itemId: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized request" },
        { status: 401 }
      );
    }
    const { itemId } = await props.params;

    const [file] = await db
      .select()
      .from(files)
      .where(and(eq(files.id, itemId), eq(files.userId, userId)));

    if (!file) {
      return NextResponse.json({ message: "file not found" }, { status: 404 });
    }

    const [updatedFile] = await db
      .update(files)
      .set({ isStarred: !file.isStarred })
      .where(and(eq(files.id, file.id), eq(files.userId, userId)))
      .returning();

    return NextResponse.json(
      { message: "File status updated successfully", updatedFile },
      { status: 200 }
    );
  } catch (error) {
    console.error("✅", error);
    return NextResponse.json(
      { error: "failed to update item status" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  props: { params: Promise<{ itemId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized request" },
        { status: 401 }
      );
    }
    const { itemId } = await props.params;
    if (!itemId) {
      return NextResponse.json(
        { error: "itemId is required" },
        { status: 400 }
      );
    }

    const [file] = await db
      .select()
      .from(files)
      .where(and(eq(files.id, itemId), eq(files.userId, userId)));

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    await deleteSubtree(userId, itemId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
