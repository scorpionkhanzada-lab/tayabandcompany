import { motion } from "framer-motion";
import { Award, Calendar, MapPin } from "lucide-react";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { stats } from "@/lib/site-data";
import { useCountUp } from "@/hooks/use-count-up";

interface StatItem {
  value: number;
  suffix?: string;
  label: string;
  icon: typeof Award;
}

function StatBlock({ item, inView, delay }: { item: StatItem; inView: boolean; delay: number }) {
  const v = useCountUp(item.value, { enabled: inView, duration: 1800 });
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center sm:text-left"
    >
      <item.icon className="mx-auto h-5 w-5 text-copper sm:mx-0" />
      <div className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {v.toLocaleString()}
        {item.suffix ?? ""}
      </div>
      <div className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
        {item.label}
      </div>
    </motion.div>
  );
}

export function StatsBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Parse projectsDelivered ("1000+") to a number
  const projectsNum = parseInt(String(stats.projectsDelivered).replace(/\D/g, ""), 10) || 1000;

  const items: StatItem[] = [
    { value: projectsNum, suffix: "+", label: "Projects Delivered", icon: Award },
    { value: stats.yearsExperience, suffix: "+", label: "Years of Experience", icon: Calendar },
    { value: stats.citiesServed, suffix: "+", label: "Cities Across Pakistan", icon: MapPin },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border bg-secondary/30 py-12 sm:py-16">
      <div className="absolute inset-0 grid-blueprint opacity-40" />
      <div ref={ref} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {items.map((s, i) => (
            <StatBlock key={s.label} item={s} inView={inView} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
