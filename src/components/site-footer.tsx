import { Link } from "@tanstack/react-router";
import { MapPin, Phone } from "lucide-react";
import { contact, services } from "@/lib/site-data";
import logo from "@/assets/logo-tayeb.png";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-border bg-secondary/40">
      <div className="grid-blueprint absolute inset-0 opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Tayeb & Company" className="h-12 w-12 rounded-md bg-card object-contain p-1 ring-1 ring-border" />
              <div>
                <div className="font-display text-lg font-semibold">Tayeb &amp; Company</div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-copper">Est. 1983</div>
              </div>
            </div>
            <p className="mt-6 font-serif-elegant text-lg leading-snug text-foreground/90">
              "{contact.tagline}"
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-copper">Services</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to="/services/$slug" params={{ slug: s.slug }} className="text-foreground/70 hover:text-foreground">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-copper">Company</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="text-foreground/70 hover:text-foreground">About Us</Link></li>
              <li><Link to="/projects" className="text-foreground/70 hover:text-foreground">Projects</Link></li>
              <li><Link to="/certificates" className="text-foreground/70 hover:text-foreground">Certificates</Link></li>
              <li><Link to="/contact" className="text-foreground/70 hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-copper">Reach Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-foreground/80">
              <li className="flex gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-copper" /><span>{contact.address}</span></li>
              {contact.phones.map((p) => (
                <li key={p} className="flex gap-3"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-copper" /><a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-foreground">{p}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Tayeb &amp; Company Engineering Works. All rights reserved.</p>
          <p>A legacy of precision since 1983.</p>
        </div>
      </div>
    </footer>
  );
}
