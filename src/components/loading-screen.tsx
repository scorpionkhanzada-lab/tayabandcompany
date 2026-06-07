import { useEffect, useState } from "react";
import logo from "@/assets/logo-tayeb.png";

export function LoadingScreen() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1100);
    const t2 = setTimeout(() => setHidden(true), 1700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950 transition-opacity duration-500 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={fading}
    >
      <div className="absolute inset-0 grid-blueprint opacity-25" />
      <div className="relative flex flex-col items-center gap-6">
        <img
          src={logo}
          alt="Tayeb & Company"
          className="logo-pulse h-44 w-44 object-contain drop-shadow-[0_0_40px_rgba(180,200,230,0.55)] sm:h-56 sm:w-56"
        />
        <div className="text-center">
          <div className="font-display text-lg font-semibold tracking-wide text-white sm:text-xl">
            Tayeb &amp; Company
          </div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.4em] text-amber-300/80 sm:text-[11px]">
            Est. 1983 · Engineering Legacy
          </div>
        </div>
        <div className="relative h-0.5 w-48 overflow-hidden rounded-full bg-white/10">
          <div className="loader-bar absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
        </div>
      </div>
    </div>
  );
}
