import { OrganizationList } from "@clerk/nextjs";

export default function HomePage() {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <OrganizationList
                hidePersonal
                afterSelectOrganizationUrl="/groups/:id"
                afterCreateOrganizationUrl="/groups/:id"
            />
        </div>
    );
}
