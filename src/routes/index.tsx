import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/hero";
import { StatsBand } from "@/components/home/stats-band";
import { ServicesCarousel } from "@/components/home/services-carousel";
import { BoilerShowcase } from "@/components/home/boiler-showcase";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { FounderLegacy } from "@/components/home/founder-legacy";
import { ProjectPulse } from "@/components/home/project-pulse";
import { CertificatesStrip } from "@/components/home/certificates-strip";
import { MissionVision } from "@/components/home/mission-vision";
import { CtaBand } from "@/components/home/cta-band";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tayeb & Company — A Legacy of Precision Since 1983" },
      { name: "description", content: "Pakistan's leading partner in thermal insulation, HVAC engineering, ductwork and industrial fabrication. 44 years, 1000+ projects delivered. Established 1983, Multan." },
      { property: "og:title", content: "Tayeb & Company — A Legacy of Precision" },
      { property: "og:description", content: "44 years of precision thermal insulation and HVAC engineering across Pakistan. 1000+ projects delivered." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <StatsBand />
      <ServicesCarousel />
      <BoilerShowcase />
      <FeaturedProjects />
      <ProjectPulse />
      <CertificatesStrip />
      <FounderLegacy />
      <MissionVision />
      <CtaBand />
    </>
  );
}
