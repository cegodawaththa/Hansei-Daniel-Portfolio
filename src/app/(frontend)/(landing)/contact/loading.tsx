import { PageHeader } from "@/modules/landing/components/page-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function ContactPageLoading() {
  return (
    <div className="">
      <PageHeader
        title={"Get in touch with me"}
        subtitle={"Leave me a message or email to get connected !"}
      />

      <div className="min-h-[40vh]">
        <section className="py-12 sm:py-16 lg:py-20 bg-background">
          <div className="content-container mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Contact Info Column */}
              <div className="lg:col-span-1 space-y-6 sm:space-y-8">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-5/6" />
                </div>

                {/* Contact Cards */}
                <div className="space-y-4">
                  {Array(3)
                    .fill("_")
                    .map((_, index) => (
                      <div
                        key={index}
                        className="bg-card rounded-lg p-4 sm:p-6 border"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" />
                          <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-20" />
                            <Skeleton className="h-5 w-32" />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Social Links */}
                <div className="space-y-3">
                  <Skeleton className="h-5 w-24" />
                  <div className="flex gap-3">
                    {Array(4)
                      .fill("_")
                      .map((_, index) => (
                        <Skeleton
                          key={index}
                          className="w-10 h-10 rounded-lg"
                        />
                      ))}
                  </div>
                </div>
              </div>

              {/* Contact Form Column */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl p-6 sm:p-8 border">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-32" />
                      <Skeleton className="h-5 w-3/4" />
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                      </div>

                      <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-32 w-full rounded-lg" />
                      </div>

                      <Skeleton className="h-12 w-32 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
