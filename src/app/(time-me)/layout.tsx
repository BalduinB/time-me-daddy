import { Navigation } from "@/app/(time-me)/_components/navigation/wrapper";
import { OrgControl } from "./(routes)/groups/_components/org-control";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navigation />
            <main className="grow p-2 md:p-4">{children}</main>
        </>
    );
}
