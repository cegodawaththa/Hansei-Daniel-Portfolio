"use client";

import React from "react";
import Link from "next/link";
import { useGetCvLink } from "@/modules/settings/hooks/use-get-cv-link";

type Props = {
  children: React.ReactNode;
};

export function DownloadCVButton({ children }: Props) {
  const { data: cvLink, isLoading, error } = useGetCvLink();

  // If loading or error, disable the link
  if (isLoading || error || !cvLink) {
    return <div className="opacity-50 cursor-not-allowed">{children}</div>;
  }

  return (
    <Link
      href={cvLink}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer"
    >
      {children}
    </Link>
  );
}
