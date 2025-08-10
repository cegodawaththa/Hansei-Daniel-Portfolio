"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useSettingsStore } from "../store";
import { Button } from "@/components/ui/button";
import { ContactIcon, HeartIcon, PhoneIcon } from "lucide-react";

export function SettingsTabBar() {
  const { tab, setTab } = useSettingsStore();

  return (
    <nav className="border-y border-secondary/90 flex items-center justify-between bg-transparent w-full h-12">
      <div className="flex items-center gap-3 h-full">
        <Button
          variant={"ghost"}
          className={cn(
            `px-4 h-full rounded-none hover:bg-secondary/30 cursor-pointer`,
            tab === "general" && "border-b-2 border-primary"
          )}
          onClick={() => setTab("general")}
        >
          <span
            className={`${
              tab === "general" ? "text-primary" : "text-primary/60"
            } flex items-center gap-3`}
          >
            <ContactIcon className="size-4" />
            General
          </span>
        </Button>

        <Button
          variant={"ghost"}
          className={cn(
            `px-4 h-full rounded-none hover:bg-secondary/30 cursor-pointer`,
            tab === "contact" && "border-b-2 border-primary"
          )}
          onClick={() => setTab("contact")}
        >
          <span
            className={`${
              tab === "contact" ? "text-primary" : "text-primary/60"
            } flex items-center gap-3`}
          >
            <PhoneIcon className="size-4" />
            Contact
          </span>
        </Button>

        <Button
          variant={"ghost"}
          className={cn(
            `px-4 h-full rounded-none hover:bg-secondary/30 cursor-pointer`,
            tab === "social" && "border-b-2 border-primary"
          )}
          onClick={() => setTab("social")}
        >
          <span
            className={`${
              tab === "social" ? "text-primary" : "text-primary/60"
            } flex items-center gap-3`}
          >
            <HeartIcon className="size-4" />
            Socials
          </span>
        </Button>
      </div>
    </nav>
  );
}
