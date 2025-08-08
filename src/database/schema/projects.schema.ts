import { sql } from "drizzle-orm";
import { index, pgTable, text } from "drizzle-orm/pg-core";

import { timestamps } from "@/lib/helpers";

export const projects = pgTable(
  "projects",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    name: text("name").notNull(),
    description: text("description"),
    thumbnails: text("thumbnail").array(),

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
