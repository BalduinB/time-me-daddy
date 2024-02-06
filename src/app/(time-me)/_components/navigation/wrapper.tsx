import { Menu } from "lucide-react";

import { SideBar } from "@/app/(time-me)/_components/navigation/side-bar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { H2 } from "@/components/typography/heading";
import { api } from "@/trpc/server";

export async function Navigation() {
    const user = await api.user.get.query();
    return (
        <aside>
            <DesktopSideBar user={user} /> <MobileSideBar user={user} />
        </aside>
    );
}
export type Props = {
    user: Awaited<ReturnType<typeof api.user.get.query>>;
};
function DesktopSideBar(props: Props) {
    return (
        <div className="hidden h-screen w-60 flex-col border-r md:flex">
            <H2>TimeMe</H2>
            <SideBar {...props} />
        </div>
    );
}

function MobileSideBar(props: Props) {
    return (
        <div className="flex justify-between p-2 md:hidden">
            <H2>TimeMe</H2>
            <Sheet>
                <SheetTrigger asChild>
                    <Button size={"icon"} variant={"ghost"}>
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SideBar {...props} />
                </SheetContent>
            </Sheet>
        </div>
    );
}
