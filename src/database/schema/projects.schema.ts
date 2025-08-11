import { sql, relations } from "drizzle-orm";
import { index, pgTable, text } from "drizzle-orm/pg-core";

import { timestamps } from "@/lib/helpers";
import { experiences } from "./experiences.schema";

export const projects = pgTable(
  "projects",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    name: text("name").notNull(),
    description: text("description"),
    thumbnails: text("thumbnails").array(),

    projectType: text("project_type"),
    location: text("location"),
    client: text("client"),
    projectValue: text("project_value"),

    ...timestamps
  },
  (table) => [
    index("project_id_idx").on(table.id),
    index("project_name_idx").on(table.name),
    index("project_type_idx").on(table.projectType)
  ]
);

export const projectRelations = relations(projects, ({ many }) => ({
  experiences: many(experiences)
}));
