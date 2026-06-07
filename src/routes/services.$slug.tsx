import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { services, type Service, type ServiceSlug } from "@/lib/site-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === (params.slug as ServiceSlug));
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    return {
      meta: s
        ? [
            { title: `${s.title} — Tayeb & Company` },
            { name: "description", content: s.description },
            { property: "og:title", content: `${s.title} — Tayeb & Company` },
            { property: "og:description", content: s.description },
            { property: "og:image", content: s.cover },
          ]
        : [{ title: "Service — Tayeb & Company" }],
    };
  },
  notFoundComponent: () => (
    <div className="pt-40 pb-24 text-center">
      <h1 className="font-display text-3xl">Service not found</h1>
      <Link to="/services" className="mt-4 inline-block text-copper">Back to services</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="pt-40 pb-24 text-center">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ServiceDetail,
});

function ServiceDetail() {
  const data = Route.useLoaderData();
  const service = data.service as Service;

  return (
    <div className="pt-24 pb-24">
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img src={service.cover} alt={service.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        <div className="relative mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
          <Link to="/services" className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-copper">
            <ArrowLeft className="h-4 w-4" /> All Services
          </Link>
          <div className="mt-6 max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">{service.tagline}</div>
            <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">{service.title}</h1>
            <p className="mt-6 text-lg text-foreground/80">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Brief */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Technical Brief</div>
            <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">How we deliver it.</h2>
            <p className="mt-6 text-foreground/75 leading-relaxed">{service.brief}</p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-copper/30 bg-card p-8 shadow-elevated">
              <h3 className="font-display text-xl font-semibold">Specifications</h3>
              <ul className="mt-5 space-y-3">
                {service.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/15 text-copper">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-foreground/85">{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="btn-cta mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold"
              >
                Discuss this scope
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Step-by-Step Process</div>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">How a Tayeb install comes together.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {service.process.map((p) => (
            <div key={p.step} className="relative rounded-2xl border border-border bg-card p-6 shadow-elevated transition-all hover:border-copper/50">
              <div className="font-display text-3xl font-semibold text-copper">{p.step}</div>
              <h3 className="mt-2 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{p.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Materials & Applications */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Materials Used</div>
            <h3 className="mt-3 font-display text-2xl font-semibold">Engineered substrates.</h3>
            <ul className="mt-5 space-y-2.5">
              {service.materials.map((m) => (
                <li key={m} className="flex items-start gap-3 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 shadow-elevated">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Typical Applications</div>
            <h3 className="mt-3 font-display text-2xl font-semibold">Where we deploy it.</h3>
            <ul className="mt-5 space-y-2.5">
              {service.applications.map((a) => (
                <li key={a} className="flex items-start gap-3 text-sm text-foreground/85">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Field Gallery</div>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">{service.title} in service.</h2>
        {service.gallery.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {service.gallery.map((g, i) => (
              <figure key={i} className="group overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={g.src} alt={g.caption} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                </div>
                <figcaption className="border-t border-border p-4 text-sm text-foreground/85">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-copper/40 bg-card/60 p-12 text-center">
            <div className="font-display text-lg font-semibold text-foreground/80">Field gallery coming soon</div>
            <p className="mt-2 text-sm text-muted-foreground">
              New project photography for this service is being prepared and will be added shortly.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
