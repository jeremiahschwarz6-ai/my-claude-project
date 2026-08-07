import { Reveal } from "./ui/Reveal";
import { steps } from "@/lib/site";

export function HowItWorks() {
  return (
    <section id="how" className="relative py-20 wide:py-28">
      <div className="mx-auto max-w-content px-5">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">How it works</span>
          <h2 className="display mt-3 text-3xl sm:text-4xl">
            Subscribe. Submit. <span className="dawn-text">We ship.</span>
          </h2>
          <p className="mt-4 text-muted">
            A real sequence — flat monthly fee, async requests, live systems in days. Pause the
            moment you need to.
          </p>
        </Reveal>

        <ol className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 wide:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.08}>
              <div className="card relative h-full p-6">
                <span className="font-mono text-3xl font-bold text-line">{s.n}</span>
                <span
                  aria-hidden
                  className="absolute right-6 top-6 h-2 w-2 rounded-full"
                  style={{
                    background: i === steps.length - 1 ? "var(--dawn)" : "var(--cool)",
                    boxShadow:
                      i === steps.length - 1
                        ? "0 0 12px 2px rgba(245,181,73,0.7)"
                        : "0 0 10px 2px rgba(110,168,255,0.6)",
                  }}
                />
                <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
