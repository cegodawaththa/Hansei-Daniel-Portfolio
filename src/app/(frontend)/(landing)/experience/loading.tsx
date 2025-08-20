import { PageHeader } from "@/modules/landing/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExperiencesLoading() {
  return (
    <div className="">
      <PageHeader
        title={"My Experiences"}
        subtitle={"Discover real estate projects experiences I've earned"}
      />

      <div className="my-6 min-h-[40vh]">
        <div className="content-container mx-auto">
          <div className="space-y-6 sm:space-y-8">
            {Array(4)
              .fill("_")
              .map((item, index) => (
                <div key={index} className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-4 sm:left-6 top-12 bottom-0 w-0.5 bg-border" />

                  {/* Timeline item */}
                  <div className="flex gap-4 sm:gap-6">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <Skeleton className="w-8 h-8 sm:w-12 sm:h-12 rounded-full" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3 pb-8">
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-24 sm:w-32" />
                        <Skeleton className="h-6 w-3/4 sm:w-1/2" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                      </div>

                      {/* Card skeleton */}
                      <div className="bg-card rounded-lg border p-4 sm:p-6 space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                          <Skeleton className="h-5 w-32" />
                          <div className="flex gap-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                          </div>
                        </div>
                        <Skeleton className="h-20 w-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
