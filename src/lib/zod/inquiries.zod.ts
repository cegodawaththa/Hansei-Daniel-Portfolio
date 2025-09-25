import { z } from "zod";

// Inquiry status enum - can be null in database but has default
export const inquiryStatusEnum = z.enum(["unread", "read", "archived"]);

// Base inquiries schema (matches database table structure)
export const inquiriesSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  company: z.string().nullable(),
  message: z.string(),
  status: inquiryStatusEnum.nullable().default("unread"),
  createdAt: z.date(),
  updatedAt: z.date().nullable()
});

export type InquiriesSchemaT = z.infer<typeof inquiriesSchema>;

// For API responses, we need a schema with string dates to match transformed output
export const inquiriesAPIResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  company: z.string().nullable(),
  message: z.string(),
  status: inquiryStatusEnum.nullable().default("unread"),
  createdAt: z.string(), // API returns string dates
  updatedAt: z.string().nullable()
});

export type InquiriesAPIResponseSchemaT = z.infer<
  typeof inquiriesAPIResponseSchema
>;

// Insert schema (excludes auto-generated fields)
export const insertInquiriesSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().nullable().optional(),
  message: z.string().min(1, "Message is required"),
  status: inquiryStatusEnum.optional()
});

export type InsertInquiriesSchemaT = z.infer<typeof insertInquiriesSchema>;

// Update schema (all fields optional except validation rules)
export const updateInquiriesSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  email: z.string().email("Valid email is required").optional(),
  company: z.string().nullable().optional(),
  message: z.string().min(1, "Message is required").optional(),
  status: inquiryStatusEnum.nullable().optional()
});

export type UpdateInquiriesSchemaT = z.infer<typeof updateInquiriesSchema>;
