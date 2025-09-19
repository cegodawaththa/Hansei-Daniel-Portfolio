import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { AddNewPost } from "@/modules/sections/posts/components/create";

export default function NewPostPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 max-w-3xl mx-auto">
        <AppPageShell
          title="Add new Market News"
          description="Fill the following form to create new market news post"
          actionComponent={undefined}
        />

        <div className="mt-3">
          <AddNewPost />
        </div>
      </div>
    </PageContainer>
  );
}
