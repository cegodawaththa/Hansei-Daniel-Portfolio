"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { Logo } from "@/components/logo";
// import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { ArrowUp } from "lucide-react";

type Props = {
  className?: string;
};

export default function FooterSection({ className }: Props) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={cn("bg-card border-t border-border/50", className)}>
      {/* Main Footer Content */}
      {/* <div className="content-container mx-auto py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <Logo className="text-3xl" />
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Your trusted partner in real estate with over 20 years of
              experience in construction and property development. Committed to
              delivering exceptional results and building lasting relationships.
            </p>

            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-accent transition-colors duration-300 group"
                >
                  <contact.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm">{contact.text}</span>
                </a>
              ))}
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground text-lg">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground text-lg">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground text-lg">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-accent transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 bg-muted/30 rounded-2xl p-8">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-heading font-bold text-foreground">
              Stay Updated
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Subscribe to my newsletter for the latest market insights,
              property listings, and real estate tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-border/50 focus:outline-none focus:border-accent bg-background text-sm"
              />
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div> */}

      <Separator className="bg-border/50" />

      <div className="content-container mx-auto py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hansie Daniel Real Estate. All rights
            reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-muted-foreground hover:text-accent transition-colors duration-300"
            >
              Cookie Policy
            </Link>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={scrollToTop}
            className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowUp className="w-4 h-4 mr-2" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  );
}
