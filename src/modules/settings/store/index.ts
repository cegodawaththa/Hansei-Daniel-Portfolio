import { SiteSettingsMapT } from "@/lib/zod/settings.zod";
import { create } from "zustand";

export type TabType = "general" | "social" | "contact";

type SettingsStore = SiteSettingsMapT & {
  tab: TabType;

  setTab: (tab: TabType) => void;
  setSettings: (settings: SiteSettingsMapT) => void;
};

export const useSettingsStore = create<SettingsStore>((set) => ({
  tab: "general",

  portfolioName: "",
  shortDescription: "",
  fullBio: "",
  primaryEmail: "",
  secondaryEmail: "",
  primaryPhone: "",
  secondaryPhone: "",
  currentAddress: "",
  website: "",
  facebook: "",
  linkedin: "",
  twitter: "",
  instagram: "",
  profileImage: "",
  coverImage: "",
  bioImages: "",

  setTab: (tab) => set({ tab }),
  setSettings: (settings) => set({ ...settings })
}));
