import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MousePointer2, RotateCw, Layers, Check, ChevronLeft, ChevronRight } from "lucide-react";

const BoilerStageCanvas = lazy(async () => {
  const mod = await import("./boiler-stage-canvas");
  return { default: mod.BoilerStageCanvas };
});

type WoolChoice = "rockwool" | "glasswool";
type StageKey = "clean" | "wool" | "cladding";

interface StageInfo {
  key: StageKey;
  index: number;
  title: string;
  short: string;
  detail: string;
  color: string;
}

const STAGES: StageInfo[] = [
  {
    key: "clean",
    index: 1,
    title: "Surface Preparation",
    short: "Clean & Prime",
    detail:
      "Strip old insulation, descale, wire-brush the steel substrate and apply anti-corrosion primer. A clean surface is the foundation of every Tayeb install.",
    color: "bg-zinc-400",
  },
  {
    key: "wool",
    index: 2,
    title: "Insulation Layer — Rock Wool or Glass Wool",
    short: "Choose Wool",
    detail:
      "Choose the insulation media for the layer — high-density Rock Wool (50–160 kg/m³) for heavy thermal duty, or lighter Glass Wool for moderate-temperature service. Toggle to preview either option on the model.",
    color: "bg-amber-700",
  },
  {
    key: "cladding",
    index: 3,
    title: "Weather-tight Jacket",
    short: "Weather Jacket",
    detail:
      "Wrap with pre-rolled aluminium, stainless or galvanised sheet, fastened with self-tapping screws and silicone-sealed. The result is a polished, decade-grade weather-tight jacket.",
    color: "bg-slate-200",
  },
];

export function BoilerShowcase() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [stageIndex, setStageIndex] = useState(0);
  const [woolChoice, setWoolChoice] = useState<WoolChoice>("rockwool");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const active = useMemo(() => STAGES[stageIndex] ?? STAGES[0], [stageIndex]);

  const moveStage = (direction: -1 | 1) => {
    setStageIndex((current) => Math.min(STAGES.length - 1, Math.max(0, current + direction)));
  };

  // Canvas receives stage + wool; wool choice persists into the cladding stage
  // so the jacket wraps whichever insulation the user picked.

  return (
    <section className="relative bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-copper/40 bg-card/60 px-3 py-1">
              <Layers className="h-3.5 w-3.5 text-copper" />
              <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-copper">
                Engineering in 3D
              </span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-4xl">
              How we insulate, <span className="text-copper">layer by layer.</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
              A Tayeb-grade pipe insulation comes together in three engineered stages — clean the surface, choose the right wool, then seal it under a weather-tight jacket. Drag the model to orbit, scroll to zoom.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-2">
              {STAGES.map((s, index) => {
                const isActive = index === stageIndex;
                return (
                  <button
                    key={s.key}
                    onClick={() => setStageIndex(index)}
                    className={`group relative overflow-hidden rounded-xl border p-3 text-left transition-all ${
                      isActive ? "border-copper bg-card shadow-glow" : "border-border bg-card/40 hover:border-copper/50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${
                          isActive ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground/70"
                        }`}
                      >
                        {isActive ? <Check className="h-3 w-3" /> : s.index}
                      </span>
                      <span className={`h-2 w-2 rounded-full ${s.color}`} />
                    </div>
                    <div className="mt-2 text-xs font-semibold text-foreground">{s.short}</div>
                  </button>
                );
              })}
            </div>

            <motion.div
              key={active.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-5 rounded-2xl border border-border bg-card/60 p-5"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-copper">
                    Step {active.index} of {STAGES.length}
                  </div>
                  <div className="mt-1 font-display text-base font-semibold sm:text-lg">{active.title}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => moveStage(-1)}
                    disabled={stageIndex === 0}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-copper disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Previous stage"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveStage(1)}
                    disabled={stageIndex === STAGES.length - 1}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:border-copper disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Next stage"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-foreground/80">{active.detail}</p>

              {active.key === "wool" && (
                <div className="mt-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                    Choose insulation media
                  </div>
                  <div className="mt-2 inline-flex rounded-full border border-border bg-card p-1">
                    <button
                      onClick={() => setWoolChoice("rockwool")}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                        woolChoice === "rockwool"
                          ? "bg-accent text-accent-foreground shadow-sm"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      Rock Wool
                    </button>
                    <button
                      onClick={() => setWoolChoice("glasswool")}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                        woolChoice === "glasswool"
                          ? "bg-accent text-accent-foreground shadow-sm"
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      Glass Wool
                    </button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {woolChoice === "rockwool"
                      ? "Rock (mineral) wool — 50–160 kg/m³, ideal for high-temperature thermal duty."
                      : "Glass wool — lightweight 24–100 kg/m³, suited to moderate-temperature service."}
                  </p>
                </div>
              )}
            </motion.div>

            <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MousePointer2 className="h-3.5 w-3.5 text-copper" /> Drag to orbit
              </span>
              <button
                onClick={() => setAutoRotate((v) => !v)}
                className="inline-flex items-center gap-1.5 hover:text-copper"
              >
                <RotateCw className={`h-3.5 w-3.5 ${autoRotate ? "text-copper" : ""}`} />
                {autoRotate ? "Pause rotation" : "Auto-rotate"}
              </button>
            </div>
          </div>

          <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-background via-secondary/40 to-background shadow-elevated sm:h-[540px]">
            <div className="absolute inset-0 grid-blueprint opacity-30" />
            {mounted ? (
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                    Loading 3D model…
                  </div>
                }
              >
                <BoilerStageCanvas stage={active.key} wool={woolChoice} autoRotate={autoRotate} />
              </Suspense>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                Loading 3D model…
              </div>
            )}

            <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur sm:text-[11px]">
              Step {active.index} · {active.title}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
