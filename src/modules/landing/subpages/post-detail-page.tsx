"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  BookmarkPlus,
  Eye
} from "lucide-react";
import { useGetPostByID } from "@/modules/sections/posts/queries/use-get-post-by-id";

interface PostDetailPageProps {
  postId: string;
}

export function PostDetailPage({ postId }: PostDetailPageProps) {
  const { data: post, isLoading, error } = useGetPostByID(postId);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const textContent = content.replace(/<[^>]*>/g, "");
    const wordCount = textContent.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  if (error) {
    return (
      <div className="py-16 sm:py-20 lg:py-24">
        <div className="content-container text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Post not found
          </h1>
          <p className="text-muted-foreground mb-6">
            The post you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Button asChild>
            <Link href="/market-news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Market News
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <PostDetailSkeleton />;
  }

  if (!post) {
    return (
      <div className="py-8">
        <div className="content-container text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Post not found
          </h1>
          <p className="text-muted-foreground mb-6">
            The post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/market-news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Market News
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const readingTime = estimateReadingTime(post.content);

  return (
    <article className="py-8">
      <div className="content-container max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button
            variant="ghost"
            asChild
            className="text-muted-foreground hover:text-foreground"
          >
            <Link href="/market-news">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Market News
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{readingTime} min read</span>
            </div>
            {post.updatedAt && post.updatedAt !== post.createdAt && (
              <div className="text-xs">
                Updated: {formatDate(post.updatedAt)}
              </div>
            )}
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <BookmarkPlus className="w-4 h-4" />
              Save
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="relative h-64 sm:h-80 lg:h-96 mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
          <Image
            src={post.thumbnail}
            alt={post.title}
            width={1200}
            height={800}
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-border prose-a:text-primary prose-code:text-foreground prose-pre:bg-muted"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span>Published on {formatDate(post.createdAt)}</span>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share Article
              </Button>
            </div>
          </div>
        </footer>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <Button asChild>
            <Link href="/market-news">View More Market News</Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

function PostDetailSkeleton() {
  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <div className="content-container max-w-4xl">
        {/* Back Button Skeleton */}
        <Skeleton className="h-10 w-32 mb-8" />

        {/* Header Skeleton */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-12 w-full mb-4" />
          <Skeleton className="h-12 w-3/4 mb-6" />
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </header>

        {/* Image Skeleton */}
        <Skeleton className="h-64 sm:h-80 lg:h-96 w-full mb-8 rounded-2xl" />

        {/* Content Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
