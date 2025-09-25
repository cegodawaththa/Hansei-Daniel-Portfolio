import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { projects } from "@/database/schema/projects.schema";

export const projectsSchema = createSelectSchema(projects);

export const projectStatusEnum = z
  .enum(["completed", "ongoing", "future"])
  .nullable()
  .optional();

export type ProjectsSchemaT = z.infer<typeof projectsSchema>;

// For relational queries, we need to define the experience schema separately to match drizzle's output
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
export const projectsWithExperiencesSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
    thumbnails: z.array(z.string()).nullable(),
    projectType: z.string().nullable(),
    status: projectStatusEnum,
    location: z.string().nullable(),
    client: z.string().nullable(),
    projectValue: z.string().nullable(),
    orderIndex: z.number().nullable(),
    createdAt: z.string(), // API returns string dates
    updatedAt: z.string().nullable()
  })
  .extend({
    experiences: z.array(relatedExperienceSchema).default([])
  });

export type ProjectsWithExperiencesSchemaT = z.infer<
  typeof projectsWithExperiencesSchema
>;

export const insertProjectsSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type InsertProjectsSchemaT = z.infer<typeof insertProjectsSchema>;

export const updateProjectsSchema = insertProjectsSchema.partial();

export type UpdateProjectsSchemaT = z.infer<typeof updateProjectsSchema>;
