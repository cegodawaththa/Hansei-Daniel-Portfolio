import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import { PageHeader } from "@/modules/landing/components/page-header";
import { ProjectsList } from "@/modules/landing/subpages/projects-list";

export default async function ProjectsPage() {
  const landingPageData = await getLandingPageData();

  return (
    <div className="">
      <PageHeader
        title={"My Projects"}
        subtitle={"Discover real estate projects I've worked on."}
      />

      <div className="my-6 min-h-[40vh]">
        <ProjectsList data={landingPageData} />
      </div>
    </div>
  );
}
