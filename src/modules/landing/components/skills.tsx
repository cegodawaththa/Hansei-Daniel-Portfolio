import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const skillCategories = [
  {
    title: "Real Estate Expertise",
    skills: [
      { name: "Property Valuation", level: 95 },
      { name: "Market Analysis", level: 92 },
      { name: "Investment Strategy", level: 88 },
      { name: "Client Relations", level: 98 }
    ]
  },
  {
    title: "Construction Management",
    skills: [
      { name: "Project Management", level: 93 },
      { name: "Quality Control", level: 90 },
      { name: "Budget Management", level: 87 },
      { name: "Safety Compliance", level: 95 }
    ]
  },
  {
    title: "Business & Leadership",
    skills: [
      { name: "Team Leadership", level: 91 },
      { name: "Strategic Planning", level: 89 },
      { name: "Negotiation", level: 94 },
      { name: "Risk Management", level: 86 }
    ]
  },
  {
    title: "Technical Skills",
    skills: [
      { name: "AutoCAD", level: 85 },
      { name: "BIM Software", level: 78 },
      { name: "Financial Modeling", level: 82 },
      { name: "CRM Systems", level: 88 }
    ]
  }
];

const certifications = [
  {
    title: "Licensed Real Estate Broker",
    issuer: "State Real Estate Commission",
    year: "2020",
    status: "Active"
  },
  {
    title: "Project Management Professional (PMP)",
    issuer: "Project Management Institute",
    year: "2019",
    status: "Active"
  },
  {
    title: "Construction Management Certificate",
    issuer: "Construction Management Association",
    year: "2018",
    status: "Active"
  },
  {
    title: "Certified Commercial Investment Member",
    issuer: "CCIM Institute",
    year: "2017",
    status: "Active"
  }
];

const services = [
  {
    icon: "🏘️",
    title: "Residential Sales",
    description: "Expert guidance in buying and selling residential properties"
  },
  {
    icon: "🏢",
    title: "Commercial Real Estate",
    description: "Strategic commercial property investments and management"
  },
  {
    icon: "🔨",
    title: "Construction Management",
    description: "End-to-end construction project oversight and execution"
  },
  {
    icon: "📊",
    title: "Investment Analysis",
    description: "Comprehensive market analysis and investment strategies"
  },
  {
    icon: "🏗️",
    title: "Property Development",
    description: "From concept to completion property development services"
  },
  {
    icon: "💼",
    title: "Consulting Services",
    description:
      "Strategic real estate consulting for individuals and businesses"
  }
];

export default function SkillsSection({ className }: Props) {
  return (
    <section className={cn("py-20 bg-muted/30", className)}>
      <div className="content-container mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            Skills & Expertise
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Professional Capabilities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Two decades of experience have equipped me with comprehensive skills
            across real estate, construction, and business management.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={categoryIndex}
              className="border-border/50 hover:border-accent/50 transition-colors duration-300"
            >
              <CardHeader>
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  {category.title}
                </h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Services Section */}
        <div className="mb-16">
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-3xl font-heading font-bold text-foreground">
              Services Offered
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive real estate and construction services tailored to
              meet your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                    {service.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <div className="text-center space-y-4 mb-12">
            <h3 className="text-3xl font-heading font-bold text-foreground">
              Certifications & Licenses
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Maintaining the highest professional standards through continuous
              education and certification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="border-border/50 hover:border-accent/50 transition-colors duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <h4 className="font-semibold text-foreground">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Obtained: {cert.year}
                      </p>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-green-500/30 text-green-600 bg-green-50"
                    >
                      {cert.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
