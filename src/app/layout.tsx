import { cn } from "@/lib/utils";
import { GeistSans } from 'geist/font/sans';
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./Providers";

export const metadata: Metadata = {
  title: "AI Background Remover",
  description: "Remove image background automatically in one click",
  creator: "WEB PROJECT SOLUTIONS LTD",
};
export const viewport: Viewport = {
  width: 'device-width',
  minimumScale: 1,
  initialScale: 1,
  userScalable: false
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={cn(
        "min-h-dvh bg-background antialiased",
        GeistSans.className
      )}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
