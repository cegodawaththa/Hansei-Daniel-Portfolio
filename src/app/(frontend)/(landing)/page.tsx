import { getLandingPageData } from "@/modules/landing/actions/get-landing-page-data";
import HeroSection from "@/modules/landing/components/hero";
import AboutSection from "@/modules/landing/components/about";
import ExperienceSection from "@/modules/landing/components/experience";
import ProjectsSection from "@/modules/landing/components/projects";
import SkillsSection from "@/modules/landing/components/skills";
import TestimonialsSection from "@/modules/landing/components/testimonials";
import ContactSection from "@/modules/landing/components/contact";
import FooterSection from "@/modules/landing/components/footer";

export default async function Home() {
  const landingPageData = await getLandingPageData();

  console.log(landingPageData);

  // Fake loading
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <div className="">
      <HeroSection data={landingPageData} />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
