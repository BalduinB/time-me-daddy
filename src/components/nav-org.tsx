"use client";
import { MoreHorizontal, Settings, UsersIcon } from "lucide-react";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const orgActions = [
    {
        name: "Mitglieder",
        url: "/members",
        icon: UsersIcon,
        role: "admin",
    },
    {
        name: "Einstellungen",
        url: "#",
        icon: Settings,
        role: "admin",
    },
];
export function NavOrganisation() {
    const pathname = usePathname();
    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Organisation</SidebarGroupLabel>
            <SidebarMenu>
                {orgActions.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton
                            asChild
                            isActive={item.url === pathname}
                        >
                            <Link href={item.url}>
                                <item.icon />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
