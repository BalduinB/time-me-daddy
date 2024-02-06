import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { and, eq } from "drizzle-orm";
import { TRPCError, inferRouterOutputs } from "@trpc/server";
import { CreateSubject, DeleteSubject } from "@/schemas/subject";
import { subject } from "@/server/db/schema";
import { raiseNoOrgSelectedError } from "@/server/errors/no-org";

export const categoryRouter = createTRPCRouter({
    overview: protectedProcedure.query(async ({ ctx: { db, auth } }) => {
        const { orgId: currentOrgId } = auth;
        if (!currentOrgId) raiseNoOrgSelectedError();

        return await db.query.subject.findMany({
            where: ({ orgId }, { eq }) => eq(orgId, currentOrgId),
        });
    }),
    create: protectedProcedure.input(CreateSubject).mutation(async ({ ctx, input }) => {
        const { userId, orgId } = ctx.auth;
        if (!orgId) raiseNoOrgSelectedError();

        await ctx.db.insert(subject).values({ ...input, userId, orgId });
    }),
    delete: protectedProcedure.input(DeleteSubject).mutation(async ({ ctx, input }) => {
        const { userId } = ctx.auth;
        await ctx.db.delete(subject).where(and(eq(subject.id, input.id), eq(subject.userId, userId)));
    }),
});
export type CategoryRouter = typeof categoryRouter;

export type CategoryRouterOutputs = inferRouterOutputs<CategoryRouter>;
