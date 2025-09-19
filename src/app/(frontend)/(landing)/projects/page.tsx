import { Metadata } from "next";
import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import { PageHeader } from "@/modules/landing/components/page-header";
import { ProjectsList } from "@/modules/landing/subpages/projects-list";
// import { ProjectStatusFilter } from "@/modules/landing/components/project-status-filter";
import { generateMetadata as genMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = genMetadata({
  title: "Hansie Daniel's Projects",
  description:
    "Explore Hansie Daniel's comprehensive portfolio of real estate and construction projects. From residential developments to commercial properties, discover successful project completions and innovative construction management solutions delivered on time and within budget.",
  keywords: [
    "Hansie Daniel projects",
    "real estate development portfolio",
    "construction management projects",
    "residential development Toronto",
    "commercial construction projects",
    "property development portfolio",
    "construction project management",
    "building development projects"
  ],
  url: "/projects"
});

type Props = {
  searchParams: { status?: string };
};

export default async function ProjectsPage({ searchParams }: Props) {
  const landingPageData = await getLandingPageData();
  const statusFilter = searchParams.status;

  // Determine page title and subtitle based on status filter
  const getPageInfo = (status?: string) => {
    switch (status) {
      case "completed":
        return {
          title: "Completed Projects",
          subtitle:
            "Successfully delivered real estate and construction projects that showcase our expertise and commitment to quality."
        };
      case "ongoing":
        return {
          title: "Ongoing Projects",
          subtitle:
            "Current projects in development, showcasing our active involvement in shaping the real estate landscape."
        };
      case "future":
        return {
          title: "Future Projects",
          subtitle:
            "Upcoming developments and planned projects that represent our vision for innovative real estate solutions."
        };
      default:
        return {
          title: "My Projects",
          subtitle:
            "Discover real estate projects I've worked on across all phases of development."
        };
    }
  };

  const { title, subtitle } = getPageInfo(statusFilter);

  return (
    <div className="">
      <PageHeader title={title} subtitle={subtitle} />

      {/* <ProjectStatusFilter /> */}

      <div className="min-h-[40vh]">
        <ProjectsList data={landingPageData} statusFilter={statusFilter} />
      </div>
    </div>
  );
}
