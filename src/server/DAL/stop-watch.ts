import { auth } from "@clerk/nextjs";
import { db } from "../db";
import { TRPCError } from "@trpc/server";
import { and } from "drizzle-orm";

export async function getStopWatch(watchId: string) {
    const user = auth();
    if (!user.userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    return await db.query.stopWatch.findFirst({
        where: ({ userId, id }, { eq }) =>
            and(eq(userId, user.userId), eq(id, watchId)),
    });
}
