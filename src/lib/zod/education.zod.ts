import { z } from "zod";

// Base education schema (matches database table structure)
export const educationSchema = z.object({
  id: z.string(),
  title: z.string(),
  institution: z.string().nullable(),
  year: z.string().nullable(),
  priorityIndex: z.number().int().nullable().default(1),
  createdAt: z.date(),
  updatedAt: z.date().nullable()
});

export type EducationSchemaT = z.infer<typeof educationSchema>;

// Insert schema (excludes auto-generated fields)
export const insertEducationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  institution: z.string().nullable().optional(),
  year: z.string().nullable().optional(),
  priorityIndex: z.number().int().min(0).nullable().optional()
});

export type InsertEducationSchemaT = z.infer<typeof insertEducationSchema>;

// Update schema (all fields optional)
export const updateEducationSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  institution: z.string().nullable().optional(),
  year: z.string().nullable().optional(),
  priorityIndex: z.number().int().min(0).nullable().optional()
});

export type UpdateEducationSchemaT = z.infer<typeof updateEducationSchema>;
