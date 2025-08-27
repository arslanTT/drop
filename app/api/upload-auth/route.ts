// import { auth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// // import ImageKit from "@imagekit/next";
// import { getUploadAuthParams } from "@imagekit/next/server";

// // const imagekit = new ImageKit({
//   publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
//   urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
// });

/*
// File: app/api/upload-auth/route.ts

export async function GET() {
    // Your application logic to authenticate the user
    // For example, you can check if the user is logged in or has the necessary permissions
    // If the user is not authenticated, you can return an error response

    const { token, expire, signature } = getUploadAuthParams({
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
        // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
        // token: "random-token", // Optional, a unique token for request
    })

    return Response.json({ token, expire, signature, publicKey: process.env.IMAGEKIT_PUBLIC_KEY })
}
*/

// export async function GET() {
//   try {
//     const { userId } = await auth();
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     const imageKitAuthParamaters = getUploadAuthParams({
//       privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
//       publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
//       // expire: 30 * 60, // Optional, controls the expiry time of the token in seconds, maximum 1 hour in the future
//       // token: "random-token", // Optional, a unique token for request
//     });
//     // const authParams = imagekit.getAuthenticationParameters();
//     return Response.json({
//       imageKitAuthParamaters,
//       publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to generate authentication parameters for imagekit " },
//       { status: 500 }
//     );
//   }
// }

//////////////////////////////
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { token, expire, signature } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string, // Never expose this on client side
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    });
    return Response.json({
      token,
      expire,
      signature,
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate authentication parameters for imagekit " },
      { status: 500 }
    );
  }
}
