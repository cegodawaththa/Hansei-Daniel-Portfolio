import { sql } from "drizzle-orm";
import { index, pgEnum, pgTable, text } from "drizzle-orm/pg-core";

import { timestamps } from "@/lib/helpers";

export const inquiryStatusEnum = pgEnum("inquiry_status", [
  "unread",
  "read",
  "archived"
]);

export const inquiries = pgTable(
  "inquiries",
  {
    id: text("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    email: text("email").notNull(),

    company: text("company"),
    message: text("message").notNull(),

    status: inquiryStatusEnum("status").default("unread"),
    ...timestamps
  },
  (table) => [index("inquiry_email").on(table.email)]
);
