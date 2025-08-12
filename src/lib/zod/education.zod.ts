import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { education } from "@/database/schema/education.schema";

export const educationSchema = createSelectSchema(education, {
  institution: z.string().nullable().optional(),
  year: z.string().nullable().optional()
});

export type EducationSchemaT = z.infer<typeof educationSchema>;

export const insertEducationSchema = createInsertSchema(education, {
  institution: z.string().optional(),
  year: z.string().optional()
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type InsertEducationSchemaT = z.infer<typeof insertEducationSchema>;

export const updateEducationSchema = insertEducationSchema.partial();

export type UpdateEducationSchemaT = z.infer<typeof updateEducationSchema>;
