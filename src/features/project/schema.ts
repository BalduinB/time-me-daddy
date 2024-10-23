import { z } from "zod";

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string(),
    isPinned: z.boolean(),
    description: z.any(),
});

export const CreateProjectSchema = z.object({
    name: z.string(),
});

export type CreateProjectSchema = z.infer<typeof CreateProjectSchema>;

export const EditProjectSchema = ProjectSchema.omit({ id: true }).partial();

export type EditProjectSchema = z.infer<typeof EditProjectSchema>;
