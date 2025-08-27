import { db } from "@/lib/db";
import { files } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request:NextRequest,
    props: {params: Promise<{fileId:string}>}
){

  try {
      const {userId} = await auth();
      if (!userId) {
          return NextResponse.json({error:"unauthorized request"},{status:401})
      }
  
      const {fileId} =await props.params
      if(!fileId){
          return NextResponse.json({error:"fileId is required"},{status:401})
      }
  
      const [file] = await db.select().from(files).where(
          and(
              eq(files.id, fileId),
              eq(files.userId, userId)
          )
      )
  
      if (!file) {
          return NextResponse.json({error:"File not found! Please select correct file."},{status:404})
      }
  
      const updatedFiles = await db.update(files).set({isStarred: !files.isStarred}).where(
          and(
              eq(files.id, fileId),
              eq(files.userId, userId)
          )
      ).returning();
  
      const updatedFile = updatedFiles[0];
      return NextResponse.json(updatedFile)
  } catch (error) {
    return NextResponse.json({error:"failed  to star  the file!"}, {status:500});
  }
}