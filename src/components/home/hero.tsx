import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-industrial.jpg";

export function Hero() {
  return (
    <section className="relative isolate flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-slate-950 text-white">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster={heroImg}
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      >
        <source src="/hero-industrial.mp4" type="video/mp4" />
      </video>
      {/* Always-dark cinematic overlay so text stays readable in any theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/65 via-slate-950/75 to-slate-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.55)_100%)]" />
      <div className="absolute inset-0 grid-blueprint opacity-25" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-white/5 px-3 py-1 backdrop-blur">
            <Sparkles className="h-3 w-3" style={{ color: "var(--accent)" }} />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] sm:text-[11px]" style={{ color: "var(--accent)" }}>
              Established 1983 · Multan, Pakistan
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold leading-[1.08] tracking-tight text-white sm:mt-5 sm:text-5xl lg:text-6xl">
            A Legacy of{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg, var(--accent), var(--accent), var(--accent))" }}>
              Precision.
            </span>
            <span className="block">A Future of Innovation.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 sm:mt-6 sm:text-xl lg:text-2xl">
            Pakistan's leading partner in{" "}
            <strong className="font-semibold text-white">Thermal Insulation</strong> and{" "}
            <strong className="font-semibold text-white">HVAC Engineering</strong> — safeguarding
            industrial assets with uncompromising craftsmanship.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
            <Link
              to="/services"
              className="btn-cta group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-[0_10px_40px_-10px_rgba(245,158,11,0.55)]"
            >
              Explore Services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/projects"
              className="btn-outline-cta inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"
              style={{ borderColor: "rgba(255,255,255,0.35)", color: "#ffffff" }}
            >
              View Projects
            </Link>
          </div>
        </motion.div>

        <div className="absolute bottom-6 right-6 hidden items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur md:flex">
          <ShieldCheck className="h-4 w-4 text-amber-300" />
          <span className="text-xs font-medium text-white/85">
            The Tayeb Standard — uncompromising since 1983
          </span>
        </div>
      </div>
    </section>
  );
}
