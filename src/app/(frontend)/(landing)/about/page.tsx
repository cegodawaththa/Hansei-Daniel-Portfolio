import { Metadata } from "next";
import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import AboutSection from "@/modules/landing/components/about";
import EducationSection from "@/modules/landing/components/education";
import { PageHeader } from "@/modules/landing/components/page-header";
import { generateMetadata as genMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = genMetadata({
  title: "About Hansie Daniel",
  description:
    "Learn about Hansie Daniel's background, expertise, and journey in the real estate and construction industry. Discover his professional qualifications, educational background, and commitment to delivering exceptional project management and development services.",
  keywords: [
    "Hansie Daniel",
    "real estate professional",
    "construction management expert",
    "project manager background",
    "professional qualifications",
    "construction consultant",
    "property development specialist",
    "real estate expertise",
    "professional bio Toronto"
  ],
  url: "/about"
});

export default async function AboutPage() {
  const landingPageData = await getLandingPageData();

  return (
    <div className="">
      <PageHeader
        title={"About me"}
        subtitle={"Discover about me and my journey in real estate"}
      />

      <div className="min-h-[40vh]">
        <AboutSection data={landingPageData} isPage />
        <EducationSection data={landingPageData} />
      </div>
    </div>
  );
}
