import { TRPCError } from "@trpc/server";

export function raiseNoOrgSelectedError(): never {
    throw new TRPCError({ code: "BAD_REQUEST", message: "Keine Gruppe ausgewählt." });
}
