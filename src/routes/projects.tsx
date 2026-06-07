import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, MapPin, Calendar } from "lucide-react";
import { projects, type Project } from "@/lib/site-data";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Tayeb & Company" },
      { name: "description", content: "Selected industrial projects across Pakistan delivered by Tayeb & Company." },
      { property: "og:title", content: "Projects — Tayeb & Company" },
      { property: "og:description", content: "A nationwide portfolio of thermal insulation and HVAC engineering deployments." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <div className="pt-28 pb-24 sm:pt-32">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-copper">
          <ArrowLeft className="h-3.5 w-3.5" /> Home
        </Link>
        <div className="mt-6 max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Selected Work</div>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
            Forty years, one nation, countless plants.
          </h1>
          <p className="mt-5 text-base text-foreground/80 sm:text-lg">
            A growing portfolio of thermal insulation, ductwork and HVAC engineering across Pakistan's industrial corridors. Click any project for details.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <button
              key={p.id}
              onClick={() => setActive(p)}
              className="group overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:border-copper/50 hover:shadow-glow"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full border border-copper/40 bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-copper backdrop-blur">
                  {p.city}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-semibold sm:text-lg">{p.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {p.year ? `${p.year} · ` : ""}Engineered &amp; installed by the Tayeb team.
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}

export function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog open={!!project} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-4xl overflow-y-auto p-0">
        {project && (
          <div className="grid gap-0 md:grid-cols-2">
            <div className="relative bg-secondary/40">
              <img
                src={project.image}
                alt={project.title}
                className="h-full max-h-[80vh] w-full object-cover"
              />
            </div>
            <div className="space-y-5 p-6 sm:p-8">
              <DialogHeader className="space-y-2 text-left">
                <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-copper">
                  <MapPin className="h-3.5 w-3.5" /> {project.city}
                </div>
                <DialogTitle className="font-display text-xl font-semibold leading-tight sm:text-2xl">
                  {project.title}
                </DialogTitle>
                {project.year && (
                  <DialogDescription className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-copper">
                    <Calendar className="h-3.5 w-3.5" /> {project.year}
                  </DialogDescription>
                )}
              </DialogHeader>

              <p className="text-sm leading-relaxed text-foreground/85">
                {project.description ??
                  "A representative deployment of the Tayeb Standard — insulation, ductwork and HVAC engineering executed end-to-end with our in-house fabrication and field teams."}
              </p>

              <div className="rounded-xl border border-copper/30 bg-secondary/40 p-4 text-sm leading-relaxed text-foreground/85">
                Part of 1000+ industrial projects delivered nationwide since 1983 — engineered, installed and signed off to the Tayeb Standard.
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
