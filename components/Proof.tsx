"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { proof } from "@/lib/site";

// Count up to the proof number when it scrolls into view.
function useCountUp(target: number, run: boolean, reduce: boolean) {
  const [val, setVal] = useState(reduce ? target : 0);
  useEffect(() => {
    if (!run || reduce) {
      setVal(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const dur = 1100;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, reduce]);
  return val;
}

export function Proof() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  const n = Number(proof.stat) || 0;
  const val = useCountUp(n, seen, !!reduce);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setSeen(true), io.disconnect()),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="proof" className="relative py-20 wide:py-24">
      <div className="mx-auto max-w-content px-5">
        <Reveal className="mx-auto max-w-3xl">
          <div ref={ref} className="card relative overflow-hidden p-8 text-center sm:p-12">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-40"
              style={{
                background:
                  "radial-gradient(100% 100% at 50% 0%, rgba(245,181,73,0.16), transparent 60%)",
              }}
            />
            <span className="eyebrow relative">Young · hungry · already shipping</span>
            <div className="relative mt-6 flex items-end justify-center gap-3">
              <span className="display text-7xl leading-none dawn-text sm:text-8xl">{val}</span>
              <span className="mb-2 max-w-[9rem] text-left text-sm text-muted">
                {proof.statLabel}
              </span>
            </div>
            <p className="relative mx-auto mt-6 max-w-xl text-lg text-ink">{proof.line}</p>
            <p className="relative mt-3 font-mono text-xs tracking-wide text-muted">
              No fake logo wall. Real numbers, growing every week.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
