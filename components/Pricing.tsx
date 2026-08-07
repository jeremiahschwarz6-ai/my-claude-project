"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { pricing, site } from "@/lib/site";
import { Button } from "./ui/Button";

export function Pricing() {
  const reduce = useReducedMotion();
  return (
    <section id="pricing" className="relative py-20 wide:py-28">
      <div className="mx-auto max-w-content px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Pricing · one flat monthly fee</span>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            Pick the size of the <span className="dawn-text">machine</span>
          </h2>
          <p className="mt-4 text-muted">
            Every tier is the whole system — capture, answer, qualify, automate — scaled to your
            volume. No contracts. Pause anytime.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 wide:grid-cols-3">
          {pricing.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.08} className="h-full">
              <motion.div
                whileHover={reduce ? undefined : { y: -6 }}
                transition={{ duration: 0.25 }}
                className={`relative flex h-full flex-col rounded-[22px] p-7 ${
                  tier.popular
                    ? "dawn-edge border border-transparent bg-nightsoft"
                    : "border border-line bg-nightsoft"
                }`}
                style={
                  tier.popular
                    ? { boxShadow: "0 24px 70px -30px rgba(245,181,73,0.5)" }
                    : undefined
                }
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-dawn-gradient px-3 py-1 font-mono text-[0.6rem] font-bold uppercase tracking-widest text-night">
                    Most popular
                  </span>
                )}
                <h3 className="font-mono text-sm uppercase tracking-widest text-muted">
                  {tier.name}
                </h3>
                <div className="mt-3 flex items-end gap-1">
                  <span className="display text-4xl">{tier.price}</span>
                  {tier.cadence && <span className="mb-1 text-sm text-muted">{tier.cadence}</span>}
                </div>
                <p className="mt-3 min-h-[2.5rem] text-sm text-muted">{tier.tagline}</p>

                <ul className="mt-5 flex-1 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink">
                      <span
                        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{
                          background: tier.popular ? "var(--dawn)" : "var(--cool)",
                        }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  href={site.bookingUrl}
                  variant={tier.popular ? "dawn" : "outline"}
                  className="mt-7 w-full"
                >
                  {tier.cta}
                </Button>
              </motion.div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-8 text-center">
          <p className="font-mono text-xs tracking-wide text-muted">
            All plans: {site.promise}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
