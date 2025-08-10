import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import { useSettingsStore } from "../../store";
import { useUpdateSettings } from "../../queries/use-update-settings";

const contactSettingsSchema = z.object({
  // Contact Information
  primaryEmail: z.string().email().optional().or(z.literal("")),
  secondaryEmail: z.string().email().optional().or(z.literal("")),
  primaryPhone: z.string().optional(),
  secondaryPhone: z.string().optional(),
  currentAddress: z.string().optional(),
  website: z.string().url().optional().or(z.literal(""))
});

type ContactSettingsSchema = z.infer<typeof contactSettingsSchema>;

export function ContactSettingsForm() {
  const { mutate, isPending } = useUpdateSettings();
  const state = useSettingsStore((state) => state);

  const form = useForm<ContactSettingsSchema>({
    resolver: zodResolver(contactSettingsSchema),
    defaultValues: {
      primaryEmail: state.primaryEmail,
      secondaryEmail: state.secondaryEmail,
      primaryPhone: state.primaryPhone,
      secondaryPhone: state.secondaryPhone,
      currentAddress: state.currentAddress,
      website: state.website
    }
  });

  useEffect(() => {
    form.reset({
      primaryEmail: state.primaryEmail,
      secondaryEmail: state.secondaryEmail,
      primaryPhone: state.primaryPhone,
      secondaryPhone: state.secondaryPhone,
      currentAddress: state.currentAddress,
      website: state.website
    });
  }, [form, state]);

  const handleOnSubmit = (data: ContactSettingsSchema) => {
    mutate(
      { ...data },
      {
        onSuccess: (returnData) => {
          state.setSettings(returnData);
        }
      }
    );
  };

  return (
    <Card className="py-6 px-8 rounded-sm shadow-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleOnSubmit)}>
          <div className="grid gap-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="primaryEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your main contact email address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondaryEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.work@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Alternative email address (optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="primaryPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your main contact phone number.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="secondaryPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Phone</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 987-6543"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Alternative phone number (optional).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://yourwebsite.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your personal or business website URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Address</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="123 Main St, City, State, Country"
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your current physical address or location.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="w-full flex items-center justify-end">
              <Button
                type="submit"
                className="w-fit"
                loading={isPending}
                icon={!form.formState.isSubmitting && <CheckIcon />}
              >
                Update Contact Details
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}
