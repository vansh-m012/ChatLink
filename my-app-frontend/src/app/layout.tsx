// layout.tsx is like App.jsx and page.tsx is like a parent component of all other components

import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SessionProvider from "@/providers/SessionProvider";

import { Toaster } from "@/components/ui/sonner";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});



export const metadata: Metadata = {
  title: "Quick Chat App",
  description: "For chatting as quick as possible",
};


// anything written inside <> ..... </> is a children
export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) { 

  return (

    <html lang="en" suppressHydrationWarning>

      <SessionProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          {children}
          <Toaster richColors duration={5000} />
         
        </body>
      </SessionProvider>

    </html>
  );
}
