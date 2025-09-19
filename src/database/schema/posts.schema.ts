import { sql } from "drizzle-orm";
import { index, pgTable, text } from "drizzle-orm/pg-core";

import { timestamps } from "@/lib/helpers";

export const postsTable = pgTable(
  "posts",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),

    thumbnail: text("thumbnail").notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),

    ...timestamps
  },
  (table) => [
    index("post_id").on(table.id),
    index("post_title").on(table.title)
  ]
);
