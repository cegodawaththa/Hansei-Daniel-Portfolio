import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Calendar, MapPin, Building } from "lucide-react";

type Props = {
  className?: string;
};

const experiences = [
  {
    id: 1,
    title: "Senior Real Estate Consultant",
    company: "Premium Properties Ltd",
    location: "New York, NY",
    duration: "2020 - Present",
    type: "Full-time",
    description:
      "Leading high-value property transactions and managing client portfolios worth over $50M. Specialized in luxury residential and commercial properties.",
    achievements: [
      "Increased sales revenue by 45% year-over-year",
      "Managed portfolio of 100+ premium properties",
      "Achieved 98% client satisfaction rating",
      "Led team of 8 junior consultants"
    ],
    skills: [
      "Property Valuation",
      "Client Relations",
      "Market Analysis",
      "Team Leadership"
    ]
  },
  {
    id: 2,
    title: "Construction Project Manager",
    company: "Urban Development Corp",
    location: "Los Angeles, CA",
    duration: "2015 - 2020",
    type: "Full-time",
    description:
      "Oversaw construction projects from inception to completion, managing budgets up to $25M and coordinating with multiple stakeholders.",
    achievements: [
      "Completed 15+ major construction projects",
      "Reduced project costs by 20% through optimization",
      "Maintained 100% safety record across all projects",
      "Established vendor partnerships saving $2M annually"
    ],
    skills: [
      "Project Management",
      "Budget Control",
      "Quality Assurance",
      "Vendor Relations"
    ]
  },
  {
    id: 3,
    title: "Real Estate Investment Analyst",
    company: "Capital Ventures Inc",
    location: "Chicago, IL",
    duration: "2010 - 2015",
    type: "Full-time",
    description:
      "Analyzed investment opportunities in residential and commercial real estate markets, providing strategic recommendations to high-net-worth clients.",
    achievements: [
      "Analyzed 200+ investment opportunities",
      "Generated 25% average ROI for client portfolios",
      "Developed proprietary market analysis models",
      "Secured $100M+ in property investments"
    ],
    skills: [
      "Financial Analysis",
      "Market Research",
      "Investment Strategy",
      "Risk Assessment"
    ]
  }
];

export default function ExperienceSection({ className }: Props) {
  return (
    <section className={cn("py-20 bg-muted/30", className)}>
      <div className="content-container mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            Professional Experience
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            My Professional Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Over two decades of expertise in real estate and construction,
            delivering exceptional results and building lasting client
            relationships.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((experience) => (
            <Card
              key={experience.id}
              className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="pb-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading font-semibold text-foreground">
                      {experience.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">
                          {experience.company}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{experience.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{experience.duration}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="w-fit">
                    {experience.type}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {experience.description}
                </p>

                {/* Key Achievements */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">
                    Key Achievements:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {experience.achievements.map(
                      (achievement, achievementIndex) => (
                        <li
                          key={achievementIndex}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Skills */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">
                    Core Skills:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="outline"
                        className="border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "20+", label: "Years Experience" },
            { number: "$50M+", label: "Properties Managed" },
            { number: "150+", label: "Projects Completed" },
            { number: "98%", label: "Client Satisfaction" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-accent mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
