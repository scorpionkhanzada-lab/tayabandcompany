import { createFileRoute } from "@tanstack/react-router";
import founder from "@/assets/founder-zulfiqar.png";
import ceo from "@/assets/ceo-shamas.png";
import gm from "@/assets/gm-nasir.png";
import { team } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Tayeb & Company" },
      { name: "description", content: "The story, leadership and standards behind Tayeb & Company's four-decade engineering legacy." },
      { property: "og:title", content: "About Tayeb & Company" },
      { property: "og:description", content: "Founded 1983. The leadership and legacy behind Pakistan's industrial insulation specialists." },
    ],
  }),
  component: AboutPage,
});

const portraits: Record<string, string> = {
  "Zulfiqar Ali Qureshi (Late)": founder,
  "Shamas Tayeb": ceo,
  "Muhammad Nasir Farooq": gm,
};

function AboutPage() {
  const founderMember = team.find((m) => m.role === "Founder");
  const ceoMember = team.find((m) => m.role === "Chief Executive Officer");
  const gmMember = team.find((m) => m.role === "General Manager");

  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Our Story</div>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            Forty years of trust, engineered into every joint.
          </h1>
          <p className="mt-6 text-lg text-foreground/75">
            Tayeb &amp; Company was established in 1983 in Multan with a single conviction — that thermal precision is, above all, a matter of trust. Four decades later, that conviction is the gold standard our engineers carry to every site.
          </p>
        </div>
      </section>

      {/* FOUNDER — featured */}
      {founderMember && (
        <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Our Founder</div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">The vision that began it all.</h2>

          <article className="mt-10 overflow-hidden rounded-3xl border border-copper/30 bg-card shadow-elevated">
            <div className="grid gap-0 lg:grid-cols-[minmax(280px,420px)_1fr]">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary lg:aspect-auto">
                <img
                  src={portraits[founderMember.name]}
                  alt={founderMember.name}
                  className="img-enhanced h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent" />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
                <div className="text-[10px] uppercase tracking-[0.3em] text-copper">{founderMember.role}</div>
                <h3 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">{founderMember.name}</h3>
                <p className="mt-5 text-base leading-relaxed text-foreground/80">{founderMember.bio}</p>
                <blockquote className="mt-6 border-l-2 border-copper/60 pl-5 font-serif-elegant text-lg leading-relaxed text-foreground/85">
                  &ldquo;Precision is not a technique — it is a promise we make to every joint, every flange, every plant we serve.&rdquo;
                </blockquote>
                <div className="mt-4 text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Founder &middot; 1983
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* CEO + MD / GM */}
      <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Leadership Today</div>
        <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">Stewards of the standard.</h2>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {[ceoMember, gmMember].filter(Boolean).map((m) => (
            <article key={m!.name} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-elevated transition-all hover:border-copper/50 hover:shadow-glow">
              <div className="relative aspect-[3/4] overflow-hidden bg-secondary sm:aspect-[4/5]">
                <img
                  src={portraits[m!.name]}
                  alt={m!.name}
                  className="img-enhanced h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
              </div>
              <div className="p-7">
                <div className="text-[10px] uppercase tracking-[0.3em] text-copper">
                  {m!.role === "General Manager" ? "Managing Director" : m!.role}
                </div>
                <h3 className="mt-2 font-display text-2xl font-semibold">{m!.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">{m!.bio}</p>
                <blockquote className="mt-5 border-l-2 border-copper/50 pl-4 text-sm italic text-foreground/80">
                  {m!.role === "Chief Executive Officer"
                    ? "“We carry forty years of trust into every new project — modernised, but never compromised.”"
                    : "“Our field teams are the front line of the Tayeb Standard — discipline, every day, on every site.”"}
                </blockquote>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-copper/30 bg-card p-10 shadow-elevated sm:p-14">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">The Tayeb Standard</div>
          <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight">Quality that never compromises, no matter the scale.</h2>
          <p className="mt-6 max-w-3xl text-foreground/75 leading-relaxed">
            From a single valve box in a textile plant to refinery-wide insulation contracts, the Tayeb method is the same: rigorous specification, uncompromising material selection, and craftsmanship that survives decades of thermal cycling.
          </p>
        </div>
      </section>
    </div>
  );
}
