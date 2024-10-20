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
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { api } from "@/trpc/server";

export async function AppSidebar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const projects = await api.projects.getList();
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher />
            </SidebarHeader>
            <SidebarContent>
                <NavMain projects={projects} />
                <NavProjects />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
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
        <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {items.map((item, index) => (
                            <BreadcrumbItem key={index}>
                                <BreadcrumbLink asChild href={item.href}>
                                    <Link href={item.href}>{item.title}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}
