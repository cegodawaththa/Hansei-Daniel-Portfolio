import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { accomplishments } from "@/database/schema/accomplishments.schema";

export const accomplishmentsSchema = createSelectSchema(accomplishments);

export type AccomplishmentsSchemaT = z.infer<typeof accomplishmentsSchema>;

export const insertAccomplishmentsSchema = createInsertSchema(
  accomplishments
).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type InsertAccomplishmentsSchemaT = z.infer<
  typeof insertAccomplishmentsSchema
>;

export const updateAccomplishmentsSchema =
  insertAccomplishmentsSchema.partial();

export type UpdateAccomplishmentsSchemaT = z.infer<
  typeof updateAccomplishmentsSchema
>;
