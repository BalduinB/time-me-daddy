import { CreateProjectSchema } from "@/features/project/schema";
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
    create: withOrgProcedure
        .input(CreateProjectSchema)
        .mutation(async ({ ctx, input }) => {
            return ctx.db.insert(projects).values({
                id: createID("project"),
                name: input.name,
                orgId: ctx.auth.orgId,
            });
        }),
});
