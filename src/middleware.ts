import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)"]);
const isNotOrgRequired = createRouteMatcher(["/choose-org"]);
export default clerkMiddleware((auth, req) => {
    if (!isPublicRoute(req)) {
        const { orgId } = auth();
        if (!isNotOrgRequired(req) && !orgId) {
            const orgSelection = new URL(`/choose-org`, req.url);

            return NextResponse.redirect(orgSelection);
        } else auth().protect();
    }
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
        // Always run for API routes
        "/(api|trpc)(.*)",
    ],
};
