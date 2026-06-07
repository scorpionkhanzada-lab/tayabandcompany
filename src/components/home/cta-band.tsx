import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { contact } from "@/lib/site-data";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 grid-blueprint opacity-40" />
      <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">Start a project</div>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            {contact.tagline}
          </h2>
          <p className="mt-3 text-sm text-white/85 sm:text-base">
            From a single valve box to a refinery-scale insulation contract — the Tayeb team is ready.
          </p>
        </div>
        <Link
          to="/contact"
          className="btn-cta group inline-flex items-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold sm:text-base"
        >
          Request a Quote
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
