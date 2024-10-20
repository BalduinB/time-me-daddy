// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { type InferSelectModel, sql } from "drizzle-orm";
import { int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
    (name) => `time-me-daddy_${name}`,
);
const timestamps = {
    createdAt: int("created_at", { mode: "timestamp" })
        .default(sql`(unixepoch())`)
        .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
        () => new Date(),
    ),
} as const;

export const projects = createTable("projects", {
    id: text("id", { length: 256 }).primaryKey(),
    ownerId: text("owner_id", { length: 256 }),
    orgId: text("org_id", { length: 256 }),
    name: text("name", { length: 256 }),
    ...timestamps,
});
export type Project = InferSelectModel<typeof projects>;
export const tasks = createTable("tasks", {
    ownerId: text("owner_id", { length: 256 }),
    id: text("id", { length: 256 }).primaryKey(),
    projectId: text("project_id", { length: 256 }).references(
        () => projects.id,
    ),
    name: text("name", { length: 256 }),
    description: text("description", { length: 256 }),
    ...timestamps,
});

export type Task = InferSelectModel<typeof tasks>;
