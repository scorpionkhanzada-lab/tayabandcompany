import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, CheckCircle2 } from "lucide-react";
import { contact } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Tayeb & Company" },
      { name: "description", content: "Talk to Pakistan's industrial insulation specialists. Based in Multan, serving nationwide." },
      { property: "og:title", content: "Contact Tayeb & Company" },
      { property: "og:description", content: "Reach our engineering team to scope your next thermal insulation or HVAC project." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  company: z.string().trim().min(1, "Company required").max(120),
  email: z.string().trim().email("Invalid email").max(160),
  phone: z.string().trim().max(40).optional(),
  scale: z.enum(["Large", "Medium", "Small"]),
  message: z.string().trim().min(10, "Tell us a little more").max(2000),
});

type FormState = z.infer<typeof schema>;

function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "", company: "", email: "", phone: "", scale: "Medium", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: typeof errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormState;
        errs[key] = issue.message;
      }
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24">
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-copper">Contact</div>
            <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
              Let's engineer it together.
            </h1>
            <p className="mt-6 text-foreground/75">
              Tell us about your plant, scope and timeline. Our team will respond with a tailored proposal.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-copper">Office</div>
                  <div className="mt-1 text-sm text-foreground/85">{contact.address}</div>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-copper" />
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-copper">Direct Lines</div>
                  <ul className="mt-1 space-y-1 text-sm text-foreground/85">
                    {contact.phones.map((p) => (
                      <li key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-copper">{p}</a></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl border border-copper/30 bg-card p-8 shadow-elevated sm:p-10">
              <div className="absolute inset-0 grid-blueprint opacity-30 pointer-events-none" />
              {submitted ? (
                <div className="relative flex flex-col items-start gap-4">
                  <CheckCircle2 className="h-10 w-10 text-copper" />
                  <h2 className="font-display text-3xl font-semibold">Thank you.</h2>
                  <p className="text-foreground/75">Your enquiry has been received. A member of our engineering team will reach out shortly.</p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", company: "", email: "", phone: "", scale: "Medium", message: "" }); }}
                    className="mt-2 rounded-full border border-border px-5 py-2 text-sm hover:border-copper/60"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="relative grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your Name" error={errors.name}>
                      <input value={form.name} onChange={(e) => update("name", e.target.value)} className={inputCls} placeholder="Engr. Ahmed" />
                    </Field>
                    <Field label="Company Name" error={errors.company}>
                      <input value={form.company} onChange={(e) => update("company", e.target.value)} className={inputCls} placeholder="Acme Industries" />
                    </Field>
                    <Field label="Email" error={errors.email}>
                      <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} placeholder="you@company.com" />
                    </Field>
                    <Field label="Phone (optional)" error={errors.phone}>
                      <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} placeholder="0300 0000000" />
                    </Field>
                  </div>

                  <Field label="Project Scale" error={errors.scale}>
                    <div className="flex gap-2">
                      {(["Large", "Medium", "Small"] as const).map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => update("scale", opt)}
                          className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                            form.scale === opt
                              ? "border-copper bg-accent/15 text-copper shadow-glow"
                              : "border-border bg-background/40 text-foreground/70 hover:border-copper/40"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Project Brief" error={errors.message}>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(e) => update("message", e.target.value)}
                      className={`${inputCls} resize-none`}
                      placeholder="Briefly describe the plant, scope, timeline and location."
                    />
                  </Field>

                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground btn-shimmer shadow-glow"
                  >
                    Send Enquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/30";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-foreground/70">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
