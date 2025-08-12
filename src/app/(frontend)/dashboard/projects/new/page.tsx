import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { AddNewProject } from "@/modules/sections/projects/components/create";

export default function NewProjectPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 max-w-3xl mx-auto">
        <AppPageShell
          title="Add new Project"
          description="Fill the following form to create new Project"
          actionComponent={undefined}
        />

        <div className="mt-3">
          <AddNewProject />
        </div>
      </div>
    </PageContainer>
  );
}
