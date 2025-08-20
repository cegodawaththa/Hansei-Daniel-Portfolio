import { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
  noIndex = false
}: MetadataProps = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const allKeywords = [...siteConfig.keywords, ...keywords];

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: allKeywords,
    authors: authors
      ? authors.map((name) => ({ name }))
      : [{ name: siteConfig.author.name }],
    creator: siteConfig.creator,
    metadataBase: siteConfig.metadataBase,
    robots: noIndex ? { index: false, follow: false } : siteConfig.robots,
    openGraph: {
      ...siteConfig.openGraph,
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle
        }
      ],
      type,
      ...(type === "article" && {
        publishedTime,
        modifiedTime,
        authors: authors || [siteConfig.author.name],
        section
      })
    },
    twitter: {
      ...siteConfig.twitter,
      title: metaTitle,
      description: metaDescription,
      images: [metaImage]
    },
    alternates: {
      canonical: metaUrl
    }
  };
}

// Helper function for structured data
export function generateStructuredData(data: {
  type: "Person" | "Organization" | "RealEstateAgent" | "LocalBusiness";
  name: string;
  description?: string;
  url?: string;
  image?: string;
  email?: string;
  phone?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  sameAs?: string[];
  jobTitle?: string;
  worksFor?: string;
  areaServed?: string[];
  priceRange?: string;
}) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": data.type,
    name: data.name,
    description: data.description,
    url: data.url || siteConfig.url,
    image: data.image || siteConfig.ogImage
  };

  if (data.type === "Person" || data.type === "RealEstateAgent") {
    return {
      ...baseSchema,
      email: data.email,
      telephone: data.phone,
      jobTitle: data.jobTitle,
      worksFor: data.worksFor
        ? {
            "@type": "Organization",
            name: data.worksFor
          }
        : undefined,
      sameAs: data.sameAs,
      address: data.address
        ? {
            "@type": "PostalAddress",
            ...data.address
          }
        : undefined
    };
  }

  if (data.type === "LocalBusiness") {
    return {
      ...baseSchema,
      email: data.email,
      telephone: data.phone,
      address: data.address
        ? {
            "@type": "PostalAddress",
            ...data.address
          }
        : undefined,
      areaServed: data.areaServed,
      priceRange: data.priceRange,
      sameAs: data.sameAs
    };
  }

  return baseSchema;
}
