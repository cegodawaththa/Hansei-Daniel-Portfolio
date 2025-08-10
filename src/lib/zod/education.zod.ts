import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { education } from "@/database/schema/education.schema";

export const educationSchema = createSelectSchema(education);

export type EducationSchemaT = z.infer<typeof educationSchema>;

export const insertEducationSchema = createInsertSchema(education).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type InsertEducationSchemaT = z.infer<typeof insertEducationSchema>;

export const updateEducationSchema = insertEducationSchema.partial();
