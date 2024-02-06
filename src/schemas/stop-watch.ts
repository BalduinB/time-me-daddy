import { z } from "zod";
import { IdObject } from "./shared";

export const CreateStopWatch = z
    .object({
        categoryId: z.string(),
    })
    .strict();
export type CreateStopWatch = z.infer<typeof CreateStopWatch>;

export const EndStopWatch = z
    .object({
        endDate: z.date(),
    })
    .merge(IdObject);
export type EndStopWatch = z.infer<typeof EndStopWatch>;

export const DeleteStopWatch = IdObject;
export type DeleteStopWatch = z.infer<typeof DeleteStopWatch>;
