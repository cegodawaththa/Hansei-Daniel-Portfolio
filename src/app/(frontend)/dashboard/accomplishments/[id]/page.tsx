import React from "react";

import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { UpdateAccomplishment } from "@/modules/sections/accomplishments/components/update";

interface UpdateAccomplishmentPageProps {
  params: Promise<{ id: string }>;
}

export default async function UpdateAccomplishmentsPage({
  params
}: UpdateAccomplishmentPageProps) {
  const paramsList = await params;

  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4 max-w-3xl mx-auto">
        <AppPageShell
          title="Update Accomplishment"
          description="Fill the following form to update the Accomplishment"
          actionComponent={undefined}
        />

        <div className="mt-3">
          <UpdateAccomplishment id={paramsList.id} />
        </div>
      </div>
    </PageContainer>
  );
}
