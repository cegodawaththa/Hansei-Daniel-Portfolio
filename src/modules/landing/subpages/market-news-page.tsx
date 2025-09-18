"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowRight,
  Calendar,
  Eye,
  Search,
  Newspaper,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useGetPosts } from "@/modules/sections/posts/queries/use-get-posts";
import { PostsSchemaT } from "@/lib/zod/posts.zod";

export function MarketNewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 9; // 3x3 grid

  const { data, isLoading, error } = useGetPosts({
    page: currentPage.toString(),
    limit: limit.toString(),
    search: searchQuery,
    sort: "desc"
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  if (error) {
    return (
      <div className="py-16 sm:py-20 lg:py-24">
        <div className="content-container text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Unable to load market news
          </h1>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="content-container">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-primary/10 rounded-full">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Newspaper className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium text-primary">
              Market Insights
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Market News & Insights
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest real estate market insights, trends,
            and analysis to make informed property investment decisions.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-12">
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search market news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-full border-gray-200 focus:border-primary focus:ring-primary"
              />
            </div>
          </form>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {Array.from({ length: limit }).map((_, i) => (
              <PostSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Posts Grid */}
        {!isLoading && data && (
          <>
            {data.data.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
                  {data.data.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Pagination */}
                {data.meta.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </Button>

                    <span className="text-sm text-muted-foreground px-4">
                      Page {currentPage} of {data.meta.totalPages}
                    </span>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(
                          Math.min(data.meta.totalPages, currentPage + 1)
                        )
                      }
                      disabled={currentPage === data.meta.totalPages}
                      className="flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Newspaper className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No posts found
                </h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? "Try adjusting your search terms."
                    : "Check back soon for the latest market news."}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PostCard({ post }: { post: PostsSchemaT }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const getContentPreview = (content: string, length: number = 120) => {
    const textContent = content.replace(/<[^>]*>/g, "");
    return textContent.length > length
      ? textContent.substring(0, length) + "..."
      : textContent;
  };

  return (
    <article className="group relative bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800">
      {/* Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(post.createdAt.toString())}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-heading font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
          {post.title}
        </h3>

        {/* Content Preview */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
          {getContentPreview(post.content, 120)}
        </p>

        {/* Read More Link */}
        <Link
          href={`/market-news/${post.id}`}
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-300"
        >
          <Eye className="w-4 h-4" />
          Read Full Article
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

function PostSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800">
      <Skeleton className="h-48 sm:h-56 w-full" />
      <div className="p-6">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-6 w-3/4 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
