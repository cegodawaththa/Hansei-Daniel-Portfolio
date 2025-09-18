import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { UpdatePost } from "@/modules/sections/posts/components/update";

interface UpdatePostPageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdatePostPage({ params }: UpdatePostPageProps) {
  const paramsList = await params;

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 max-w-3xl mx-auto">
        <AppPageShell
          title="Update Market News"
          description="Fill the following form to update the market news post"
          actionComponent={undefined}
        />

        <div className="mt-3">
          <UpdatePost id={paramsList.id} />
        </div>
      </div>
    </PageContainer>
  );
}
