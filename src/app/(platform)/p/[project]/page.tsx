import { redirect } from "next/navigation";

import { AppBreadcrumbs, AppShell } from "@/components/navigation";
import { ProjectOverview } from "@/features/project/components/overview";
import { projectLink } from "@/lib/links";
import { api } from "@/trpc/server";

type ProjectProps = { params: { project: string } };
export default async function ProjectPage({ params }: ProjectProps) {
    const project = await api.projects.get(params.project);
    if (!project) {
        return redirect("/p/all");
    }
    return (
        <>
            <AppBreadcrumbs
                items={[
                    { href: projectLink(), title: "Übersicht" },
                    { title: project.name, href: projectLink(project.id) },
                ]}
            />
            <AppShell>
                <ProjectOverview project={project} />
            </AppShell>
        </>
    );
}
