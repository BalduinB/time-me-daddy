import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ClerkProvider } from "@clerk/nextjs";

import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/contexts/theme";
import type { Metadata } from "next/types";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/env";

export const metadata: Metadata = {
    title: "Time me",
    description: "A website to keep track of stuff.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${GeistSans.variable} ${GeistMono.variable} flex min-h-screen flex-col font-sans md:flex-row`}
                >
                    <TRPCReactProvider>
                        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                            <Toaster />
                            {children}
                            {env.NEXT_PUBLIC_NODE_ENV === "development" ? <TwBreakPointDebug /> : null}
                        </ThemeProvider>
                    </TRPCReactProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}

function TwBreakPointDebug() {
    return (
        <div className="fixed bottom-1 right-1 rounded-lg border border-border px-3 py-0.5">
            <span className="block sm:hidden">xs</span>
            <span className="hidden sm:block md:hidden">sm</span>
            <span className="hidden md:block lg:hidden">md</span>
            <span className="hidden lg:block xl:hidden">lg</span>
            <span className="hidden xl:block 2xl:hidden">xl</span>
            <span className="hidden 2xl:block">2xl</span>
        </div>
    );
}
