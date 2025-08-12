import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { UpdateExperience } from "@/modules/sections/experiences/components/update";

interface UpdateExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateExperiencePage({
  params
}: UpdateExperiencePageProps) {
  const paramsList = await params;

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 max-w-3xl mx-auto">
        <AppPageShell
          title="Update Experience"
          description="Fill the following form to update the Experience"
          actionComponent={undefined}
        />

        <div className="mt-3">
          <UpdateExperience id={paramsList.id} />
        </div>
      </div>
    </PageContainer>
  );
}
