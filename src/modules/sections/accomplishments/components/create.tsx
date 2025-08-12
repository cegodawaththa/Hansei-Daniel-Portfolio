"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  insertAccomplishmentsSchema,
  type InsertAccomplishmentsSchemaT
} from "@/lib/zod/accomplishments.zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useCreateAccomplishment } from "../queries/use-create-accomplishment";
import GalleryView from "@/modules/media/components/gallery-view";
import type { Media } from "@/lib/zod/media.zod";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export function AddNewAccomplishment() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateAccomplishment();
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");

  const form = useForm<InsertAccomplishmentsSchemaT>({
    resolver: zodResolver(insertAccomplishmentsSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: ""
    }
  });

  const onSubmit = async (values: InsertAccomplishmentsSchemaT) => {
    try {
      await mutateAsync(
        {
          ...values,
          thumbnail: selectedThumbnail || values.thumbnail
        },
        {
          onSuccess: () => {
            form.reset();
            setSelectedThumbnail("");
            router.push("/dashboard/accomplishments");
          }
        }
      );
    } catch (error) {
      // Error is handled by the mutation itself
      console.error("Create failed:", error);
    }
  };

  const handleGallerySelect = (selectedFiles: Media[]) => {
    if (selectedFiles.length > 0) {
      setSelectedThumbnail(selectedFiles[0].url);
      form.setValue("thumbnail", selectedFiles[0].url);
    }
    setShowGallery(false);
  };

  // Handle form submission manually to prevent default behavior
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <>
      <GalleryView
        modal={true}
        modalOpen={showGallery}
        setModalOpen={setShowGallery}
        activeTab="library"
        onUseSelected={handleGallerySelect}
      />

      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Title *</FormLabel>
                <FormControl>
                  <Input placeholder="Project Achievement" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <Label className="text-sm">Thumbnail</Label>
            <div className="flex flex-col items-start gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowGallery(true)}
                className="flex items-center gap-2"
              >
                <ImageIcon className="h-4 w-4" />
                Select Image
              </Button>

              {selectedThumbnail && (
                <div className="flex items-center gap-2">
                  <Image
                    src={selectedThumbnail}
                    alt="Selected thumbnail"
                    width={64}
                    height={64}
                    className="rounded-md object-cover"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedThumbnail("");
                      form.setValue("thumbnail", "");
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm">Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Describe your accomplishment"
                    name={field.name}
                    value={(field.value as string) || ""}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-x-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} loading={isPending}>
              Add Accomplishment
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
