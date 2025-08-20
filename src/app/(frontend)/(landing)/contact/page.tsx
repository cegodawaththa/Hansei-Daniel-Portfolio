import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import ContactSection from "@/modules/landing/components/contact";
import { PageHeader } from "@/modules/landing/components/page-header";

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
