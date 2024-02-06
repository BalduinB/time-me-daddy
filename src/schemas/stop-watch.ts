import { z } from "zod";

export const CreateStopWatch = z
    .object({
        categoryId: z.string(),
    })
    .strict();
export type CreateStopWatch = z.infer<typeof CreateStopWatch>;

export const StopWatchId = z
    .object({
        id: z.string({
            required_error: "Gebe eine id an.",
            invalid_type_error: "Gebe eine id an.",
        }),
    })
    .strict();

export type StopWatchId = z.infer<typeof StopWatchId>;

export const EndStopWatch = z
    .object({
        endDate: z.date(),
    })
    .merge(StopWatchId);
export type EndStopWatch = z.infer<typeof EndStopWatch>;

export const DeleteStopWatch = StopWatchId;
export type DeleteStopWatch = z.infer<typeof DeleteStopWatch>;
