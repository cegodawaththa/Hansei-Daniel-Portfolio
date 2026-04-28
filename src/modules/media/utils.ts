import crypto from "crypto";

import { MediaType } from "@/modules/media/types";

// Utility functions
export function generateUniqueFileName(originalName: string): string {
  const timestamp = Date.now();

  const hash = crypto.randomBytes(8).toString("hex");
  const name = originalName.split(".")[0];
  const extension = originalName.split(".").pop();

  return `${name}-${timestamp}-${hash}.${extension}`;
}

export function getMediaType(fileType: string): MediaType {
  if (fileType.startsWith("image/")) return "image";
  if (fileType.startsWith("video/")) return "video";
  if (fileType.startsWith("pdf/")) return "document";
  return "document";
}
