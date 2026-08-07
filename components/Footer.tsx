import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-content flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="#top" className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-dawn-gradient font-display text-xs font-extrabold text-night">
              M
            </span>
            <span className="font-display text-base font-extrabold tracking-tight">
              Mente<span className="dawn-text">AI</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">
            The AI systems that run your inbound around the clock. Your front office, automated.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            <a href="#system" className="hover:text-ink">System</a>
            <a href="#pricing" className="hover:text-ink">Pricing</a>
            <a href="#how" className="hover:text-ink">How it works</a>
            <a href={site.bookingUrl} className="hover:text-ink">Book a call</a>
          </nav>
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-muted/70">
            {site.promise}
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-content px-5 py-4 text-center font-mono text-[0.65rem] tracking-wide text-muted/60">
          © {year} {site.name}. Built by operators.
        </p>
      </div>
    </footer>
  );
}
