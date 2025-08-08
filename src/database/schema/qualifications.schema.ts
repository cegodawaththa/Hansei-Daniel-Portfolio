import { sql } from "drizzle-orm";
import { index, pgTable, text } from "drizzle-orm/pg-core";

import { timestamps } from "@/lib/helpers";

export const qualifications = pgTable(
  "qualifications",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: text("name").notNull(),

    ...timestamps
  },
  (table) => [
    index("qualification_id").on(table.id),
    index("qualification_name").on(table.name)
  ]
);
