"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
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
import { NovelEditor } from "@/modules/novel/components/editor";
import GalleryView from "@/modules/media/components/gallery-view";
import type { Media } from "@/lib/zod/media.zod";

export function AddNewAccomplishment() {
  const { mutateAsync, isPending } = useCreateAccomplishment();
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
            setIsOpen(false);
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Accomplishment
          </Button>
        </DialogTrigger>

        <DialogContent
          className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <DialogHeader>
                <DialogTitle>Add New Accomplishment</DialogTitle>
                <DialogDescription>
                  Add a new accomplishment to your portfolio
                </DialogDescription>
              </DialogHeader>

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
                <div className="flex items-center gap-4">
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
                      <div className="min-h-[300px] border rounded-md">
                        <NovelEditor
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isPending} loading={isPending}>
                  Add Accomplishment
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Gallery Modal */}
      <Dialog open={showGallery} onOpenChange={setShowGallery}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Select Thumbnail Image</DialogTitle>
            <DialogDescription>
              Choose an image from your gallery to use as the thumbnail
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <GalleryView
              modal={true}
              activeTab="library"
              onUseSelected={handleGallerySelect}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
