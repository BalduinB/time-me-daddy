"use client";

import Image from "next/image";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { CreditCard, Layout, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export type Organization = {
    id: string;
    slug: string | null;
    imageUrl: string;
    name: string;
};

interface NavItemProps<TOrg> {
    isExpanded: boolean;
    isActive: boolean;
    organization: TOrg;
    onExpand: (id: string) => void;
}

export const NavItem = <TOrg extends Organization>({
    isExpanded,
    isActive,
    organization,
    onExpand,
}: NavItemProps<TOrg>) => {
    const router = useRouter();
    const pathname = usePathname();

    const routes = [
        {
            label: "Themen",
            icon: <Layout className="mr-2 h-4 w-4" />,
            href: `/company/${organization.id}`,
        },
        {
            label: "Settings",
            icon: <Settings className="mr-2 h-4 w-4" />,
            href: `/company/${organization.id}/settings`,
        },
        {
            label: "Billing",
            icon: <CreditCard className="mr-2 h-4 w-4" />,
            href: `/company/${organization.id}/billing`,
        },
    ];

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const onClick = (href: string) => {
        router.push(href);
    };

    return (
        <AccordionItem value={organization.id} className="border-none">
            <AccordionTrigger
                onClick={() => onExpand(organization.id)}
                className={cn(
                    "gap-x-2 rounded-lg p-1.5 text-start no-underline hover:bg-accent/50 hover:text-accent-foreground hover:no-underline",
                    isActive && !isExpanded && "bg-accent text-accent-foreground",
                )}
            >
                <div className="flex items-center gap-x-2">
                    <div className="relative h-7 w-7">
                        <Image
                            fill
                            src={organization.imageUrl}
                            alt="Organization"
                            className="rounded-sm object-cover"
                        />
                    </div>
                    <span className="text-sm font-medium">{organization.name}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
                {routes.map((route) => (
                    <Button
                        key={route.href}
                        size="sm"
                        onClick={() => onClick(route.href)}
                        className={cn(
                            "mb-1 w-full justify-start pl-10 font-normal",
                            pathname === route.href && "bg-accent text-accent-foreground",
                        )}
                        variant="ghost"
                    >
                        {route.icon}
                        {route.label}
                    </Button>
                ))}
            </AccordionContent>
        </AccordionItem>
    );
};

NavItem.Skeleton = function SkeletonNavItem() {
    return (
        <div className="flex items-center gap-x-2">
            <div className="relative h-10 w-10 shrink-0">
                <Skeleton className="absolute h-full w-full" />
            </div>
            <Skeleton className="h-10 w-full" />
        </div>
    );
};
