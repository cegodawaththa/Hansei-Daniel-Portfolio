"use server";

import { getClient } from "@/lib/rpc/server";
import { SiteSettingsMapT } from "@/lib/zod/settings.zod";

export interface LandingPageData {
  data: {
    basicInfo: SiteSettingsMapT | null;
  } | null;
  error: string | null;
}

export async function getLandingPageData(): Promise<LandingPageData> {
  try {
    const rpcClient = await getClient();

    const returnData: LandingPageData = {
      data: {
        basicInfo: null
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
      console.error(basicInfoErr);
    }
    // =========================================================================

    return returnData;
  } catch (err) {
    const error = err as Error;
    console.error("Error fetching landing page data:", error);

    return { data: null, error: error.message };
  }
}
