"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

import {
  updateQualificationSchema,
  type UpdateQualificationsSchemaT
} from "@/lib/zod/qualifications.zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useUpdateQualification } from "../queries/use-update-qualification";
import { useGetQualificationByID } from "../queries/use-get-qualification-by-id";
import { Skeleton } from "@/components/ui/skeleton";

interface UpdateQualificationProps {
  id: string;
  children: React.ReactNode;
}

export function UpdateQualification({
  id,
  children
}: UpdateQualificationProps) {
  const {
    data: currentQualification,
    isPending: isFetching,
    error: fetchError
  } = useGetQualificationByID(id);
  const { mutateAsync, isPending } = useUpdateQualification(id);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<UpdateQualificationsSchemaT>({
    resolver: zodResolver(updateQualificationSchema),
    defaultValues: {
      name: ""
    }
  });

  useEffect(() => {
    if (currentQualification) {
      form.reset({
        name: currentQualification.name
      });
    }
  }, [currentQualification, form]);

  const onSubmit = async (values: UpdateQualificationsSchemaT) => {
    await mutateAsync(values, {
      onSuccess: () => {
        form.reset();
      }
    });

    setIsOpen(false);
  };

  // Handle form submission manually to prevent default behavior
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <DialogHeader>
              <DialogTitle>Add new Qualification</DialogTitle>
              <DialogDescription>
                Make new qualification for your portfolio showcase
              </DialogDescription>
            </DialogHeader>

            {isFetching && (
              <div className="space-y-2">
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-12 w-full" />
              </div>
            )}

            {fetchError && (
              <div className="text-red-500">{fetchError.message}</div>
            )}

            {currentQualification && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">
                      Qualification Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Project Management" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending} loading={isPending}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
