"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { Button } from "./ui/Button";

const links = [
  { href: "#system", label: "System" },
  { href: "#proof", label: "Proof" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-night/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-content items-center justify-between px-5">
        <Link href="#top" className="flex items-center gap-2" aria-label="MenteAI home">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-dawn-gradient">
            <span className="absolute inset-0 rounded-lg bg-dawn-gradient blur-md opacity-60" />
            <span className="relative font-display text-sm font-extrabold text-night">M</span>
          </span>
          <span className="font-display text-lg font-extrabold tracking-tight">
            Mente<span className="dawn-text">AI</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 wide:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
        </div>

        <Button href={site.bookingUrl} variant="dawn" className="!px-5 !py-2.5">
          Book a call
        </Button>
      </nav>
    </header>
  );
}
