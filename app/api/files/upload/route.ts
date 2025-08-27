// import { db } from "@/lib/db";
// // import { files } from "@/lib/db/schema";
// import { auth } from "@clerk/nextjs/server";
// // import { and, eq } from "drizzle-orm";
// import { NextRequest, NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";
// import { getUploadAuthParams } from "@imagekit/next/server";
// import { upload } from "@imagekit/next";
// const imagekit = getUploadAuthParams({
//   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
//   // urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
// });

// export async function POST(request: NextRequest) {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json(
//         { error: "Unauthorized request" },
//         { status: 401 }
//       );
//     }
//     // console.log(userId);
//     // console.log("Hello im here!!!!!!!!!!");

//     const formData = await request.formData();
//     const file = formData.get("file") as File;
//     const formUserId = formData.get("userId") as string;
//     // const parentId = (formData.get("parentId") as string) || null;

//     if (formUserId !== userId) {
//       return NextResponse.json(
//         { error: "Unauthorized request here" },
//         { status: 401 }
//       );
//     }

//     if (!file) {
//       return NextResponse.json(
//         { error: "No file was provided!" },
//         { status: 401 }
//       );
//     }
//     // console.log(file);
//     // if (!parentId) {
//     //   return NextResponse.json(
//     //     { error: "Parent folder not found!" },
//     //     { status: 401 }
//     //   );
//     // }

//     // if (parentId) {
//     //   const [parentFolder] = await db
//     //     .select()
//     //     .from(files)
//     //     .where(
//     //       and(
//     //         eq(files.id, parentId),
//     //         eq(files.userId, userId),
//     //         eq(files.isFolder, true)
//     //       )
//     //     );
//     // }
//     if (!(file.type.startsWith("image/") || file.type === "application/pdf")) {
//       return NextResponse.json(
//         { error: "Only image formats and PDF are allowed to upload!" },
//         { status: 400 }
//       );
//     }

//     const buffer = await file.arrayBuffer();
//     const fileBuffer = Buffer.from(buffer);
//     console.log("Till here Everything is good", fileBuffer);
//     const folderPath = true
//       ? `/droply/${userId}/folder/${"parentId"}`
//       : `/droply/${userId}`;
//     const originalFileName = file.name;
//     const fileExtension = originalFileName.split(".").pop() || "";
//     const uniqueFileName = `${uuidv4()}.${fileExtension}`;
//     // console.log("Till here Everything is good", fileBuffer);

//     // const uploadResponse = await upload({
//     //   file: file,
//     //   fileName:file.name,
//     //   size
//     //   expire: imagekit.expire,
//     //   signature: imagekit.signature,
//     //   token: imagekit.token,
//     // });

//     console.log(uploadResponse);
//     // const fileData = {
//     //   name: originalFileName,
//     //   path: uploadResponse.filePath,
//     //   size: file.size,
//     //   type: file.type,
//     //   fileUrl: uploadResponse.url,
//     //   thumbnailUrl: uploadResponse.thumbnailUrl || null,
//     //   userId: userId,
//     //   parentId: parentId,
//     //   isFolder: false,
//     //   isStarred: false,
//     //   isTrash: false,
//     // };
//     // const [newFile] = await db.insert(files).values(fileData).returning();
//     return NextResponse.json(file.name);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { error: "Failed to upload file here" },
//       { status: 500 }
//     );
//   }
// }
