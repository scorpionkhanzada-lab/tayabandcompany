import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo-tayeb.png";
import { services } from "@/lib/site-data";
import { useTheme } from "./theme-provider";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink = scrolled
    ? (theme === "light"
        ? "relative px-3 py-2 text-sm font-medium text-white transition-colors hover:text-amber-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"
        : "relative px-3 py-2 text-sm font-medium text-foreground transition-colors hover:text-copper")
    : "relative px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-amber-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled || open
          ? (theme === "light"
              ? "shadow-elevated backdrop-blur-xl bg-slate-950/85 border-b border-white/10"
              : "glass shadow-elevated")
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative h-10 w-10 flex items-center justify-center sm:h-11 sm:w-11">
            <img src={logo} alt="Tayeb & Company logo" className="h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(180,200,230,0.35)]" />
          </div>
          <div className="leading-tight">
            <div className={`font-display text-sm font-semibold tracking-tight sm:text-base ${scrolled ? (theme === "light" ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]" : "text-foreground") : "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)]"}`}>
              Tayeb &amp; Company
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-copper">Est. 1983</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {[
            { to: "/" as const, label: "Home", exact: true },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`${navLink} ${!scrolled ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" : ""}`}
              activeProps={{ className: "text-copper" }}
              activeOptions={{ exact: l.exact }}
            >
              {l.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              to="/services"
              className={`${navLink} inline-flex items-center gap-1 ${!scrolled ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" : ""}`}
              activeProps={{ className: "text-copper" }}
            >
              Services <ChevronDown className="h-3.5 w-3.5" />
            </Link>
            {servicesOpen && (
              <div className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-2">
                <div className="glass-card rounded-xl p-2 shadow-elevated">
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="block rounded-lg px-3 py-2 text-sm hover:bg-accent/10"
                    >
                      <div className="font-medium text-foreground">{s.title}</div>
                      <div className="text-xs text-muted-foreground">{s.tagline}</div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {[
            { to: "/projects" as const, label: "Projects" },
            { to: "/certificates" as const, label: "Certificates" },
            { to: "/about" as const, label: "About Us" },
            { to: "/contact" as const, label: "Contact" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`${navLink} ${!scrolled ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" : ""}`}
              activeProps={{ className: "text-copper" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="rounded-full border border-border bg-card/50 p-2 text-foreground transition-colors hover:text-copper"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link
            to="/contact"
            className="btn-cta hidden rounded-full px-4 py-2 text-sm font-semibold lg:inline-flex"
          >
            Request Quote
          </Link>
          <button
            className="lg:hidden rounded-md p-2 text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="lg:hidden glass border-t border-border">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            <Link to="/" onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-sm font-medium text-foreground hover:bg-accent/10">Home</Link>

            <button
              onClick={() => setMobileServicesOpen((o) => !o)}
              className="flex items-center justify-between rounded-md px-2 py-3 text-sm font-medium text-foreground hover:bg-accent/10"
            >
              <span>Services</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileServicesOpen && (
              <div className="ml-2 border-l border-border pl-3">
                <Link to="/services" onClick={() => setOpen(false)} className="block py-2 text-xs font-medium uppercase tracking-widest text-copper">All Services</Link>
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    onClick={() => setOpen(false)}
                    className="block py-2 text-sm text-foreground/85 hover:text-copper"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}

            <Link to="/projects" onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-sm font-medium text-foreground hover:bg-accent/10">Projects</Link>
            <Link to="/certificates" onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-sm font-medium text-foreground hover:bg-accent/10">Certificates</Link>
            <Link to="/about" onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-sm font-medium text-foreground hover:bg-accent/10">About Us</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="rounded-md px-2 py-3 text-sm font-medium text-foreground hover:bg-accent/10">Contact</Link>

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-cta mt-3 inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold"
            >
              Request Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
