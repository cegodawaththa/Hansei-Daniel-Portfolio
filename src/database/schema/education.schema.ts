import { sql } from "drizzle-orm";
import { index, pgTable, text } from "drizzle-orm/pg-core";

import { timestamps } from "@/lib/helpers";

export const education = pgTable(
  "education",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    title: text("title").notNull(),
    institution: text("institution"),
    year: text("year"),

    ...timestamps
  },
  (table) => [index("education_institution_idx").on(table.institution)]
);
