import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/modules/landing/components/page-header";

export default function ProjectsLoading() {
  return (
    <div className="">
      <PageHeader
        title={"Developments"}
        subtitle={"Discover latest project developments I'm handling."}
      />

      <div className="my-6">
        <div className="content-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {Array(6)
              .fill("_")
              .map((item, index) => (
                <div key={index} className="space-y-4">
                  <Skeleton className="w-full h-[200px] sm:h-[250px] lg:h-[300px] opacity-60 rounded-lg animate-pulse" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-3/4 opacity-40" />
                    <Skeleton className="h-3 w-full opacity-30" />
                    <Skeleton className="h-3 w-2/3 opacity-30" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 rounded-full opacity-25" />
                    <Skeleton className="h-6 w-20 rounded-full opacity-25" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
