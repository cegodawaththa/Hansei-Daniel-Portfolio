import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DownloadIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
};

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Experience", href: "/experience" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" }
];

export function NavigationBar({ className }: Props) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between bg-transparent w-full h-20 content-container mx-auto border-b border-primary-foreground/20 backdrop-blur-sm",
        className
      )}
    >
      {/* Logo */}
      <div className="flex-shrink-0">
        <Logo className="text-2xl lg:text-3xl" />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <div className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative py-6 px-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
            >
              <span className="text-sm lg:text-base font-medium">
                {link.name}
              </span>
              {/* Active/Hover indicator - YouTube style */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              {/* Active state for current page */}
              {link.href === "/" && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />
              )}
            </Link>
          ))}
        </div>

        {/* Download CV Button */}
        <Button
          variant="outline"
          icon={<DownloadIcon />}
          className="border border-primary-foreground bg-transparent hover:bg-white/10 transition-all duration-300 font-medium py-2 text-primary-foreground backdrop-blur-sm px-8 rounded-full"
        >
          Download CV
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="text-primary-foreground hover:bg-primary-foreground/10 p-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </Button>
      </div>
    </nav>
  );
}
