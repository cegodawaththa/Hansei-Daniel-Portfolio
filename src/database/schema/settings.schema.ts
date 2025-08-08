import { sql } from "drizzle-orm";
import { index, pgTable, text } from "drizzle-orm/pg-core";

import { timestamps } from "@/lib/helpers";

export const siteSettings = pgTable(
  "site_settings",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    key: text("key"),
    value: text("value"),
    ...timestamps
  },
  (table) => [
    index("setting_index_idx").on(table.id),
    index("setting_key_idx").on(table.key),
    index("setting_value_idx").on(table.value)
  ]
);
