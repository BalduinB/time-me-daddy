// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { bigint, datetime, index, int, mysqlTableCreator, text, timestamp, varchar } from "drizzle-orm/mysql-core";
import { uuid } from "./shared";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `${name}`);

export const stopWatch = createTable(
    "stop_watch",
    {
        id: uuid("id"),
        userId: varchar("user_id", { length: 256 }).notNull(),
        startDate: datetime("start_time", { mode: "date" }).default(new Date()).notNull(),
        endDate: datetime("end_time", { mode: "date" }),
        notes: text("notes"),
        categoryId: varchar("category_id", { length: 256 }).notNull(),
        totalDuration: int("total_duration", { unsigned: true }),
    },
    (example) => ({
        userIdIndex: index("user_id_idx").on(example.userId),
    }),
);

export const category = createTable(
    "category",
    {
        id: uuid("id"),
        userId: varchar("user_id", { length: 256 }).notNull(),
        orgId: varchar("org_id", { length: 256 }).notNull(), // comes from clerk
        description: text("description"),
        createdAt: timestamp("created_at")
            .default(sql`CURRENT_TIMESTAMP`)
            .notNull(),
        updatedAt: timestamp("updatedAt").onUpdateNow().notNull(),
    },
    (example) => ({
        nameIndex: index("user_id_idx").on(example.userId),
    }),
);
export const user = createTable(
    "user",
    {
        id: uuid("id"),
        userId: varchar("user_id", { length: 256 }).notNull().unique(), // comes from clerk
        name: varchar("name", { length: 128 }).notNull(),
        createdAt: timestamp("created_at").defaultNow(),
        updatedAt: timestamp("updatedAt").onUpdateNow().notNull().defaultNow(),
    },
    (example) => ({
        userIdIndex: index("user_id_idx").on(example.userId),
    }),
);

export const categoryRelations = relations(category, ({ many, one }) => ({
    stopWatches: many(stopWatch),
    creator: one(user, {
        fields: [category.userId],
        references: [user.id],
    }),
}));

export const stopWatchRelations = relations(stopWatch, ({ one }) => ({
    category: one(category, {
        fields: [stopWatch.categoryId],
        references: [category.id],
    }),
    user: one(user, {
        fields: [stopWatch.userId],
        references: [user.id],
    }),
}));

export const userRelations = relations(user, ({ many }) => ({
    categories: many(category),
    stopWatches: many(stopWatch),
}));
