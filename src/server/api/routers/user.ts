import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { stopWatch, user } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";
import { CreateUser, EditUser } from "@/schemas/user";
import { getUser } from "@/server/DAL/user";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
    get: protectedProcedure.query(async ({ ctx: { db, auth } }) => {
        const user = await db.query.user.findFirst({
            where: ({ userId }, { eq }) => eq(userId, auth.userId),
        });
        return user ?? null;
    }),
    create: protectedProcedure.input(CreateUser).mutation(async ({ ctx, input }) => {
        const { userId } = ctx.auth;
        await ctx.db.insert(user).values({ ...input, userId });
    }),
    // delete: protectedProcedure.input(DeleteStopWatch).mutation(async ({ ctx, input }) => {
    //     const { userId } = ctx.auth;
    //     await ctx.db.delete(stopWatch).where(and(eq(stopWatch.id, input.id), eq(stopWatch.userId, userId)));
    // }),
    update: protectedProcedure.input(EditUser).mutation(async ({ ctx, input }) => {
        const { userId } = ctx.auth;
        const currentUser = await getUser(userId);
        if (!currentUser) {
            throw new TRPCError({ code: "NOT_FOUND", message: "Der Nutzer wurde nicht gefunden." });
        }
        await ctx.db.update(user).set(input).where(eq(user.userId, ctx.auth.userId)).execute();
    }),
});
