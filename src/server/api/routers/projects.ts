import { and, count, desc, eq } from "drizzle-orm";

import {
    CreateProjectSchema,
    EditProjectSchema,
    ProjectSchema,
} from "@/features/project/schema";
import { createTRPCRouter, withOrgProcedure } from "@/server/api/trpc";
import { projects, tasks } from "@/server/db/schema";
import { createID } from "@/server/ids";

export const projectRouter = createTRPCRouter({
    getList: withOrgProcedure.query(async ({ ctx }) => {
        return await ctx.db.query.projects.findMany({
            where: (proj, { eq }) => eq(proj.orgId, ctx.auth.orgId),
            orderBy: [desc(projects.isPinned), desc(projects.createdAt)],
        });
    }),
    getOverview: withOrgProcedure.query(async ({ ctx }) => {
        return await ctx.db
            .select({
                id: projects.id,
                name: projects.name,
                isPinned: projects.isPinned,
                createdAt: projects.createdAt,
                tasksCount: count(tasks.id),
                tasksDoneCount: count(tasks.id),
            })
            .from(projects)
            .leftJoin(tasks, eq(tasks.projectId, projects.id))
            .where(eq(projects.orgId, ctx.auth.orgId))
            .groupBy(projects.id)
            .orderBy(desc(projects.isPinned), desc(projects.createdAt));
    }),
    get: withOrgProcedure
        .input(ProjectSchema.shape.id)
        .query(async ({ ctx, input }) => {
            return ctx.db.query.projects.findFirst({
                where: (proj, { eq, and }) =>
                    and(eq(proj.orgId, ctx.auth.orgId), eq(proj.id, input)),
            });
        }),
    create: withOrgProcedure
        .input(CreateProjectSchema)
        .mutation(async ({ ctx, input }) => {
            const inserted = await ctx.db
                .insert(projects)
                .values({
                    id: createID("project"),
                    name: input.name,
                    orgId: ctx.auth.orgId,
                    ownerId: ctx.auth.userId,
                })
                .returning();
            return inserted[0]!;
        }),
    edit: withOrgProcedure
        .input(EditProjectSchema.merge(ProjectSchema.pick({ id: true })))
        .mutation(async ({ ctx, input: { id, ...updatedData } }) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const inserted = await ctx.db
                .update(projects)
                .set(updatedData)
                .where(
                    and(
                        eq(projects.orgId, ctx.auth.orgId),
                        eq(projects.id, id),
                    ),
                )
                .returning();
            return inserted[0]!;
        }),
});
