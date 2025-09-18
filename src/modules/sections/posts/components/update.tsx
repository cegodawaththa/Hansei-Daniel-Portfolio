"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import {
  updatePostsSchema,
  type UpdatePostsSchemaT
} from "@/lib/zod/posts.zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useUpdatePost } from "../queries/use-update-post";
import { useGetPostByID } from "../queries/use-get-post-by-id";
import GalleryView from "@/modules/media/components/gallery-view";
import type { Media } from "@/lib/zod/media.zod";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

interface UpdatePostProps {
  id: string;
}

export function UpdatePost({ id }: UpdatePostProps) {
  const router = useRouter();
  const { mutateAsync, isPending: isUpdating } = useUpdatePost();
  const { data: post, isLoading } = useGetPostByID(id);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");

  const form = useForm<UpdatePostsSchemaT>({
    resolver: zodResolver(updatePostsSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      content: ""
    }
  });

  // Update form when post data is loaded
  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title || "",
        thumbnail: post.thumbnail || "",
        content: post.content || ""
      });
      setSelectedThumbnail(post.thumbnail || "");
    }
  }, [post, form]);

  const onSubmit = async (values: UpdatePostsSchemaT) => {
    try {
      await mutateAsync(
        { id, values },
        {
          onSuccess: () => {
            router.push("/dashboard/posts");
          }
        }
      );
    } catch (error) {
      // Error is handled by the mutation itself
      console.error("Update failed:", error);
    }
  };

  // Handle form submission manually to prevent default behavior
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };

  const handleThumbnailSelect = (media: Media) => {
    setSelectedThumbnail(media.url);
    form.setValue("thumbnail", media.url);
    setShowGallery(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <>
      <GalleryView
        modal={true}
        modalOpen={showGallery}
        setModalOpen={setShowGallery}
        activeTab="library"
        onUseSelected={(media) =>
          media.length > 0 && handleThumbnailSelect(media[0])
        }
      />

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter post title"
                      {...field}
                      disabled={isUpdating}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Thumbnail Field */}
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Input
                          placeholder="Enter thumbnail URL or select from gallery"
                          {...field}
                          disabled={isUpdating}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => setShowGallery(true)}
                          disabled={isUpdating}
                        >
                          <ImageIcon className="h-4 w-4" />
                        </Button>
                      </div>

                      {selectedThumbnail && (
                        <div className="relative w-full h-32 border rounded-lg overflow-hidden">
                          <Image
                            src={selectedThumbnail}
                            alt="Selected thumbnail"
                            fill
                            className="object-cover"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={() => {
                              setSelectedThumbnail("");
                              form.setValue("thumbnail", "");
                            }}
                            disabled={isUpdating}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Content Field */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <RichTextEditor
                    content={field.value || ""}
                    onChange={field.onChange}
                    placeholder="Write your post content here..."
                    disabled={isUpdating}
                    className="min-h-[400px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update Post"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
