import { motion } from "framer-motion";
import { Compass, Target } from "lucide-react";

export function MissionVision() {
  const blocks = [
    {
      icon: Compass,
      label: "Vision",
      title: "The cornerstone of Pakistan's industrial infrastructure.",
      body:
        "To be the cornerstone of Pakistan's industrial infrastructure, setting the gold standard for thermal precision and climate control through a legacy of trust and engineering innovation.",
    },
    {
      icon: Target,
      label: "Mission",
      title: "Forty years of expertise, applied to every sub-task.",
      body:
        "Established in 1983, Tayeb & Company is dedicated to delivering specialized, large-scale HVAC and thermal insulation solutions across Pakistan. By meticulously managing every technical sub-task with forty years of expertise, we safeguard our clients' assets and optimize energy efficiency for a sustainable future.",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {blocks.map((b, i) => (
            <motion.article
              key={b.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-elevated"
            >
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-copper/10 blur-3xl transition-all group-hover:bg-copper/20" />
              <div className="absolute inset-0 grid-blueprint opacity-30" />
              <div className="relative">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-copper">
                  <b.icon className="h-6 w-6" />
                </div>
                <div className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-copper">{b.label}</div>
                <h3 className="mt-3 font-display text-xl font-semibold leading-tight sm:text-2xl">{b.title}</h3>
                <p className="mt-4 text-sm text-foreground/80 leading-relaxed sm:text-base">{b.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
