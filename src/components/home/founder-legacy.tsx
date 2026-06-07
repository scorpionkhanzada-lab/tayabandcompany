import { motion } from "framer-motion";
import founder from "@/assets/founder-zulfiqar.png";

export function FounderLegacy() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-copper/30 via-transparent to-transparent blur-2xl" />
              <div className="relative overflow-hidden rounded-3xl border border-copper/30 shadow-elevated">
                <img src={founder} alt="Founder Zulfiqar Ali Qureshi" className="aspect-[4/5] w-full object-cover" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent p-6">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-copper">Founder · 1983</div>
                  <div className="font-display text-xl font-semibold">Zulfiqar Ali Qureshi</div>
                  <div className="text-xs italic text-muted-foreground">(Late)</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Founder's Message</div>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-4xl">
              The standard, set in stone.
            </h2>

            <blockquote className="mt-7 space-y-4 font-serif-elegant text-lg leading-relaxed text-foreground/90 sm:text-xl">
              <p className="relative pl-6">
                <span className="absolute left-0 top-0 text-4xl leading-none text-copper">"</span>
                When I established Tayeb &amp; Company in 1983, my goal was simple but ambitious: to provide Pakistan's industrial sector with engineering solutions that were built to last. I believed then, as we do now, that in the world of thermal insulation and HVAC, there is no room for error. Precision is not just a technical requirement; it is a matter of trust.
              </p>
              <p className="pl-6">
                For over four decades, we didn't just wrap pipes or install ducts; we built relationships based on the <em className="text-copper not-italic font-semibold">'Tayeb Standard'</em> — a commitment to quality that never compromises, no matter the scale of the challenge.
              </p>
            </blockquote>

            <div className="mt-8 inline-flex items-center gap-3 border-t border-copper/40 pt-4">
              <div>
                <div className="font-display text-base font-semibold">Zulfiqar Ali Qureshi <span className="text-muted-foreground italic font-normal">(Late)</span></div>
                <div className="text-xs uppercase tracking-widest text-copper">Founder, Tayeb &amp; Company</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
