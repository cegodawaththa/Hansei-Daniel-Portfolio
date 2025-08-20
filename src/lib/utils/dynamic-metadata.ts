import { Metadata } from "next";
import { generateMetadata as genMetadata } from "@/lib/utils/metadata";
import { LandingPageData } from "@/modules/landing/actions/get-landing-page-data";

export function generateHomeMetadata(
  landingPageData: LandingPageData
): Metadata {
  const basicInfo = landingPageData.data?.basicInfo;

  // Create dynamic title
  const dynamicTitle = basicInfo?.portfolioName
    ? `${basicInfo.portfolioName} - Real Estate Development & Construction Management Professional`
    : "Real Estate Development & Construction Management Professional";

  // Create dynamic description
  const dynamicDescription =
    basicInfo?.fullBio ||
    basicInfo?.shortDescription ||
    "Experienced real estate and construction management professional with expertise in project management, forecasting, budgeting, and developing innovative solutions.";

  // Create dynamic keywords
  const dynamicKeywords = [
    basicInfo?.portfolioName,
    "real estate development professional",
    "construction management expert",
    "project manager",
    "property development",
    "construction project management",
    "real estate professional",
    "building construction management",
    "project forecasting budgeting",
    "construction industry expert"
  ].filter(Boolean);

  return genMetadata({
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: dynamicKeywords as string[]
  });
}

export function generateAboutMetadata(
  landingPageData: LandingPageData
): Metadata {
  const basicInfo = landingPageData.data?.basicInfo;

  const dynamicTitle = basicInfo?.portfolioName
    ? `About ${basicInfo.portfolioName} - Professional Background & Expertise`
    : "About Me - Professional Background & Expertise";

  const dynamicDescription = `Learn about ${
    basicInfo?.portfolioName || "my"
  } background, expertise, and journey in the real estate and construction industry. ${
    basicInfo?.shortDescription ||
    "Discover professional qualifications, educational background, and commitment to delivering exceptional services."
  }`;

  return genMetadata({
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: [
      basicInfo?.portfolioName,
      "professional background",
      "real estate expertise",
      "construction management experience",
      "professional qualifications",
      "career journey"
    ].filter(Boolean) as string[],
    url: "/about"
  });
}

export function generateProjectsMetadata(
  landingPageData: LandingPageData
): Metadata {
  const basicInfo = landingPageData.data?.basicInfo;
  const projects = landingPageData.data?.projects;

  const projectCount = projects?.length || 0;
  const dynamicTitle = basicInfo?.portfolioName
    ? `${basicInfo.portfolioName}'s Projects - Real Estate & Construction Portfolio`
    : "My Projects - Real Estate & Construction Portfolio";

  const dynamicDescription = `Explore ${
    basicInfo?.portfolioName || "our"
  } comprehensive portfolio of ${
    projectCount > 0 ? `${projectCount} ` : ""
  }real estate and construction projects. ${
    basicInfo?.shortDescription ||
    "Discover successful project completions and ongoing developments."
  }`;

  return genMetadata({
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: [
      basicInfo?.portfolioName,
      "real estate projects",
      "construction portfolio",
      "property development projects",
      "project management",
      "construction management"
    ].filter(Boolean) as string[],
    url: "/projects"
  });
}

export function generateExperienceMetadata(
  landingPageData: LandingPageData
): Metadata {
  const basicInfo = landingPageData.data?.basicInfo;

  const dynamicTitle = basicInfo?.portfolioName
    ? `${basicInfo.portfolioName}'s Experience - Professional Journey`
    : "My Experience - Professional Journey";

  const dynamicDescription = `Discover ${
    basicInfo?.portfolioName || "my"
  } professional journey in real estate development and construction management. ${
    basicInfo?.shortDescription ||
    "Explore experiences across various projects and learn about expertise in the industry."
  }`;

  return genMetadata({
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: [
      basicInfo?.portfolioName,
      "professional experience",
      "real estate career",
      "construction management experience",
      "project management expertise",
      "professional journey"
    ].filter(Boolean) as string[],
    url: "/experience"
  });
}

export function generateContactMetadata(
  landingPageData: LandingPageData
): Metadata {
  const basicInfo = landingPageData.data?.basicInfo;

  const dynamicTitle = basicInfo?.portfolioName
    ? `Contact ${basicInfo.portfolioName} - Real Estate & Construction Services`
    : "Contact Me - Real Estate & Construction Services";

  const dynamicDescription = `Get in touch with ${
    basicInfo?.portfolioName || "me"
  } for all your real estate and construction needs. ${
    basicInfo?.currentAddress ? `Located in ${basicInfo.currentAddress}. ` : ""
  }Contact for property consultations, project inquiries, or to discuss your goals.`;

  return genMetadata({
    title: dynamicTitle,
    description: dynamicDescription,
    keywords: [
      basicInfo?.portfolioName,
      "contact real estate professional",
      "construction consultation",
      "property inquiry",
      "project consultation",
      "get in touch"
    ].filter(Boolean) as string[],
    url: "/contact"
  });
}
