import { z } from "zod";

// Project status enum
export const projectStatusEnum = z
  .enum(["completed", "ongoing", "future"])
  .nullable()
  .optional();

// Base projects schema (matches database table structure)
export const projectsSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  thumbnails: z.array(z.string()).nullable(),
  status: projectStatusEnum.default("completed"),
  projectType: z.string().nullable(),
  location: z.string().nullable(),
  client: z.string().nullable(),
  projectValue: z.string().nullable(),
  orderIndex: z.number().int().nullable().default(0),
  createdAt: z.date(),
  updatedAt: z.date().nullable()
});

export type ProjectsSchemaT = z.infer<typeof projectsSchema>;

// Schema for related experiences (matches drizzle relational output)
const relatedExperienceSchema = z.object({
  id: z.string(),
  role: z.string().nullable(),
  content: z.string().nullable(),
  project: z.string().nullable(),
  duration: z.string().nullable(),
  createdAt: z.string(), // API returns string dates
  updatedAt: z.string().nullable()
});

// Extended projects schema with related experiences data (matches API output with string dates)
export const projectsWithExperiencesSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  thumbnails: z.array(z.string()).nullable(),
  projectType: z.string().nullable(),
  status: projectStatusEnum,
  location: z.string().nullable(),
  client: z.string().nullable(),
  projectValue: z.string().nullable(),
  orderIndex: z.number().int().nullable(),
  createdAt: z.string(), // API returns string dates
  updatedAt: z.string().nullable(),
  experiences: z.array(relatedExperienceSchema).default([])
});

export type ProjectsWithExperiencesSchemaT = z.infer<
  typeof projectsWithExperiencesSchema
>;

// Insert schema (excludes auto-generated fields)
export const insertProjectsSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().nullable().optional(),
  thumbnails: z.array(z.string()).nullable().optional(),
  status: projectStatusEnum.optional(),
  projectType: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  client: z.string().nullable().optional(),
  projectValue: z.string().nullable().optional(),
  orderIndex: z.number().int().min(0).nullable().optional()
});

export type InsertProjectsSchemaT = z.infer<typeof insertProjectsSchema>;

// Update schema (all fields optional except id constraints)
export const updateProjectsSchema = z.object({
  name: z.string().min(1, "Project name is required").optional(),
  description: z.string().nullable().optional(),
  thumbnails: z.array(z.string()).nullable().optional(),
  status: projectStatusEnum.optional(),
  projectType: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  client: z.string().nullable().optional(),
  projectValue: z.string().nullable().optional(),
  orderIndex: z.number().int().min(0).nullable().optional()
});

export type UpdateProjectsSchemaT = z.infer<typeof updateProjectsSchema>;
