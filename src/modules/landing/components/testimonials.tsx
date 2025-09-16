import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Star, Quote } from "lucide-react";

type Props = {
  className?: string;
};

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Home Buyer",
    location: "Manhattan, NY",
    avatar: "/assets/images/hero_person.png",
    rating: 5,
    text: "Hansie made our dream home a reality. His expertise in the Manhattan market and attention to detail throughout the entire process was exceptional. We couldn't have asked for a better agent.",
    propertyType: "Luxury Apartment",
    dealValue: "$2.8M"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "Property Investor",
    location: "Brooklyn, NY",
    avatar: "/assets/images/hero_person.png",
    rating: 5,
    text: "Working with Hansie on our commercial property investment was a game-changer. His market analysis and negotiation skills saved us over $500K on our purchase. Highly recommend!",
    propertyType: "Commercial Building",
    dealValue: "$12.5M"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "First-Time Buyer",
    location: "Queens, NY",
    avatar: "/assets/images/hero_person.png",
    rating: 5,
    text: "As a first-time buyer, I was nervous about the process. Hansie guided me through every step with patience and expertise. He found me the perfect home within my budget.",
    propertyType: "Family Home",
    dealValue: "$850K"
  },
  {
    id: 4,
    name: "David Thompson",
    title: "Property Developer",
    location: "Long Island, NY",
    avatar: "/assets/images/hero_person.png",
    rating: 5,
    text: "Hansie's construction management background was invaluable for our development project. His attention to detail and project coordination skills ensured we completed on time and under budget.",
    propertyType: "Residential Development",
    dealValue: "$45M"
  },
  {
    id: 5,
    name: "Lisa Park",
    title: "Property Seller",
    location: "Staten Island, NY",
    avatar: "/assets/images/hero_person.png",
    rating: 5,
    text: "Selling our family home was emotional, but Hansie made it stress-free. His marketing strategy and professional network resulted in multiple offers above asking price within a week.",
    propertyType: "Family Estate",
    dealValue: "$1.9M"
  },
  {
    id: 6,
    name: "Robert Kim",
    title: "Business Owner",
    location: "Bronx, NY",
    avatar: "/assets/images/hero_person.png",
    rating: 5,
    text: "Hansie helped us find the perfect location for our new business headquarters. His understanding of commercial real estate and zoning requirements was exactly what we needed.",
    propertyType: "Office Space",
    dealValue: "$3.2M"
  }
];

const stats = [
  { number: "150+", label: "Happy Clients" },
  { number: "$200M+", label: "Properties Sold" },
  { number: "98%", label: "Client Satisfaction" },
  { number: "4.9/5", label: "Average Rating" }
];

export default function TestimonialsSection({ className }: Props) {
  return (
    <section className={cn("py-20 bg-muted/30", className)}>
      <div className="content-container mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium">
            Client Testimonials
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            What My Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take my word for it. Here&apos;s what my clients
            have to say about their experience working with me.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg relative overflow-hidden"
            >
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="flex justify-between items-start">
                  <Quote className="w-8 h-8 text-accent/30" />
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed text-sm">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Client Info */}
                <div className="flex items-center space-x-3 pt-4 border-t border-border/50">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.title} • {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Deal Info */}
                <div className="flex items-center justify-between pt-2">
                  <Badge
                    variant="outline"
                    className="text-xs border-accent/30 text-accent"
                  >
                    {testimonial.propertyType}
                  </Badge>
                  <span className="text-xs font-semibold text-accent">
                    {testimonial.dealValue}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-background rounded-2xl p-8 lg:p-12 border border-border/50">
            <h3 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-4">
              Ready to Join My Success Stories?
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let me help you achieve your real estate goals. Whether
              you&apos;re buying, selling, or investing, I&apos;m here to
              provide expert guidance every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                Get Started Today
              </button>
              <button className="border border-accent text-accent hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-colors duration-300">
                Read More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
