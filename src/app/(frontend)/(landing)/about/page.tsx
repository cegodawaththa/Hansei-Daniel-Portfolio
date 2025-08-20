import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import AboutSection from "@/modules/landing/components/about";
import EducationSection from "@/modules/landing/components/education";
import { PageHeader } from "@/modules/landing/components/page-header";

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
