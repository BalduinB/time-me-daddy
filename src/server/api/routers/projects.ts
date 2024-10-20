import { CreateProjectSchema, ProjectSchema } from "@/features/project/schema";
import { createTRPCRouter, withOrgProcedure } from "@/server/api/trpc";
import { projects } from "@/server/db/schema";
import { createID } from "@/server/ids";

export const projectRouter = createTRPCRouter({
    getList: withOrgProcedure.query(async ({ ctx }) => {
        return ctx.db.query.projects.findMany({
            where: (proj, { eq }) => eq(proj.orgId, ctx.auth.orgId),
            orderBy: (projects, { desc }) => [desc(projects.createdAt)],
        });
    }),
    get: withOrgProcedure
        .input(ProjectSchema.shape.id)
        .query(async ({ ctx, input }) => {
            return ctx.db.query.projects.findFirst({
                where: (proj, { eq, and }) =>
                    and(eq(proj.orgId, ctx.auth.orgId), eq(proj.id, input)),
                with: {},
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
});
