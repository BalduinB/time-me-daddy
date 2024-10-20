import { AppBreadcrumbs, AppShell } from "@/components/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ActionTooltip, Tooltip } from "@/components/ui/tooltip";
import { H2, H3, P } from "@/components/ui/typography";
import { fDate } from "@/lib/formatters";
import { projectLink } from "@/lib/links";
import { cn, debugStringify } from "@/lib/utils";
import { api } from "@/trpc/server";
import { Edit, Plus } from "lucide-react";
import { redirect } from "next/navigation";

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
                    { href: projectLink(), title: "Projekte" },
                    { title: project.name, href: projectLink(project.id) },
                ]}
            />
            <AppShell className="space-y-4">
                <H2>{project.name}</H2>
                <div>
                    <P size={"sm"}>Beschreibung</P>
                    <P className={cn(!project.description && "italic")}>
                        {project.description
                            ? project.description
                            : "keine Beschreibung..."}
                    </P>
                    <div className="flex justify-end gap-2">
                        <ActionTooltip content="erstellt am">
                            <Badge variant={"secondary"}>
                                <Plus className="-mt-0.5 mr-1 inline size-5" />
                                {fDate(project.createdAt)}
                            </Badge>
                        </ActionTooltip>
                        <ActionTooltip content="zuletzt bearbeitet am">
                            <Badge variant={"secondary"}>
                                <Edit className="-mt-0.5 mr-1 inline size-5" />
                                {fDate(project.updatedAt)}
                            </Badge>
                        </ActionTooltip>
                    </div>
                </div>
                <H3>Aufgaben</H3>
            </AppShell>
        </>
    );
}
