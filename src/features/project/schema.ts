import { z } from "zod";

export const CreateProjectSchema = z.object({
    name: z.string(),
});

export type CreateProjectSchema = z.infer<typeof CreateProjectSchema>;
