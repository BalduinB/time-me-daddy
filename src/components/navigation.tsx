import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbEllipsis,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { api, HydrateClient } from "@/trpc/server";
import { cn } from "@/lib/utils";

export async function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    void api.projects.getList.prefetch();
    return (
        <HydrateClient>
            <Sidebar collapsible="icon" {...props}>
                <SidebarHeader>
                    <TeamSwitcher />
                </SidebarHeader>
                <SidebarContent>
                    <NavMain />
                    <NavProjects />
                </SidebarContent>
                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
        </HydrateClient>
    );
}

type Breadcrumb = {
    title: string;
    href: string;
};
type AppBreadcrumbProps = {
    items: Array<Breadcrumb>;
};
export function AppBreadcrumbs({ items }: AppBreadcrumbProps) {
    return (
        <header className="flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {items.map((item, index) => {
                            const isCurrent = index === items.length - 1;
                            const Comp = isCurrent
                                ? BreadcrumbPage
                                : BreadcrumbLink;
                            return (
                                <>
                                    <BreadcrumbItem key={index}>
                                        <Comp asChild href={item.href}>
                                            <Link href={item.href}>
                                                {item.title}
                                            </Link>
                                        </Comp>
                                    </BreadcrumbItem>
                                    {!isCurrent && <BreadcrumbSeparator />}
                                </>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
export function AppShell({
    className,
    ...props
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={cn("flex-1 p-4", className)} {...props} />;
}
