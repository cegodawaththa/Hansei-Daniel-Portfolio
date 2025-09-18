import React from "react";
import { Suspense } from "react";

import { MarketNewsPage } from "@/modules/landing/subpages/market-news-page";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/modules/landing/components/page-header";

export default function MarketNewsStandalonePage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title={"News Updates"}
        subtitle={"Discover latest news updates published by me."}
      />

      {/* Main Content */}
      <main className="pt-5">
        <Suspense fallback={<MarketNewsPageSkeleton />}>
          <MarketNewsPage />
        </Suspense>
      </main>
    </div>
  );
}

function MarketNewsPageSkeleton() {
  return (
    <div className="py-6 sm:py-5 lg:py-8">
      <div className="content-container">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-6">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-3" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
