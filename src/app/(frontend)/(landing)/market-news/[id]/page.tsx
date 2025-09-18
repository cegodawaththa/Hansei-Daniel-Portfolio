import React from "react";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { PostDetailPage } from "@/modules/landing/subpages/post-detail-page";
import { Skeleton } from "@/components/ui/skeleton";
import { PageHeader } from "@/modules/landing/components/page-header";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function PostDetailStandalonePage({
  params
}: PostDetailPageProps) {
  const paramsList = await params;

  if (!paramsList.id) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title={"News Updates"}
        subtitle={"Discover latest news updates published by me."}
      />

      {/* Main Content */}
      <main className="pt-5">
        <Suspense fallback={<PostDetailSkeleton />}>
          <PostDetailPage postId={paramsList.id} />
        </Suspense>
      </main>
    </div>
  );
}

function PostDetailSkeleton() {
  return (
    <div className="py-16">
      <div className="content-container max-w-4xl">
        {/* Header Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-12 w-full mb-4" />
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <Skeleton className="h-96 w-full mb-8 rounded-lg" />

        {/* Content Skeleton */}
        <div className="prose max-w-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full mb-3" />
          ))}
        </div>
      </div>
    </div>
  );
}
