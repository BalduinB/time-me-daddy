import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ClerkProvider } from "@clerk/nextjs";

import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/contexts/theme";
import type { Metadata } from "next/types";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
    title: "Time me",
    description: "A website to keep track of stuff.",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${GeistSans.variable} ${GeistMono.variable} flex flex-col font-sans md:flex-row`}
                >
                    <TRPCReactProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="system"
                            enableSystem
                            disableTransitionOnChange
                        >
                            <Navigation />
                            <main className="grow">{children}</main>
                        </ThemeProvider>
                    </TRPCReactProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
