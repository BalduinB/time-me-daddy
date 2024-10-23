import type { JSONContent } from "@tiptap/react";
import { type InferSelectModel, relations, sql } from "drizzle-orm";
import {
    blob,
    index,
    int,
    integer,
    sqliteTableCreator,
    text,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
    (name) => `time-me-daddy_${name}`,
);
export const posts = createTable(
    "post",
    {
        id: int("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
        name: text("name", { length: 256 }),
        createdAt: int("created_at", { mode: "timestamp" })
            .default(sql`(unixepoch())`)
            .notNull(),
        updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
            () => new Date(),
        ),
    },
    (example) => ({
        nameIndex: index("name_idx").on(example.name),
    }),
);

const timestamps = {
    createdAt: int("created_at", { mode: "timestamp" })
        .default(sql`(unixepoch())`)
        .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" })
        .$onUpdate(() => new Date())
        .notNull(),
} as const;

export const projects = createTable("projects", {
    id: text("id", { length: 256 }).primaryKey(),
    ownerId: text("owner_id", { length: 256 }).notNull(),
    orgId: text("org_id", { length: 256 }).notNull(),
    name: text("name", { length: 256 }).notNull(),
    isPinned: integer("is_pinned", { mode: "boolean" }).default(false),
    description: blob("description", { mode: "json" }).$type<JSONContent>(),
    ...timestamps,
});
export type Project = InferSelectModel<typeof projects>;
export const tasks = createTable("tasks", {
    ownerId: text("owner_id", { length: 256 }).notNull(),
    id: text("id", { length: 256 }).primaryKey(),
    projectId: text("project_id", { length: 256 })
        .references(() => projects.id)
        .notNull(),
    name: text("name", { length: 256 }).notNull(),
    description: text("description", { length: 256 }),
    ...timestamps,
});

export type Task = InferSelectModel<typeof tasks>;

export const projectsRelations = relations(projects, ({ many }) => ({
    tasks: many(tasks),
}));
export const tasksRelations = relations(tasks, ({ one }) => ({
    project: one(projects, {
        fields: [tasks.projectId],
        references: [projects.id],
    }),
}));
