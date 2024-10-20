"use client";
import { OrganizationList } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";

export default function CreateNewOrgPage() {
    const { theme } = useTheme();
    return (
        <div className="grid h-full place-content-center items-center">
            <OrganizationList
                hidePersonal
                afterCreateOrganizationUrl={"/home"}
                afterSelectOrganizationUrl={"/home"}
                appearance={{
                    baseTheme: theme === "dark" ? dark : undefined,
                }}
            />
        </div>
    );
}
