import { AppShell } from "@/components/navigation";
import { ProjectGrid } from "@/features/project/components/grid";
import { HydrateClient, api } from "@/trpc/server";

export default async function HomePage() {
    void api.projects.getOverview.prefetch();
    return (
        <HydrateClient>
            <AppShell>
                <ProjectGrid />
            </AppShell>
        </HydrateClient>
    );
}
