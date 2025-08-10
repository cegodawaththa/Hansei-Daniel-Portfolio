import { z } from "zod";

// Key-Value Mapper for Site Settings
export const siteSettingsMap = z.object({
  // Basic Information
  portfolioName: z.string().optional(),
  shortDescription: z.string().optional(),
  fullBio: z.string().optional(),

  // Contact Information
  primaryEmail: z.string().optional(),
  secondaryEmail: z.string().optional(),

  primaryPhone: z.string().optional(),
  secondaryPhone: z.string().optional(),

  currentAddress: z.string().optional(),

  website: z.string().optional(),

  // socials
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),

  // Images
  profileImage: z.string().optional(),
  coverImage: z.string().optional(),
  bioImages: z.string().optional()
});

export const siteSettingsMapInsert = siteSettingsMap.partial();

export type SiteSettingsMapT = z.infer<typeof siteSettingsMap>;

export type SiteSettingsMapInsertT = z.infer<typeof siteSettingsMapInsert>;
