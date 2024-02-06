import { SignInButton, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ServiceName } from "@/components/service-name";

export async function LandingPageHeader() {
    const { userId } = auth();
    return (
        <div className="flex justify-between p-1.5">
            <ServiceName />
            {userId ? (
                <div className="flex items-center gap-2">
                    <UserButton />
                    <Button asChild>
                        <Link href={"/groups"}>Deine Gruppen</Link>
                    </Button>
                </div>
            ) : (
                <Button asChild>
                    <SignInButton afterSignInUrl="/groups" afterSignUpUrl="/groups" />
                </Button>
            )}
        </div>
    );
}
