"use client";

import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { isLoaded, setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });
  const { organization: currentOrg, isLoaded: isCurrLoaded } =
    useOrganization();

  if (!isLoaded || !isCurrLoaded) {
    return <TeamSwitcherSkeleton />;
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-7">
                <AvatarImage src={currentOrg?.imageUrl} />
                <AvatarFallback>
                  {currentOrg?.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentOrg?.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Teams
            </DropdownMenuLabel>
            {userMemberships.data.map((membership, index) => (
              <DropdownMenuItem
                key={membership.id}
                onClick={() =>
                  setActive({ organization: membership.organization.id })
                }
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Avatar className="size-7">
                    <AvatarImage src={membership.organization.imageUrl} />
                    <AvatarFallback>
                      {membership.organization.name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                </div>
                {membership.organization.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            {userMemberships.hasNextPage && (
              <button onClick={userMemberships.fetchNext}>MOOOORE</button>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2" asChild>
              <Link href={"/create-org"}>
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Organisation
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function TeamSwitcherSkeleton() {
  return (
    <div
      data-sidebar="menu-skeleton"
      className={"flex h-12 items-center gap-2 rounded-md px-2"}
    >
      <Skeleton
        className="size-7 rounded-full"
        data-sidebar="menu-skeleton-icon"
      />
      <Skeleton className="h-5 flex-1" data-sidebar="menu-skeleton-text" />
    </div>
  );
}
