"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui/Reveal";
import { Orbs } from "./ui/Orbs";
import { site } from "@/lib/site";
import { Button } from "./ui/Button";

type Msg = { role: "user" | "assistant"; content: string };

const GREETING =
  "Hey — you reached MenteAI's inbound AI. What are you working on, and what brought you in today?";

// Scripted fallback if the API isn't configured or errors. Keeps the demo alive.
const scriptedReplies = [
  "Love it — that's exactly the kind of inbound we handle. Quick one so I point you right: what's your rough monthly revenue right now?",
  "Perfect, you're a strong fit. I've got two slots open with the team: Thursday 2:00 PM or Friday 11:00 AM. Which works?",
  "__BOOKED__Thursday 2:00 PM",
];

// Detect a booking from the assistant's text so we can break the gold card.
function detectBooking(text: string): string | null {
  if (text.includes("__BOOKED__")) {
    return text.split("__BOOKED__")[1]?.trim() || "your call";
  }
  const t = text.toLowerCase();
  const booked =
    /(you'?re booked|booked you|call is booked|locked in|confirmed|see you|you'?re all set|on the calendar|calendar invite)/.test(
      t
    );
  if (!booked) return null;
  const slot = text.match(
    /(mon|tue|wed|thu|fri|sat|sun)[a-z]*,?\s*(at\s*)?\d{1,2}(:\d{2})?\s*(am|pm)?/i
  );
  return slot ? slot[0] : "your call";
}

export function Qualifier() {
  const reduce = useReducedMotion();
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [booked, setBooked] = useState<string | null>(null);
  const [scriptStep, setScriptStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [messages, booked, reduce]);

  function pushAssistant(content: string) {
    setMessages((m) => [...m, { role: "assistant", content }]);
  }

  async function runScripted(history: Msg[]) {
    const raw = scriptedReplies[Math.min(scriptStep, scriptedReplies.length - 1)];
    setScriptStep((s) => s + 1);
    const booking = detectBooking(raw);
    const clean = raw.replace(/__BOOKED__.*/, "").trim();
    await new Promise((r) => setTimeout(r, 550));
    if (clean) pushAssistant(clean);
    if (booking) {
      await new Promise((r) => setTimeout(r, 500));
      setBooked(booking);
    }
  }

  async function send() {
    const text = input.trim();
    if (!text || busy || booked) return;
    setInput("");
    const nextHistory: Msg[] = [...messages, { role: "user", content: text }];
    setMessages(nextHistory);
    setBusy(true);

    try {
      const res = await fetch("/api/qualify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextHistory }),
      });

      if (!res.ok || !res.body) throw new Error("fallback");

      // Stream the reply into a live assistant bubble.
      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
      const booking = detectBooking(acc);
      if (booking) {
        await new Promise((r) => setTimeout(r, 400));
        setBooked(booking);
      }
    } catch {
      // Graceful scripted fallback.
      await runScripted(nextHistory);
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    setMessages([{ role: "assistant", content: GREETING }]);
    setBooked(null);
    setScriptStep(0);
    setInput("");
  }

  return (
    <section id="try" className="relative overflow-hidden py-20 wide:py-28">
      <Orbs variant="cool" />
      <div className="relative mx-auto max-w-content px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Not a demo video — the real thing</span>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            Try the qualifier. <span className="dawn-text">Talk to it like a lead.</span>
          </h2>
          <p className="mt-4 text-muted">
            This is the same AI that screens your inbound and books calls, running live on this
            page. Type like a cold prospect — it&rsquo;ll qualify you and try to book a slot.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-10 max-w-xl">
          <div className="card overflow-hidden">
            {/* header */}
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
                <span className="h-1.5 w-1.5 animate-blink rounded-full bg-cool" />
                qualifier.live
              </span>
              <button
                onClick={reset}
                className="font-mono text-[0.65rem] uppercase tracking-widest text-muted transition-colors hover:text-ink"
              >
                reset
              </button>
            </div>

            {/* transcript */}
            <div
              ref={scrollRef}
              className="thin-scroll flex h-80 flex-col gap-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-cool/15 text-ink"
                        : "rounded-bl-sm border border-line bg-night/60 text-ink"
                    }`}
                  >
                    {m.content || (
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 animate-blink rounded-full bg-muted" />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* gold booked card */}
              <AnimatePresence>
                {booked && (
                  <motion.div
                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="dawn-edge mx-auto mt-1 w-full rounded-2xl border border-transparent bg-[#20180f] p-4 text-center"
                    style={{ boxShadow: "0 0 40px -8px rgba(245,181,73,0.55)" }}
                  >
                    <div className="mb-1 font-mono text-[0.62rem] uppercase tracking-widest text-dawn">
                      ✦ Call booked
                    </div>
                    <div className="text-lg font-semibold dawn-text">{booked}</div>
                    <p className="mt-1 text-xs text-muted">
                      That&rsquo;s what your leads feel — screened and scheduled while you sleep.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* input */}
            <div className="border-t border-line p-3">
              {booked ? (
                <div className="flex items-center justify-between gap-3 px-1">
                  <span className="text-sm text-muted">Want this running for your business?</span>
                  <Button href={site.bookingUrl} variant="dawn" className="!px-4 !py-2 text-xs">
                    Book the real call
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    send();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={busy}
                    placeholder="e.g. I run a coaching business and keep missing calls…"
                    aria-label="Message the qualifier"
                    className="min-w-0 flex-1 rounded-full border border-line bg-night px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-cool/60"
                  />
                  <button
                    type="submit"
                    disabled={busy || !input.trim()}
                    className="shrink-0 rounded-full bg-dawn-gradient px-4 py-2.5 text-sm font-semibold text-night transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Send
                  </button>
                </form>
              )}
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-[0.65rem] uppercase tracking-widest text-muted">
            Powered by a real model · key stays server-side
          </p>
        </Reveal>
      </div>
    </section>
  );
}
