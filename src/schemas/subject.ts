import { text } from "drizzle-orm/mysql-core";
import { z } from "zod";
import { IdObject } from "./shared";

export const CreateSubject = z
    .object({
        name: z
            .string({
                required_error: "Gebe einen Namen an.",
                invalid_type_error: "Gebe einen Namen an.",
            })
            .max(256, "Der Name darf maximal 256 Zeichen haben"),
        description: z
            .string({
                invalid_type_error: "Gebe einen Beschreibung an.",
            })
            .optional(),
    })
    .strict();

export type CreateSubject = z.infer<typeof CreateSubject>;

export const UpdateSubject = z
    .object({
        name: z
            .string({ invalid_type_error: "Gebe einen Namen an." })
            .max(256, "Der Name darf maximal 256 Zeichen haben")
            .optional(),
        description: z
            .string({
                invalid_type_error: "Gebe einen Beschreibung an.",
            })
            .optional(),
    })
    .strict();

export type UpdateSubject = z.infer<typeof UpdateSubject>;

export const DeleteSubject = IdObject;
export type DeleteSubject = z.infer<typeof DeleteSubject>;
