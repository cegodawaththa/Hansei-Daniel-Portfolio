/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getClient } from "@/lib/rpc/server";
import type { SiteSettingsMapT } from "@/lib/zod/settings.zod";
import type { QualificationsSchemaT } from "@/lib/zod/qualifications.zod";
import type { ExperiencesWithProjectSchemaT } from "@/lib/zod/experiences.zod";
import type { ProjectsWithExperiencesSchemaT } from "@/lib/zod/projects.zod";
import type { EducationSchemaT } from "@/lib/zod/education.zod";

export interface LandingPageData {
  data: {
    basicInfo: SiteSettingsMapT | null;
    qualifications: QualificationsSchemaT[] | null;
    experiences: ExperiencesWithProjectSchemaT[] | null;
    projects: ProjectsWithExperiencesSchemaT[] | null;
    education: EducationSchemaT[] | null;
  } | null;
  error: string | null;
}

export async function getLandingPageData(): Promise<LandingPageData> {
  try {
    const rpcClient = await getClient();

    const returnData: LandingPageData = {
      data: {
        basicInfo: null,
        qualifications: null,
        experiences: null,
        projects: null,
        education: null
      },
      error: null
    };

    // =========================================================================
    // Basic Information Data
    try {
      const basicInfoRes = await rpcClient.api.settings.$get();

      if (!basicInfoRes.ok) {
        const errorData = await basicInfoRes.json();
        throw new Error(`Failed to fetch basic info: ${errorData.message}`);
      }

      const basicInfo = await basicInfoRes.json();

      returnData!.data!.basicInfo = basicInfo as SiteSettingsMapT;
    } catch (basicInfoErr) {
      console.error({ basicInfoErr });
    }

    // =========================================================================
    // Basic Information Data
    try {
      const qualificationsRes = await rpcClient.api.qualifications.$get({
        query: {}
      });

      if (!qualificationsRes.ok) {
        const errorData = await qualificationsRes.json();
        throw new Error(`Failed to fetch qualifications: ${errorData.message}`);
      }

      const qualifications = await qualificationsRes.json();

      returnData!.data!.qualifications = qualifications.data as any;
    } catch (qualificationsErr) {
      console.error(qualificationsErr);
    }

    // =========================================================================
    // Experience Data
    try {
      const experiencesRes = await rpcClient.api.experiences.$get({
        query: {}
      });

      if (!experiencesRes.ok) {
        const errorData = await experiencesRes.json();
        throw new Error(`Failed to fetch experiences: ${errorData.message}`);
      }

      const experiences = await experiencesRes.json();

      returnData!.data!.experiences = experiences.data as any;
    } catch (experiencesErr) {
      console.error(experiencesErr);
    }

    // =========================================================================
    // Projects Data
    try {
      const projectsRes = await rpcClient.api.projects.$get({
        query: {}
      });

      if (!projectsRes.ok) {
        const errorData = await projectsRes.json();
        throw new Error(`Failed to fetch projects: ${errorData.message}`);
      }

      const projects = await projectsRes.json();

      returnData!.data!.projects = projects.data as any;
    } catch (projectsErr) {
      console.error(projectsErr);
    }

    // =========================================================================
    // Education Data
    try {
      const educationRes = await rpcClient.api.education.$get({
        query: {}
      });

      if (!educationRes.ok) {
        const errorData = await educationRes.json();
        throw new Error(`Failed to fetch education: ${errorData.message}`);
      }

      const education = await educationRes.json();

      returnData!.data!.education = education.data as any;
    } catch (educationError) {
      console.error(educationError);
    }

    return returnData;
  } catch (err) {
    const error = err as Error;
    console.error("Error fetching landing page data:", error);

    return { data: null, error: error.message };
  }
}
