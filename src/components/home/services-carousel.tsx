import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { services } from "@/lib/site-data";

export function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = services.length;

  // Auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % total), 4500);
    return () => clearInterval(t);
  }, [isPaused, total]);

  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);
  const at = (offset: number) => services[(index + offset + total) % total];

  // Each visible slot: -2, -1, 0, 1, 2 around the active card
  const slots = [-2, -1, 0, 1, 2];

  return (
    <section
      className="relative overflow-hidden py-20 sm:py-28"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Capabilities</div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-4xl">
              Engineered services, built to the Tayeb Standard.
            </h2>
            <p className="mt-3 text-sm text-foreground/80 sm:text-base">
              Six disciplines — refined over 44 years and 1,000+ deployments across Pakistan.
            </p>
          </div>
          <Link
            to="/services"
            className="btn-cta inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold"
          >
            View all capabilities <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Coverflow viewport */}
      <div className="relative mx-auto mt-12 sm:mt-16">
        <div className="relative mx-auto h-[520px] w-full max-w-6xl px-4 sm:h-[560px] sm:px-8">
          {/* Stage */}
          <div className="relative mx-auto h-full w-full" style={{ perspective: "1400px" }}>
            <AnimatePresence initial={false}>
              {slots.map((offset) => {
                const item = at(offset);
                const realIndex = (index + offset + total) % total;
                const abs = Math.abs(offset);
                const isCenter = offset === 0;

                return (
                  <motion.div
                    key={`${realIndex}-${offset}`}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: abs === 2 ? 0.35 : abs === 1 ? 0.85 : 1,
                      x: `calc(${offset * 36}% )`,
                      scale: isCenter ? 1 : abs === 1 ? 0.78 : 0.6,
                      rotateY: offset * -18,
                      zIndex: 30 - abs * 10,
                      filter: isCenter ? "blur(0px)" : "blur(1px)",
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                    style={{
                      transformStyle: "preserve-3d",
                      pointerEvents: isCenter ? "auto" : "none",
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-[420px] sm:max-w-[460px]"
                    onClick={() => !isCenter && setIndex(realIndex)}
                  >
                    <article
                      className={`group relative overflow-hidden rounded-3xl border bg-card shadow-elevated ${
                        isCenter ? "border-copper/60 shadow-glow" : "border-border"
                      }`}
                    >
                      <div className="relative h-64 w-full overflow-hidden sm:h-72">
                        <img
                          src={item.cover}
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                        <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-copper/40 bg-background/70 px-3 py-1 backdrop-blur">
                          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-copper">
                            0{realIndex + 1} · {item.tagline}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-4 p-6 sm:p-7">
                        <h3 className="font-display text-xl font-semibold sm:text-2xl">{item.title}</h3>
                        <p className="text-sm leading-relaxed text-foreground/80 line-clamp-3">
                          {item.description}
                        </p>
                        <Link
                          to="/services/$slug"
                          params={{ slug: item.slug }}
                          className="btn-cta inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </article>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Controls */}
          <button
            aria-label="Previous service"
            onClick={() => go(-1)}
            className="absolute left-1 top-1/2 z-40 -translate-y-1/2 rounded-full border border-border bg-card/80 p-2.5 text-foreground backdrop-blur transition-all hover:border-copper hover:text-copper sm:left-4 sm:p-3"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next service"
            onClick={() => go(1)}
            className="absolute right-1 top-1/2 z-40 -translate-y-1/2 rounded-full border border-border bg-card/80 p-2.5 text-foreground backdrop-blur transition-all hover:border-copper hover:text-copper sm:right-4 sm:p-3"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {services.map((s, i) => (
            <button
              key={s.slug}
              aria-label={`Go to ${s.title}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-8 bg-copper" : "w-2 bg-border hover:bg-copper/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
