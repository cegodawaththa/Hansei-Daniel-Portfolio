import { Metadata } from "next";
import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import { PageHeader } from "@/modules/landing/components/page-header";
import { ProjectsList } from "@/modules/landing/subpages/projects-list";
// import { ProjectStatusFilter } from "@/modules/landing/components/project-status-filter";
import { generateMetadata as genMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = genMetadata({
  title: "Hansie Daniel's Developments",
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

export default async function ProjectsPage({}: Props) {
  const landingPageData = await getLandingPageData();

  return (
    <div className="">
      <PageHeader
        title={"Developments"}
        subtitle={"Discover latest project developments I'm handling."}
      />

      <div className="min-h-[40vh]">
        <ProjectsList
          data={landingPageData}
          statusFilter={["future", "ongoing"]}
        />
      </div>
    </div>
  );
}
