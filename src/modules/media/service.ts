import { upload } from "@vercel/blob/client";

import { getClient } from "@/lib/rpc/client";
import { blobConfig } from "@/modules/media/config";
import type {
  Media,
  MediaUploadType,
  QueryParamsSchema,
  UploadParams
} from "@/modules/media/types";
import { generateUniqueFileName, getMediaType } from "@/modules/media/utils";

export class MediaService {
  private static instance: MediaService;

  private constructor() {}

  static getInstance(): MediaService {
    if (!MediaService.instance) {
      MediaService.instance = new MediaService();
    }

    return MediaService.instance;
  }

  async uploadFile({
    file,
    path = "",
    onProgress
  }: UploadParams): Promise<Media> {
    // Step 1: Upload file to Vercel Blob
    const filename = generateUniqueFileName(file.name);
    const pathname = path ? `${path}/${filename}` : filename;

    // Signal uploading started
    if (onProgress) {
      onProgress({
        loaded: 0,
        total: file.size,
        percentage: 0,
        key: pathname
      });
    }

    try {
      const blob = await upload(pathname, file, {
        access: "public",
        handleUploadUrl: blobConfig.uploadUrl
      });

      // Signal upload complete
      if (onProgress) {
        onProgress({
          loaded: file.size,
          total: file.size,
          percentage: 100,
          key: pathname
        });
      }

      // Step 2: Create media file metadata
      const mediaData: MediaUploadType = {
        url: blob.url,
        type: getMediaType(file.type),
        filename: filename,
        size: file.size,
        seoTitle: "",
        seoDescription: "",
        seoKeywords: ""
      };

      // Step 3: Save media metadata to database via API
      const rpcClient = await getClient();

      const createdRes = await rpcClient.api.media.$post({
        json: mediaData
      });

      if (!createdRes.ok) {
        const { message } = await createdRes.json();
        console.log({ message });
        throw new Error(message);
      }

      const createdMedia = await createdRes.json();

      return {
        ...createdMedia,
        createdAt: new Date(createdMedia.createdAt),
        updatedAt: createdMedia?.updatedAt
          ? new Date(createdMedia.updatedAt)
          : null
      };
    } catch (error) {
      console.log(error);

      throw new Error(
        `Failed to upload media: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  async deleteFile(id: string) {
    const rpcClient = await getClient();

    // Delete from database (blob cleanup handled server-side in the delete handler)
    const deleteRes = await rpcClient.api.media[":id"].$delete({
      param: { id }
    });

    if (!deleteRes.ok) {
      const { message } = await deleteRes.json();
      throw new Error(message);
    }

    return await deleteRes.json();
  }

  async getAllMedia(query: QueryParamsSchema) {
    const rpcClient = await getClient();

    const mediaRes = await rpcClient.api.media.$get({
      query: query
    });

    if (!mediaRes.ok) {
      const { message } = await mediaRes.json();
      throw new Error(message);
    }

    return await mediaRes.json();
  }

  async getMediaById(id: string) {
    const rpcClient = await getClient();

    const mediaRes = await rpcClient.api.media[":id"].$get({
      param: { id }
    });

    if (!mediaRes.ok) {
      const { message } = await mediaRes.json();
      throw new Error(message);
    }

    return await mediaRes.json();
  }

  async updateMediaDetails(id: string, body: MediaUploadType) {
    const rpcClient = await getClient();
    const updateRes = await rpcClient.api.media[":id"].$patch({
      param: { id },
      json: body
    });

    if (!updateRes.ok) {
      const { message } = await updateRes.json();
      throw new Error(message);
    }

    const updatedMedia = await updateRes.json();
    return updatedMedia;
  }
}
