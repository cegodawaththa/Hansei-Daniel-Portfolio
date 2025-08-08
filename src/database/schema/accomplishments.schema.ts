import { sql } from "drizzle-orm";
import { index, pgTable, text } from "drizzle-orm/pg-core";

import { timestamps } from "@/lib/helpers";

export const accomplishments = pgTable(
  "accomplishments",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    title: text("title").notNull(),
    content: text("content"),

    thumbnail: text("thumbnail"),
    ...timestamps
  },
  (table) => [index("accomplishment_title").on(table.title)]
);
