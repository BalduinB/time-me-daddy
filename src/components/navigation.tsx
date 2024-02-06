"use client";

import { useMediaQuery } from "usehooks-ts";
import { Menu } from "lucide-react";

import { SideBar } from "@/components/navigation/side-bar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { H2, H3 } from "@/components/typography/heading";

export function Navigation() {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return <aside>{isDesktop ? <DesktopSideBar /> : <MobileSideBar />}</aside>;
}

function DesktopSideBar() {
    return (
        <div className="w-60">
            <H2>TimeMe</H2>
            <SideBar />
        </div>
    );
}

function MobileSideBar() {
    return (
        <nav className="flex justify-between p-2">
            <H2>TimeMe</H2>
            <Sheet>
                <SheetTrigger>
                    <Button
                        size={"icon"}
                        className="shrink-0"
                        variant={"ghost"}
                    >
                        <Menu className="h-4 w-4" />
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SideBar />
                </SheetContent>
            </Sheet>
        </nav>
    );
}
