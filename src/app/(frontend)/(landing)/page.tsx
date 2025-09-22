import { Metadata } from "next";
import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import HeroSection from "@/modules/landing/components/hero";
import AboutSection from "@/modules/landing/components/about";
import EducationSection from "@/modules/landing/components/education";
import { MarketNews } from "@/modules/landing/components/market-news";
import ContactSection from "@/modules/landing/components/contact";
import {
  generateMetadata as genMetadata,
  generateStructuredData
} from "@/lib/utils/metadata";
import { DevelopmentsSection } from "@/modules/landing/components/developments-section";

export const metadata: Metadata = genMetadata({
  title:
    "Hansie Daniel - Real Estate Development & Construction Management Professional",
  description:
    "Meet Hansie Daniel, a results-producing management executive with over 20 years of experience in construction and real estate industries. Expert in project management, forecasting, budgeting, and developing innovative solutions to complete projects within budget and time.",
  keywords: [
    "Hansie Daniel",
    "real estate development professional",
    "construction management expert",
    "project manager Toronto",
    "property development Canada",
    "construction project management",
    "real estate professional Toronto",
    "building construction management",
    "project forecasting budgeting",
    "construction industry expert"
  ]
});

// import TestimonialsSection from "@/modules/landing/components/testimonials";

export default async function Home() {
  const landingPageData = await getLandingPageData();

  console.log(landingPageData);

  // Fake loading
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Generate dynamic structured data from landingPageData
  const basicInfo = landingPageData.data?.basicInfo;
  const structuredData = generateStructuredData({
    type: "RealEstateAgent",
    name: basicInfo?.portfolioName || "Real Estate Professional",
    description:
      basicInfo?.shortDescription || "Experienced real estate professional",
    jobTitle: "Project Manager & Real Estate Development Professional",
    email: basicInfo?.primaryEmail,
    phone: basicInfo?.primaryPhone,
    address: basicInfo?.currentAddress
      ? {
          streetAddress: basicInfo.currentAddress,
          addressLocality: "Toronto",
          addressRegion: "Ontario",
          addressCountry: "Canada"
        }
      : undefined,
    sameAs: [
      basicInfo?.linkedin,
      basicInfo?.facebook,
      basicInfo?.twitter,
      basicInfo?.instagram
    ].filter(Boolean) as string[],
    areaServed: ["Toronto", "Ontario", "Canada"],
    worksFor: "Independent Real Estate Professional"
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
      <div className="">
        <HeroSection data={landingPageData} />
        <AboutSection data={landingPageData} />
        <DevelopmentsSection data={landingPageData} />
        <EducationSection data={landingPageData} />
        <MarketNews posts={landingPageData.data?.posts || []} />
        <ContactSection data={landingPageData} />

        {/* <ExperienceSection data={landingPageData} /> */}
        {/* <TestimonialsSection /> */}
      </div>
    </>
  );
}
