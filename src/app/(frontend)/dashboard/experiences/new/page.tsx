import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { AddNewExperience } from "@/modules/sections/experiences/components/create";

export default function NewExperiencePage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 max-w-3xl mx-auto">
        <AppPageShell
          title="Add new Experience"
          description="Fill the following form to create new Experience"
          actionComponent={undefined}
        />

        <div className="mt-3">
          <AddNewExperience />
        </div>
      </div>
    </PageContainer>
  );
}
