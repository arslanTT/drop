"use client";
import { ImageKitProvider } from "@imagekit/next";
export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ImageKitProvider
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string}
    >
      {children}
    </ImageKitProvider>
  );
}
