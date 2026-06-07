import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects, type Project } from "@/lib/site-data";
import { ProjectModal } from "@/routes/projects";

export function FeaturedProjects() {
  const [active, setActive] = useState<Project | null>(null);
  const featured = projects.slice(0, 6);

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Selected Projects</div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-4xl">
              A nationwide portfolio, signed off and standing.
            </h2>
            <p className="mt-3 text-sm text-foreground/80 sm:text-base">
              A representative slice of 1000+ industrial deployments delivered to the Tayeb Standard.
            </p>
          </div>
          <Link
            to="/projects"
            className="btn-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            See all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              onClick={() => setActive(p)}
              className="group overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:border-copper/50 hover:shadow-glow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/85 to-transparent" />
                <div className="absolute left-3 top-3 rounded-full border border-copper/40 bg-background/75 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-copper backdrop-blur">
                  {p.city}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold sm:text-base">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.year} · Click for details</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
