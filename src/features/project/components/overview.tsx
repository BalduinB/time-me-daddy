import { Edit, Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ActionTooltip } from "@/components/ui/tooltip";
import { H2, H3 } from "@/components/ui/typography";
import { fDate } from "@/lib/formatters";
import type { Project } from "@/server/db/schema";

import { ProjectDescription } from "./description";

type ProjectOverviewProps = { project: Project };
export function ProjectOverview({ project }: ProjectOverviewProps) {
    return (
        <div className="space-y-2">
            <H2>{project.name}</H2>
            <ProjectDescription
                description={project.description}
                projectId={project.id}
            />
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
            <H3>Aufgaben</H3>
        </div>
    );
}
