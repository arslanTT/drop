import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
// import { ThemeProvider } from "@/components/theme-provider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "CloudNest",
  description: "Upload and share files with ease.",
  icons: {
    icon: "/favicon.svg", // ✅ favicon
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ClerkProvider>
          <Providers>{children}</Providers>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
