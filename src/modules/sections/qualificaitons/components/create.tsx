"use client";
import { PlusCircleIcon } from "lucide-react";
import React, { useState } from "react";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  insertQualificationsSchema,
  InsertQualificationsSchemaT
} from "@/lib/zod/qualifications.zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useCreateQualification } from "../queries/use-create-qualification";

export function AddNewQualification() {
  const { mutateAsync, isPending } = useCreateQualification();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const form = useForm<InsertQualificationsSchemaT>({
    resolver: zodResolver(insertQualificationsSchema),
    defaultValues: {
      name: ""
    }
  });

  const onSubmit = async (values: InsertQualificationsSchemaT) => {
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
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          icon={<PlusCircleIcon />}
          variant={"outline"}
          className="cursor-pointer"
        >
          Add New Qualification
        </Button>
      </DialogTrigger>

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

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Qualification Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Management" {...field} />
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
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
