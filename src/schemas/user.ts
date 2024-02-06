import { isEmptyObject } from "@/lib/utils";
import { z } from "zod";

export const EditUser = z
    .object({
        name: z
            .string({ invalid_type_error: "Gebe einen Name an.", required_error: "Gebe einen Name an." })
            .max(128, "Der Name darf nur 128 Buchstaben haben.")
            .optional(),
    })
    .strict()
    .refine((d) => !isEmptyObject(d), { message: "Ändere mindestens einen Wert.", path: ["name"] });
export type EditUser = z.infer<typeof EditUser>;

export const CreateUser = z
    .object({
        name: z
            .string({ invalid_type_error: "Gebe einen Name an.", required_error: "Gebe einen Name an." })
            .max(128, "Der Name darf nur 128 Buchstaben haben."),
    })
    .strict();
export type CreateUser = z.infer<typeof CreateUser>;
