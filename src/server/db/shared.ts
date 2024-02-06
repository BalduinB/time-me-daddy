import { timestamp, varchar } from "drizzle-orm/mysql-core";
import crypto from "crypto";

export const timestamps = {
    createdAt: timestamp("createdAt", { mode: "date" }).defaultNow().notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }).onUpdateNow().defaultNow().notNull(),
};
export const uuid = (name: string) =>
    varchar(name, { length: 256 })
        .notNull()
        .unique()
        .$default(() => crypto.randomUUID())
        .primaryKey();
