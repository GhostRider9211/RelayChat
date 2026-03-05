import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Inter as FontSans} from "next/font/google";
import { cn } from "@/lib/utils";
import SessionProvider from "@/providers/SessionProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RealyChat",
  description: "Real time chat application built with Next.js and Socket.IO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <SessionProvider>
        <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        {children}
         <Toaster richColors duration={5000} />
      </body>
      </SessionProvider>
    </html>
  );
}
