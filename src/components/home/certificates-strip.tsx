import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, ArrowRight, ShieldCheck, MapPin, Calendar, FileText } from "lucide-react";
import { certificates, type Certificate } from "@/lib/site-data";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";

export function CertificatesStrip() {
  const featured = certificates.slice(0, 5);
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-copper">
              <Award className="h-3.5 w-3.5" /> Trusted by industry
            </div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-4xl">
              Performance certificates from clients we serve.
            </h2>
            <p className="mt-3 text-sm text-foreground/80 sm:text-base">
              Two decades of "To Whom It May Concern" letters from Pakistan's leading mills, refineries and chemical plants — every project signed off, every standard met.
            </p>
          </div>
          <Link
            to="/certificates"
            className="btn-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            View all certificates <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {featured.map((cert, i) => (
            <motion.button
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => setActive(cert)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-elevated transition-all hover:border-copper/60 hover:shadow-glow"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary/40">
                <img
                  src={cert.image}
                  alt={`${cert.client} certificate`}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute left-3 top-3 rounded-full border border-copper/40 bg-background/85 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-copper backdrop-blur">
                  Verified
                </div>
              </div>
              <div className="p-4">
                <div className="text-[10px] uppercase tracking-[0.25em] text-copper">{cert.industry}</div>
                <div className="mt-1 line-clamp-2 font-display text-sm font-semibold leading-tight">
                  {cert.client}
                </div>
                <div className="mt-1 text-[11px] text-muted-foreground">{cert.city} · {cert.date}</div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <CertificateModal cert={active} onClose={() => setActive(null)} />
    </section>
  );
}

export function CertificateModal({ cert, onClose }: { cert: Certificate | null; onClose: () => void }) {
  return (
    <Dialog open={!!cert} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto p-0">
        {cert && (
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative bg-secondary/40">
              <img
                src={cert.image}
                alt={`${cert.client} certificate`}
                className="h-full max-h-[80vh] w-full object-contain"
              />
            </div>
            <div className="space-y-5 p-6 sm:p-8">
              <DialogHeader className="space-y-2 text-left">
                <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-copper">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified Certificate
                </div>
                <DialogTitle className="font-display text-xl font-semibold leading-tight sm:text-2xl">
                  {cert.client}
                </DialogTitle>
                <DialogDescription className="text-xs uppercase tracking-[0.25em] text-copper">
                  {cert.industry}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-foreground/85">
                  <MapPin className="h-4 w-4 text-copper" />
                  <span>{cert.city}</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/85">
                  <Calendar className="h-4 w-4 text-copper" />
                  <span>{cert.date}</span>
                </div>
                <div className="flex items-start gap-3 text-foreground/85">
                  <FileText className="h-4 w-4 shrink-0 text-copper mt-0.5" />
                  <span>{cert.scope}</span>
                </div>
              </div>

              <div className="rounded-xl border border-copper/30 bg-secondary/40 p-4 text-sm leading-relaxed text-foreground/85">
                A client-issued performance letter confirming Tayeb &amp; Company's
                engineering, installation and handover quality on this project — one of
                1000+ deployments delivered nationwide since 1983.
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
