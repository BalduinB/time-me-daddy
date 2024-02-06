import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { CreateStopWatch, DeleteStopWatch, EndStopWatch } from "@/schemas/stop-watch";
import { stopWatch } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

export const stopWatchRouter = createTRPCRouter({
    overview: protectedProcedure.query(async ({ ctx: { db, auth } }) => {
        return await db.query.stopWatch.findMany({
            where: ({ userId }, { eq }) => eq(userId, auth.userId),
        });
    }),
    create: protectedProcedure.input(CreateStopWatch).mutation(async ({ ctx, input }) => {
        const { userId } = ctx.auth;
        await ctx.db.insert(stopWatch).values({ userId, categoryId: input.categoryId });
    }),
    delete: protectedProcedure.input(DeleteStopWatch).mutation(async ({ ctx, input }) => {
        const { userId } = ctx.auth;
        await ctx.db.delete(stopWatch).where(and(eq(stopWatch.id, input.id), eq(stopWatch.userId, userId)));
    }),

    end: protectedProcedure.input(EndStopWatch).mutation(async ({ ctx, input }) => {
        const { userId } = ctx.auth;
        await ctx.db
            .update(stopWatch)
            .set({ endDate: input.endDate })
            .where(and(eq(stopWatch.id, input.id), eq(stopWatch.userId, userId)));
    }),
});
