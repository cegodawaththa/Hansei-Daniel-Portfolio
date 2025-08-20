import { useEffect } from "react";
import { LandingPageData } from "@/modules/landing/actions/get-landing-page-data";

/**
 * Hook to dynamically update meta tags based on landing page data
 * This is useful for client-side meta tag updates when data changes
 */
export function useDynamicMeta(
  landingPageData: LandingPageData,
  pageType: "home" | "about" | "projects" | "experience" | "contact"
) {
  useEffect(() => {
    if (!landingPageData.data?.basicInfo) return;

    const basicInfo = landingPageData.data.basicInfo;

    // Update meta description dynamically
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      let dynamicDescription = "";

      switch (pageType) {
        case "home":
          dynamicDescription = `${basicInfo.portfolioName} - ${
            basicInfo.shortDescription ||
            "Real estate and construction management professional"
          }`;
          break;
        case "about":
          dynamicDescription = `Learn about ${basicInfo.portfolioName}'s background and expertise in real estate and construction. ${basicInfo.shortDescription}`;
          break;
        case "projects":
          dynamicDescription = `Explore ${basicInfo.portfolioName}'s portfolio of real estate and construction projects. ${basicInfo.shortDescription}`;
          break;
        case "experience":
          dynamicDescription = `Discover ${basicInfo.portfolioName}'s professional journey and experience. ${basicInfo.shortDescription}`;
          break;
        case "contact":
          dynamicDescription = `Get in touch with ${basicInfo.portfolioName} for real estate and construction services. Located in ${basicInfo.currentAddress}`;
          break;
      }

      metaDescription.setAttribute("content", dynamicDescription);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && basicInfo.portfolioName) {
      const dynamicTitle = `${basicInfo.portfolioName} - Real Estate & Construction Professional`;
      ogTitle.setAttribute("content", dynamicTitle);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription && basicInfo.shortDescription) {
      ogDescription.setAttribute("content", basicInfo.shortDescription);
    }

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && basicInfo.portfolioName) {
      const dynamicTitle = `${basicInfo.portfolioName} - Real Estate & Construction Professional`;
      twitterTitle.setAttribute("content", dynamicTitle);
    }

    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );
    if (twitterDescription && basicInfo.shortDescription) {
      twitterDescription.setAttribute("content", basicInfo.shortDescription);
    }
  }, [landingPageData, pageType]);
}

/**
 * Function to generate dynamic keywords based on landing page data
 */
export function generateDynamicKeywords(
  landingPageData: LandingPageData,
  additionalKeywords: string[] = []
): string[] {
  const basicInfo = landingPageData.data?.basicInfo;
  const projects = landingPageData.data?.projects;
  const experiences = landingPageData.data?.experiences;

  const dynamicKeywords = [
    basicInfo?.portfolioName,
    ...additionalKeywords,
    "real estate professional",
    "construction management",
    "project management"
  ].filter(Boolean);

  // Add project-specific keywords
  if (projects) {
    projects.forEach((project) => {
      if (project.projectType) dynamicKeywords.push(project.projectType);
      if (project.location) dynamicKeywords.push(project.location);
    });
  }

  // Add experience-specific keywords
  if (experiences) {
    experiences.forEach((exp) => {
      if (exp.role) dynamicKeywords.push(exp.role);
    });
  }

  // Remove duplicates and return
  return [...new Set(dynamicKeywords.filter(Boolean))] as string[];
}
