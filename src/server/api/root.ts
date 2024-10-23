import type { inferRouterOutputs } from "@trpc/server";

import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

import { postRouter } from "./routers/post";
import { projectRouter } from "./routers/projects";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    post: postRouter,
    projects: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
export type RouterOutput = inferRouterOutputs<AppRouter>;
export type ProjectRouterOutput = RouterOutput["projects"];

export const createCaller = createCallerFactory(appRouter);
