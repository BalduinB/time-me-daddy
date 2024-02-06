import { LandingPageHeader } from "./_components/header";

export default function LandingPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex w-full flex-col">
            <LandingPageHeader />
            <main>{children}</main>
        </div>
    );
}
