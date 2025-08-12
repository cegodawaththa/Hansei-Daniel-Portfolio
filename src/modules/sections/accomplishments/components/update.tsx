"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  updateAccomplishmentsSchema,
  type UpdateAccomplishmentsSchemaT
} from "@/lib/zod/accomplishments.zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useUpdateAccomplishment } from "../queries/use-update-accomplishment";
import { useGetAccomplishmentByID } from "../queries/use-get-accomplishment-by-id";
import GalleryView from "@/modules/media/components/gallery-view";
import type { Media } from "@/lib/zod/media.zod";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface UpdateAccomplishmentProps {
  id: string;
}

export function UpdateAccomplishment({ id }: UpdateAccomplishmentProps) {
  const router = useRouter();

  const {
    data: currentAccomplishment,
    isFetching,
    error: fetchError
  } = useGetAccomplishmentByID(id);
  const { mutateAsync, isPending } = useUpdateAccomplishment(id);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState<string>("");

  const form = useForm<UpdateAccomplishmentsSchemaT>({
    resolver: zodResolver(updateAccomplishmentsSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: ""
    }
  });

  useEffect(() => {
    if (currentAccomplishment) {
      form.reset({
        title: currentAccomplishment.title,
        content: currentAccomplishment.content,
        thumbnail: currentAccomplishment.thumbnail
      });

      setSelectedThumbnail(currentAccomplishment?.thumbnail || "");
    }
  }, [form, currentAccomplishment]);

  const onSubmit = async (values: UpdateAccomplishmentsSchemaT) => {
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
      console.error("Update failed:", error);
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

  if (fetchError) {
    return (
      <div>
        <p>Error fetching accomplishment details</p>
        <p>{fetchError.message}</p>
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
                  {isFetching ? (
                    <Skeleton className="w-full h-4" />
                  ) : (
                    <Input placeholder="Project Achievement" {...field} />
                  )}
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

              {isFetching && <Skeleton className="h-16 w-16" />}

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
                  {isFetching ? (
                    <Skeleton className="w-full h-24" />
                  ) : (
                    <Textarea
                      placeholder="Describe your accomplishment"
                      name={field.name}
                      value={(field.value as string) || ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  )}
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
              Update Accomplishment
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
