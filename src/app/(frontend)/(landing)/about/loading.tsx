import { PageHeader } from "@/modules/landing/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function AboutPageLoading() {
  return (
    <div className="">
      <PageHeader
        title={"About me"}
        subtitle={"Discover about me and my journey in real estate"}
      />

      <div className="min-h-[40vh]">
        {/* About Section Skeleton */}
        <section className="py-12 sm:py-16 lg:py-20 bg-background">
          <div className="content-container mx-auto px-4 sm:px-6">
            <div className="space-y-8 lg:space-y-12">
              {/* Header */}
              <div className="space-y-4">
                <Skeleton className="h-8 w-20 rounded-full" />
                <Skeleton className="h-12 w-3/4 sm:w-1/2" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
              </div>

              {/* Qualifications */}
              <div className="space-y-4">
                <div className="flex items-center flex-wrap gap-2 sm:gap-3">
                  {Array(4)
                    .fill("_")
                    .map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-8 w-24 sm:w-32 rounded-full"
                      />
                    ))}
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {Array(4)
                    .fill("_")
                    .map((_, index) => (
                      <div
                        key={index}
                        className="p-4 bg-card rounded-lg border"
                      >
                        <Skeleton className="h-4 w-16 mb-2" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section Skeleton */}
        <section className="py-12 sm:py-16 lg:py-20 bg-muted/20">
          <div className="content-container mx-auto px-4 sm:px-6">
            <div className="text-center space-y-4 mb-8 sm:mb-12">
              <Skeleton className="h-8 w-20 mx-auto rounded-full" />
              <Skeleton className="h-10 w-64 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </div>

            <div className="space-y-4 sm:space-y-6">
              {Array(3)
                .fill("_")
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-card rounded-2xl p-4 sm:p-6 border"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      <Skeleton className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl" />
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
