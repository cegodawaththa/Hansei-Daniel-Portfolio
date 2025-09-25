import { z } from "zod";

// Base experiences schema (matches database table structure)
export const experiencesSchema = z.object({
  id: z.string(),
  role: z.string().nullable(),
  content: z.string().nullable(),
  project: z.string().nullable(), // FK reference to projects
  duration: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date().nullable()
});

export type ExperiencesSchemaT = z.infer<typeof experiencesSchema>;

// Insert schema (excludes auto-generated fields)
export const insertExperiencesSchema = z.object({
  role: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  project: z.string().nullable().optional(),
  duration: z.string().nullable().optional()
});

export type InsertExperiencesSchemaT = z.infer<typeof insertExperiencesSchema>;

// Update schema (all fields optional)
export const updateExperiencesSchema = z.object({
  role: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  project: z.string().nullable().optional(),
  duration: z.string().nullable().optional()
});

export type UpdateExperiencesSchemaT = z.infer<typeof updateExperiencesSchema>;

// For relational queries, we need to define the project schema separately to match drizzle's output
const relatedProjectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  thumbnails: z.array(z.string()).nullable(),
  projectType: z.string().nullable(),
  location: z.string().nullable(),
  client: z.string().nullable(),
  projectValue: z.string().nullable(),
  orderIndex: z.number().int().nullable(),
  createdAt: z.string(), // API returns string dates
  updatedAt: z.string().nullable()
});

// Extended schema for experiences with related project data (matches API output with string dates)
export const experiencesWithProjectSchema = z.object({
  id: z.string(),
  role: z.string().nullable(),
  content: z.string().nullable(),
  project: relatedProjectSchema.nullable(), // Full project object instead of FK
  duration: z.string().nullable(),
  createdAt: z.string(), // API returns string dates
  updatedAt: z.string().nullable()
});

export type ExperiencesWithProjectSchemaT = z.infer<
  typeof experiencesWithProjectSchema
>;
