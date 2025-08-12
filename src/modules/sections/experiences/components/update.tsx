"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

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

import { useGetExperienceByID } from "../queries/use-get-experience-by-id";
import { useUpdateExperience } from "../queries/use-update-experience";
import {
  updateExperiencesSchema,
  UpdateExperiencesSchemaT
} from "@/lib/zod/experiences.zod";
import { ProjectSelector } from "./project-selector";

interface UpdateExperienceProps {
  id: string;
}

export function UpdateExperience({ id }: UpdateExperienceProps) {
  const router = useRouter();

  const {
    data: currentExperience,
    isFetching,
    error: fetchError
  } = useGetExperienceByID(id);
  const { mutateAsync, isPending } = useUpdateExperience(id);

  const form = useForm<UpdateExperiencesSchemaT>({
    resolver: zodResolver(updateExperiencesSchema),
    defaultValues: {
      role: "",
      content: "",
      project: "",
      duration: ""
    }
  });

  useEffect(() => {
    if (currentExperience) {
      form.reset({
        role: currentExperience.role,
        content: currentExperience.content,
        project:
          typeof currentExperience.project === "object" &&
          currentExperience.project
            ? currentExperience.project.id
            : currentExperience.project,
        duration: currentExperience.duration
      });
    }
  }, [form, currentExperience]);

  const onSubmit = async (values: UpdateExperiencesSchemaT) => {
    try {
      await mutateAsync(values, {
        onSuccess: () => {
          router.push("/dashboard/experiences");
        }
      });
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

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-muted-foreground">Loading experience...</div>
      </div>
    );
  }

  if (fetchError || !currentExperience) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-destructive">
          Error loading experience. Please try again.
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role *</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Senior Developer, Project Manager"
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
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Associated Project</FormLabel>
              <FormControl>
                <ProjectSelector
                  value={field.value || ""}
                  onSelect={(value) => field.onChange(value)}
                  placeholder="Select a project (optional)"
                  disabled={true} // Disabled in update form as requested
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., 6 months, Jan 2023 - Dec 2023"
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your experience, responsibilities, and achievements..."
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

        <div className="flex gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Updating..." : "Update Experience"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard/experiences")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
