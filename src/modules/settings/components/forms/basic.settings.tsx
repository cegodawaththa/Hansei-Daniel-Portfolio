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
import { CvUploader } from "../cv-uploader";

const basicSettingsSchema = z.object({
  // Basic Information
  portfolioName: z.string(),
  shortDescription: z.string(),
  fullBio: z.string(),
  cvLink: z.string().optional()
});

type BasicSettingsSchema = z.infer<typeof basicSettingsSchema>;

export function BasicSettingsForm() {
  const { mutate, isPending } = useUpdateSettings();
  const state = useSettingsStore((state) => state);

  const form = useForm<BasicSettingsSchema>({
    resolver: zodResolver(basicSettingsSchema),
    defaultValues: {
      portfolioName: state.portfolioName,
      shortDescription: state.shortDescription,
      fullBio: state.fullBio,
      cvLink: state.cvLink
    }
  });

  useEffect(() => {
    form.reset({
      portfolioName: state.portfolioName,
      shortDescription: state.shortDescription,
      fullBio: state.fullBio,
      cvLink: state.cvLink
    });
  }, [form, state]);

  const handleOnSubmit = (data: BasicSettingsSchema) => {
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
              name="portfolioName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This name will be shown on your entire portfolio website.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A brief description of your portfolio"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This description will be shown on landing page hero section.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fullBio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="min-h-36"
                      placeholder="Tell us about yourself"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {`This bio will be shown on your portfolio's about page etc.`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cvLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CV File</FormLabel>
                  <FormControl>
                    <CvUploader
                      value={field.value || ""}
                      onChange={(url) => field.onChange(url || "")}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    {`Upload your CV (PDF) File`}
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
                Update Basic Details
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
}
