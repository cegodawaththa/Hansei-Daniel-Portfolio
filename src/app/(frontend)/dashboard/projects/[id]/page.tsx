import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { UpdateProject } from "@/modules/sections/projects/components/update";

interface UpdateProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateProjectPage({
  params
}: UpdateProjectPageProps) {
  const paramsList = await params;

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 max-w-3xl mx-auto">
        <AppPageShell
          title="Update Project"
          description="Fill the following form to update the Project"
          actionComponent={undefined}
        />

        <div className="mt-3">
          <UpdateProject id={paramsList.id} />
        </div>
      </div>
    </PageContainer>
  );
}
