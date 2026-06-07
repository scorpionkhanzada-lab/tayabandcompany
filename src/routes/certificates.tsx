import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ShieldCheck } from "lucide-react";
import { certificates, type Certificate } from "@/lib/site-data";
import { CertificateModal } from "@/components/home/certificates-strip";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: "Performance Certificates — Tayeb & Company" },
      { name: "description", content: "Two decades of client-issued performance certificates documenting Tayeb & Company's insulation, ductwork and HVAC engineering across Pakistan." },
      { property: "og:title", content: "Client Certificates — Tayeb & Company" },
      { property: "og:description", content: "Verified performance letters from refineries, mills, and chemical plants across Pakistan." },
    ],
  }),
  component: CertificatesPage,
});

function CertificatesPage() {
  const [active, setActive] = useState<Certificate | null>(null);
  return (
    <div className="pt-28 pb-24 sm:pt-32">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-copper">
            <Award className="h-3.5 w-3.5" /> Verified by clients
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Performance certificates, signed by the people we serve.
          </h1>
          <p className="mt-5 text-base text-foreground/80 sm:text-lg">
            For over forty years, Pakistan's leading industrial clients have signed off on our work.
            Click any certificate below to view its full details.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 sm:mt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-card px-4 py-2 text-xs font-semibold text-foreground">
            <ShieldCheck className="h-4 w-4 text-copper" /> {certificates.length}+ archived certificates
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground/80">
            Refineries · Mills · Chemicals · Power
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, i) => (
            <motion.button
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              onClick={() => setActive(cert)}
              className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-elevated transition-all hover:border-copper/50 hover:shadow-glow"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary/30">
                <img
                  src={cert.image}
                  alt={`${cert.client} performance certificate`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card/95 via-card/40 to-transparent" />
              </div>
              <div className="space-y-2 p-5">
                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-copper">{cert.industry}</div>
                <h2 className="font-display text-base font-semibold leading-tight">{cert.client}</h2>
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span>{cert.city}</span>
                  <span>·</span>
                  <span>{cert.date}</span>
                </div>
                <p className="pt-2 text-sm text-foreground/80">{cert.scope}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      <CertificateModal cert={active} onClose={() => setActive(null)} />
    </div>
  );
}
