"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  insertPostsSchema,
  type InsertPostsSchemaT
} from "@/lib/zod/posts.zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useCreatePost } from "../queries/use-create-post";
import GalleryView from "@/modules/media/components/gallery-view";
import type { Media } from "@/lib/zod/media.zod";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

export function AddNewPost() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreatePost();
  const [showGallery, setShowGallery] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");

  const form = useForm<InsertPostsSchemaT>({
    resolver: zodResolver(insertPostsSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      content: ""
    }
  });

  const onSubmit = async (values: InsertPostsSchemaT) => {
    try {
      await mutateAsync(values, {
        onSuccess: () => {
          form.reset();
          router.push("/dashboard/posts");
        }
      });
    } catch (error) {
      // Error is handled by the mutation itself
      console.error("Create failed:", error);
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
          <div className="w-full flex items-start gap-6">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter post title"
                      {...field}
                      disabled={isPending}
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
              render={({}) => (
                <FormItem className="flex-1 w-full">
                  <FormLabel>Thumbnail</FormLabel>
                  <FormControl>
                    <div className="space-y-3">
                      <div className="w-full flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                          onClick={() => setShowGallery(true)}
                          disabled={isPending}
                          icon={<ImageIcon className="h-4 w-4" />}
                        >
                          Select Thumbnail
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
                            disabled={isPending}
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
                    content={field.value}
                    onChange={field.onChange}
                    placeholder="Write your post content here..."
                    disabled={isPending}
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
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Post"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
