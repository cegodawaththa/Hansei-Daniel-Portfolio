"use client";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DownloadIcon, MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 z-50 flex items-center justify-between bg-transparent w-full h-20 content-container mx-auto border-b border-primary-foreground/20 backdrop-blur-md transition-all duration-150 ease-in-out",
          {
            "bg-white/70 text-foreground border-primary-foreground": isScrolled
          },
          className
        )}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo
            className={cn("text-2xl lg:text-3xl", {
              "text-primary": isScrolled
            })}
          />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative h-20 flex items-center px-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300",
                  {
                    "text-gray-600": isScrolled
                  }
                )}
              >
                <span
                  className={cn("text-sm lg:text-base font-medium", {
                    "text-white": pathname === link.href,
                    "text-primary": pathname === link.href && isScrolled
                  })}
                >
                  {link.name}
                </span>

                {/* Active/Hover indicator - YouTube style */}
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                {/* Active state for current page */}
                {link.href === pathname && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent" />
                )}
              </Link>
            ))}
          </div>

          {/* Download CV Button */}
          <Button
            variant={isScrolled ? "default" : "outline"}
            icon={<DownloadIcon />}
            className={cn(
              " transition-all duration-300 font-medium py-2  backdrop-blur-sm px-8 rounded-full",
              {
                "border border-primary-foreground bg-transparent hover:bg-white/10 text-primary-foreground":
                  !isScrolled
              }
            )}
          >
            Download CV
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "text-primary-foreground hover:bg-primary-foreground/10 p-2",
              {
                "text-primary/80": isScrolled
              }
            )}
          >
            <MenuIcon className="size-7" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <Logo className="text-xl text-primary" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:bg-gray-100 p-2"
              >
                <XIcon className="size-6" />
              </Button>
            </div>

            {/* Navigation Links */}
            <div className="py-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors border-l-4 border-transparent",
                    {
                      "bg-accent/10 border-l-accent text-accent font-medium":
                        pathname === link.href
                    }
                  )}
                >
                  <span className="text-base">{link.name}</span>
                </Link>
              ))}
            </div>

            {/* Download CV Button */}
            <div className="px-6 py-4 border-t border-gray-200">
              <Button
                variant="default"
                icon={<DownloadIcon />}
                className="w-full font-medium py-3"
              >
                Download CV
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
