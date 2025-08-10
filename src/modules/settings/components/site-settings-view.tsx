"use client";

import React, { useEffect } from "react";
import { useSettingsStore } from "../store";
import { BasicSettingsForm } from "./forms/basic.settings";
import { SocialSettingsForm } from "./forms/socials.settings";
import { ContactSettingsForm } from "./forms/contacts.settings";
import { useGetSettings } from "../queries/use-get-settings";
import { Loader } from "lucide-react";

export function SiteSettingsView({}) {
  const { tab, setSettings } = useSettingsStore();

  const { data, isFetching, error } = useGetSettings();

  useEffect(() => {
    if (data) {
      setSettings(data);
    }
  }, [data, setSettings]);

  if (isFetching)
    return (
      <div className="w-full h-full flex-1 flex items-center justify-center">
        <div className="rounded-full p-2 bg-secondary/50">
          <Loader className="size-6 animate-spin text-secondary-foreground" />
        </div>
      </div>
    );

  if (error || !data) {
    return (
      <div className="w-full h-full flex-1 flex items-center justify-center">
        <p>Error fetching settings</p>
      </div>
    );
  }

  switch (tab) {
    case "general":
      return <BasicSettingsForm />;

    case "contact":
      return <ContactSettingsForm />;

    case "social":
      return <SocialSettingsForm />;

    default:
      return <></>;
  }
}
