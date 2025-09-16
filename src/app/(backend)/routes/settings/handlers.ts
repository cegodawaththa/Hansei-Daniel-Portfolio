/* eslint-disable @typescript-eslint/no-explicit-any */
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types/server";

import { db } from "@/database";
import { siteSettings } from "@/database/schema";
import type { GetSiteSettingsRoute, UpsertSiteSettingsRoute } from "./routes";
import { SiteSettingsMapT } from "@/lib/zod/settings.zod";
import { eq } from "drizzle-orm";

// List media route handler
export const getSiteSettingsHandler: AppRouteHandler<
  GetSiteSettingsRoute
> = async (c) => {
  const allValues = await db.query.siteSettings.findMany();

  const mappedSiteSettings: SiteSettingsMapT = {
    portfolioName: "",
    shortDescription: "",
    fullBio: "",
    primaryEmail: "",
    secondaryEmail: "",
    primaryPhone: "",
    secondaryPhone: "",
    currentAddress: "",
    website: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    profileImage: "",
    coverImage: "",
    bioImages: "",
    cvLink: ""
  };

  for (const setting of allValues) {
    switch (setting.key) {
      case "portfolioName":
        mappedSiteSettings.portfolioName = setting.value || "";
        break;
      case "shortDescription":
        mappedSiteSettings.shortDescription = setting.value || "";
        break;
      case "fullBio":
        mappedSiteSettings.fullBio = setting.value || "";
        break;
      case "primaryEmail":
        mappedSiteSettings.primaryEmail = setting.value || "";
        break;
      case "secondaryEmail":
        mappedSiteSettings.secondaryEmail = setting.value || "";
        break;
      case "primaryPhone":
        mappedSiteSettings.primaryPhone = setting.value || "";
        break;
      case "secondaryPhone":
        mappedSiteSettings.secondaryPhone = setting.value || "";
        break;
      case "currentAddress":
        mappedSiteSettings.currentAddress = setting.value || "";
        break;
      case "website":
        mappedSiteSettings.website = setting.value || "";
        break;
      case "facebook":
        mappedSiteSettings.facebook = setting.value || "";
        break;
      case "linkedin":
        mappedSiteSettings.linkedin = setting.value || "";
        break;
      case "twitter":
        mappedSiteSettings.twitter = setting.value || "";
        break;
      case "instagram":
        mappedSiteSettings.instagram = setting.value || "";
        break;
      case "profileImage":
        mappedSiteSettings.profileImage = setting.value || "";
        break;
      case "coverImage":
        mappedSiteSettings.coverImage = setting.value || "";
        break;
      case "bioImages":
        mappedSiteSettings.bioImages = setting.value || "";
        break;
      case "cvLink":
        mappedSiteSettings.cvLink = setting.value || "";
        break;
    }
  }

  return c.json(mappedSiteSettings, HttpStatusCodes.OK);
};

// Upsert Site Settings Handler
export const upsertSiteSettingsHandler: AppRouteHandler<
  UpsertSiteSettingsRoute
> = async (c) => {
  const session = c.get("session");
  const body = c.req.valid("json");

  if (!session) {
    return c.json(
      {
        message: HttpStatusPhrases.UNAUTHORIZED
      },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  await Promise.all(
    Object.keys(body).map(async (key: string) => {
      const keyValue: string | undefined = (body as Record<string, any>)[key];

      if (keyValue) {
        // Check if the setting already exists
        const existingSetting = await db.query.siteSettings.findFirst({
          where: eq(siteSettings.key, key)
        });

        if (existingSetting) {
          // Update the existing setting
          await db
            .update(siteSettings)
            .set({ value: keyValue, updatedAt: new Date() })
            .where(eq(siteSettings.id, existingSetting.id));
        } else {
          // Insert a new setting
          await db.insert(siteSettings).values({ key, value: keyValue });
        }
      }
    })
  );

  const allValues = await db.query.siteSettings.findMany();

  const mappedSiteSettings: SiteSettingsMapT = {
    portfolioName: "",
    shortDescription: "",
    fullBio: "",
    primaryEmail: "",
    secondaryEmail: "",
    primaryPhone: "",
    secondaryPhone: "",
    currentAddress: "",
    website: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    profileImage: "",
    coverImage: "",
    bioImages: ""
  };

  for (const setting of allValues) {
    switch (setting.key) {
      case "portfolioName":
        mappedSiteSettings.portfolioName = setting.value || "";
        break;
      case "shortDescription":
        mappedSiteSettings.shortDescription = setting.value || "";
        break;
      case "fullBio":
        mappedSiteSettings.fullBio = setting.value || "";
        break;
      case "primaryEmail":
        mappedSiteSettings.primaryEmail = setting.value || "";
        break;
      case "secondaryEmail":
        mappedSiteSettings.secondaryEmail = setting.value || "";
        break;
      case "primaryPhone":
        mappedSiteSettings.primaryPhone = setting.value || "";
        break;
      case "secondaryPhone":
        mappedSiteSettings.secondaryPhone = setting.value || "";
        break;
      case "currentAddress":
        mappedSiteSettings.currentAddress = setting.value || "";
        break;
      case "website":
        mappedSiteSettings.website = setting.value || "";
        break;
      case "facebook":
        mappedSiteSettings.facebook = setting.value || "";
        break;
      case "linkedin":
        mappedSiteSettings.linkedin = setting.value || "";
        break;
      case "twitter":
        mappedSiteSettings.twitter = setting.value || "";
        break;
      case "instagram":
        mappedSiteSettings.instagram = setting.value || "";
        break;
      case "profileImage":
        mappedSiteSettings.profileImage = setting.value || "";
        break;
      case "coverImage":
        mappedSiteSettings.coverImage = setting.value || "";
        break;
      case "bioImages":
        mappedSiteSettings.bioImages = setting.value || "";
        break;
    }
  }

  return c.json(mappedSiteSettings, HttpStatusCodes.OK);
};
