"use client";

import Link from "next/link";

import { SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

export function UserAction() {
    return (
        <>
            <SignedIn>
                <Button size={"sm"}>
                    <Link href={"/home"}>Zum Account</Link>
                </Button>
            </SignedIn>
            <SignedOut>
                <SignUpButton>Registrieren</SignUpButton>
            </SignedOut>
        </>
    );
}
