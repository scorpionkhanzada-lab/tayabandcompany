import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, TrendingUp } from "lucide-react";
import { cities, projects, stats } from "@/lib/site-data";

// Coordinates re-tuned to sit inside the silhouette below.
// All values are SVG units on a 0-100 / 0-125 viewport.
// We expose them via a normalised map so we can render <circle> directly inside the SVG.
const cityCoords: Record<string, { x: number; y: number }> = {
  Karachi: { x: 28, y: 102 },
  Hyderabad: { x: 33, y: 95 },
  Sukkur: { x: 38, y: 80 },
  Quetta: { x: 25, y: 73 },
  "D.G. Khan": { x: 43, y: 65 },
  Multan: { x: 47, y: 62 },
  Bahawalpur: { x: 49, y: 70 },
  Sahiwal: { x: 52, y: 56 },
  Faisalabad: { x: 53, y: 51 },
  Sheikhupura: { x: 56, y: 47 },
  Lahore: { x: 60, y: 49 },
  Gujranwala: { x: 60, y: 43 },
  Gujrat: { x: 62, y: 39 },
  Sialkot: { x: 64, y: 38 },
  Rawalpindi: { x: 58, y: 30 },
  Islamabad: { x: 59, y: 28 },
  Nowshera: { x: 53, y: 26 },
  Peshawar: { x: 50, y: 25 },
};

// More accurate Pakistan silhouette — covers all the city points above.
const PAK_PATH =
  "M50,18 L57,16 L62,20 L67,24 L66,30 L70,33 L66,38 L67,44 L73,46 L77,52 L73,58 L75,64 L70,68 L72,74 L66,78 L70,84 L64,90 L58,96 L50,104 L42,110 L34,112 L28,108 L22,100 L18,90 L20,80 L16,72 L20,64 L26,60 L22,54 L26,48 L22,42 L28,38 L24,32 L30,26 L36,22 L42,20 Z";

export function ProjectPulse() {
  const [hovered, setHovered] = useState<number | null>(0);
  const activeCity = hovered !== null ? cities[hovered] : null;
  const activeProject = activeCity
    ? projects.find((p) => p.id === activeCity.projectId)
    : null;

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 grid-blueprint opacity-50" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Project Pulse</div>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-4xl">
            {stats.projectsDelivered} projects across Pakistan.
          </h2>
          <p className="mt-3 text-sm text-foreground/75 sm:text-base">
            From the ports of Karachi to the foothills of Peshawar — tap or hover any city to explore representative work.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* MAP */}
          <div className="lg:col-span-7">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-xl">
              <svg
                viewBox="0 0 100 125"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <linearGradient id="mapGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.13 58 / 0.32)" />
                    <stop offset="100%" stopColor="oklch(0.78 0.13 58 / 0.08)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="0.6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <clipPath id="pakClip">
                    <path d={PAK_PATH} />
                  </clipPath>
                </defs>

                {/* Filled silhouette */}
                <path
                  d={PAK_PATH}
                  fill="url(#mapGrad)"
                  stroke="oklch(0.78 0.13 58 / 0.6)"
                  strokeWidth="0.4"
                  filter="url(#glow)"
                />

                {/* Subtle inner grid clipped to silhouette */}
                <g clipPath="url(#pakClip)" opacity="0.15">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <line
                      key={`h${i}`}
                      x1="0"
                      x2="100"
                      y1={i * 9}
                      y2={i * 9}
                      stroke="oklch(0.78 0.13 58)"
                      strokeWidth="0.15"
                    />
                  ))}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <line
                      key={`v${i}`}
                      x1={i * 9}
                      x2={i * 9}
                      y1="0"
                      y2="125"
                      stroke="oklch(0.78 0.13 58)"
                      strokeWidth="0.15"
                    />
                  ))}
                </g>

                {/* City pulses inside the SVG so they always align */}
                {cities.map((c, i) => {
                  const coord = cityCoords[c.name] ?? { x: c.x, y: c.y };
                  const isActive = i === hovered;
                  return (
                    <g key={c.name}>
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r={isActive ? 1.6 : 1.1}
                        fill="oklch(0.78 0.13 58)"
                        stroke="var(--background)"
                        strokeWidth="0.35"
                      />
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="1.1"
                        fill="oklch(0.78 0.13 58 / 0.5)"
                        className="pulse-ring origin-center"
                        style={{ transformBox: "fill-box", transformOrigin: "center" }}
                      />
                      <text
                        x={coord.x}
                        y={coord.y + 3}
                        textAnchor="middle"
                        fontSize="2"
                        className={isActive ? "fill-copper font-semibold" : "fill-current text-foreground/80"}
                        style={{ pointerEvents: "none" }}
                      >
                        {c.name}
                      </text>
                      {/* Hit area */}
                      <circle
                        cx={coord.x}
                        cy={coord.y}
                        r="3.5"
                        fill="transparent"
                        style={{ cursor: "pointer" }}
                        onMouseEnter={() => setHovered(i)}
                        onClick={() => setHovered(i)}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Stat overlay */}
              <div className="pointer-events-none absolute left-2 top-2 rounded-xl border border-copper/40 bg-card/80 px-3 py-2 backdrop-blur sm:left-4 sm:top-4">
                <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-copper">
                  <TrendingUp className="h-3 w-3" /> Footprint
                </div>
                <div className="mt-0.5 font-display text-lg font-semibold sm:text-xl">
                  {stats.projectsDelivered}
                </div>
                <div className="text-[10px] text-muted-foreground">projects delivered</div>
              </div>
            </div>
          </div>

          {/* DETAIL CARD */}
          <div className="lg:col-span-5">
            <motion.div
              key={activeProject?.id ?? "default"}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-card overflow-hidden rounded-2xl"
            >
              {activeProject ? (
                <>
                  <div className="relative h-56 w-full overflow-hidden sm:h-64">
                    <img src={activeProject.image} alt={activeProject.title} className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/30 to-transparent" />
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-copper/40 bg-background/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-copper backdrop-blur">
                      <MapPin className="h-3 w-3" /> {activeCity?.name}
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="font-display text-lg font-semibold sm:text-xl">{activeProject.title}</h3>
                    {activeProject.year && (
                      <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-copper">{activeProject.year}</div>
                    )}
                    <p className="mt-3 text-sm text-foreground/80">
                      Representative engineering deployment delivered to the Tayeb Standard.
                      Part of {stats.projectsDelivered} projects executed nationwide.
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-10 text-center">
                  <div className="font-display text-lg font-semibold">Select a city pulse</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Discover projects in Multan, Lahore, Karachi, Faisalabad and more.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
