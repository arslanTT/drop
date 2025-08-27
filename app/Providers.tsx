"use client";
// import type { ThemeProviderProps } from "next-themes";
import { ImageKitProvider } from "@imagekit/next";
// import { useRouter } from "next/navigation";
export interface ProvidersProps {
  children: React.ReactNode;
  //   themeProps?: ThemeProviderProps;
}

// const authenticator = async () => {
//   try {
//     const response = fetch("/api/imagekit-auth");
//     const data = (await response).json();
//     return data;
//   } catch (error) {
//     console.log("Authentication Error", error);
//     throw error;
//   }
// };
export function Providers({ children }: ProvidersProps) {
  //   const router = useRouter();
  return (
    <ImageKitProvider
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string}
    >
      {children}
    </ImageKitProvider>
  );
}
