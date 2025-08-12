import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { qualifications } from "@/database/schema/qualifications.schema";

export const qualificationsSchema = createSelectSchema(qualifications);

export type QualificationsSchemaT = z.infer<typeof qualificationsSchema>;

export const insertQualificationsSchema = createInsertSchema(
  qualifications
).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type InsertQualificationsSchemaT = z.infer<
  typeof insertQualificationsSchema
>;

export const updateQualificationSchema = insertQualificationsSchema.partial();

export type UpdateQualificationsSchemaT = z.infer<
  typeof updateQualificationSchema
>;
