"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";
import { Button } from "./ui/Button";
import { Orbs } from "./ui/Orbs";
import { OpsFeed } from "./OpsFeed";

const pillStates = [
  { text: "FRONT OFFICE · LIVE", dot: "bg-cool" },
  { text: "YOU SLEPT · IT WORKED", dot: "bg-dawn" },
];

function StatusPill() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % pillStates.length), 3200);
    return () => clearInterval(id);
  }, [reduce]);

  const s = pillStates[i];
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-nightsoft/70 px-3 py-1.5">
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot} ${reduce ? "" : "animate-blink"}`} />
      <AnimatePresence mode="wait">
        <motion.span
          key={s.text}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted"
        >
          {s.text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 wide:pt-36 wide:pb-24">
      <Orbs variant="hero" />
      {/* night → dawn floor wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #2A2636, transparent)" }}
      />

      <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-5 wide:grid-cols-[1.05fr_0.95fr]">
        {/* Left */}
        <div>
          <StatusPill />

          <h1 className="display mt-6 text-[2.6rem] leading-[1.03] sm:text-6xl">
            Your front office
            <br />
            <span className="dawn-text">runs itself</span> — day
            <br className="hidden sm:block" /> and night.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            MenteAI builds the AI systems that run your inbound around the clock — capturing
            leads, answering every call and DM, qualifying, and booking real calls onto your
            calendar. One connected machine. Nothing gets missed.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href={site.bookingUrl} variant="dawn">
              Book a 15-min call
            </Button>
            <Button href="#pricing" variant="outline">
              See pricing
            </Button>
          </div>

          <p className="mt-6 font-mono text-xs tracking-wide text-muted">
            One flat monthly fee · 30-day promise · Pause anytime · No contracts
          </p>
        </div>

        {/* Right — live ops feed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <OpsFeed />
        </motion.div>
      </div>
    </section>
  );
}
