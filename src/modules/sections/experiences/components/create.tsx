"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import { useCreateExperience } from "../queries/use-create-experience";
import {
  insertExperiencesSchema,
  InsertExperiencesSchemaT
} from "@/lib/zod/experiences.zod";
import { ProjectSelector } from "./project-selector";

export function AddNewExperience() {
  const router = useRouter();
  const { mutateAsync, isPending } = useCreateExperience();

  const form = useForm<InsertExperiencesSchemaT>({
    resolver: zodResolver(insertExperiencesSchema),
    defaultValues: {
      role: "",
      content: "",
      project: "",
      duration: ""
    }
  });

  const onSubmit = async (values: InsertExperiencesSchemaT) => {
    try {
      await mutateAsync(values, {
        onSuccess: () => {
          form.reset();
          router.push("/dashboard/experiences");
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
            {isPending ? "Creating..." : "Create Experience"}
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
