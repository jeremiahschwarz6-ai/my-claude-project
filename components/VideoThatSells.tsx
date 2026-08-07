"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { video } from "@/lib/site";

export function VideoThatSells() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

  // Lazy-load: only attach the source once the section scrolls near view.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="video" className="relative overflow-hidden py-20 wide:py-28">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-5 wide:grid-cols-2">
        <Reveal>
          <span className="eyebrow">Video that sells</span>
          <h2 className="display mt-3 text-3xl leading-tight sm:text-4xl">
            We don&rsquo;t describe the product.
            <br />
            <span className="dawn-text">We make it stop the scroll.</span>
          </h2>
          <p className="mt-5 text-muted">
            Short-form content is part of the machine — the hook that pulls cold traffic into the
            funnel up top. Here&rsquo;s the kind of high-retention clip the agency produces, graded
            to the same night&rarr;dawn palette as everything else.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm text-muted">
            {["Hook-first, built for retention", "On-brand color grade, every frame", "Feeds the funnel that feeds the qualifier"].map(
              (t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-dawn" />
                  {t}
                </li>
              )
            )}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto w-full max-w-[300px]">
          <div
            className="dawn-edge relative aspect-[9/16] overflow-hidden rounded-[26px] border border-transparent"
            style={{
              background: "linear-gradient(160deg, #1C1926, #14121C)",
              boxShadow: "0 30px 80px -30px rgba(245,181,73,0.4)",
            }}
          >
            <video
              ref={ref}
              className="h-full w-full object-cover"
              autoPlay={!reduce}
              muted
              loop
              playsInline
              preload="none"
              poster=""
              aria-label="Short-form ad clip produced by MenteAI"
            >
              {inView && <source src={video.sells} type="video/mp4" />}
            </video>
            {/* subtle vignette + dawn wash */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 50% 110%, rgba(245,181,73,0.18), transparent 55%)",
              }}
            />
            <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-night/70 px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-widest text-ink backdrop-blur">
              ● 9:16 · scroll-stopper
            </span>
          </div>
          {/* Slot note for a future talking-head / spokesperson intro. */}
          <p className="mt-3 text-center font-mono text-[0.6rem] uppercase tracking-widest text-muted/70">
            {/* SLOT: swap in a founder spokesperson / avatar intro here later */}
            Spokesperson intro slot available
          </p>
        </Reveal>
      </div>
    </section>
  );
}
