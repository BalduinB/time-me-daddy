"use client";

import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { CreateProjectDialog } from "@/features/project/components/create";
import { Project } from "@/server/db/schema";
import { api } from "@/trpc/react";
import Link from "next/link";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronRight, Icon } from "lucide-react";
import { Icons } from "./ui/icons";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";

export function NavMain() {
    const [projects] = api.projects.getList.useSuspenseQuery();
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Projekte</SidebarGroupLabel>
            <SidebarMenu>
                <CreateProjectDialog />
                {projects.map((project) => (
                    <ProjectButton {...project} key={project.id} />
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

const projectNav = [
    { name: "Übersicht", url: "" },
    { name: "Aufgaben", url: "/tasks" },
    { name: "Fortschritt", url: "/progress" },
];
function ProjectButton(project: Project) {
    const [isOpen, setIsOpen] = useState(false);
    const { project: pId } = useParams();
    const currentPathname = usePathname();
    const isCurrent = pId === project.id;
    return (
        <Collapsible
            open={isOpen || isCurrent}
            onOpenChange={setIsOpen}
            asChild
            className="group/collapsible"
        >
            <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={project.name}>
                        <Icons.radix />
                        <Link className="grow" href={`/p/${project.id}`}>
                            {project.name}
                        </Link>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <SidebarMenuSub>
                        {projectNav.map((subItem) => {
                            const pathname = `/p/${project.id}${subItem.url}`;
                            return (
                                <SidebarMenuSubItem key={subItem.name}>
                                    <SidebarMenuSubButton
                                        asChild
                                        isActive={isCurrentSubItem(
                                            pathname,
                                            currentPathname,
                                        )}
                                    >
                                        <Link href={pathname}>
                                            {subItem.name}
                                        </Link>
                                    </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                            );
                        })}
                    </SidebarMenuSub>
                </CollapsibleContent>
            </SidebarMenuItem>
        </Collapsible>
    );
}

function isCurrentSubItem(url: string, current: string) {
    return url === current;
}
