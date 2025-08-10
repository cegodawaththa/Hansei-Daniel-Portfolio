import PageContainer from "@/modules/layouts/page-container";
import { AppPageShell } from "@/modules/layouts/page-shell";
import { SettingsTabBar } from "@/modules/settings/components/settings-tab-bar";
import { SiteSettingsView } from "@/modules/settings/components/site-settings-view";
import React from "react";

export default function SettingsPage() {
  return (
    <PageContainer scrollable={false}>
      <div className="flex flex-1 flex-col space-y-4">
        <AppPageShell
          title="Site Settings"
          description="Manage your site settings here."
          actionComponent={undefined}
        />

        <SettingsTabBar />

        <SiteSettingsView />
      </div>
    </PageContainer>
  );
}
