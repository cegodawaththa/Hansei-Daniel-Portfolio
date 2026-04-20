import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Authenticate the user before allowing upload
        const session = await auth.api.getSession({
          headers: await headers()
        });

        if (!session) {
          throw new Error("Unauthorized");
        }

        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg+xml",
            "video/mp4",
            "video/webm",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ],
          maximumSizeInBytes: 10 * 1024 * 1024 // 10MB
        };
      },
      onUploadCompleted: async () => {
        // This callback is called by Vercel Blob after the upload is complete.
        // It runs on the server and can be used for post-upload processing.
        // The media metadata is saved separately via the existing /api/media POST endpoint.
      }
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
