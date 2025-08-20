"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { MailIcon, MapPinIcon, PhoneIcon, Send } from "lucide-react";
import { LandingPageData } from "../actions/get-landing-page-data";
import Link from "next/link";
import {
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaSquareXTwitter
} from "react-icons/fa6";
import { useSendInquiry } from "@/modules/sections/inquiries/queries/use-send-inquiry";

type Props = {
  className?: string;
  data: LandingPageData;
  isPage?: boolean;
};

export default function ContactSection({
  data,
  className,
  isPage = false
}: Props) {
  const basicInfo = data.data?.basicInfo;

  const { mutate, isPending } = useSendInquiry();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate(
      {
        email: formData.email,
        name: formData.name,
        company: formData.company,
        message: formData.message,
        status: "unread"
      },
      {
        onSuccess: () => {
          setFormData({
            name: "",
            email: "",
            company: "",
            message: ""
          });
        }
      }
    );
  };

  return (
    <section className={cn("py-20 bg-background", className)}>
      <div className="content-container mx-auto">
        {/* Section Header */}
        {!isPage && (
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
              Get In Touch
            </div>
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
              Let&apos;s Start a Conversation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to make your real estate dreams a reality? Get in touch
              today for a personalized consultation.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-6">
              {/* {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="border-border/50 hover:border-accent/50 transition-colors duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <h3 className="font-semibold text-foreground">
                          {info.title}
                        </h3>
                        <p className="text-sm font-medium text-foreground">
                          {info.primary}
                        </p>
                        {info.secondary && (
                          <p className="text-sm text-muted-foreground">
                            {info.secondary}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))} */}

              {/* Phone Info */}
              <Card className="border-border/50 hover:border-accent/50 transition-colors duration-300 p-0">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <PhoneIcon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-foreground">
                        Contact Me
                      </h3>
                      <p className="text-sm font-medium text-foreground">
                        {basicInfo?.primaryPhone}
                      </p>
                      {basicInfo?.secondaryPhone && (
                        <p className="text-sm text-muted-foreground">
                          {basicInfo.secondaryPhone}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {`Available Monday to Friday, 9 AM - 6 PM`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Info */}
              <Card className="border-border/50 hover:border-accent/50 transition-colors duration-300 p-0">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MailIcon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-foreground">
                        Leave a Message
                      </h3>
                      <p className="text-sm font-medium text-foreground">
                        {basicInfo?.primaryEmail}
                      </p>
                      {basicInfo?.secondaryEmail && (
                        <p className="text-sm text-muted-foreground">
                          {basicInfo.secondaryEmail}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {`Response within 24 hours`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location Info */}
              <Card className="border-border/50 hover:border-accent/50 transition-colors duration-300 p-0">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPinIcon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h3 className="font-semibold text-foreground">
                        Location
                      </h3>
                      <p className="text-sm font-medium text-foreground">
                        {basicInfo?.currentAddress}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {`Visit by appointment`}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Social Links */}
            <Card className="border-border/50 p-0">
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">
                  Follow Me
                </h3>
                <div className="flex space-x-4">
                  {basicInfo?.facebook && (
                    <Link
                      target="_blank"
                      href={basicInfo.facebook}
                      className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                      aria-label="Facebook"
                    >
                      <FaFacebook className="size-4 text-blue-600" />
                    </Link>
                  )}
                  {basicInfo?.linkedin && (
                    <Link
                      target="_blank"
                      href={basicInfo.linkedin}
                      className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                      aria-label="Linkedin"
                    >
                      <FaLinkedin className="size-4 text-blue-700" />
                    </Link>
                  )}
                  {basicInfo?.twitter && (
                    <Link
                      target="_blank"
                      href={basicInfo.twitter}
                      className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                      aria-label="Twitter"
                    >
                      <FaSquareXTwitter className="size-4 text-zinc-900" />
                    </Link>
                  )}
                  {basicInfo?.instagram && (
                    <Link
                      target="_blank"
                      href={basicInfo.instagram}
                      className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                      aria-label="Instagram"
                    >
                      <FaInstagram className="size-4 text-pink-600" />
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        required
                        className="border-border/50 focus:border-accent"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        required
                        className="border-border/50 focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="ABC Real Estate (pvt) ltd."
                      required
                      className="border-border/50 focus:border-accent"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me more about your real estate needs..."
                      rows={6}
                      required
                      className="border-border/50 focus:border-accent resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    loading={isPending}
                  >
                    Send Message
                    {!isPending && <Send className="w-5 h-5 ml-2" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
