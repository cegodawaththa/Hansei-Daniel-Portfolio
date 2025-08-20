import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import { PageHeader } from "@/modules/landing/components/page-header";
import { ExperienceList } from "@/modules/landing/subpages/experiences-list";

export default async function ProjectsPage() {
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
