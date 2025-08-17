"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ExternalLink, MapPin, Calendar, DollarSign } from "lucide-react";

type Props = {
  className?: string;
};

const projects = [
  {
    id: 1,
    title: "Luxury Residential Complex",
    location: "Manhattan, New York",
    category: "Residential Development",
    value: "$45M",
    duration: "2022 - 2024",
    status: "Completed",
    image: "/assets/images/hero_1.jpg",
    description:
      "A premium 25-story residential complex featuring 120 luxury apartments with world-class amenities including rooftop gardens, fitness center, and concierge services.",
    features: [
      "120 Luxury Units",
      "Rooftop Garden",
      "Smart Home Technology",
      "24/7 Concierge"
    ],
    technologies: [
      "BIM Modeling",
      "IoT Integration",
      "Sustainable Design",
      "LEED Certified"
    ]
  },
  {
    id: 2,
    title: "Commercial Office Tower",
    location: "Downtown Chicago",
    category: "Commercial Development",
    value: "$85M",
    duration: "2020 - 2023",
    status: "Completed",
    image: "/assets/images/hero_2.jpg",
    description:
      "A state-of-the-art 40-story office tower designed for modern businesses, featuring flexible workspaces, advanced climate control, and panoramic city views.",
    features: [
      "40 Floors",
      "Flexible Workspaces",
      "Panoramic Views",
      "Advanced HVAC"
    ],
    technologies: [
      "Green Building",
      "Smart Elevators",
      "Energy Efficient",
      "Cloud Infrastructure"
    ]
  },
  {
    id: 3,
    title: "Mixed-Use Development",
    location: "Los Angeles, California",
    category: "Mixed-Use",
    value: "$120M",
    duration: "2023 - Present",
    status: "In Progress",
    image: "/assets/images/hero_3.jpg",
    description:
      "An innovative mixed-use development combining residential, commercial, and retail spaces in a sustainable, community-focused design.",
    features: [
      "200 Residential Units",
      "Retail Spaces",
      "Office Complex",
      "Community Center"
    ],
    technologies: [
      "Solar Integration",
      "Rainwater Harvesting",
      "Smart Grid",
      "EV Charging"
    ]
  },
  {
    id: 4,
    title: "Waterfront Resort",
    location: "Miami Beach, Florida",
    category: "Hospitality",
    value: "$65M",
    duration: "2021 - 2023",
    status: "Completed",
    image: "/assets/images/hero_1.jpg",
    description:
      "An exclusive waterfront resort featuring luxury suites, private beach access, and premium amenities for discerning guests.",
    features: [
      "150 Suites",
      "Private Beach",
      "Spa & Wellness",
      "Marina Access"
    ],
    technologies: [
      "Ocean View Design",
      "Sustainable Materials",
      "Water Conservation",
      "Smart Lighting"
    ]
  }
];

const categories = [
  "All",
  "Residential",
  "Commercial",
  "Mixed-Use",
  "Hospitality"
];

export default function ProjectsSection({ className }: Props) {
  const [activeCategory, setActiveCategory] = React.useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) =>
          project.category.toLowerCase().includes(activeCategory.toLowerCase())
        );

  return (
    <section className={cn("py-20 bg-background", className)}>
      <div className="content-container mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            Portfolio Projects
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of successful real estate developments,
            showcasing innovation, quality, and sustainable design principles.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "transition-all duration-300",
                activeCategory === category
                  ? "bg-accent hover:bg-accent/90 text-accent-foreground"
                  : "border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-xl overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge
                  variant={
                    project.status === "Completed" ? "default" : "secondary"
                  }
                  className="absolute top-4 left-4"
                >
                  {project.status}
                </Badge>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Badge
                    variant="outline"
                    className="border-accent/30 text-accent"
                  >
                    {project.category}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold">{project.value}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{project.duration}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    Key Features:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-foreground">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs border-accent/30 text-accent"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full group border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
                >
                  View Project Details
                  <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Portfolio Summary */}
        <div className="bg-muted/30 rounded-2xl p-8 lg:p-12">
          <div className="text-center space-y-6">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground">
              Ready to Start Your Next Project?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let&apos;s discuss how we can bring your vision to life with our
              expertise in real estate development and construction management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-8"
              >
                Start a Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8"
              >
                View All Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
