import { H2 } from "@/components/typography/heading";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

export async function LandingPageHeader() {
    const { userId } = auth();
    return (
        <div className="flex justify-between p-1.5">
            <H2>TimeMe</H2>
            {userId ? (
                <div className="flex items-center gap-2">
                    <UserButton />
                    <Button asChild>
                        <Link href={"/you"}>Dein Account</Link>
                    </Button>
                </div>
            ) : (
                <Button asChild>
                    <SignInButton afterSignInUrl="/home" afterSignUpUrl="/home" />
                </Button>
            )}
        </div>
    );
}
