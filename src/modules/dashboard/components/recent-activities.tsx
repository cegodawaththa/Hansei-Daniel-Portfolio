"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import {
  Building,
  MessageSquare,
  Trophy,
  NewspaperIcon,
  Clock,
  ExternalLink
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetInquiries } from "@/modules/sections/inquiries/queries/use-get-inquiries";
import { useGetProjects } from "@/modules/sections/projects/queries/use-get-projects";
import { useGetPosts } from "@/modules/sections/posts/queries/use-get-posts";
import Link from "next/link";

interface ActivityItem {
  id: string;
  type: "inquiry" | "project" | "post" | "accomplishment";
  title: string;
  description?: string | null;
  timestamp: Date;
  status?: string | null;
  href?: string;
}

function ActivityIcon({ type }: { type: ActivityItem["type"] }) {
  const iconProps = { className: "w-4 h-4" };

  switch (type) {
    case "inquiry":
      return <MessageSquare {...iconProps} />;
    case "project":
      return <Building {...iconProps} />;
    case "post":
      return <NewspaperIcon {...iconProps} />;
    case "accomplishment":
      return <Trophy {...iconProps} />;
    default:
      return <Clock {...iconProps} />;
  }
}

function ActivityItem({ activity }: { activity: ActivityItem }) {
  return (
    <div className="flex items-start space-x-3 py-2">
      <div className="flex-shrink-0 w-8 h-8 bg-muted rounded-full flex items-center justify-center">
        <ActivityIcon type={activity.type} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-foreground truncate">
            {activity.title}
          </p>
          {activity.status && (
            <Badge
              variant={activity.status === "unread" ? "default" : "secondary"}
              className="ml-2"
            >
              {activity.status}
            </Badge>
          )}
        </div>

        {activity.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
            {activity.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
          </p>

          {activity.href && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={activity.href}>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function RecentActivities() {
  const { data: inquiriesData, isLoading: inquiriesLoading } = useGetInquiries({
    limit: 3,
    sort: "desc"
  });
  const { data: projectsData, isLoading: projectsLoading } = useGetProjects({
    limit: 3,
    sort: "desc"
  });
  const { data: postsData, isLoading: postsLoading } = useGetPosts({
    limit: "3",
    sort: "desc"
  });

  const activities: ActivityItem[] = [];

  // Add recent inquiries
  if (inquiriesData?.data) {
    inquiriesData.data.forEach((inquiry) => {
      activities.push({
        id: inquiry.id,
        type: "inquiry",
        title: `New inquiry from ${inquiry.name}`,
        description: inquiry.message,
        timestamp: new Date(inquiry.createdAt),
        status: inquiry.status ?? "unread",
        href: `/dashboard/inquiries/${inquiry.id}`
      });
    });
  }

  // Add recent projects
  if (projectsData?.data) {
    projectsData.data.slice(0, 2).forEach((project) => {
      activities.push({
        id: project.id,
        type: "project",
        title: project.name,
        description: project.description ?? "",
        timestamp: new Date(
          project.updatedAt || project.createdAt || Date.now()
        ),
        href: `/dashboard/projects/${project.id}`
      });
    });
  }

  // Add recent posts
  if (postsData?.data) {
    postsData.data.slice(0, 2).forEach((post) => {
      activities.push({
        id: post.id,
        type: "post",
        title: post.title,
        description: post.content,
        timestamp: new Date(post.createdAt),
        href: `/dashboard/posts/${post.id}`
      });
    });
  }

  // Sort by timestamp (most recent first)
  activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const isLoading = inquiriesLoading || projectsLoading || postsLoading;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Activities
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/inquiries">
              View All
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          </Button>
        </CardTitle>
        <CardDescription>Latest updates across your portfolio</CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded animate-pulse" />
                  <div className="h-3 bg-muted rounded w-3/4 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length > 0 ? (
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {activities.slice(0, 8).map((activity) => (
                <ActivityItem key={activity.id} activity={activity} />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent activities</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
