import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { AddNewAccomplishment } from "@/modules/sections/accomplishments/components/create";

export default function NewAccomplishmentsPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 max-w-3xl mx-auto">
        <AppPageShell
          title="Add new Accomplishment"
          description="Fill the following form to create new Accomplishment"
          actionComponent={undefined}
        />

        <div className="mt-3">
          <AddNewAccomplishment />
        </div>
      </div>
    </PageContainer>
  );
}
