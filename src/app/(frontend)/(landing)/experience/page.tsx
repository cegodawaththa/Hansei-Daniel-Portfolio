import { Metadata } from "next";
import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import { PageHeader } from "@/modules/landing/components/page-header";
import { ExperienceList } from "@/modules/landing/subpages/experiences-list";
import { generateMetadata as genMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = genMetadata({
  title: "Hansie Daniel's Experience",
  description:
    "Discover Hansie Daniel's professional journey in real estate development and construction management. With over 20 years of experience, explore his expertise in project management, forecasting, budgeting, and developing innovative solutions across various construction and real estate projects.",
  keywords: [
    "Hansie Daniel experience",
    "construction management experience",
    "real estate development background",
    "project management expertise",
    "construction industry career",
    "property development experience",
    "real estate professional Toronto",
    "construction project achievements"
  ],
  url: "/experience"
});

export default async function ExperiencePage() {
  const landingPageData = await getLandingPageData();

  return (
    <div className="">
      <PageHeader
        title={"My Experiences"}
        subtitle={"Discover real estate projects experiences I've earned"}
      />

      <div className="my-6 min-h-[40vh]">
        <ExperienceList data={landingPageData} />
      </div>
    </div>
  );
}
