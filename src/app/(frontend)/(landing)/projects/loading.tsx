import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/modules/landing/components/page-header";

export default function ProjectsLoading() {
  return (
    <div className="">
      <PageHeader
        title={"My Projects"}
        subtitle={"Discover real estate projects I've worked on."}
      />

      <div className="my-6">
        <div className="content-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array(6)
              .fill("_")
              .map((item, index) => (
                <Skeleton
                  key={index}
                  className="w-full h-[420px] opacity-60 rounded-lg animate-pulse"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
