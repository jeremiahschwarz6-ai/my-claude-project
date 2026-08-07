"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { heroFeed } from "@/lib/site";

type Phase = "hidden" | "working" | "resolved";

const WORK_MS = 1050; // time an event spends "processing" (cool)
const GAP_MS = 620; // gap before the next event fires
const HOLD_MS = 2600; // dwell on the finished feed before looping

export function OpsFeed() {
  const reduce = useReducedMotion();
  const [phases, setPhases] = useState<Phase[]>(() => heroFeed.map(() => "hidden"));
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Reduced motion: render the finished feed, no loop.
    if (reduce) {
      setPhases(heroFeed.map(() => "resolved"));
      setDone(true);
      return;
    }

    const clearAll = () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };

    const runCycle = () => {
      clearAll();
      setDone(false);
      setPhases(heroFeed.map(() => "hidden"));

      let t = 400;
      heroFeed.forEach((_, i) => {
        // reveal as "working"
        timers.current.push(
          setTimeout(() => {
            setPhases((p) => {
              const next = [...p];
              next[i] = "working";
              return next;
            });
          }, t)
        );
        t += WORK_MS;
        // resolve
        timers.current.push(
          setTimeout(() => {
            setPhases((p) => {
              const next = [...p];
              next[i] = "resolved";
              return next;
            });
          }, t)
        );
        t += GAP_MS;
      });

      // caption + loop
      timers.current.push(
        setTimeout(() => setDone(true), t)
      );
      timers.current.push(
        setTimeout(runCycle, t + HOLD_MS)
      );
    };

    runCycle();
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <div className="card relative overflow-hidden p-4 sm:p-5">
      {/* dawn glow that intensifies as the feed completes */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background:
            "radial-gradient(120% 100% at 70% 0%, rgba(245,181,73,0.22), rgba(255,158,109,0.10) 40%, transparent 70%)",
        }}
        animate={{ opacity: done ? 1 : 0.25 }}
        transition={{ duration: 1.1 }}
      />

      {/* header */}
      <div className="relative mb-4 flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
          </span>
          <span className="ml-2 font-mono text-xs uppercase tracking-widest text-muted">
            front_office.stream
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-cool">
          <span className="h-1.5 w-1.5 animate-blink rounded-full bg-cool" />
          live
        </span>
      </div>

      {/* feed */}
      <ul className="relative flex flex-col gap-2.5" aria-label="Overnight activity feed">
        {heroFeed.map((ev, i) => {
          const phase = phases[i];
          const isBooked = ev.kind === "booked";
          const visible = phase !== "hidden";
          const working = phase === "working";
          const resolved = phase === "resolved";
          const gold = resolved && (isBooked || ev.kind === "done");

          return (
            <AnimatePresence key={i}>
              {visible && (
                <motion.li
                  initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex items-center gap-3 rounded-xl border px-3 py-2.5 ${
                    isBooked && resolved
                      ? "dawn-edge border-transparent bg-[#20180f]"
                      : "border-line bg-night/50"
                  }`}
                  style={
                    isBooked && resolved
                      ? { boxShadow: "0 0 34px -6px rgba(245,181,73,0.5)" }
                      : undefined
                  }
                >
                  {/* status dot */}
                  <span className="relative flex h-7 w-7 shrink-0 items-center justify-center">
                    {working && (
                      <span className="absolute h-7 w-7 animate-ring-pulse rounded-full border border-cool/60" />
                    )}
                    <span
                      className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${
                        working
                          ? "bg-cool"
                          : gold
                          ? "bg-dawn"
                          : "bg-cool"
                      }`}
                      style={
                        gold
                          ? { boxShadow: "0 0 12px 2px rgba(245,181,73,0.8)" }
                          : working
                          ? { boxShadow: "0 0 10px 2px rgba(110,168,255,0.7)" }
                          : undefined
                      }
                    />
                  </span>

                  {/* time */}
                  <span className="hidden shrink-0 font-mono text-[0.7rem] text-muted sm:block sm:w-16">
                    {ev.time}
                  </span>

                  {/* label → detail */}
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline gap-x-2">
                      <span className="text-sm font-semibold text-ink">{ev.label}</span>
                      <span className="text-cool/70">→</span>
                      <span className="truncate text-sm text-muted">{ev.detail}</span>
                    </span>
                  </span>

                  {/* right-side status chip */}
                  <span className="shrink-0">
                    {working ? (
                      <span className="font-mono text-[0.62rem] uppercase tracking-widest text-cool">
                        working
                      </span>
                    ) : isBooked ? (
                      <span className="rounded-full bg-dawn-gradient px-2 py-0.5 font-mono text-[0.62rem] font-bold uppercase tracking-wider text-night">
                        booked
                      </span>
                    ) : (
                      <span className="font-mono text-[0.62rem] uppercase tracking-widest text-dawn">
                        done
                      </span>
                    )}
                  </span>
                </motion.li>
              )}
            </AnimatePresence>
          );
        })}
      </ul>

      {/* caption */}
      <div className="relative mt-4 h-6 border-t border-line pt-3">
        <AnimatePresence>
          {done && (
            <motion.p
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-xs tracking-wide text-muted"
            >
              <span className="dawn-text font-bold">You slept.</span> Your front office didn&rsquo;t.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
