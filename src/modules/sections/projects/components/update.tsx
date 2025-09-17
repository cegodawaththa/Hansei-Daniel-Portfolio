"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import GalleryView from "@/modules/media/components/gallery-view";
import { Media } from "@/modules/media/types";
import Image from "next/image";

import { useGetProjectByID } from "../queries/use-get-project-by-id";
import { useUpdateProject } from "../queries/use-update-project";
import {
  updateProjectsSchema,
  UpdateProjectsSchemaT
} from "@/lib/zod/projects.zod";
import { ProjectStatusDropdown } from "./project-status-dropdown";

interface UpdateProjectProps {
  id: string;
}

export function UpdateProject({ id }: UpdateProjectProps) {
  const router = useRouter();

  const {
    data: currentProject,
    isFetching,
    error: fetchError
  } = useGetProjectByID(id);
  const { mutateAsync, isPending } = useUpdateProject(id);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [selectedThumbnails, setSelectedThumbnails] = useState<string[]>([]);

  const form = useForm<UpdateProjectsSchemaT>({
    resolver: zodResolver(updateProjectsSchema),
    defaultValues: {
      name: "",
      description: "",
      thumbnails: [],
      projectType: "",
      status: null,
      location: "",
      client: "",
      projectValue: ""
    }
  });

  useEffect(() => {
    if (currentProject) {
      form.reset({
        name: currentProject.name,
        description: currentProject.description,
        thumbnails: currentProject.thumbnails,
        projectType: currentProject.projectType,
        status: currentProject.status,
        location: currentProject.location,
        client: currentProject.client,
        projectValue: currentProject.projectValue
      });

      setSelectedThumbnails(currentProject?.thumbnails || []);
    }
  }, [form, currentProject]);

  const onSubmit = async (values: UpdateProjectsSchemaT) => {
    try {
      await mutateAsync(
        {
          ...values,
          thumbnails:
            selectedThumbnails.length > 0
              ? selectedThumbnails
              : values.thumbnails
        },
        {
          onSuccess: () => {
            router.push("/dashboard/projects");
          }
        }
      );
    } catch (error) {
      // Error is handled by the mutation itself
      console.error("Update failed:", error);
    }
  };

  const handleGallerySelect = (selectedFiles: Media[]) => {
    const urls = selectedFiles.map((file) => file.url);
    setSelectedThumbnails(urls);
    form.setValue("thumbnails", urls);
    setShowGallery(false);
  };

  const removeThumbnail = (index: number) => {
    const newThumbnails = selectedThumbnails.filter((_, i) => i !== index);
    setSelectedThumbnails(newThumbnails);
    form.setValue("thumbnails", newThumbnails);
  };

  // Handle form submission manually to prevent default behavior
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };

  if (fetchError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          Error loading project: {fetchError.message}
        </p>
        <Button
          onClick={() => router.push("/dashboard/projects")}
          className="mt-4"
        >
          Back to Projects
        </Button>
      </div>
    );
  }

  if (isFetching) {
    return (
      <div className="text-center py-8">
        <p>Loading project...</p>
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter project name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., Residential, Commercial"
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

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project location"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="client"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter client name"
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

            <FormField
              control={form.control}
              name="projectValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g., $500,000"
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
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Status</FormLabel>
                <FormControl>
                  <ProjectStatusDropdown
                    status={field.value}
                    onSelect={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Thumbnails Section */}
          <div className="space-y-3">
            <FormLabel>Project Images</FormLabel>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowGallery(true)}
              >
                Select Images
              </Button>
              {selectedThumbnails.length > 0 && (
                <span className="text-sm text-muted-foreground">
                  {selectedThumbnails.length} image(s) selected
                </span>
              )}
            </div>

            {/* Display selected thumbnails */}
            {selectedThumbnails.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedThumbnails.map((url, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      width={96}
                      height={96}
                      className="w-full h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeThumbnail(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter project description..."
                    className="min-h-[120px]"
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

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard/projects")}
            >
              Cancel
            </Button>
            <Button type="submit" loading={isPending}>
              Update Project
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
