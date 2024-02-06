"use client";

import Link from "next/link";
import { UserButton, useOrganization, useOrganizationList } from "@clerk/nextjs";
import { useLocalStorage } from "usehooks-ts";

import { ToggleTheme } from "@/components/toggle-theme";
import { Accordion } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { H3 } from "@/components/typography/heading";

import { CreateUser } from "../create-user";
import { EditUser } from "../edit-user";
import { Props } from "./wrapper";
import { NavItem } from "./item";

export function SideBar({ user }: Props) {
    const { organization: activeOrganization } = useOrganization();
    const { isLoaded: isOrgansiationsLoaded, userMemberships } = useOrganizationList({
        userMemberships: { infinite: true },
    });
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>("time-me-daddy-nav", {});
    const defaultAccordionValue: string[] = Object.keys(expanded ?? {}).reduce((acc: string[], key: string) => {
        if (expanded[key]) {
            acc.push(key);
        }

        return acc;
    }, []);
    const onExpand = (id: string) => {
        setExpanded((curr) => ({
            ...curr,
            [id]: !expanded[id],
        }));
    };
    return (
        <nav className="flex grow flex-col justify-between p-1 md:p-2">
            <div className="space-y-2">
                {user ? <EditUser user={user} /> : <CreateUser />}
                <H3>Deine Gruppen</H3>
                <Accordion type="multiple" defaultValue={defaultAccordionValue}>
                    {isOrgansiationsLoaded ? (
                        !!userMemberships.data.length ? (
                            userMemberships.data.map(({ organization }) => (
                                <NavItem
                                    key={organization.id}
                                    isActive={activeOrganization?.id === organization.id}
                                    isExpanded={expanded[organization.id]}
                                    organization={organization}
                                    onExpand={onExpand}
                                />
                            ))
                        ) : (
                            <Alert className="hidden first:block">
                                <AlertTitle>Du hast keine Gruppe</AlertTitle>
                                <AlertDescription>
                                    <Button asChild className="mx-auto" size={"sm"}>
                                        <Link href="/groups">Jetzt Erstellen</Link>
                                    </Button>
                                </AlertDescription>
                            </Alert>
                        )
                    ) : (
                        <NavItem.Skeleton />
                    )}
                </Accordion>
            </div>
            <div className="flex justify-around gap-2">
                <ToggleTheme />
                <UserButton />
            </div>
        </nav>
    );
}
