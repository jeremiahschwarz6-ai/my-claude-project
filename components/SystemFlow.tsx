"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";

const steps = [
  {
    key: "capture",
    tag: "01 · Capture",
    title: "Landing pages & funnels that turn cold traffic into inquiries",
    body: "We build the front door — pages engineered to convert, wired straight into the machine.",
  },
  {
    key: "answer",
    tag: "02 · Answer",
    title: "An AI receptionist that picks up every call & DM, 24/7",
    body: "No more voicemail. It answers in your voice the moment a lead reaches out — day or night.",
  },
  {
    key: "qualify",
    tag: "03 · Qualify & book",
    title: "Screens every lead and books the real ones onto your calendar",
    body: "It asks the right questions, filters the tire-kickers, and drops qualified calls on your schedule.",
  },
  {
    key: "automate",
    tag: "04 · Automate",
    title: "Custom workflows and follow-up firing behind all of it",
    body: "Confirmations, reminders, CRM updates, nurture — the busywork runs itself.",
  },
];

/* ---- per-card mini visuals ---- */

function CaptureViz({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 rounded-lg border border-line bg-night/60 p-2">
        <div className="mb-1.5 h-1.5 w-10 rounded bg-line" />
        <div className="h-1.5 w-16 rounded bg-line/60" />
        <div className="mt-2 h-4 w-14 rounded bg-line" />
      </div>
      <motion.span
        aria-hidden
        className="text-cool"
        animate={active ? { x: [0, 5, 0] } : {}}
        transition={{ repeat: Infinity, duration: 1.4 }}
      >
        →
      </motion.span>
      <motion.div
        className="flex-1 rounded-lg border p-2"
        animate={active ? { borderColor: "#F5B549", backgroundColor: "rgba(245,181,73,0.08)" } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-1.5 h-1.5 w-12 rounded bg-dawn/70" />
        <div className="h-1.5 w-16 rounded bg-dawn/40" />
        <div className="mt-2 h-4 w-16 rounded bg-dawn-gradient" />
      </motion.div>
    </div>
  );
}

function AnswerViz({ active }: { active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-10 w-10 items-center justify-center">
        {active && (
          <span className="absolute h-10 w-10 animate-ring-pulse rounded-full border border-cool/60" />
        )}
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-cool/15 text-cool">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
        </span>
      </span>
      <div className="flex flex-col gap-1.5">
        <span className="w-fit rounded-full bg-dawn/15 px-2 py-0.5 text-[0.6rem] font-semibold text-dawn">
          Answered by AI · 0 rings missed
        </span>
        <span className="rounded-lg rounded-tl-sm border border-line bg-night/60 px-2.5 py-1 text-xs text-muted">
          &ldquo;Thanks for calling — how can I help today?&rdquo;
        </span>
      </div>
    </div>
  );
}

function QualifyViz({ active }: { active: boolean }) {
  const days = ["M", "T", "W", "T", "F"];
  return (
    <div className="grid grid-cols-5 gap-1.5">
      {days.map((d, i) => (
        <div key={i} className="rounded-md border border-line bg-night/60 p-1 text-center">
          <div className="text-[0.55rem] text-muted">{d}</div>
          {i === 3 ? (
            <motion.div
              className="mt-1 h-5 rounded bg-dawn-gradient"
              animate={active ? { opacity: [0.3, 1, 0.3] } : { opacity: 1 }}
              transition={{ repeat: Infinity, duration: 1.8 }}
            />
          ) : (
            <div className="mt-1 h-5 rounded bg-line/50" />
          )}
        </div>
      ))}
    </div>
  );
}

function AutomateViz({ active }: { active: boolean }) {
  const nodes = ["Lead", "CRM", "SMS", "Done"];
  return (
    <div className="flex items-center justify-between">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center">
          <motion.span
            className="flex h-8 items-center rounded-lg border px-2 text-[0.6rem] font-semibold"
            animate={
              active
                ? {
                    borderColor: i === nodes.length - 1 ? "#F5B549" : "#6EA8FF",
                    color: i === nodes.length - 1 ? "#F5B549" : "#6EA8FF",
                  }
                : {}
            }
            transition={{ delay: i * 0.25, duration: 0.6 }}
          >
            {n}
          </motion.span>
          {i < nodes.length - 1 && (
            <motion.span
              className="mx-1 h-px w-4 bg-line"
              animate={active ? { backgroundColor: ["#2A2636", "#6EA8FF", "#2A2636"] } : {}}
              transition={{ repeat: Infinity, duration: 1.6, delay: i * 0.2 }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

const vizMap: Record<string, (p: { active: boolean }) => JSX.Element> = {
  capture: CaptureViz,
  answer: AnswerViz,
  qualify: QualifyViz,
  automate: AutomateViz,
};

export function SystemFlow() {
  const reduce = useReducedMotion();
  return (
    <section id="system" className="relative py-20 wide:py-28">
      <div className="mx-auto max-w-content px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">One system · not four services</span>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            The journey a lead takes — <span className="dawn-text">built to run itself</span>
          </h2>
          <p className="mt-4 text-muted">
            Capture, answer, qualify, automate. Not a menu you pick from — one connected machine a
            lead moves through, from first click to booked call.
          </p>
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-5 wide:grid-cols-2">
          {/* connective through-line on desktop */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 wide:block"
            style={{ background: "linear-gradient(180deg, transparent, #2A2636 15%, #2A2636 85%, transparent)" }}
          />
          {steps.map((s, i) => {
            const Viz = vizMap[s.key];
            return (
              <Reveal key={s.key} delay={i * 0.08}>
                <motion.div
                  className="card group relative h-full p-6"
                  whileHover={reduce ? undefined : { y: -4 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[0.68rem] uppercase tracking-widest text-cool">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.body}</p>
                  <div className="mt-5 rounded-xl border border-line bg-night/40 p-4">
                    <Viz active={!reduce} />
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
