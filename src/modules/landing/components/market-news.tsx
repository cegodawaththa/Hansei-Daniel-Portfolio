"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar, Eye, Newspaper } from "lucide-react";
import { PostsSchemaT } from "@/lib/zod/posts.zod";

type Props = {
  className?: string;
  posts: PostsSchemaT[];
};

export function MarketNews({ className, posts }: Props) {
  if (!posts || posts.length === 0) {
    return null;
  }

  // Show only the first 3 posts
  const featuredPosts = posts.slice(0, 3);

  return (
    <section
      id="market-news"
      className={cn(
        "py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-background via-background/95 to-primary/5",
        className
      )}
    >
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

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-6">
            Latest Market News
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Stay informed with the latest real estate market insights, trends,
            and analysis to make informed property investment decisions.
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {featuredPosts.map((post, index) => (
            <PostCard key={post.id} post={post} featured={index === 0} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 h-auto"
          >
            <Link href="/market-news">
              View All Market News
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function PostCard({
  post,
  featured
}: {
  post: PostsSchemaT;
  featured?: boolean;
}) {
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
    <article
      className={cn(
        "group relative bg-white dark:bg-gray-900/50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800",
        featured && "md:col-span-2 lg:col-span-1 lg:row-span-2"
      )}
    >
      {/* Image */}
      <div
        className={cn(
          "relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900",
          featured ? "h-64 sm:h-80" : "h-48 sm:h-56"
        )}
      >
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {featured && (
          <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>

      {/* Content */}
      <div className={cn("p-6", featured && "lg:p-8")}>
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(post.createdAt.toString())}</span>
        </div>

        {/* Title */}
        <h3
          className={cn(
            "font-heading font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300",
            featured ? "text-xl sm:text-2xl" : "text-lg"
          )}
        >
          {post.title}
        </h3>

        {/* Content Preview */}
        <p
          className={cn(
            "text-muted-foreground mb-4 leading-relaxed",
            featured ? "text-base line-clamp-4" : "text-sm line-clamp-3"
          )}
        >
          {getContentPreview(post.content, featured ? 200 : 120)}
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
