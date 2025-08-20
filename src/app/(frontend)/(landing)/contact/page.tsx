import { Metadata } from "next";
import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import ContactSection from "@/modules/landing/components/contact";
import { PageHeader } from "@/modules/landing/components/page-header";
import { generateMetadata as genMetadata } from "@/lib/utils/metadata";

export const metadata: Metadata = genMetadata({
  title: "Contact Hansie Daniel",
  description:
    "Get in touch with Hansie Daniel for all your real estate and construction needs. Located in Toronto, ON. Contact for property consultations, construction project management, investment opportunities, or to discuss your development goals.",
  keywords: [
    "contact Hansie Daniel",
    "real estate consultation Toronto",
    "construction project inquiry",
    "property development consultation",
    "project management services",
    "construction management contact",
    "real estate professional Toronto",
    "get in touch"
  ],
  url: "/contact"
});

export default async function ContactPage() {
  const landingPageData = await getLandingPageData();

  return (
    <div className="">
      <PageHeader
        title={"Get in touch with me"}
        subtitle={"Leave me a message or email to get connected !"}
      />

      <div className="min-h-[40vh]">
        <ContactSection data={landingPageData} isPage />
      </div>
    </div>
  );
}
