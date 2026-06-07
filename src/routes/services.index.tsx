import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/lib/site-data";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Tayeb & Company Engineering" },
      { name: "description", content: "Hot & cold insulation, ductwork, valve & flange boxes, and industrial motor covers — engineered to the Tayeb Standard." },
      { property: "og:title", content: "Engineering Services — Tayeb & Company" },
      { property: "og:description", content: "Comprehensive thermal insulation and HVAC capabilities across Pakistan." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Capabilities</div>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            Six disciplines. One uncompromising standard.
          </h1>
          <p className="mt-6 text-lg text-foreground/75">
            Each service is delivered by site-experienced teams trained in the Tayeb method — the same method that has shaped Pakistan's plant rooms for forty years.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-copper/50 hover:shadow-glow"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={s.cover}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-8">
                <div className="text-[10px] uppercase tracking-[0.3em] text-copper">0{i + 1} · {s.tagline}</div>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <h3 className="font-display text-3xl font-semibold">{s.title}</h3>
                  <ArrowUpRight className="mt-1 h-6 w-6 text-copper transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
                <p className="mt-3 text-foreground/70">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
