import { z } from "zod";

export const IdObject = z
    .object({
        id: z.string({
            required_error: "Gebe eine id an.",
            invalid_type_error: "Gebe eine id an.",
        }),
    })
    .strict();
