import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { PostTableActions } from "@/modules/sections/posts/components/post-table/post-table-actions";
import { Separator } from "@/components/ui/separator";
import PostTable from "@/modules/sections/posts/components/listing";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircleIcon } from "lucide-react";

export default function PostsPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title="Market News"
          description="Manage your market news and blog posts here."
          actionComponent={
            <Button asChild variant={"outline"} icon={<PlusCircleIcon />}>
              <Link href="/dashboard/posts/new">Add New Post</Link>
            </Button>
          }
        />

        <Separator />

        <PostTableActions />

        <PostTable />
      </div>
    </PageContainer>
  );
}
