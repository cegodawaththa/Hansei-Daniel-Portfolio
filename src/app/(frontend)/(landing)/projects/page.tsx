import { Metadata } from "next";
import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import { PageHeader } from "@/modules/landing/components/page-header";
import { ProjectsList } from "@/modules/landing/subpages/projects-list";
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
