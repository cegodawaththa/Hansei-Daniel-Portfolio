import { relations, sql } from "drizzle-orm";
import { index, pgTable, text } from "drizzle-orm/pg-core";

import { timestamps } from "@/lib/helpers";
import { projects } from "./projects.schema";

export const experiences = pgTable(
  "experiences",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    role: text("role"),
    content: text("content"),

    project: text("project_type").references(() => projects.id, {
      onDelete: "set null"
    }),

    duration: text("duration"),

    ...timestamps
  },
  (table) => [
    index("experience_role_idx").on(table.role),
    index("experience_project_idx").on(table.project)
  ]
);

export const experienceRelations = relations(experiences, ({ one }) => ({
  project: one(projects, {
    fields: [experiences.project],
    references: [projects.id]
  })
}));
