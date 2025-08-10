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
import { Button } from "@/components/ui/button";
import { CheckIcon, Globe, Share2, Hash, Camera } from "lucide-react";
import { useSettingsStore } from "../../store";
import { useUpdateSettings } from "../../queries/use-update-settings";

const socialSettingsSchema = z.object({
  // Social Media Links
  facebook: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal(""))
});

type SocialSettingsSchema = z.infer<typeof socialSettingsSchema>;

export function SocialSettingsForm() {
  const { mutate, isPending } = useUpdateSettings();
  const state = useSettingsStore((state) => state);

  const form = useForm<SocialSettingsSchema>({
    resolver: zodResolver(socialSettingsSchema),
    defaultValues: {
      facebook: state.facebook,
      linkedin: state.linkedin,
      twitter: state.twitter,
      instagram: state.instagram
    }
  });

  useEffect(() => {
    form.reset({
      facebook: state.facebook,
      linkedin: state.linkedin,
      twitter: state.twitter,
      instagram: state.instagram
    });
  }, [form, state]);

  const handleOnSubmit = (data: SocialSettingsSchema) => {
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
            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Globe className="size-4 text-blue-600" />
                    Facebook
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://facebook.com/yourprofile"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your Facebook profile or page URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Share2 className="size-4 text-blue-700" />
                    LinkedIn
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your LinkedIn profile URL.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Hash className="size-4 text-sky-500" />
                    Twitter / X
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://twitter.com/yourusername"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your Twitter (X) profile URL.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Camera className="size-4 text-pink-600" />
                    Instagram
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://instagram.com/yourusername"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Your Instagram profile URL.</FormDescription>
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
                Update Social Links
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}
