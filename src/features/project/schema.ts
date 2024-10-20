import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export const CreateProjectSchema = z.object({
    name: z.string(),
});

export type CreateProjectSchema = z.infer<typeof CreateProjectSchema>;
