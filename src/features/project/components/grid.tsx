"use client";

import Link from "next/link";
import { useState } from "react";

import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import { toast } from "sonner";

import { ResponsiveGrid } from "@/components/responsive-grid";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { H3 } from "@/components/ui/typography";
import { projectLink } from "@/lib/links";
import { cn } from "@/lib/utils";
import type { ProjectRouterOutput } from "@/server/api/root";
import { api } from "@/trpc/react";

export function ProjectGrid() {
    const [data] = api.projects.getOverview.useSuspenseQuery();
    return (
        <div>
            <H3>Alle Projekte</H3>
            <ResponsiveGrid minWidth={300} className="mt-4 gap-4">
                {data.map((project) => (
                    <motion.div key={project.id} layout>
                        <Card>
                            <CardHeader className="flex-row items-center">
                                <CardTitle>
                                    <Link
                                        href={projectLink(project.id)}
                                        className="hover:underline"
                                    >
                                        {project.name}
                                    </Link>
                                </CardTitle>
                                <ProjectPinned project={project} />
                            </CardHeader>
                            <CardContent>
                                {project.tasksCount}/{project.tasksDoneCount}{" "}
                                Aufgaben erledigt
                            </CardContent>
                            <CardFooter></CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </ResponsiveGrid>
        </div>
    );
}

function ProjectPinned({
    project,
}: {
    project: ProjectRouterOutput["getOverview"][number];
}) {
    const [isPinned, setIsPinned] = useState(project.isPinned);
    const util = api.useUtils();
    const { mutate, isPending } = api.projects.edit.useMutation({
        onSuccess: async () => await util.projects.invalidate(),
        onError: () => {
            setIsPinned(project.isPinned);
            toast.error("Fehler beim Pinnen");
        },
    });
    return (
        <button
            className="ml-auto"
            disabled={isPending}
            onClick={() => {
                setIsPinned(!isPinned);
                mutate({ id: project.id, isPinned: !isPinned });
            }}
        >
            <Pin className={cn("rotate-45", isPinned && "fill-foreground")} />
        </button>
    );
}
